import { CurrentlyBuildingItem } from '../types';

export const skillsRecord = {
  frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS"
  ],
  backend: [
    "Node.js",
    "Express.js",
    "REST APIs"
  ],
  database: [
    "PostgreSQL",
    "MongoDB",
    "Supabase",
    "MySQL"
  ],
  ai: [
    "LLM APIs",
    "AI Agents",
    "MCP",
    "AI Integration"
  ],
  tools: [
    "Git",
    "Linux / Bash",
    "Docker",
    "Vite",
    "Postman"
  ]
};

// Skill to associated project mapping for interactive cross-referencing
export const skillToProjectsMap: Record<string, { id: string; title: string }[]> = {
  "React": [
    { id: "ai-saas-platform", title: "AI-Powered SaaS Platform" },
    { id: "invoice-builder-saas", title: "Invoice Builder SaaS" },
    { id: "careerlooms", title: "CareerLooms" },
    { id: "freelance-client-systems", title: "Client Platforms & Commercial Systems" }
  ],
  "Next.js": [
    { id: "invoice-builder-saas", title: "Invoice Builder SaaS" },
    { id: "ai-saas-platform", title: "AI-Powered SaaS Platform" },
    { id: "careerlooms", title: "CareerLooms" }
  ],
  "TypeScript": [
    { id: "invoice-builder-saas", title: "Invoice Builder SaaS" },
    { id: "ai-saas-platform", title: "AI-Powered SaaS Platform" },
    { id: "careerlooms", title: "CareerLooms" },
    { id: "freelance-client-systems", title: "Client Platforms & Commercial Systems" }
  ],
  "JavaScript": [
    { id: "freelance-client-systems", title: "Client Platforms & Commercial Systems" },
    { id: "careerlooms", title: "CareerLooms" }
  ],
  "Tailwind CSS": [
    { id: "invoice-builder-saas", title: "Invoice Builder SaaS" },
    { id: "ai-saas-platform", title: "AI-Powered SaaS Platform" },
    { id: "careerlooms", title: "CareerLooms" }
  ],
  "Node.js": [
    { id: "ai-saas-platform", title: "AI-Powered SaaS Platform" },
    { id: "freelance-client-systems", title: "Client Platforms & Commercial Systems" }
  ],
  "Express.js": [
    { id: "ai-saas-platform", title: "AI-Powered SaaS Platform" },
    { id: "freelance-client-systems", title: "Client Platforms & Commercial Systems" }
  ],
  "REST APIs": [
    { id: "invoice-builder-saas", title: "Invoice Builder SaaS" },
    { id: "ai-saas-platform", title: "AI-Powered SaaS Platform" }
  ],
  "PostgreSQL": [
    { id: "invoice-builder-saas", title: "Invoice Builder SaaS" },
    { id: "ai-saas-platform", title: "AI-Powered SaaS Platform" }
  ],
  "Supabase": [
    { id: "invoice-builder-saas", title: "Invoice Builder SaaS" }
  ],
  "MongoDB": [
    { id: "freelance-client-systems", title: "Client Platforms & Commercial Systems" }
  ],
  "MySQL": [
    { id: "freelance-client-systems", title: "Client Platforms & Commercial Systems" }
  ],
  "LLM APIs": [
    { id: "ai-saas-platform", title: "AI-Powered SaaS Platform" }
  ],
  "AI Agents": [
    { id: "ai-saas-platform", title: "AI-Powered SaaS Platform" }
  ],
  "MCP": [
    { id: "ai-saas-platform", title: "AI-Powered SaaS Platform" }
  ],
  "AI Integration": [
    { id: "ai-saas-platform", title: "AI-Powered SaaS Platform" }
  ]
};

export const currentlyBuildingList: CurrentlyBuildingItem[] = [
  {
    id: "invoice-saas-v2",
    title: "Invoice SaaS Architecture & Multi-currency Engine",
    status: "In Progress",
    progress: 88,
    description: "Expanding automated cross-border currency tax rates, real-time invoice ledger sync, and automated recurring client reminders.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe API"]
  },
  {
    id: "ai-mcp-experiments",
    title: "Autonomous MCP Tool Orchestrator",
    status: "Active Testing",
    progress: 74,
    description: "Benchmarking bi-directional context streaming and tool-calling execution loops with local and cloud Model Context Protocol servers.",
    tech: ["AI Agents", "MCP", "Node.js", "LLM APIs"]
  },
  {
    id: "dev-workstation-tooling",
    title: "Developer Workstation & CLI Productivity Suite",
    status: "Alpha",
    progress: 92,
    description: "High-performance browser-based terminal primitives and contextual command palette accelerators for developer portfolios and dashboards.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Motion"]
  }
];

export const socialsData = {
  email: "sukhvantsingh581998@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  location: "Global / Remote",
  resumePath: "/resume.pdf"
};
