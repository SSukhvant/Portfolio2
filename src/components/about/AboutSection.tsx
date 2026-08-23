import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { profileData } from '../../data/profile';
import { Terminal, FolderTree, Layers, Cpu, Database, Layout } from 'lucide-react';

interface AboutSectionProps {
  onOpenAI: () => void;
  onScrollToSection: (id: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenAI, onScrollToSection }) => {
  const capabilityIcons = {
    'web-applications': <Layout className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
    'ai-products': <Cpu className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
    'backend-systems': <Database className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
    'product-engineering': <Layers className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />
  };

  return (
    <section id="about" className="py-20 border-b border-[#E5E7E5] dark:border-white/10 bg-[#FFFFFF] dark:bg-[#000000] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="01 / ABOUT"
          title="ENGINEERING PHILOSOPHY & CAPABILITIES"
          subtitle="A README-driven overview of how I design, architect, and ship production software."
          commandPrompt="cat ~/sukhvant/README.md"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Main README.md Card */}
          <div className="lg:col-span-8 bg-[#FAFAFA] dark:bg-[#080808] border border-[#E5E7E5] dark:border-[#151A15] rounded-xl overflow-hidden shadow-sm dark:shadow-xl">
            <div className="bg-[#F0F0F0] dark:bg-[#0D0D0D] border-b border-[#E5E7E5] dark:border-[#151A15] px-4 py-2.5 flex items-center justify-between font-mono-tech text-xs">
              <div className="flex items-center gap-2 text-[#555555] dark:text-[#8A8A8A]">
                <Terminal className="w-3.5 h-3.5 text-[#00873D] dark:text-[#00FF66]" />
                <span className="font-medium text-[#111111] dark:text-[#FFFFFF]">README.md</span>
              </div>
              <span className="text-[#777777] dark:text-[#666666] text-[11px] uppercase tracking-wider font-mono">markdown • utf-8</span>
            </div>

            <div className="p-6 sm:p-8 space-y-5 text-sm sm:text-base leading-relaxed text-[#555555] dark:text-[#A3A3A3]">
              <div>
                <h3 className="font-editorial-serif text-2xl font-normal text-[#111111] dark:text-white mb-1">
                  # Sukhvant Singh
                </h3>
                <p className="font-mono-tech text-xs text-[#00873D] dark:text-[#00FF66] tracking-widest uppercase font-medium">
                  Full Stack Developer &bull; AI Systems &bull; Product Architecture
                </p>
              </div>

              <p className="text-[#222222] dark:text-[#E5E5E5] font-light">
                I am a Full Stack Developer focused on modern web applications, SaaS products, and AI-powered experiences. I believe the best software combines rock-solid systems engineering with intuitive, responsive user interfaces.
              </p>

              <blockquote className="border-l-2 border-[#00873D] dark:border-[#00FF66] pl-4 py-2 font-editorial-serif text-lg text-[#111111] dark:text-white bg-[#00A84F]/[0.05] dark:bg-[#00FF66]/[0.03] rounded-r italic">
                &ldquo;I build applications where AI is part of the product — not just a chatbot added to the interface.&rdquo;
              </blockquote>

              <p className="font-light">
                My development workflow centers around TypeScript across both ends of the wire: Next.js and React on the frontend, paired with Node.js, Express, and PostgreSQL on the backend. When working with AI, I focus on deterministic workflows: structured outputs, tool-calling with Model Context Protocol (MCP), and context-aware business automations.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  id="about-explore-work-btn"
                  onClick={() => onScrollToSection('projects')}
                  className="font-mono-tech text-xs bg-[#00FF66] text-black font-semibold tracking-wider uppercase px-4 py-2 rounded-lg hover:bg-[#00D957] transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,255,102,0.25)] cursor-pointer"
                >
                  <span>→ View Production Projects</span>
                </button>
                <button
                  id="about-ask-ai-btn"
                  onClick={onOpenAI}
                  className="font-mono-tech text-xs bg-[#FFFFFF] dark:bg-[#0E0E0E] hover:bg-[#F5F5F5] dark:hover:bg-[#151515] text-[#222222] dark:text-[#E5E5E5] border border-[#E5E7E5] dark:border-white/10 hover:border-[#00A84F]/40 dark:hover:border-[#00FF66]/30 px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#00873D] dark:text-[#00FF66]">✦</span>
                  <span>Ask Sukhvant AI for verified bio</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filesystem Visual Language Card */}
          <div className="lg:col-span-4 bg-[#FAFAFA] dark:bg-[#080808] border border-[#E5E7E5] dark:border-[#151A15] rounded-xl overflow-hidden shadow-sm dark:shadow-xl font-mono-tech text-xs">
            <div className="bg-[#F0F0F0] dark:bg-[#0D0D0D] border-b border-[#E5E7E5] dark:border-[#151A15] px-4 py-2.5 flex items-center justify-between text-[#555555] dark:text-[#8A8A8A]">
              <div className="flex items-center gap-2">
                <FolderTree className="w-3.5 h-3.5 text-[#00873D] dark:text-[#00FF66]" />
                <span className="font-medium text-[#111111] dark:text-[#FFFFFF]">~/sukhvant</span>
              </div>
              <span className="text-[#777777] dark:text-[#666666] text-[11px] uppercase tracking-wider font-mono">tree</span>
            </div>

            <div className="p-5 text-[#555555] dark:text-[#8A8A8A] space-y-1 leading-relaxed">
              <div className="text-[#111111] dark:text-white font-medium">~/sukhvant</div>
              <div className="pl-3 border-l border-[#E5E7E5] dark:border-[#151A15] space-y-1">
                <div>├── <span className="text-[#222222] dark:text-[#E5E5E5]">about.md</span> <span className="text-[#777777] dark:text-[#555555]">(biography)</span></div>
                <div>├── <span className="text-[#222222] dark:text-[#E5E5E5]">experience.md</span> <span className="text-[#777777] dark:text-[#555555]">(brownfleet, freelance)</span></div>
                <div>├── <span className="text-[#222222] dark:text-[#E5E5E5]">skills.json</span> <span className="text-[#777777] dark:text-[#555555]">(fullstack, ai)</span></div>
                <div>
                  ├── <span className="text-[#111111] dark:text-white">projects/</span>
                  <div className="pl-4 border-l border-[#E5E7E5] dark:border-[#151A15] space-y-0.5 text-[11px] text-[#333333] dark:text-[#E5E5E5]">
                    <div>├── <span className="hover:text-[#00873D] dark:hover:text-[#00FF66] hover:underline cursor-pointer" onClick={() => onScrollToSection('projects')}>invoice-builder/</span></div>
                    <div>├── <span className="hover:text-[#00873D] dark:hover:text-[#00FF66] hover:underline cursor-pointer" onClick={() => onScrollToSection('projects')}>ai-saas-platform/</span></div>
                    <div>└── <span className="hover:text-[#00873D] dark:hover:text-[#00FF66] hover:underline cursor-pointer" onClick={() => onScrollToSection('projects')}>careerlooms/</span></div>
                  </div>
                </div>
                <div>
                  ├── <span className="text-[#111111] dark:text-white">ai/</span>
                  <div className="pl-4 border-l border-[#E5E7E5] dark:border-[#151A15] text-[11px]">
                    <div>└── <span className="text-[#00873D] dark:text-[#00FF66] hover:underline cursor-pointer" onClick={onOpenAI}>sukhvant-ai/</span></div>
                  </div>
                </div>
                <div>└── <span className="text-[#333333] dark:text-[#D4D4D4]">resume.pdf</span> <span className="text-[#777777] dark:text-[#555555]">(verified cv)</span></div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Capabilities Clusters */}
        <div className="space-y-4">
          <div className="font-mono-tech text-xs text-[#666666] dark:text-[#8A8A8A] tracking-[0.25em] uppercase flex items-center gap-2">
            <span className="text-[#00873D] dark:text-[#00FF66]">//</span>
            <span>CORE COMPETENCY CLUSTERS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {profileData.capabilities.map((cap) => (
              <div
                key={cap.id}
                className="bg-[#FAFAFA] dark:bg-[#080808] border border-[#E5E7E5] dark:border-[#151A15] hover:border-[#00A84F]/40 dark:hover:border-[#00FF66]/30 rounded-xl p-5 transition-all flex flex-col justify-between group shadow-xs hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-lg bg-[#FFFFFF] dark:bg-[#0E0E0E] border border-[#E5E7E5] dark:border-[#151A15] group-hover:border-[#00A84F]/40 dark:group-hover:border-[#00FF66]/30 transition-colors shadow-xs">
                      {capabilityIcons[cap.id as keyof typeof capabilityIcons] || <Layers className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />}
                    </span>
                    <span className="font-mono-tech text-[10px] text-[#777777] dark:text-[#555555] tracking-wider uppercase">MOD_{cap.id.substring(0, 3).toUpperCase()}</span>
                  </div>

                  <h4 className="font-editorial-serif text-lg font-normal text-[#111111] dark:text-white mb-2 leading-snug">
                    {cap.title}
                  </h4>

                  <p className="text-xs text-[#555555] dark:text-[#8A8A8A] leading-relaxed mb-4 font-light">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5E7E5] dark:border-[#151A15] flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {cap.technologies.map((s, idx) => (
                    <span
                      key={idx}
                      className="bg-[#FFFFFF] dark:bg-[#0E0E0E] text-[#444444] dark:text-[#A3A3A3] border border-[#E5E7E5] dark:border-white/10 px-2 py-0.5 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
