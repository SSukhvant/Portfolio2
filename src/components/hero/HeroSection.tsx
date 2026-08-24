import React from 'react';
import { ArrowDown, Github, FileText, ArrowUpRight } from 'lucide-react';
import { profileData } from '../../data/profile';
import { socialsData } from '../../data/skills';
import { InteractiveTerminal } from '../terminal/InteractiveTerminal';
import { AIOrb } from '../ai/AIOrb';

interface HeroSectionProps {
  onOpenAI: () => void;
  onOpenResume: () => void;
  onScrollToSection: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAI,
  onOpenResume,
  onScrollToSection
}) => {
  return (
    <section
      id="hero"
      className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden border-b border-[#E5E7E5] dark:border-white/10 tech-dot-pattern bg-[#FFFFFF] dark:bg-[#000000] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Left Column: Profile & Call to Actions */}
          <div className="lg:col-span-5 space-y-6 pt-2">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FAFAFA] dark:bg-[#080808] border border-[#E5E7E5] dark:border-[#151A15] px-3.5 py-1.5 rounded-full font-mono-tech text-xs shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] shadow-[0_0_6px_#00FF66] animate-pulse"></span>
              <span className="text-[#555555] dark:text-[#A3A3A3] text-[11px] tracking-wider uppercase font-medium">{profileData.status}</span>
            </div>

            {/* Main Developer Title & Identity */}
            <div className="space-y-3">
              <div className="font-mono-tech text-xs text-[#666666] dark:text-[#8A8A8A] tracking-[0.25em] uppercase flex items-center gap-2">
                <span className="text-[#00873D] dark:text-[#00FF66]">{`<`}</span>
                <span className="font-semibold text-[#111111] dark:text-[#FFFFFF]">SUKHVANT SINGH</span>
                <span className="text-[#00873D] dark:text-[#00FF66]">{`/>`}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#111111] dark:text-[#FFFFFF] leading-[1.1]">
                Full Stack & <br />
                <span className="font-editorial-serif italic font-normal text-[#111111] dark:text-white">AI Engineer.</span>
              </h1>
              <div className="font-mono-tech text-xs text-[#666666] dark:text-[#8A8A8A] tracking-widest uppercase flex items-center gap-2">
                <span className="text-[#00873D] dark:text-[#00FF66]">&gt;</span>
                <span>WEB APPLICATIONS • AGENTIC SYSTEMS • ARCHITECTURE</span>
              </div>
            </div>

            {/* Concise Value Description */}
            <p className="text-sm sm:text-base text-[#555555] dark:text-[#A3A3A3] leading-relaxed max-w-lg font-light">
              Crafting resilient web applications, autonomous AI agents, and production-grade architectures with React, Next.js, TypeScript, Node.js, PostgreSQL, and Model Context Protocol (MCP).
            </p>

            {/* Technical Highlights Chips */}
            <div className="flex flex-wrap gap-2 pt-1 font-mono-tech text-xs">
              <span className="bg-[#FAFAFA] dark:bg-[#080808] border border-[#E5E7E5] dark:border-white/10 text-[#333333] dark:text-[#E5E5E5] px-2.5 py-1 rounded text-[11px]">
                Next.js / TypeScript
              </span>
              <span className="bg-[#FAFAFA] dark:bg-[#080808] border border-[#E5E7E5] dark:border-white/10 text-[#333333] dark:text-[#E5E5E5] px-2.5 py-1 rounded text-[11px]">
                Node.js / PostgreSQL
              </span>
              <span className="bg-[#00A84F]/10 dark:bg-[#00FF66]/10 border border-[#00A84F]/30 dark:border-[#00FF66]/30 text-[#00873D] dark:text-[#00FF66] px-2.5 py-1 rounded text-[11px] font-medium">
                AI Agents & MCP
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                id="hero-view-work-btn"
                onClick={() => onScrollToSection('projects')}
                className="font-mono-tech text-xs bg-[#00FF66] text-black font-semibold tracking-wider uppercase px-5 py-2.5 rounded hover:bg-[#00D957] transition-all flex items-center gap-2 shadow-[0_0_14px_rgba(0,255,102,0.25)] cursor-pointer"
              >
                <span>VIEW WORK</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <a
                id="hero-github-btn"
                href={socialsData.github}
                target="_blank"
                rel="noreferrer"
                className="font-mono-tech text-xs bg-[#FAFAFA] dark:bg-[#080808] hover:bg-[#F0F0F0] dark:hover:bg-[#121212] text-[#222222] dark:text-[#E5E5E5] border border-[#E5E7E5] dark:border-white/10 hover:border-[#00A84F]/40 dark:hover:border-white/25 px-4 py-2.5 rounded transition-all flex items-center gap-2"
              >
                <Github className="w-3.5 h-3.5 text-[#666666] dark:text-[#8A8A8A]" />
                <span className="tracking-wider uppercase text-[11px]">GITHUB</span>
                <ArrowUpRight className="w-3 h-3 text-[#777777] dark:text-[#666666]" />
              </a>

              <button
                id="hero-resume-btn"
                onClick={onOpenResume}
                className="font-mono-tech text-xs bg-[#FAFAFA] dark:bg-[#080808] hover:bg-[#F0F0F0] dark:hover:bg-[#121212] text-[#444444] dark:text-[#8A8A8A] hover:text-[#111111] dark:hover:text-white border border-[#E5E7E5] dark:border-white/10 hover:border-[#00A84F]/40 dark:hover:border-white/25 px-4 py-2.5 rounded transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="tracking-wider uppercase text-[11px]">RESUME</span>
              </button>
            </div>

            {/* AI Assistant Quick Callout with Colorful AI Orb */}
            <div className="pt-2">
              <button
                id="hero-ai-callout-btn"
                onClick={onOpenAI}
                className="w-full text-left bg-[#FAFAFA] dark:bg-[#080808] hover:bg-[#F0F0F0] dark:hover:bg-[#0E0E0E] border border-[#E5E7E5] dark:border-[#151A15] hover:border-[#00A84F]/40 dark:hover:border-[#00FF66]/40 p-3.5 rounded-xl flex items-center justify-between transition-all group shadow-sm hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <AIOrb size="sm" state="idle" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono-tech text-xs font-semibold text-[#111111] dark:text-white group-hover:text-[#00873D] dark:group-hover:text-[#00FF66] transition-colors">
                        Sukhvant AI Core
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] shadow-[0_0_6px_#00FF66]"></span>
                    </div>
                    <span className="text-[11px] text-[#555555] dark:text-[#8A8A8A] font-light">Ask anything about projects, architecture & stack</span>
                  </div>
                </div>
                <span className="font-mono-tech text-xs text-[#00873D] dark:text-[#00FF66] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Launch →
                </span>
              </button>
            </div>

          </div>

          {/* Right Column: Hero Interactive Terminal */}
          <div className="lg:col-span-7">
            <InteractiveTerminal
              onOpenAI={onOpenAI}
              onOpenResume={onOpenResume}
              onScrollToSection={onScrollToSection}
            />
          </div>

        </div>
      </div>
    </section>
  );
};
