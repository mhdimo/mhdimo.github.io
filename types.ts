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
  /** Company brand mark URL, shown as a tile next to the organization. */
  logo?: string;
  /** Tile background the logo reads best on (its baked-in background or contrast). */
  logoTile?: 'white' | 'black';
  /** Two brand colors; the paragraph's line renders as this vertical gradient. */
  accent?: [string, string];
}