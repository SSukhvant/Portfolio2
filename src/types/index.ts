export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  category: 'Full Stack' | 'AI Engineering' | 'Frontend Architecture' | 'Client Platforms';
  featured: boolean;
  stack: string[];
  description: string;
  features: string[];
  architectureSummary: string;
  githubUrl?: string;
  liveUrl?: string;
  caseStudy: {
    overview: string;
    problem: string;
    approach: string;
    architecture: string;
    keyFeatures: string[];
    technology: { category: string; items: string[] }[];
    challenges: string;
    outcome: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Internship';
  commitHash: string;
  summary: string;
  focus: string[];
  highlights: string[];
}

export interface SkillCluster {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'ai' | 'tools';
  skills: string[];
  projectAssociations: { [skillName: string]: string[] }; // skill -> project IDs
}

export interface CurrentlyBuildingItem {
  id: string;
  title: string;
  status: 'In Progress' | 'Active Testing' | 'Alpha';
  progress: number;
  description: string;
  tech: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  sources?: string[];
  isStreaming?: boolean;
}

export type ThemeMode = 'dark' | 'light';
