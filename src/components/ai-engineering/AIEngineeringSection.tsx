import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { ArchitectureFlow } from './ArchitectureFlow';
import { AIOrb } from '../ai/AIOrb';

interface AIEngineeringSectionProps {
  onOpenAI: () => void;
  onScrollToSection: (id: string) => void;
}

export const AIEngineeringSection: React.FC<AIEngineeringSectionProps> = ({
  onOpenAI,
  onScrollToSection
}) => {
  const aiPillars = [
    {
      title: "Model Context Protocol (MCP)",
      tag: "STANDARD",
      description: "Implementing MCP servers and clients to bridge language models safely with real-world file systems, PostgreSQL databases, and proprietary APIs."
    },
    {
      title: "Autonomous AI Agents",
      tag: "AGENTIC",
      description: "Building multi-turn agents capable of task breakdown, tool selection, parameter validation, self-correction, and structured JSON outputs."
    },
    {
      title: "Context-Aware Business Workflows",
      tag: "SAAS INTEGRATION",
      description: "Embedding AI directly into operational SaaS apps (like Brownfleet and custom platforms) to automate invoice matching, data synthesis, and workflows."
    },
    {
      title: "Deterministic Prompt Engineering",
      tag: "RELIABILITY",
      description: "Writing rigorous system prompts and Zod schemas to guarantee type-safe, hallucination-resistant LLM responses with zero unexpected output shapes."
    }
  ];

  return (
    <section id="ai-engineering" className="py-20 border-b border-[#E5E7E5] dark:border-white/10 bg-[#FFFFFF] dark:bg-[#000000] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="02 / AI ENGINEERING"
          title="DEEP AI & AGENT ARCHITECTURES"
          subtitle="Building software where AI acts as an autonomous, verified engine within real production systems."
          commandPrompt="mcp list-tools --status"
        />

        {/* Featured Philosophy Block */}
        <div className="bg-[#FAFAFA] dark:bg-[#080808] border border-[#E5E7E5] dark:border-[#151A15] rounded-xl p-6 sm:p-8 mb-10 shadow-sm dark:shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF66]/[0.03] rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="font-mono-tech text-xs text-[#666666] dark:text-[#8A8A8A] tracking-[0.2em] uppercase flex items-center gap-2.5">
              <AIOrb size="sm" state="idle" showOrbitalRing={false} />
              <span className="text-[#00873D] dark:text-[#00FF66] font-semibold">CORE ARCHITECTURAL STANCE</span>
            </div>

            <h3 className="font-editorial-serif text-2xl sm:text-3xl font-normal text-[#111111] dark:text-white leading-snug italic">
              &ldquo;I build applications where AI is part of the product — not just a chatbot added to the interface.&rdquo;
            </h3>

            <p className="text-sm sm:text-base text-[#555555] dark:text-[#8A8A8A] leading-relaxed font-light">
              Modern AI engineering requires robust systems design: managing state, validating tool signatures, handling rate limits gracefully, maintaining strict security boundaries, and streaming results smoothly to user interfaces.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 font-mono-tech text-xs">
              <button
                id="ai-eng-launch-assistant-btn"
                onClick={onOpenAI}
                className="bg-[#00FF66] text-black font-semibold tracking-wider uppercase px-4 py-2 rounded-lg hover:bg-[#00D957] transition-all flex items-center gap-2 shadow-[0_0_12px_rgba(0,255,102,0.25)] cursor-pointer"
              >
                <span>✦ Test Sukhvant AI Live</span>
              </button>
              <button
                id="ai-eng-view-saas-btn"
                onClick={() => onScrollToSection('projects')}
                className="bg-[#FFFFFF] dark:bg-[#0E0E0E] text-[#222222] dark:text-[#E5E5E5] hover:text-black dark:hover:text-white border border-[#E5E7E5] dark:border-white/10 hover:border-[#00A84F]/40 dark:hover:border-[#00FF66]/30 px-4 py-2 rounded-lg transition-all cursor-pointer"
              >
                → View AI SaaS Project
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Signal Flow Architecture */}
        <div className="mb-12">
          <ArchitectureFlow />
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-[#FAFAFA] dark:bg-[#080808] border border-[#E5E7E5] dark:border-[#151A15] hover:border-[#00A84F]/40 dark:hover:border-[#00FF66]/30 rounded-xl p-5 transition-all flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono-tech text-[10px] text-[#00873D] dark:text-[#00FF66] bg-[#00A84F]/10 dark:bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00A84F]/30 dark:border-[#00FF66]/30 uppercase tracking-widest font-medium">
                    {pillar.tag}
                  </span>
                  <span className="font-mono-tech text-[10px] text-[#777777] dark:text-[#555555]">0{idx + 1}</span>
                </div>
                <h4 className="font-mono-tech text-sm sm:text-base font-semibold text-[#111111] dark:text-[#FFFFFF] mb-2">
                  {pillar.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#555555] dark:text-[#8A8A8A] leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
