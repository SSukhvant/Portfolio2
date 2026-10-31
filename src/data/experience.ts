import { ExperienceItem } from '../types';

// Experience timeline aligned with the current resume.
// Keep the displayed order chronological, newest role first.
export const experienceData: ExperienceItem[] = [
  {
    id: "brownfleet",
    company: "Brownfleet",
    role: "Full Stack Developer",
    period: "Jan 2024 – May 2026",
    location: "Remote",
    type: "Full-time",
    commitHash: "c8a41f9",
    summary: "Developed AI-powered web applications and full-stack product features using Next.js, React, TypeScript, Node.js, and Express.js.",
    focus: ["Next.js", "React", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "AI Agents", "RAG", "MCP"],
    highlights: [
      "Developed AI-powered web applications using Next.js, React, TypeScript, Node.js, and Express.js.",
      "Built AI agents and RAG-based applications and integrated AI capabilities into products and workflows.",
      "Developed reusable frontend components, backend APIs, database integrations, and Supabase-powered services.",
      "Explored Model Context Protocol (MCP), LLM integrations, and retrieval-augmented application patterns."
    ]
  },
  {
    id: "metabrs",
    company: "MetaBRS",
    role: "Full Stack Developer",
    period: "Jan 2023 – Sep 2023",
    location: "Noida, India",
    type: "Full-time",
    commitHash: "a6d29c1",
    summary: "Delivered web solutions for businesses and campaigns across tour and travel, NGOs, e-commerce, startups, and lead generation.",
    focus: ["React.js", "Next.js", "Tailwind CSS", "Material UI", "WordPress", "Shopify", "API Integrations"],
    highlights: [
      "Developed web solutions for tour and travel, NGOs, businesses, e-commerce, startups, and lead-generation campaigns.",
      "Built responsive applications using React.js, Next.js, Tailwind CSS, and Material UI.",
      "Developed and customized WordPress and Shopify websites and integrated APIs and application functionality.",
      "Contributed to the company website and digital products in a startup environment."
    ]
  },
  {
    id: "freelance",
    company: "Freelance",
    role: "Full Stack Developer",
    period: "Jan 2022 – Dec 2022",
    location: "Remote",
    type: "Contract",
    commitHash: "7b13e04",
    summary: "Delivered freelance web projects and client websites using modern frontend tools and popular content-management and commerce platforms.",
    focus: ["React.js", "WordPress", "Shopify", "HTML", "CSS", "Bootstrap", "Material UI", "SQL", "Firebase", "MongoDB", "NeDB"],
    highlights: [
      "Delivered freelance web projects using React.js, WordPress, Shopify, HTML, CSS, Bootstrap, and Material UI.",
      "Integrated APIs, implemented CRUD operations, and connected applications with SQL, Firebase, MongoDB, and NeDB."
    ]
  },
  {
    id: "oscarblack",
    company: "Oscarblack Private Limited",
    role: "UI/UX Developer Intern",
    period: "Apr 2021 – Oct 2021",
    location: "India",
    type: "Internship",
    commitHash: "3f901a2",
    summary: "Developed frontend interfaces for shipping and logistics websites and gained hands-on experience from UI development through deployment.",
    focus: ["HTML", "CSS", "Bootstrap", "SCSS", "React.js", "Responsive UI"],
    highlights: [
      "Developed frontend interfaces for shipping and logistics websites using HTML, CSS, Bootstrap, SCSS, and React.js.",
      "Worked with senior developers, learned React.js through projects, and gained experience from UI development through deployment.",
      "Delivered multi-page websites under short timelines, including a four-page website in approximately two days."
    ]
  }
];
