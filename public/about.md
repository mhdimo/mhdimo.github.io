# About — Mihal Dimo

Markdown mirror of https://mhdimo.github.io/about/ — the HTML page is canonical.

I work on LLM inference systems and embedded firmware — currently contributing to the vLLM project, previously at Amazon and KBDfans. I am based in Italy.

## Current work

Since July 2026 I have been an open-source contributor to the vLLM project, with 20+ merged PRs in the vLLM Metal backend spanning speculative decoding, paged KV-cache management, model compatibility, sampling, and memory management for Apple Silicon inference. I implemented DSpark speculative decoding — Qwen3 model integration, scheduler-owned KV-cache management, page execution, Markov drafting, prefix caching, validation, and serving benchmarks — and optimized it by eliminating redundant KV re-ingestion and chunking cold draft-KV ingestion. That work reduced 8K first-propose latency by 31× (3.47 s to 112 ms), end-to-end latency by 2.1× (64.0 to 30.8 ms per token), steady-state KV ingestion by 50%, and DSpark draft-weight memory by 48% (4.42 to 2.29 GiB).

## Experience highlights

I completed a software development engineer internship at Amazon Music in Berlin (January–July 2026), where I engineered a full-stack embedding search and visualization platform over 50 million embeddings, with PCA/UMAP visualization and sub-5 ms K-Nearest-Neighbours queries, accelerating recommender experimentation. I designed a batch ML data pipeline for embedding metadata hydration and model indexing across S3, ECS, and OpenSearch, enabling automated weekly model updates, and built evaluation workflows measuring marketplace performance with Recall, NDCG, Precision, and triplet accuracy alongside a FastAPI backend and CloudWatch monitoring. Before that, from March 2024 to December 2025, I led firmware and hardware development for the Zellia Hall Effect keyboard project at KBDfans as a partner and technical lead: a distributed embedded system across five AT32 MCUs designed in KiCad 8.0, achieving under 0.28 ms input latency at a 106 kHz scan rate by decoupling signal acquisition and processing, with a custom 7.5 Mbps UART protocol for high-throughput multi-MCU synchronization, and offloading ADC normalization and calibration to slave MCUs to reduce master CPU load by 90%.

## Education

I hold a Bachelor's of Science in Computer Science from the University of Catania, Italy (Sep 2021 – Jun 2027, expected), with coursework in embedded systems, algorithms and data structures, and linear algebra. I spent a semester as an Erasmus+ exchange student at Brandenburg Technical University in Cottbus, Germany (February–September 2024), studying applied linear algebra for AI, calculus, and software security.

## Skills

Languages: C, C++, Rust, Python, TypeScript, Java, SQL. ML systems: vLLM, MLX with custom Metal kernels, PyTorch, Metal/MPS backends, speculative decoding, quantization, KV-cache optimization, embeddings, recommender systems, DQN. LLM tooling: MCP, multi-provider LLM APIs, AI-SDK, Claude Code. Systems and data: Linux, Docker, AWS, REST APIs, Kafka, PySpark, OpenSearch, Parquet, Pandas, NumPy. Embedded and web: ARM Cortex-M, KiCad, USB/WebUSB, FastAPI, Node.js, SvelteKit, React.
