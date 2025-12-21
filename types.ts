export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
}

export enum SectionId {
  Home = 'home',
  About = 'about',
  School = 'school',
  Work = 'work',
  Projects = 'projects'
}

export interface ExperienceItem {
  position: string;
  organization: string;
  location: string;
  period: string;
  description: string;
}