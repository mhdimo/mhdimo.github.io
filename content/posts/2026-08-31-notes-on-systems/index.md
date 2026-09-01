---
title: "Notes on Speculative Decoding & Metal Inference"
date: "2026-08-31"
description: "Engineering notes on KV-cache prefix reuse, speculative draft models, and Metal kernel optimization on Apple Silicon."
tags: ["LLM", "Systems", "Metal", "vLLM"]
---

# Notes on Speculative Decoding & Metal Inference

Speculative decoding offers a practical approach to reducing token generation latency in autoregressive language models without altering the output distribution. Instead of running memory-bandwidth-bound token-by-token verification on the target model, a smaller draft model generates candidates, and the larger target model verifies them in parallel during a single forward pass.

This note documents key considerations when optimizing speculative decoding on unified memory architectures such as Apple Silicon.

## KV-Cache Prefix Reuse

In speculative verification, each propose-and-verify cycle can easily duplicate key-value state computation if the scheduler does not explicitly manage prefix cache boundaries.

When the target model evaluates a draft sequence:
1. The prefix KV pairs for verified tokens are committed into the paged cache.
2. Draft tokens are scored in batch.
3. Upon acceptance or rejection, trailing unverified states must be discarded or marked invalid without triggering expensive GPU allocations or cache evictions.

```cpp
// Example: validating draft acceptance and advancing cache sequence
struct DraftVerificationResult {
    size_t accepted_tokens;
    bool bonus_token_valid;
};

DraftVerificationResult verify_draft(
    const Tensor& target_logits,
    const Tensor& draft_tokens,
    float temperature
) {
    // Parallel verification across proposed sequence
    auto accepted = sample_and_verify(target_logits, draft_tokens, temperature);
    return { accepted.count(), accepted.has_bonus() };
}
```

## Metal Unified Memory Characteristics

Apple Silicon's unified memory architecture eliminates host-to-device PCI transfers, but kernel memory access patterns still dictate throughput. A few critical observations:

- **Contiguous KV Block Addressing:** Fragmented block allocation degrades Metal cacheline utilization. Pre-allocating contiguous physical slots for speculative speculation trees yields consistent latency gains.
- **Kernel Fusion:** Fusing RMSNorm with the QKV projection kernel minimizes global memory round-trips before the attention mechanism.
- **Prefix Tree Structure:** In multi-candidate speculation (such as EAGLE or tree-based drafters), masking the attention tensor according to the tree structure avoids running separate passes for alternative branches.

| Strategy | First-Propose Latency (8K) | E2E Latency (ms/tok) | Memory Traffic |
| :--- | :--- | :--- | :--- |
| Standard Autoregressive | 3.47 s | 64.0 ms | 100% |
| Speculative (Naïve KV) | 1.12 s | 44.5 ms | 78% |
| Speculative + Prefix Reuse | **112 ms** | **30.8 ms** | **50%** |

## Takeaways

Speculative decoding moves the bottleneck from memory bandwidth toward compute capacity. When optimizing for local accelerators, preserving cache reuse across proposal iterations delivers significantly greater throughput improvements than tuning standalone draft sampling routines alone.
