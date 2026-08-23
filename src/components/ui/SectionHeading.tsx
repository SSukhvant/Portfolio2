import React from 'react';

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  commandPrompt?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  title,
  subtitle,
  commandPrompt
}) => {
  return (
    <div className="mb-12 border-b border-[#E5E7E5] dark:border-white/10 pb-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3.5">
          <span className="font-mono-tech text-[10px] tracking-[0.25em] text-[#00873D] dark:text-[#00FF66] bg-[#00A84F]/10 dark:bg-[#00FF66]/10 px-2.5 py-1 rounded border border-[#00A84F]/30 dark:border-[#00FF66]/30 uppercase font-medium">
            {number}
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#111111] dark:text-[#FFFFFF]">
            {title}
          </h2>
        </div>
        {commandPrompt && (
          <div className="font-mono-tech text-xs text-[#555555] dark:text-[#8A8A8A] bg-[#FAFAFA] dark:bg-[#080808] px-3 py-1 rounded-lg border border-[#E5E7E5] dark:border-[#151A15] flex items-center gap-1.5 shadow-xs">
            <span className="text-[#00873D] dark:text-[#00FF66] font-bold">$</span>
            <span className="text-[#222222] dark:text-[#E5E5E5] font-mono">{commandPrompt}</span>
          </div>
        )}
      </div>
      {subtitle && (
        <p className="text-sm sm:text-base text-[#555555] dark:text-[#8A8A8A] max-w-3xl mt-2 leading-relaxed font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
};
