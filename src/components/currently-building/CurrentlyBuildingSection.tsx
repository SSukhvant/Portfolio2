import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { currentlyBuildingList } from '../../data/skills';
import { Activity } from 'lucide-react';

export const CurrentlyBuildingSection: React.FC = () => {
  return (
    <section id="currently-building" className="py-20 border-b border-[#E5E7E5] dark:border-white/10 bg-[#FFFFFF] dark:bg-[#000000] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="07 / CURRENTLY BUILDING"
          title="ACTIVE ENGINEERING SPRINTS"
          subtitle="In-flight features, AI architectural experiments, and developer primitives."
          commandPrompt="ps aux | grep active-builds"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentlyBuildingList.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAFAFA] dark:bg-[#080808] border border-[#E5E7E5] dark:border-[#151A15] hover:border-[#00A84F]/40 dark:hover:border-[#00FF66]/30 rounded-xl p-5 shadow-xs dark:shadow-lg flex flex-col justify-between transition-all"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3 font-mono-tech text-xs">
                  <div className="flex items-center gap-1.5 text-[#00873D] dark:text-[#00FF66]">
                    <Activity className="w-3.5 h-3.5 animate-pulse text-[#00873D] dark:text-[#00FF66]" />
                    <span className="font-medium text-[10px] uppercase tracking-widest">{item.status}</span>
                  </div>
                  <span className="text-[10px] text-[#00873D] dark:text-[#00FF66] bg-[#00A84F]/10 dark:bg-[#00FF66]/10 border border-[#00A84F]/30 dark:border-[#00FF66]/30 px-2 py-0.5 rounded font-mono font-medium">
                    {item.progress}% DONE
                  </span>
                </div>

                <h4 className="font-editorial-serif text-lg font-normal text-[#111111] dark:text-white mb-2 leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs text-[#555555] dark:text-[#8A8A8A] leading-relaxed mb-4 font-sans font-light">
                  {item.description}
                </p>

                {/* Progress bar */}
                <div className="w-full bg-[#E5E7E5] dark:bg-[#141414] border border-[#D5D7D5] dark:border-[#151A15] rounded-full h-1.5 mb-4 overflow-hidden">
                  <div
                    className="bg-[#00873D] dark:bg-[#00FF66] h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(0,255,102,0.6)]"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>

              {/* Tech tags */}
              <div className="pt-3 border-t border-[#E5E7E5] dark:border-[#151A15] flex flex-wrap gap-1.5 font-mono text-[10px]">
                {item.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="bg-[#FFFFFF] dark:bg-[#0E0E0E] text-[#444444] dark:text-[#A3A3A3] border border-[#E5E7E5] dark:border-white/10 px-2 py-0.5 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
