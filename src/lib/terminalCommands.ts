export interface TerminalOutputItem {
  type: 'command' | 'output' | 'error' | 'success' | 'action' | 'lines';
  text?: string;
  lines?: string[];
  actionLabel?: string;
  targetSection?: string;
  actionType?: 'scroll' | 'open-ai' | 'open-resume' | 'external-link';
  externalUrl?: string;
}

export interface TerminalHistoryEntry {
  id: string;
  command: string;
  outputs: TerminalOutputItem[];
}

export const executeTerminalCommand = (
  rawInput: string,
  callbacks?: {
    onOpenAI?: () => void;
    onOpenResume?: () => void;
    onScrollTo?: (sectionId: string) => void;
  }
): TerminalOutputItem[] => {
  const trimmed = rawInput.trim();
  const lower = trimmed.toLowerCase();

  if (!trimmed) {
    return [];
  }

  // Easter Eggs
  if (lower === 'npm run hire' || lower === 'sudo hire sukhvant' || lower === 'hire' || lower === 'hire sukhvant') {
    return [
      { type: 'success', text: '✓ Hiring workflow initialized.' },
      { type: 'output', text: 'Opening contact and direct recruitment pipeline...' },
      {
        type: 'action',
        actionLabel: '→ Open contact form',
        targetSection: 'contact',
        actionType: 'scroll'
      }
    ];
  }

  if (lower === 'help') {
    return [
      { type: 'output', text: 'Available commands in Sukhvant Linux Workstation:' },
      {
        type: 'lines',
        lines: [
          '  whoami       About Sukhvant Singh & current role',
          '  about        Detailed background and philosophy',
          '  stack        Core engineering tech stack',
          '  skills       Technical clusters & language proficiencies',
          '  projects     Featured production projects & case studies',
          '  experience   Professional career log & commits',
          '  ai           Open Sukhvant AI assistant',
          '  status       Current availability & operational status',
          '  github       Developer GitHub profile & activity',
          '  resume       View / download verified resume',
          '  contact      Initiate contact & email pipeline',
          '  clear        Clear terminal screen',
          '  npm run hire Direct recruitment easter egg'
        ]
      },
      {
        type: 'action',
        actionLabel: '→ Tip: Click any command above or type below',
        targetSection: 'skills',
        actionType: 'scroll'
      }
    ];
  }

  if (lower === 'whoami') {
    return [
      { type: 'output', text: 'Sukhvant Singh' },
      { type: 'output', text: 'Full Stack Developer & AI Engineer' },
      { type: 'output', text: 'Specializing in React, Next.js, TypeScript, Node.js, PostgreSQL, AI Agents & MCP.' },
      {
        type: 'action',
        actionLabel: '→ Read full About',
        targetSection: 'about',
        actionType: 'scroll'
      }
    ];
  }

  if (lower === 'about') {
    return [
      { type: 'output', text: 'README.md — Sukhvant Singh' },
      { type: 'output', text: 'Full Stack Developer focused on modern web applications, SaaS products, and AI-powered experiences.' },
      { type: 'output', text: '"I build applications where AI is part of the product — not just a chatbot added to the interface."' },
      {
        type: 'action',
        actionLabel: '→ Read full About',
        targetSection: 'about',
        actionType: 'scroll'
      }
    ];
  }

  if (lower === 'stack' || lower === 'skills') {
    return [
      { type: 'output', text: 'Frontend:' },
      { type: 'lines', lines: ['  React', '  Next.js', '  TypeScript', '  JavaScript', '  Tailwind CSS'] },
      { type: 'output', text: 'Backend:' },
      { type: 'lines', lines: ['  Node.js', '  Express.js', '  REST APIs'] },
      { type: 'output', text: 'Database:' },
      { type: 'lines', lines: ['  PostgreSQL', '  MongoDB', '  Supabase', '  MySQL'] },
      { type: 'output', text: 'AI & Tooling:' },
      { type: 'lines', lines: ['  LLM APIs', '  AI Agents', '  Model Context Protocol (MCP)', '  AI SaaS Integration'] },
      {
        type: 'action',
        actionLabel: '→ View full Skills section',
        targetSection: 'skills',
        actionType: 'scroll'
      }
    ];
  }

  if (lower === 'projects' || lower === 'work') {
    return [
      { type: 'output', text: 'Featured Engineering Projects:' },
      {
        type: 'lines',
        lines: [
          '  [1] AI-Powered SaaS Platform — Next.js, TypeScript, Node.js, PostgreSQL, AI Agents, MCP',
          '  [2] Invoice Builder SaaS     — Next.js, TypeScript, Supabase, PostgreSQL, Stripe',
          '  [3] CareerLooms              — Next.js, Firebase, TypeScript, Tailwind CSS',
          '  [4] Client Platforms         — Full-stack systems across E-commerce, NGO, Travel'
        ]
      },
      {
        type: 'action',
        actionLabel: '→ Explore all projects',
        targetSection: 'projects',
        actionType: 'scroll'
      }
    ];
  }

  if (lower === 'experience' || lower === 'history') {
    return [
      { type: 'output', text: '$ git log --career --oneline' },
      {
        type: 'lines',
        lines: [
          '  * c8a41f9 Brownfleet — Full Stack Developer (Next.js, TypeScript, AI SaaS, MCP)',
          '  * 7b13e04 Freelance / Self-employed — Web & Full Stack Developer (Client Platforms)',
          '  * 3f901a2 OSCARBLACK — Front-End Developer Intern (UI Architecture & Optimization)'
        ]
      },
      {
        type: 'action',
        actionLabel: '→ View full experience',
        targetSection: 'experience',
        actionType: 'scroll'
      }
    ];
  }

  if (lower === 'ai' || lower === 'assistant') {
    return [
      { type: 'success', text: '✓ Sukhvant AI service active (gemini-3.7-flash / verified knowledge)' },
      { type: 'output', text: 'Ready to answer questions about architecture, experience, and projects.' },
      {
        type: 'action',
        actionLabel: '→ Open Sukhvant AI Panel',
        actionType: 'open-ai'
      }
    ];
  }

  if (lower === 'status') {
    return [
      { type: 'success', text: '● Available for opportunities' },
      { type: 'output', text: 'Open to Full Stack Developer, AI Engineer, and Product Engineering roles.' },
      { type: 'output', text: 'Contact: sukhvantsingh581998@gmail.com' },
      {
        type: 'action',
        actionLabel: '→ Open contact',
        targetSection: 'contact',
        actionType: 'scroll'
      }
    ];
  }

  if (lower === 'github') {
    return [
      { type: 'output', text: 'GitHub: https://github.com' },
      { type: 'output', text: 'Active repositories, TypeScript tooling, and full-stack SaaS builds.' },
      {
        type: 'action',
        actionLabel: '→ Open GitHub Section',
        targetSection: 'github',
        actionType: 'scroll'
      }
    ];
  }

  if (lower === 'resume' || lower === 'cv') {
    return [
      { type: 'output', text: '$ cat /resume.pdf' },
      { type: 'output', text: 'Verified resume: Sukhvant Singh — Full Stack Developer & AI Engineer' },
      {
        type: 'action',
        actionLabel: '→ View / Download Resume',
        actionType: 'open-resume'
      }
    ];
  }

  if (lower === 'contact' || lower === 'email') {
    return [
      { type: 'output', text: '$ ./contact.sh' },
      { type: 'output', text: 'Email: sukhvantsingh581998@gmail.com' },
      { type: 'output', text: 'Status: Fast response within 24 hours.' },
      {
        type: 'action',
        actionLabel: '→ Open contact',
        targetSection: 'contact',
        actionType: 'scroll'
      }
    ];
  }

  if (lower === 'uname' || lower === 'uname -a') {
    return [
      { type: 'output', text: 'Linux workstation 6.6.0-sukhvant-dev x86_64 GNU/Linux' }
    ];
  }

  if (lower === 'date') {
    return [
      { type: 'output', text: new Date().toUTCString() }
    ];
  }

  if (lower === 'ls' || lower === 'dir') {
    return [
      { type: 'output', text: 'about.md  experience.md  skills.json  projects/  ai/  resume.pdf' }
    ];
  }

  if (lower === 'pwd') {
    return [
      { type: 'output', text: '/home/sukhvant/portfolio' }
    ];
  }

  return [
    { type: 'error', text: `bash: command not found: ${trimmed}` },
    { type: 'output', text: "Type 'help' to see the list of available commands." }
  ];
};
