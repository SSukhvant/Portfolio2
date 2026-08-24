import { ChatMessage } from '../types';

export interface AIResponsePayload {
  reply: string;
  sources?: string[];
  source?: string;
}

function normalizeAIResponse(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/^```[^\n]*\n?/, '').replace(/```$/, '').trim())
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '• ')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function getLocalKnowledgeAnswer(message: string, conversationHistory: ChatMessage[] = []): AIResponsePayload {
  const lower = message.toLowerCase().trim();
  const previous = conversationHistory.at(-1)?.content?.toLowerCase() || '';

  // Greetings should never fall through to a generic career answer.
  if (/^(hi|hello|hey|hii|good morning|good afternoon|good evening|how are you)[!,.\s]*$/i.test(lower)) {
    return {
      reply: "Hi! I'm Sukhvant AI. I can help you quickly review Sukhvant's professional experience, employers, projects, technical skills, AI/MCP work, or resume.",
      sources: ["About", "Experience", "Projects", "Skills", "Resume"],
      source: "verified-knowledge-engine"
    };
  }

  // Resume intent.
  if (lower.includes('resume') || lower.includes('cv') || lower.includes('curriculum vitae')) {
    return {
      reply: "Sukhvant's resume covers his experience as a Full Stack Developer and AI Engineer, including Brownfleet, freelance/self-employed work, and his OSCARBLACK frontend internship. His core stack includes React, Next.js, TypeScript, Node.js, PostgreSQL, AI Agents, and MCP.\n\nYou can open the Resume section on this portfolio to review the complete resume.",
      sources: ["Resume", "Experience", "Skills"],
      source: "verified-knowledge-engine"
    };
  }

  // Professional experience / employers intent.
  if (
    lower.includes('professional experience') ||
    lower.includes('work experience') ||
    lower.includes('where did he work') ||
    lower.includes('where did he worked') ||
    lower.includes('where has he worked') ||
    lower.includes('where does he work') ||
    lower.includes('employer') ||
    lower.includes('employers') ||
    lower === 'experience' ||
    lower.includes('worked at') ||
    lower.includes('worked for')
  ) {
    return {
      reply: "Yes. Sukhvant has professional experience across three recorded engagements:\n\n• Brownfleet — Full Stack Developer, Full Time / 2 Years. He worked on AI-powered SaaS solutions, full-stack applications, backend systems, APIs, PostgreSQL, and MCP integrations.\n\n• Freelance / Self-employed — Full Stack Developer. He built end-to-end web applications and digital platforms for business, travel, non-profit, e-commerce, and marketing clients.\n\n• OSCARBLACK — Front-End Developer Intern. He focused on responsive interfaces, HTML/CSS, JavaScript, frontend optimization, and accessibility.",
      sources: ["Experience", "Brownfleet Experience", "OSCARBLACK Internship"],
      source: "verified-knowledge-engine"
    };
  }

  // Follow-up questions such as "what did he do there?" after Brownfleet.
  if ((lower.includes('there') || lower.includes('he did') || lower.includes('his work')) && previous.includes('brownfleet')) {
    return {
      reply: "At Brownfleet, Sukhvant worked as a Full Stack Developer for the recorded 2-year full-time period. His work included:\n\n• Architecting full-stack SaaS features with Next.js and TypeScript\n• Integrating AI workflows, LLM endpoints, and Model Context Protocol (MCP) tooling\n• Designing and optimizing PostgreSQL models and REST APIs\n• Contributing to product engineering, performance profiling, and continuous deployment workflows",
      sources: ["Brownfleet Experience", "AI Engineering"],
      source: "verified-knowledge-engine"
    };
  }

  if (lower.includes('brownfleet')) {
    return {
      reply: "Brownfleet was a company where Sukhvant worked as a Full Stack Developer for the recorded 2-year full-time period. His work focused on scalable AI-powered SaaS solutions and full-stack web applications.\n\nHe worked with Next.js, TypeScript, Node.js, PostgreSQL, APIs, AI workflows, LLM endpoints, and Model Context Protocol (MCP). His responsibilities included building SaaS features, integrating AI and MCP tooling into production services, designing PostgreSQL models and REST APIs, and contributing to product engineering and performance work.",
      sources: ["Brownfleet Experience", "AI Engineering"],
      source: "verified-knowledge-engine"
    };
  }

  if (lower.includes('project') || lower.includes('built') || lower.includes('portfolio')) {
    return {
      reply: "Sukhvant's featured work includes the AI-Powered SaaS Platform, Invoice Builder SaaS, CareerLooms, and commercial client platforms. The projects demonstrate his work across React/Next.js, TypeScript, Node.js, PostgreSQL, Firebase/Supabase, Stripe, AI Agents, and MCP.",
      sources: ["Projects", "Invoice Builder SaaS", "AI-Powered SaaS Platform", "CareerLooms"],
      source: "verified-knowledge-engine"
    };
  }

  if (lower.includes('skill') || lower.includes('stack') || lower.includes('technology') || lower.includes('tech')) {
    return {
      reply: "Sukhvant's core stack covers React, Next.js, TypeScript, JavaScript, Tailwind CSS, Node.js, Express.js, REST APIs, PostgreSQL, MongoDB, Supabase, MySQL, LLM APIs, AI Agents, MCP, Docker, Git, and Linux/Bash. These are represented across his projects and professional experience.",
      sources: ["Technical Skills", "Projects", "AI Engineering"],
      source: "verified-knowledge-engine"
    };
  }

  if (lower.includes('ai') || lower.includes('mcp') || lower.includes('agent') || lower.includes('llm')) {
    return {
      reply: "Sukhvant has worked with AI as part of production software rather than only as a chatbot. His recorded AI work includes LLM APIs, AI agents, AI-powered SaaS workflows, structured tool execution, and Model Context Protocol (MCP) integrations, particularly in his Brownfleet work and AI-powered SaaS projects.",
      sources: ["AI Engineering", "AI-Powered SaaS Platform", "Brownfleet Experience"],
      source: "verified-knowledge-engine"
    };
  }

  if (lower.includes('hire') || lower.includes('why') || lower.includes('contact') || lower.includes('opportunity')) {
    return {
      reply: "Sukhvant is a Full Stack Developer & AI Engineer focused on modern web applications, SaaS products, and AI-powered experiences. His strengths include TypeScript full-stack development with Next.js and Node.js, PostgreSQL-backed systems, and AI agent/MCP integrations. He is available for opportunities.",
      sources: ["About", "Experience", "Contact"],
      source: "verified-knowledge-engine"
    };
  }

  return {
    reply: "I'm Sukhvant AI, the portfolio assistant for Sukhvant Singh. I can answer questions about his professional experience, employers, projects, technical skills, AI/MCP work, and resume. What would you like to know?",
    sources: ["About", "Experience", "Projects", "Skills", "Resume"],
    source: "verified-knowledge-engine"
  };
}

