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

Contributing DSpark/EAGLE-style speculative decoding to the vLLM Apple Silicon Metal backend.
Optimized speculative decoding with scheduler-managed KV prefix reuse, eliminating redundant KV re-ingestion: 31× faster 8K first-propose latency (3.47s → 112ms), 2.1× end-to-end latency (64.0 → 30.8 ms/token), and 50% less steady-state KV ingest.
Extended the paged KV-cache infrastructure with configurable memory usage reporting for long-context inference workloads.

### Amazon — Software Development Engineer Intern (Jan 2026 - Jul 2026, Berlin, Germany)

Engineered a full-stack embedding search platform over 50M embeddings with PCA/UMAP visualization and sub-5ms K-Nearest-Neighbours queries, enabling faster Music recommender experimentation.
Designed a two-stage batch indexing pipeline: a weekly job performs metadata hydration and writes partitioned Parquet files to S3, followed by an AWS ECS ingestion task that indexes entities into OpenSearch.
Implemented a Parquet-based storage layer with entity-level partitioning, reducing per-session data transfer ~20×.
Built a FastAPI backend on AWS ECS unifying search, ingestion status, and visualization workflows, with CloudWatch monitoring for pipeline reliability.

### KBDfans (Partner) — Firmware Lead & Embedded Software Engineer (Mar 2024 - Dec 2025, Changzhou, China)

Led firmware and hardware development for the Zellia Hall Effect project (team of five C/C++ engineers): a distributed embedded system across five AT32 MCUs with enhanced modularity and multi-layout keyboard, designed in KiCad 8.0.
Achieved <0.28 ms input latency at a 106 kHz scan rate by decoupling signal acquisition and processing, with a custom 7.5 Mbps UART protocol for multi-MCU synchronization.
Offloaded ADC normalization and calibration to slave MCUs, cutting master CPU load by 90%.
Developed a cross-platform configuration tool (SvelteKit, TypeScript) for device tuning, firmware updates, and profile management with 8+ configurable profiles.

## Education

### Bachelor's of Science in Computer Science — University of Catania (Sep 2021 - Dec 2026, Catania, Italy)

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
