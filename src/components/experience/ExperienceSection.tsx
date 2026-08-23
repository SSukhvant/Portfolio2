import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { experienceData } from '../../data/experience';
import { GitCommit, GitBranch, Calendar, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const [selectedExpId, setSelectedExpId] = useState<string>(experienceData[0].id);

  const activeExp = experienceData.find((e) => e.id === selectedExpId) || experienceData[0];

  return (
    <section id="experience" className="py-20 border-b border-[#E5E7E5] dark:border-white/10 bg-[#FFFFFF] dark:bg-[#000000] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="04 / EXPERIENCE"
          title="PROFESSIONAL CAREER LOG"
          subtitle="A Git-structured record of full-stack engineering roles, client deliveries, and production contributions."
          commandPrompt="git log --career --graph --oneline"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Git Commit Tree */}
          <div className="lg:col-span-5 bg-[#FAFAFA] dark:bg-[#080808] border border-[#E5E7E5] dark:border-[#151A15] rounded-xl p-5 shadow-xs dark:shadow-xl font-mono-tech text-xs">
            <div className="flex items-center justify-between border-b border-[#E5E7E5] dark:border-[#151A15] pb-3 mb-4 text-[#555555] dark:text-[#8A8A8A]">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />
                <span className="font-medium text-[#111111] dark:text-[#FFFFFF]">BRANCH: main (career)</span>
              </div>
              <span className="text-[10px] text-[#00873D] dark:text-[#00FF66] bg-[#00A84F]/10 dark:bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00A84F]/30 dark:border-[#00FF66]/30 font-mono tracking-wider font-medium">
                HEAD -&gt; c8a41f9
              </span>
            </div>

            <div className="space-y-4 relative pl-2">
              {/* Vertical branch line */}
              <div className="absolute left-[21px] top-4 bottom-4 w-[1px] bg-[#E5E7E5] dark:bg-[#151A15]"></div>

              {experienceData.map((exp) => {
                const isSelected = selectedExpId === exp.id;
                return (
                  <button
                    key={exp.id}
                    id={`exp-tree-node-${exp.id}`}
                    onClick={() => setSelectedExpId(exp.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 relative z-10 cursor-pointer ${
                      isSelected
                        ? 'bg-[#00A84F]/10 dark:bg-[#00FF66]/10 border-[#00873D] dark:border-[#00FF66] shadow-xs text-[#111111] dark:text-white'
                        : 'bg-[#FFFFFF] dark:bg-[#0D0D0D] border-[#E5E7E5] dark:border-[#151A15] hover:border-[#00A84F]/40 dark:hover:border-[#00FF66]/30 hover:bg-[#F5F5F5] dark:hover:bg-[#121212]'
                    }`}
                  >
                    {/* Commit dot */}
                    <div
                      className={`w-3.5 h-3.5 rounded-full mt-0.5 shrink-0 flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#00873D] dark:bg-[#00FF66] shadow-[0_0_8px_rgba(0,255,102,0.8)]'
                          : 'bg-[#E5E7E5] dark:bg-[#181818] border border-[#CCCCCC] dark:border-[#333333]'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-black"></span>}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[11px] font-medium font-mono ${isSelected ? 'text-[#00873D] dark:text-[#00FF66]' : 'text-[#666666] dark:text-[#8A8A8A]'}`}>
                          commit {exp.commitHash}
                        </span>
                        <span className="text-[10px] text-[#777777] dark:text-[#666666]">{exp.period}</span>
                      </div>

                      <div className={`font-editorial-serif text-base sm:text-lg truncate mt-0.5 ${isSelected ? 'text-[#111111] dark:text-white font-normal' : 'text-[#333333] dark:text-[#A3A3A3]'}`}>
                        {exp.company}
                      </div>

                      <div className="text-[11px] text-[#666666] dark:text-[#8A8A8A] truncate font-mono-tech">
                        {exp.role}
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 mt-2 shrink-0 transition-transform ${
                        isSelected ? 'text-[#00873D] dark:text-[#00FF66] translate-x-0.5' : 'text-[#999999] dark:text-[#555555]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Commit Inspection Card */}
          <div className="lg:col-span-7 bg-[#FAFAFA] dark:bg-[#080808] border border-[#E5E7E5] dark:border-[#151A15] rounded-xl overflow-hidden shadow-xs dark:shadow-xl font-mono-tech text-xs">
            {/* Header */}
            <div className="bg-[#F0F0F0] dark:bg-[#0D0D0D] border-b border-[#E5E7E5] dark:border-[#151A15] px-5 py-3.5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />
                <span className="font-editorial-serif text-lg text-[#111111] dark:text-white font-normal">{activeExp.company}</span>
                <span className="text-[#888888] dark:text-[#555555]">::</span>
                <span className="text-xs text-[#555555] dark:text-[#A3A3A3] font-mono-tech uppercase tracking-wider">{activeExp.role}</span>
              </div>
              <span className="text-[10px] bg-[#00A84F]/10 dark:bg-[#00FF66]/10 text-[#00873D] dark:text-[#00FF66] border border-[#00A84F]/30 dark:border-[#00FF66]/30 px-2 py-0.5 rounded tracking-wider uppercase font-mono font-medium">
                {activeExp.type}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-7 space-y-6">
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-[#666666] dark:text-[#8A8A8A] border-b border-[#E5E7E5] dark:border-[#151A15] pb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#00873D] dark:text-[#00FF66]" />
                  <span className="text-[#333333] dark:text-[#A3A3A3]">{activeExp.period}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00873D] dark:text-[#00FF66]" />
                  <span className="text-[#333333] dark:text-[#A3A3A3]">{activeExp.location}</span>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1.5 font-sans">
                <div className="font-mono-tech text-[10px] text-[#00873D] dark:text-[#00FF66] font-medium uppercase tracking-widest flex items-center gap-1.5">
                  <span>//</span>
                  <span>ROLE OVERVIEW</span>
                </div>
                <p className="text-xs sm:text-sm text-[#222222] dark:text-[#E5E5E5] leading-relaxed font-light">
                  {activeExp.summary}
                </p>
              </div>

              {/* Verified Highlights */}
              <div className="space-y-2.5 font-sans">
                <div className="font-mono-tech text-[10px] text-[#00873D] dark:text-[#00FF66] font-medium uppercase tracking-widest flex items-center gap-1.5">
                  <span>//</span>
                  <span>KEY DELIVERABLES & CONTRIBUTIONS</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#555555] dark:text-[#A3A3A3] font-light">
                  {activeExp.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#00873D] dark:text-[#00FF66] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2 pt-2 border-t border-[#E5E7E5] dark:border-[#151A15]">
                <div className="font-mono-tech text-[10px] text-[#777777] dark:text-[#666666] uppercase tracking-widest flex items-center gap-1.5">
                  <span className="text-[#00873D] dark:text-[#00FF66]">//</span>
                  <span>ENVIRONMENT & TECH STACK</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeExp.focus.map((t, idx) => (
                    <span
                      key={idx}
                      className="font-mono-tech text-[11px] bg-[#FFFFFF] dark:bg-[#0E0E0E] text-[#444444] dark:text-[#A3A3A3] border border-[#E5E7E5] dark:border-white/10 px-2.5 py-1 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
