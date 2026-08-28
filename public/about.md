# About — Mihal Dimo

Markdown mirror of https://mhdimo.github.io/about/ — the HTML page is canonical.

I work on LLM inference systems and embedded firmware — currently contributing to the vLLM project, previously at Amazon and KBDfans. I am based in Italy.

## Current work

Since July 2026 I have been an open-source contributor to the vLLM project, engineering DSpark/EAGLE-style speculative decoding for the Apple Silicon Metal backend. My work there — scheduler-managed KV prefix reuse and eliminating redundant KV re-ingestion — reduced 8K first-propose latency by 31× (3.47 s to 112 ms), end-to-end latency by 2.1× (64.0 to 30.8 ms per token), and steady-state KV ingest by 50%. I also extended the paged KV-cache infrastructure with configurable memory usage reporting for long-context inference.

## Experience highlights

I completed a software development engineer internship at Amazon Music in Berlin (January–July 2026), where I built a full-stack embedding search platform over 50 million embeddings with PCA/UMAP visualization and sub-5 ms K-Nearest-Neighbours queries, designed a two-stage batch indexing pipeline (weekly Parquet hydration to S3, then AWS ECS ingestion into OpenSearch), and cut per-session data transfer by ~20× with a Parquet storage layer. Before that, from March 2024 to December 2025, I led firmware and hardware development for the Zellia Hall Effect keyboard project at KBDfans as a partner and technical lead: a distributed embedded system across five AT32 MCUs designed in KiCad 8.0, achieving under 0.28 ms input latency at a 106 kHz ADC scan rate with a custom 7.5 Mbps UART protocol, offloading ADC normalization and calibration to slave MCUs to cut master CPU load by 90%, and building a cross-platform configuration tool in SvelteKit and TypeScript with 8+ configurable profiles.

## Education

I hold a Bachelor's of Science in Computer Science from the University of Catania, Italy (Sep 2021 – Dec 2026, expected), with coursework in embedded systems, algorithms and data structures, and linear algebra. I spent a semester as an Erasmus+ exchange student at Brandenburg Technical University in Cottbus, Germany (February–September 2024), studying applied linear algebra for AI, calculus, and software security.

## Skills

Languages: C, C++, Rust, Python, TypeScript, Java, SQL. ML systems: vLLM, MLX with custom Metal kernels, PyTorch, Metal/MPS backends, speculative decoding, quantization, KV-cache optimization, embeddings, recommender systems, DQN. LLM tooling: MCP, multi-provider LLM APIs, AI-SDK, Claude Code. Systems and data: Linux, Docker, AWS, REST APIs, Kafka, PySpark, OpenSearch, Parquet, Pandas, NumPy. Embedded and web: ARM Cortex-M, KiCad, USB/WebUSB, FastAPI, Node.js, SvelteKit, React.
