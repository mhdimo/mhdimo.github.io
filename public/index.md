# Mihal Dimo — Software Engineer

I work on LLM inference systems and embedded firmware — currently contributing to the vLLM project, previously at Amazon and KBDfans. Based in Italy.

Markdown mirror of https://mhdimo.github.io/ — the HTML page is canonical. Agent guide: [/llms.txt](https://mhdimo.github.io/llms.txt).

- Email: mihal@kakao.com (email only; no phone number is published)
- Blog / Writing: https://mhdimo.github.io/blog/
- GitHub: https://github.com/mhdimo
- LinkedIn: https://linkedin.com/in/mihaldimo/
- X: https://x.com/mihaldimo
- Resume (PDF): https://mhdimo.github.io/Resume.pdf

## Experience

### vLLM Project — Open Source Contributor (Jul 2026 - Present, Open Source)

Contributed to 20+ merged PRs in the vLLM Metal backend, spanning speculative decoding, paged KV-cache management, model compatibility, sampling, and memory management for Apple Silicon inference.
Implemented DSpark speculative decoding for the vLLM Metal backend, including Qwen3 model integration, scheduler-owned KV-cache management, paged execution, Markov drafting, prefix caching, validation, and serving benchmarks.
Optimized speculative decoding by eliminating redundant KV re-ingestion and chunking cold draft-KV ingestion: 31× faster 8K first-propose latency (3.47s → 112ms), 2.1× end-to-end latency (64.0 → 30.8 ms/token), 50% less steady-state KV ingestion, and 48% lower DSpark draft-weight memory (4.42 → 2.29 GiB).

### Amazon — Software Development Engineer Intern (Jan 2026 - Jul 2026, Berlin, Germany)

Engineered a full-stack embedding search and visualization platform over 50M embeddings, with PCA/UMAP visualization and sub-5ms K-Nearest-Neighbours queries, accelerating Music recommender experimentation.
Designed a batch ML data pipeline for embedding metadata hydration and model indexing across S3, ECS, and OpenSearch, enabling automated weekly model updates.
Built evaluation workflows measuring marketplace performance with Recall, NDCG, Precision, and triplet accuracy, alongside a FastAPI backend and CloudWatch monitoring.

### KBDfans (Partner) — Firmware Lead & Embedded Software Engineer (Mar 2024 - Dec 2025, Changzhou, Jiangsu, China)

Led firmware and hardware development for the Zellia Hall Effect project (team of five C/C++ engineers): a distributed embedded system across five AT32 MCUs with enhanced modularity and multi-layout keyboard support, designed in KiCad 8.0.
Achieved <0.28 ms input latency at a 106 kHz scan rate by decoupling signal acquisition and processing, with a custom 7.5 Mbps UART protocol for high-throughput multi-MCU synchronization.
Offloaded ADC normalization and calibration to slave MCUs, reducing master CPU load by 90%.

## Education

### Bachelor's of Science in Computer Science — University of Catania (Sep 2021 - Jun 2027 (Expected), Catania, Italy)

Coursework: Embedded systems, Algorithm & Data Structures, Linear Algebra.

### Bachelor's of Science in Computer Science — Erasmus+ Exchange — Brandenburg Technical University (Feb 2024 - Sep 2024, Cottbus, Germany)

Coursework: Applied Linear Algebra for AI, Calculus, Software Security.

## Technical Skills

- Languages: C, C++, Rust, Python, TypeScript, Java, SQL
- ML Systems: vLLM, MLX (custom Metal kernels), PyTorch, Metal/MPS backends, Speculative decoding, Quantization, KV-cache optimization, Embeddings, Recommender systems, DQN
- LLM Tooling: MCP, Multi-provider LLM APIs, AI-SDK, Claude Code
- Systems & Data: Linux, Docker, AWS, REST APIs, Kafka, PySpark, OpenSearch, Parquet, Pandas, NumPy
- Embedded & Web: ARM Cortex-M, KiCad, USB/WebUSB, FastAPI, Node.js, SvelteKit, React

## Projects (featured repositories)

- [vllm-metal](https://github.com/vllm-project/vllm-metal) — Hardware plugin for vLLM on Apple Silicon — speculative decoding with scheduler-managed KV prefix reuse: 31× faster 8K first-propose latency, 2.1× end-to-end, 50% less KV ingest. (Python)
- [ai-sdk-cpp](https://github.com/mhdimo/ai-sdk-cpp) — C++20 LLM orchestration framework using coroutines and Boost.Asio — high-concurrency agent workflows with a C ABI FFI for Python, Node.js, Rust, and Go. (C++)
- [Zellia80-HE](https://github.com/mhdimo/Zellia80-HE) — Firmware for the Zellia Hall Effect keyboard project at KBDfans — technical lead for firmware and hardware development, five AT32 MCUs with parallel ADCs at 106 kHz scan rate. (C)
- [deepseek-code](https://github.com/mhdimo/deepseek-code) — Terminal AI coding agent in TypeScript — multi-step agentic loop, real-time streaming, tool execution, and MCP extensibility with a provider abstraction layer. (TypeScript)
- [qwen38-h100-lab](https://github.com/mhdimo/qwen38-h100-lab) — Single-H100 study of Qwen3.8-27B-FP8 inference — an SM90 CUDA kernel fusing SiLU, gating, and per-group FP8 E4M3 quantization with warp-shuffle-only reductions and no block barriers, verified byte-exact against vLLM's kernel across 168 reference comparisons (edge tiles, both scale layouts) and validated with CUDA graph replay over changing inputs. Targeting the kernel at 14.5% of prefill GPU time reached 2.26× kernel speedup at the 16K-row shape and +5.90% prefill / +3.65% mixed full-model throughput vs. tuned vLLM. (Python)
- [inference-engine](https://github.com/mhdimo/inference-engine) — From-scratch C++20 LLM inference engine for Apple Silicon — tensor runtime, compute graphs with lifetime-based memory planning, GGUF loading, tokenization, KV caching, sampling, and CPU/Metal backends. Implements 13 custom Metal compute kernels with zero-copy unified-memory execution — tiled and quantized GEMM, RoPE, GQA attention, RMSNorm, and SwiGLU — enabling end-to-end inference of Qwen2.5 and SmolLM2. (C++)
