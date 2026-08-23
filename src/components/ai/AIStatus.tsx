import React from 'react';

interface AIStatusProps {
  status?: string;
  source?: string;
}

export const AIStatus: React.FC<AIStatusProps> = ({
  status = 'active',
  source = 'verified profile'
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono-tech text-[#626A63]">
      <div className="flex items-center gap-1.5 text-[#00FF66]">
        <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse"></span>
        <span className="font-semibold uppercase tracking-wider">{status}</span>
      </div>
      <span>•</span>
      <span>runtime: online</span>
      <span>•</span>
      <span>knowledge: {source}</span>
    </div>
  );
};
