import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { skillsRecord, skillToProjectsMap } from '../../data/skills';
import { Code2, Server, Database, Cpu, Wrench, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface SkillsSectionProps {
  onScrollToSection: (id: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onScrollToSection }) => {
  const [selectedSkill, setSelectedSkill] = useState<string>('Next.js');

  const clusters = [
    {
      id: 'frontend',
      label: 'FRONTEND',
      icon: <Code2 className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
      skills: skillsRecord.frontend
    },
    {
      id: 'backend',
      label: 'BACKEND & APIS',
      icon: <Server className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
      skills: skillsRecord.backend
    },
    {
      id: 'database',
      label: 'DATABASE & PERSISTENCE',
      icon: <Database className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
      skills: skillsRecord.database
    },
    {
      id: 'ai',
      label: 'AI & AGENT WORKFLOWS',
      icon: <Cpu className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
      skills: skillsRecord.ai
    },
    {
      id: 'tools',
      label: 'DEVELOPER TOOLING',
      icon: <Wrench className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
      skills: skillsRecord.tools
    }
  ];

  const associatedProjects = skillToProjectsMap[selectedSkill] || [
    { id: 'ai-saas-platform', title: 'AI-Powered SaaS Platform' },
    { id: 'invoice-builder-saas', title: 'Invoice Builder SaaS' }
  ];

  return (
    <section id="skills" className="py-20 border-b border-[#E5E7E5] dark:border-white/10 bg-[#FFFFFF] dark:bg-[#000000] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="05 / SKILLS"
          title="TECHNICAL CLUSTERS & ARCHITECTURE"
          subtitle="Interactive skill matrices mapped directly to production applications and repositories."
          commandPrompt="cat ~/sukhvant/skills.json"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          
          {/* Clusters Matrix */}
          <div className="lg:col-span-8 space-y-5">
            {clusters.map((cluster) => (
              <div
                key={cluster.id}
                className="bg-[#FAFAFA] dark:bg-[#080808] border border-[#E5E7E5] dark:border-[#151A15] rounded-xl p-4 sm:p-5 font-mono-tech shadow-xs"
              >
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div className="flex items-center gap-2 text-[#111111] dark:text-[#FFFFFF] font-medium">
                    <span className="p-1.5 rounded-lg bg-[#FFFFFF] dark:bg-[#0E0E0E] border border-[#E5E7E5] dark:border-[#151A15]">
                      {cluster.icon}
                    </span>
                    <span className="font-mono text-xs tracking-wider uppercase font-semibold">{cluster.label}</span>
                  </div>
                  <span className="text-[10px] text-[#777777] dark:text-[#666666] font-mono">{cluster.skills.length} MODULES</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cluster.skills.map((skill) => {
                    const isSelected = selectedSkill === skill;
                    return (
                      <button
                        key={skill}
                        id={`skill-pill-${skill.replace(/[^a-zA-Z0-9]/g, '-')}`}
                        onClick={() => setSelectedSkill(skill)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 font-mono cursor-pointer ${
                          isSelected
                            ? 'bg-[#00FF66] text-black font-semibold border-[#00FF66] shadow-[0_0_10px_rgba(0,255,102,0.3)]'
                            : 'bg-[#FFFFFF] dark:bg-[#0E0E0E] text-[#333333] dark:text-[#A3A3A3] hover:text-black dark:hover:text-white border-[#E5E7E5] dark:border-white/10 hover:border-[#00A84F]/40 dark:hover:border-[#00FF66]/30'
                        }`}
                      >
                        <span>{skill}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black"></span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Skill Cross-Reference Inspector */}
          <div className="lg:col-span-4 bg-[#FAFAFA] dark:bg-[#080808] border border-[#E5E7E5] dark:border-[#151A15] rounded-xl p-5 shadow-xs dark:shadow-xl font-mono-tech sticky top-24">
            <div className="flex items-center justify-between border-b border-[#E5E7E5] dark:border-[#151A15] pb-3 mb-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FF66] shadow-[0_0_6px_#00FF66] animate-pulse"></span>
                <span className="text-[#555555] dark:text-[#8A8A8A] text-[11px] tracking-wider uppercase font-semibold">SKILL_INSPECTOR</span>
              </div>
              <span className="text-[10px] text-[#00873D] dark:text-[#00FF66] bg-[#00A84F]/10 dark:bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00A84F]/30 dark:border-[#00FF66]/30 font-mono uppercase font-medium">
                ACTIVE
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-[10px] text-[#777777] dark:text-[#666666] uppercase tracking-widest">Selected Technology:</div>
                <div className="font-editorial-serif text-2xl font-normal text-[#111111] dark:text-white mt-1">{selectedSkill}</div>
              </div>

              <div className="pt-2 border-t border-[#E5E7E5] dark:border-[#151A15] space-y-2">
                <div className="text-xs text-[#333333] dark:text-[#A3A3A3] font-medium flex items-center gap-1.5 font-sans">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00873D] dark:text-[#00FF66]" />
                  <span>Production Implementations:</span>
                </div>

                <div className="space-y-2 pt-1">
                  {associatedProjects.map((p) => (
                    <button
                      key={p.id}
                      id={`skill-proj-link-${p.id}`}
                      onClick={() => onScrollToSection('projects')}
                      className="w-full text-left bg-[#FFFFFF] dark:bg-[#0E0E0E] hover:bg-[#F5F5F5] dark:hover:bg-[#151515] border border-[#E5E7E5] dark:border-[#151A15] hover:border-[#00A84F]/40 dark:hover:border-[#00FF66]/30 p-2.5 rounded-lg transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <span className="text-xs text-[#222222] dark:text-[#E5E5E5] font-sans font-normal group-hover:text-[#00873D] dark:group-hover:text-[#00FF66] transition-colors">
                        → {p.title}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#777777] dark:text-[#666666] group-hover:text-[#00873D] dark:group-hover:text-[#00FF66] transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[11px] text-[#777777] dark:text-[#666666] leading-relaxed font-light">
                Every listed skill corresponds to shipped features in production repositories.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
