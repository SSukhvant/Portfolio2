import { ChatMessage } from '../types';

export interface AIResponsePayload {
  reply: string;
  sources?: string[];
  source?: string;
}

/**
 * The AI panel intentionally uses a terminal-style text renderer rather than
 * a full Markdown renderer. Normalize model Markdown here so recruiters never
 * see raw **bold**, ## headings, or other Markdown syntax in the UI.
 */
function normalizeAIResponse(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/^```[^\n]*\n?/, '').replace(/```$/, '').trim())
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '• ')
    .replace(/^\s*\d+\.\s+/gm, (match) => match.trim() + ' ')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export async function querySukhvantAI(
  message: string,
  conversationHistory: ChatMessage[] = []
): Promise<AIResponsePayload> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationHistory: conversationHistory.map(m => ({
          role: m.role,
          content: m.content
        }))
      }),
    });

    if (!res.ok) {
      throw new Error(`Server responded with ${res.status}`);
    }

    const data = await res.json();
    return {
      reply: normalizeAIResponse(data.reply || "No response received."),
      sources: data.sources || extractSourcesFromText(data.reply || ""),
      source: data.source || "gemini-3.7-flash"
    };
  } catch (err) {
    console.warn("API /api/chat error, switching to verified local knowledge engine:", err);
    return getLocalKnowledgeAnswer(message);
  }
}

function extractSourcesFromText(text: string): string[] {
  const sources: string[] = [];
  if (text.includes("AI") || text.includes("MCP") || text.includes("Agent")) {
    sources.push("AI Engineering", "AI-Powered SaaS Platform");
  }
  if (text.includes("Brownfleet")) {
    sources.push("Brownfleet Experience");
  }
  if (text.includes("Invoice")) {
    sources.push("Invoice Builder SaaS");
  }
  if (text.includes("CareerLooms")) {
    sources.push("CareerLooms");
  }
  if (text.includes("Skill") || text.includes("React") || text.includes("Next.js") || text.includes("PostgreSQL")) {
    sources.push("Technical Skills");
  }
  return Array.from(new Set(sources));
}

function getLocalKnowledgeAnswer(message: string): AIResponsePayload {
  const lower = message.toLowerCase();

  if (lower.includes("ai") || lower.includes("mcp") || lower.includes("agent") || lower.includes("llm")) {
    return {
      reply: normalizeAIResponse(`Sukhvant builds software where AI is an active product component rather than a standalone chatbot.\n\n**Core AI Capabilities:**\n- **Model Context Protocol (MCP)**: Connecting LLMs to external systems and secure database tools.\n- **AI Agents**: Tool calling, multi-step execution, and structured schema guarantees.\n- **Context-Aware Workflows**: Designing background automations and live generation flows.\n\nHe has integrated these paradigms into production at **Brownfleet** and across his **AI-Powered SaaS Platform**.`),
      sources: ["AI Engineering", "AI-Powered SaaS Platform", "Brownfleet Experience"],
      source: "verified-knowledge-engine"
    };
  }

  if (lower.includes("project") || lower.includes("work") || lower.includes("portfolio") || lower.includes("built")) {
    return {
      reply: normalizeAIResponse(`Sukhvant has engineered several full-stack production projects:\n\n1. **AI-Powered SaaS Platform** — Next.js, TypeScript, Node.js, PostgreSQL, AI Agents, and MCP.\n2. **Invoice Builder SaaS** — Next.js, TypeScript, Supabase, PostgreSQL, Stripe payments, real-time analytics.\n3. **CareerLooms** — Fast job discovery portal with Next.js, Firebase, and SEO optimization.\n4. **Client Platforms** — Custom commercial platforms across Travel, NGO, E-commerce, and Marketing.\n\nEach project includes architectural breakdowns and live demonstrations.`),
      sources: ["Projects", "Invoice Builder SaaS", "AI-Powered SaaS Platform", "CareerLooms"],
      source: "verified-knowledge-engine"
    };
  }

  if (lower.includes("experience") || lower.includes("brownfleet") || lower.includes("oscarblack") || lower.includes("history")) {
    return {
      reply: normalizeAIResponse(`Sukhvant's professional experience highlights:\n\n- **Brownfleet (Full Stack Developer)**: Developed AI-powered SaaS platforms, Next.js applications, Node.js REST services, and PostgreSQL databases.\n- **Freelance / Self-employed (Full Stack Developer)**: Delivered tailored commercial systems for business, travel, NGO, and e-commerce clients.\n- **OSCARBLACK (Front-End Developer Intern)**: Built responsive web interfaces, modern HTML/CSS styling architectures, and performance optimizations.`),
      sources: ["Experience", "Brownfleet Experience", "OSCARBLACK Internship"],
      source: "verified-knowledge-engine"
    };
  }

  if (lower.includes("skill") || lower.includes("stack") || lower.includes("tech") || lower.includes("next") || lower.includes("typescript")) {
    return {
      reply: normalizeAIResponse(`Sukhvant's core engineering stack comprises:\n\n- **Frontend**: React, Next.js, TypeScript, JavaScript, Tailwind CSS\n- **Backend**: Node.js, Express.js, REST APIs\n- **Databases**: PostgreSQL, Supabase, MongoDB, MySQL\n- **AI & Tools**: LLM APIs, AI Agents, MCP, Git, Linux / Bash\n\nAll proficiencies are backed by real production codebases.`),
      sources: ["Technical Skills", "Projects", "AI Engineering"],
      source: "verified-knowledge-engine"
    };
  }

  if (lower.includes("hire") || lower.includes("why") || lower.includes("contact") || lower.includes("opportunity")) {
    return {
      reply: normalizeAIResponse(`Sukhvant is an engineering-first builder who combines robust TypeScript full-stack craftsmanship (Next.js + Node.js + PostgreSQL) with modern AI agent architecture.\n\nHe is currently open to full-time and contract opportunities. You can reach him directly at **sukhvantsingh2@gmail.com** or via the contact form on this workstation.`),
      sources: ["Contact", "About", "Experience"],
      source: "verified-knowledge-engine"
    };
  }

  return {
    reply: normalizeAIResponse(`I am Sukhvant AI, verified assistant for Sukhvant Singh (Full Stack Developer & AI Engineer).\n\nFeel free to ask about his **Experience at Brownfleet**, **Invoice Builder SaaS**, **AI Agent & MCP work**, **Technical Skills**, or **CareerLooms** project!`),
    sources: ["About", "Projects", "Skills", "Experience"],
    source: "verified-knowledge-engine"
  };
}
