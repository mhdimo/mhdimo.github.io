
import { ExperienceItem, GithubRepo } from './types';

export const GITHUB_USERNAME = 'mhdimo';
export const PROFILE_IMAGE_URL = 'https://github.com/mhdimo.png';

export const CONTACT_INFO = {
  email: 'mihal@kakao.com',
  location: 'Italy',
};

// Featured repositories (full name: owner/repo), in display order.
export const FEATURED_REPOS = [
  'mhdimo/ai-sdk-cpp',
  'mhdimo/deepseek-code',
  'vllm-project/vllm-metal',
  'mhdimo/Zellia80-HE',
  'mhdimo/qwen38-h100-lab',
  'mhdimo/inference-engine',
];

// Static fallback data so project cards exist in the server-rendered HTML
// (and survive GitHub API rate limits). The live data replaces this once the
// page loads. Descriptions are drawn from the project's public materials.
export const REPO_FALLBACKS: GithubRepo[] = [
  {
    id: 0,
    name: 'ai-sdk-cpp',
    description: 'C++20 LLM orchestration framework using coroutines and Boost.Asio — high-concurrency agent workflows with a C ABI FFI for Python, Node.js, Rust, and Go.',
    html_url: `https://github.com/${GITHUB_USERNAME}/ai-sdk-cpp`,
    stargazers_count: 47,
    language: 'C++',
    updated_at: '',
  },
  {
    id: 1,
    name: 'deepseek-code',
    description: 'Terminal AI coding agent in TypeScript — multi-step agentic loop, real-time streaming, tool execution, and MCP extensibility with a provider abstraction layer.',
    html_url: `https://github.com/${GITHUB_USERNAME}/deepseek-code`,
    stargazers_count: 7,
    language: 'TypeScript',
    updated_at: '',
  },
  {
    id: 2,
    name: 'vllm-metal',
    description: 'Hardware plugin for vLLM on Apple Silicon — speculative decoding with scheduler-managed KV prefix reuse: 31× faster 8K first-propose latency, 2.1× end-to-end, 50% less KV ingest.',
    html_url: 'https://github.com/vllm-project/vllm-metal',
    stargazers_count: 1823,
    language: 'Python',
    updated_at: '',
  },
  {
    id: 3,
    name: 'Zellia80-HE',
    description: 'Firmware for the Zellia Hall Effect keyboard project at KBDfans — technical lead for firmware and hardware development, five AT32 MCUs with parallel ADCs at 106 kHz scan rate.',
    html_url: `https://github.com/${GITHUB_USERNAME}/Zellia80-HE`,
    stargazers_count: 24,
    language: 'C',
    updated_at: '',
  },
  {
    id: 4,
    name: 'qwen38-h100-lab',
    description: 'Single-H100 study of Qwen3.8-27B-FP8 inference — a byte-exact SM90 SiLU-FP8 CUDA kernel fused with gating and per-group E4M3 quantization, verified across 168 reference comparisons: 2.26× kernel speedup at the 16K-row shape, +5.90% prefill and +3.65% mixed throughput vs. tuned vLLM.',
    html_url: `https://github.com/${GITHUB_USERNAME}/qwen38-h100-lab`,
    stargazers_count: 0,
    language: 'Python',
    updated_at: '',
  },
  {
    id: 5,
    name: 'inference-engine',
    description: 'From-scratch C++20 LLM inference engine for Apple Silicon — tensor runtime, compute graphs with lifetime-based memory planning, GGUF loading, KV caching, and 13 custom Metal kernels (tiled and quantized GEMM, RoPE, GQA attention, RMSNorm, SwiGLU) for end-to-end Qwen2.5 and SmolLM2.',
    html_url: `https://github.com/${GITHUB_USERNAME}/inference-engine`,
    stargazers_count: 0,
    language: 'C++',
    updated_at: '',
  },
];

export const SOCIAL_LINKS = {
  github: `https://github.com/${GITHUB_USERNAME}`,
  x: 'https://x.com/mihaldimo',
  email: `mailto:${CONTACT_INFO.email}`,
  linkedin: 'https://linkedin.com/in/mihaldimo/'
};

