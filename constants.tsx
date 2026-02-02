
import { ExperienceItem } from './types';

export const GITHUB_USERNAME = 'mhdimo';
export const PROFILE_IMAGE_URL = 'https://github.com/mhdimo.png';

// Add the repository names you want to feature (in order)
export const FEATURED_REPOS = [
  'Zellia80-HE',
  'Zellia-Control',
  'Area-Analyzer',
  'hypermart',
  
  // Add more repo names here
]; 

export const SOCIAL_LINKS = {
  github: `https://github.com/${GITHUB_USERNAME}`,
  x: 'https://x.com/mihaldimo',
  email: 'mailto:mihal@kakao.com',
  linkedin: 'https://linkedin.com/in/mihaldimo/'
};

export const SKILLS_DATA = [
  {
    category: "Languages",
    items: ["C", "C++", "Rust", "Python", "TypeScript/JavaScript", "Java", "HTML/CSS"]
  },
  {
    category: "Embedded & Hardware",
    items: ["ARM Cortex-M", "CherryUSB", "QMK keyboard firmware", "KiCad (PCB design)"]
  },
  {
    category: "Web / Full-Stack",
    items: ["SvelteKit", "Tauri (Rust)", "Node.js (Bun/Yarn/Npm/Pnpm)", "Tailwind CSS (HTML/CSS)"]
  },
  {
    category: "Data & DevOps",
    items: ["OpenCV", "NumPy", "Matplotlib", "Apache Spark", "Kafka", "Elasticsearch", "Kibana", "Docker"]
  },
  {
    category: "Tools",
    items: ["Git", "VSCode", "Bash", "LaTeX", "Linux"]
  }
];

export const EDUCATION_DATA: ExperienceItem[] = [
 // {
 //   title: "MSc in Artificial Intelligence",
 //   organization: "(Hopefully) Technical University of Berlin",
 //   period: "2026 - 2028",
 //   description: ""
 // },
  {
    position: "Bsc in Computer Science",
    organization: "University of Catania",
    location: "Catania, Italy",
    period: "2021 - 2026",
    description: "Relevant Coursework: Embedded systems, Algorithm \& Data Structures, Operating Systems."
  },
  {
    position: "Erasmus exchange in Computer Science",
    organization: "Brandenburg Technical University",
    location: "Cottbus, Germany",
    period: "Feb 2024 - Sep 2024",
    description: "Relevant Coursework: Mathematical methods for Artificial Intelligence, Calculus, Software Security."
  }
];

export const WORK_DATA: ExperienceItem[] = [
  {
    position: "Software Development Engineer(Machine Learning) Intern",
    organization: "Amazon",
    location: "Berlin, Germany",
    period: "Jan 2026 - Jul 2026",
    description: "Currently interning in Amazon music."
  },
  {
    position: "Embedded Software Engineer",
    organization: "KBDfans (Partner)",
    location: "Changzhou, Jiangsu, China",
    period: "Mar 2024 - Present",
    description: "Technical Lead for firmware and hardware development of the Zellia Hall Effect project, leading a team of five C/C++ engineers and supporting more than four PCB layouts with enhanced modularity.\nStreamlined multi-layer PCB designs using KiCad 8.0, including custom Hall sensor footprints, optimized for high precision and flexible switch configurations.\nIncreased ADC scan rate from 1 kHz to 106 kHz (10500% improvement) by leveraging a multi-MCU architecture with UART communication and parallel ADCs, resulting in a 90% reduction in key press and release latency.\nDeveloped an open-source, cross-platform configuration tool using Tauri and SvelteKit, featuring real-time input tuning, 0.005 mm resolution, and support for more than eight programmable layers."
  }
];

export const ABOUT_ME_TEXT = `
  I am a Software Engineer and Embedded Software Developer focused in low-latency and High Speed Systems.
  I specialize in building high-performance & low latency systems where every clock cycle and byte of 
  memory matters.
`;
