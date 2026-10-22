export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  tag?: string;
  summary: string;
  description: string;
  contribution: string[];
  techStack: string[];
  image?: string;
  previewLabel?: string;
  liveUrl?: string;
  repoUrl?: string;
  skillUrl?: string;
  channelUrl?: string;
  isLarge?: boolean;
  statusNote?: string;
  hasWorkingPreview: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  type: string;
  description: string;
  details: string[];
  tools: string[];
  link?: string;
  active?: boolean;
}

export interface EarlierExperienceItem {
  platform: string;
  role: string;
  period: string;
  summary: string;
}

export interface CreatorChannel {
  id: string;
  name: string;
  category: string;
  url: string;
  tagline: string;
  handle: string;
}

export interface SimulationItem {
  id: string;
  title: string;
  issuer: string;
  type: string;
  description: string;
}

export interface ToolkitCategory {
  category: string;
  items: {
    name: string;
    level?: string;
    icon: string;
  }[];
}