export const SKILLS_DATA = [
  {
    category: "Languages",
    items: ["C", "C++", "Rust", "Python", "TypeScript", "Java", "SQL"]
  },
  {
    category: "ML Systems",
    items: ["vLLM", "MLX (custom Metal kernels)", "PyTorch", "Metal/MPS backends", "Speculative decoding", "Quantization", "KV-cache optimization", "Embeddings", "Recommender systems", "DQN"]
  },
  {
    category: "LLM Tooling",
    items: ["MCP", "Multi-provider LLM APIs", "AI-SDK", "Claude Code"]
  },
  {
    category: "Systems & Data",
    items: ["Linux", "Docker", "AWS", "REST APIs", "Kafka", "PySpark", "OpenSearch", "Parquet", "Pandas", "NumPy"]
  },
  {
    category: "Embedded & Web",
    items: ["ARM Cortex-M", "KiCad", "USB/WebUSB", "FastAPI", "Node.js", "SvelteKit", "React"]
  }
];

export const EDUCATION_DATA: ExperienceItem[] = [
  {
    position: "Bachelor's of Science in Computer Science",
    organization: "University of Catania",
    location: "Catania, Italy",
    period: "Sep 2021 - Jun 2027 (Expected)",
    description: "Coursework: Embedded systems, Algorithm \& Data Structures, Linear Algebra."
  },
  {
    position: "Bachelor's of Science in Computer Science — Erasmus+ Exchange",
    organization: "Brandenburg Technical University",
    location: "Cottbus, Germany",
    period: "Feb 2024 - Sep 2024",
    description: "Coursework: Applied Linear Algebra for AI, Calculus, Software Security."
  }
];

export const WORK_DATA: ExperienceItem[] = [
  {
    position: "Open Source Contributor",
    organization: "vLLM Project",
    location: "Open Source",
    period: "Jul 2026 - Present",
    description: "Contributed to 20+ merged PRs in the vLLM Metal backend, spanning speculative decoding, paged KV-cache management, model compatibility, sampling, and memory management for Apple Silicon inference.\nImplemented DSpark speculative decoding for the vLLM Metal backend, including Qwen3 model integration, scheduler-owned KV-cache management, paged execution, Markov drafting, prefix caching, validation, and serving benchmarks.\nOptimized speculative decoding by eliminating redundant KV re-ingestion and chunking cold draft-KV ingestion: 31× faster 8K first-propose latency (3.47s → 112ms), 2.1× end-to-end latency (64.0 → 30.8 ms/token), 50% less steady-state KV ingestion, and 48% lower DSpark draft-weight memory (4.42 → 2.29 GiB).",
    logo: 'https://avatars.githubusercontent.com/u/136984999?v=4',
    logoTile: 'white',
  },
  {
    position: "Software Development Engineer Intern",
    organization: "Amazon",
    location: "Berlin, Germany",
    period: "Jan 2026 - Jul 2026",
    description: "Engineered a full-stack embedding search and visualization platform over 50M embeddings, with PCA/UMAP visualization and sub-5ms K-Nearest-Neighbours queries, accelerating Music recommender experimentation.\nDesigned a batch ML data pipeline for embedding metadata hydration and model indexing across S3, ECS, and OpenSearch, enabling automated weekly model updates.\nBuilt evaluation workflows measuring marketplace performance with Recall, NDCG, Precision, and triplet accuracy, alongside a FastAPI backend and CloudWatch monitoring.",
    logo: '/images/amazon-logo.jpg',
    logoTile: 'white',
  },
  {
    position: "Firmware Lead & Embedded Software Engineer",
    organization: "KBDfans (Partner)",
    location: "Changzhou, Jiangsu, China",
    period: "Mar 2024 - Dec 2025",
    description: "Led firmware and hardware development for the Zellia Hall Effect project (team of five C/C++ engineers): a distributed embedded system across five AT32 MCUs with enhanced modularity and multi-layout keyboard support, designed in KiCad 8.0.\nAchieved <0.28 ms input latency at a 106 kHz scan rate by decoupling signal acquisition and processing, with a custom 7.5 Mbps UART protocol for high-throughput multi-MCU synchronization.\nOffloaded ADC normalization and calibration to slave MCUs, reducing master CPU load by 90%.",
    logo: '/images/kbdfans-logo.png',
    logoTile: 'black',
  }
];

export const ABOUT_ME_TEXT = 'I work on LLM inference systems and embedded firmware — currently contributing to the vLLM project, previously at Amazon and KBDfans.';