export async function querySukhvantAI(
  message: string,
  conversationHistory: ChatMessage[] = []
): Promise<AIResponsePayload> {
  const lower = message.toLowerCase().trim();

  // Handle high-confidence recruiter intents locally so the portfolio gives
  // deterministic, verified answers instead of letting a model paraphrase
  // them into a generic fallback response.
  const deterministicIntent =
    /^(hi|hello|hey|hii|good morning|good afternoon|good evening|how are you)[!,.\s]*$/i.test(lower) ||
    lower.includes('resume') || lower.includes('cv') || lower.includes('curriculum vitae') ||
    lower.includes('professional experience') || lower.includes('work experience') ||
    lower.includes('where did he work') || lower.includes('where did he worked') ||
    lower.includes('where has he worked') || lower.includes('where does he work') ||
    lower.includes('employer') || lower.includes('employers') || lower === 'experience' ||
    lower.includes('worked at') || lower.includes('worked for') || lower.includes('brownfleet') ||
    ((lower.includes('there') || lower.includes('he did') || lower.includes('his work')) && conversationHistory.at(-1)?.content?.toLowerCase().includes('brownfleet'));

  if (deterministicIntent) {
    return getLocalKnowledgeAnswer(message, conversationHistory);
  }

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        conversationHistory: conversationHistory.map(m => ({ role: m.role, content: m.content }))
      }),
    });

    if (!res.ok) throw new Error(`Server responded with ${res.status}`);

    const data = await res.json();
    return {
      reply: normalizeAIResponse(data.reply || "No response received."),
      sources: data.sources || extractSourcesFromText(data.reply || ""),
      source: data.source || "gemini-2.5-flash"
    };
  } catch (err) {
    console.warn("API /api/chat error, switching to verified local knowledge engine:", err);
    return getLocalKnowledgeAnswer(message, conversationHistory);
  }
}

function extractSourcesFromText(text: string): string[] {
  const sources: string[] = [];
  if (text.includes("AI") || text.includes("MCP") || text.includes("Agent")) sources.push("AI Engineering", "AI-Powered SaaS Platform");
  if (text.includes("Brownfleet")) sources.push("Brownfleet Experience");
  if (text.includes("Invoice")) sources.push("Invoice Builder SaaS");
  if (text.includes("CareerLooms")) sources.push("CareerLooms");
  if (text.includes("Skill") || text.includes("React") || text.includes("Next.js") || text.includes("PostgreSQL")) sources.push("Technical Skills");
  return Array.from(new Set(sources));
}
