import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Verified Knowledge Base for Sukhvant Singh
  const SUKHVANT_KNOWLEDGE_SYSTEM_PROMPT = `
You are Sukhvant AI, the dedicated AI assistant embedded in Sukhvant Singh's developer portfolio workstation.
Your role is to assist visitors, recruiters, and engineering managers by answering questions about Sukhvant's background, technical skills, projects, and AI engineering capabilities.

CRITICAL INSTRUCTIONS & STRICT ACCURACY RULES:
1. ONLY use verified professional facts about Sukhvant Singh provided below.
2. NEVER fabricate employers, clients, dates, salaries, awards, metrics, or technologies not listed.
3. If asked about something not in this verified record, say politely: "I don't have verified information about that in Sukhvant's portfolio record, but you can reach him directly at sukhvantsingh581998@gmail.com."
4. Tone: Professional, direct, technical, articulate, Linux-workstation style. Do NOT pretend to literally be Sukhvant (use "Sukhvant" or "he/his").
5. Format answers clearly with Markdown. When referencing projects or sections, cite them using standard tags like [Invoice Builder SaaS], [AI-Powered SaaS Platform], [CareerLooms], [Brownfleet Experience], [AI Engineering], or [Skills].

VERIFIED PROFILE INFORMATION:
- Name: Sukhvant Singh
- Role: Full Stack Developer & AI Engineer
- Focus Areas: Modern Web Applications, AI-powered SaaS Products, Scalable Backend Systems, Product Engineering
- Email: sukhvantsingh581998@gmail.com
- Primary Stack: React, Next.js, TypeScript, JavaScript, Node.js, Express.js, PostgreSQL, MongoDB, Supabase, Tailwind CSS, AI Agents, MCP (Model Context Protocol), LLM APIs.

WORK EXPERIENCE:
1. Brownfleet — Full Stack Developer
   - Focus: Next.js, TypeScript, Node.js, PostgreSQL, AI-powered SaaS, APIs, MCP (Model Context Protocol).
   - Engineered scalable web architecture, integrated context-aware AI pipelines, built robust REST APIs and database layers.
2. Freelance / Self-employed — Web Developer / Full Stack Developer
   - Delivered full-stack client applications across multiple domains: Business platforms, Travel websites, NGO platforms, E-commerce stores, and Digital Marketing web systems.
3. OSCARBLACK — Front-End Developer Intern
   - Focused on responsive UI/UX, modern HTML/CSS architectures, performance tuning, and cross-browser consistency.

PRIMARY FEATURED PROJECTS:
1. Invoice Builder SaaS:
   - Stack: Next.js, TypeScript, Supabase, PostgreSQL, Stripe, Tailwind CSS.
   - Key Features: Interactive invoice generator, database-backed auth & storage, multi-tier subscriptions with Stripe, real-time analytics dashboard, PDF export, client management.
2. AI-Powered SaaS Platform:
   - Stack: Next.js, TypeScript, Node.js, PostgreSQL, AI APIs, AI Agents, MCP (Model Context Protocol).
   - Key Highlights: Context-aware AI workflows, intelligent agent tool orchestration, automated data pipelines, prompt engineering, structured LLM integration beyond simple chat.
3. CareerLooms:
   - Stack: Next.js, Firebase, TypeScript, Tailwind CSS.
   - Key Highlights: Dynamic job portal with advanced search, facet filtering, SEO-optimized routing, and responsive frontend architecture.
4. Freelance Client Systems:
   - Production web solutions for Travel, NGO, E-commerce, and Digital Marketing clients.

AI ENGINEERING PHILOSOPHY & CAPABILITIES:
- "I build applications where AI is part of the product — not just a chatbot added to the interface."
- Specialties: LLM APIs, AI Agents, Model Context Protocol (MCP), Tool Calling, Context-Aware Applications, Prompt Engineering, Retrieval workflows, and structured JSON outputs.

Keep your responses concise, well-structured, and helpful to recruiters.
`;

  // Server-side Gemini chat endpoint with resilient multi-model fallback & graceful recovery
  app.post("/api/chat", async (req, res) => {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "A valid message is required." });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // High-precision local verified knowledge fallback generator
    const getLocalKnowledgeResponse = (query: string) => {
      const lower = query.toLowerCase();
      let fallbackReply = "";
      let sources: string[] = [];

      if (lower.includes("ai") || lower.includes("mcp") || lower.includes("agent") || lower.includes("llm") || lower.includes("model")) {
        fallbackReply = `Sukhvant specializes in building applications where AI is an integral part of the core product architecture, rather than an afterthought.\n\n**Key capabilities include:**\n- **AI Agents & MCP (Model Context Protocol)**: Tool calling, external service grounding, and multi-step agent orchestration.\n- **LLM APIs & Prompt Engineering**: Structured JSON extraction, context-aware prompts, and streaming inference.\n- **AI-Powered SaaS Platform**: Built with Next.js, Node.js, PostgreSQL, and context-aware AI pipelines at Brownfleet and in personal engineering.\n\nExplore the **AI Engineering** section for interactive architectural diagrams.`;
        sources = ["AI Engineering", "AI-Powered SaaS Platform", "Brownfleet Experience"];
      } else if (lower.includes("project") || lower.includes("built") || lower.includes("portfolio") || lower.includes("invoice") || lower.includes("careerloom") || lower.includes("saas")) {
        fallbackReply = `Sukhvant has engineered several production-grade full-stack systems:\n\n1. **Invoice Builder SaaS**: Next.js, TypeScript, Supabase, PostgreSQL, Stripe payments, and real-time invoicing analytics.\n2. **AI-Powered SaaS Platform**: Next.js, TypeScript, Node.js, PostgreSQL, AI APIs, AI Agents, and MCP.\n3. **CareerLooms**: High-performance job portal built with Next.js, Firebase, TypeScript, and Tailwind CSS.\n4. **Client Systems**: Multiple production platforms across Travel, NGO, E-commerce, and Digital Marketing.\n\nYou can click on any project in the **Work** section to view detailed architecture breakdowns.`;
        sources = ["Projects", "Invoice Builder SaaS", "AI-Powered SaaS Platform", "CareerLooms"];
      } else if (lower.includes("experience") || lower.includes("brownfleet") || lower.includes("oscarblack") || lower.includes("work history") || lower.includes("job") || lower.includes("career")) {
        fallbackReply = `Sukhvant's professional experience includes:\n\n- **Brownfleet (Full Stack Developer)**: Developed AI-powered SaaS, REST APIs, MCP tool integrations, Next.js/TypeScript architectures, and PostgreSQL database solutions.\n- **Freelance / Self-employed (Full Stack Developer)**: Designed and delivered custom web platforms for business, travel, NGO, e-commerce, and marketing clients.\n- **OSCARBLACK (Front-End Developer Intern)**: Built responsive web interfaces, modern HTML/CSS layouts, and cross-browser optimizations.\n\nView the Git-style commit log in the **Experience** section for more details.`;
        sources = ["Experience", "Brownfleet Experience", "Skills"];
      } else if (lower.includes("skill") || lower.includes("stack") || lower.includes("tech") || lower.includes("react") || lower.includes("node") || lower.includes("typescript") || lower.includes("database")) {
        fallbackReply = `Sukhvant's core technical stack spans:\n\n- **Frontend**: React, Next.js, TypeScript, JavaScript, Tailwind CSS, Modern Responsive Architecture\n- **Backend**: Node.js, Express.js, REST APIs, Server-side logic\n- **Databases & Auth**: PostgreSQL, MongoDB, Supabase, MySQL, Firebase\n- **AI & Tooling**: LLM APIs, AI Agents, Model Context Protocol (MCP), Git, Linux CLI\n\nAll skills are actively demonstrated across his featured projects.`;
        sources = ["Skills", "Projects", "AI Engineering"];
      } else if (lower.includes("hire") || lower.includes("why") || lower.includes("contact") || lower.includes("email") || lower.includes("reach") || lower.includes("salary") || lower.includes("location")) {
        fallbackReply = `Sukhvant brings a strong blend of product thinking, robust full-stack software engineering (Next.js + TypeScript + Node.js + PostgreSQL), and practical AI systems integration (Agents & MCP).\n\nHe is currently open to full stack and AI engineering opportunities. You can reach out directly via **sukhvantsingh581998@gmail.com** or use the **./contact.sh** terminal section below.`;
        sources = ["Contact", "About", "Experience"];
      } else {
        fallbackReply = `Sukhvant Singh is a Full Stack Developer & AI Engineer specializing in Next.js, TypeScript, Node.js, PostgreSQL, and AI-powered product engineering.\n\nFeel free to ask about his **Experience** (Brownfleet, Freelance), **Projects** (Invoice Builder, AI SaaS, CareerLooms), **Technical Skills**, or **AI Engineering Approach**!`;
        sources = ["About", "Projects", "Experience", "Skills"];
      }

      return { reply: fallbackReply, sources, source: "knowledge-engine" };
    };

    if (apiKey) {
      try {
        // Initialize Gemini client with proper User-Agent header
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build",
            },
          },
        });

        // Format history
        const contents: any[] = [];
        for (const turn of conversationHistory.slice(-6)) {
          contents.push({
            role: turn.role === "user" ? "user" : "model",
            parts: [{ text: turn.content }],
          });
        }
        contents.push({
          role: "user",
          parts: [{ text: message }],
        });

        // Candidate models in order of preference to handle transient high demand (503) or rate limits
        const candidateModels = [
          "gemini-3.7-flash",
          "gemini-flash-latest",
          "gemini-3.1-flash-lite",
        ];

        let generatedReply: string | null = null;
        let successfulModel = "";

        for (const modelName of candidateModels) {
          try {
            const response = await ai.models.generateContent({
              model: modelName,
              contents: contents,
              config: {
                systemInstruction: SUKHVANT_KNOWLEDGE_SYSTEM_PROMPT,
                temperature: 0.7,
                topP: 0.95,
              },
            });

            if (response && response.text) {
              generatedReply = response.text;
              successfulModel = modelName;
              break;
            }
          } catch (modelErr: any) {
            console.warn(`Model ${modelName} unavailable or throttled:`, modelErr?.message || modelErr);
            // Continue to next model in candidateModels
          }
        }

        if (generatedReply) {
          return res.json({ reply: generatedReply, source: successfulModel });
        }
      } catch (geminiErr) {
        console.warn("All Gemini model attempts encountered temporary upstream demand. Falling back to local verified knowledge engine:", geminiErr);
      }
    }

    // High-precision local knowledge engine fallback
    const fallbackData = getLocalKnowledgeResponse(message);
    return res.json(fallbackData);
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "operational",
      runtime: "linux-x86_64",
      service: "sukhvant-portfolio-api",
      timestamp: new Date().toISOString(),
    });
  });

  // Vite middleware for development vs static for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sukhvant Portfolio Dev Server running on http://localhost:${PORT}`);
  });
}

startServer();
