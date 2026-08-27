
import { ExperienceItem, GithubRepo } from './types';

export const GITHUB_USERNAME = 'mhdimo';
export const PROFILE_IMAGE_URL = 'https://github.com/mhdimo.png';

export const CONTACT_INFO = {
  email: 'mihal@kakao.com',
  location: 'Berlin, Germany',
};

// Featured repositories (full name: owner/repo), in display order.
export const FEATURED_REPOS = [
  'mhdimo/ai-sdk-cpp',
  'mhdimo/deepseek-code',
  'vllm-project/vllm-metal',
  'mhdimo/Zellia80-HE',
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
    stargazers_count: 31,
    language: 'C++',
    updated_at: '',
  },
  {
    id: 1,
    name: 'deepseek-code',
    description: 'Terminal AI coding agent in TypeScript — multi-step agentic loop, real-time streaming, tool execution, and MCP extensibility with a provider abstraction layer.',
    html_url: `https://github.com/${GITHUB_USERNAME}/deepseek-code`,
    stargazers_count: 5,
    language: 'TypeScript',
    updated_at: '',
  },
  {
    id: 2,
    name: 'vllm-metal',
    description: 'Hardware plugin for vLLM on Apple Silicon — speculative decoding with scheduler-managed KV prefix reuse: 31× faster 8K first-propose latency, 2.1× end-to-end, 50% less KV ingest.',
    html_url: 'https://github.com/vllm-project/vllm-metal',
    stargazers_count: 1631,
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
    position: "Bachelor of Science in Computer Science",
    organization: "University of Catania",
    location: "Catania, Italy",
    period: "2021 - 2026",
    description: "Relevant Coursework: Embedded systems, Algorithm \& Data Structures, Linear Algebra."
  },
  {
    position: "Bachelor of Science in Computer Science — Erasmus+ Exchange",
    organization: "Brandenburg Technical University",
    location: "Cottbus, Germany",
    period: "Feb 2024 - Sep 2024",
    description: "Relevant Coursework: Applied Linear Algebra for AI, Calculus, Software Security."
  }
];

export const WORK_DATA: ExperienceItem[] = [
  {
    position: "Open Source Contributor",
    organization: "vLLM Project",
    location: "Open Source",
    period: "Jul 2026 - Present",
    description: "Contributing DSpark/EAGLE-style speculative decoding to the vLLM Apple Silicon Metal backend.\nOptimized speculative decoding with scheduler-managed KV prefix reuse, eliminating redundant KV re-ingestion: 31× faster 8K first-propose latency (3.47s → 112ms), 2.1× end-to-end latency (64.0 → 30.8 ms/token), and 50% less steady-state KV ingest.\nExtended the paged KV-cache infrastructure with configurable memory usage reporting for long-context inference workloads.",
    logo: 'https://avatars.githubusercontent.com/u/136984999?v=4',
    logoTile: 'white',
  },
  {
    position: "Software Development Engineer Intern",
    organization: "Amazon",
    location: "Berlin, Germany",
    period: "Jan 2026 - Jul 2026",
    description: "Engineered a full-stack embedding search platform over 50M embeddings with PCA/UMAP visualization and sub-5ms K-Nearest-Neighbours queries, enabling faster Music recommender experimentation.\nDesigned a two-stage batch indexing pipeline: a weekly job performs metadata hydration and writes partitioned Parquet files to S3, followed by an AWS ECS ingestion task that indexes entities into OpenSearch.\nImplemented a Parquet-based storage layer with entity-level partitioning, reducing per-session data transfer ~20×.\nBuilt a FastAPI backend on AWS ECS unifying search, ingestion status, and visualization workflows, with CloudWatch monitoring for pipeline reliability.",
    logo: '/images/amazon-logo.jpg',
    logoTile: 'white',
  },
  {
    position: "Firmware Lead & Embedded Software Engineer",
    organization: "KBDfans (Partner)",
    location: "Changzhou, China",
    period: "Mar 2024 - Dec 2025",
    description: "Led firmware and hardware development for the Zellia Hall Effect project (team of five C/C++ engineers): a distributed embedded system across five AT32 MCUs with enhanced modularity and multi-layout keyboard, designed in KiCad 8.0.\nAchieved <0.28 ms input latency at a 106 kHz scan rate by decoupling signal acquisition and processing, with a custom 7.5 Mbps UART protocol for multi-MCU synchronization.\nOffloaded ADC normalization and calibration to slave MCUs, cutting master CPU load by 90%.\nDeveloped a cross-platform configuration tool (SvelteKit, TypeScript) for device tuning, firmware updates, and profile management with 8+ configurable profiles.",
    logo: '/images/kbdfans-logo.png',
    logoTile: 'black',
  }
];

export const ABOUT_ME_TEXT = 'I work on LLM inference systems and embedded firmware — currently contributing to the vLLM project, previously at Amazon and KBDfans.';
