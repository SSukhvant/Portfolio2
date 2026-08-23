import React from 'react';
import { TerminalOutputItem } from '../../lib/terminalCommands';

interface TerminalCommandProps {
  command: string;
  outputs: TerminalOutputItem[];
  onActionClick: (output: TerminalOutputItem) => void;
}

export const TerminalCommand: React.FC<TerminalCommandProps> = ({
  command,
  outputs,
  onActionClick
}) => {
  return (
    <div className="space-y-1.5 font-mono-tech text-xs sm:text-[13px] leading-relaxed">
      {/* Command prompt line */}
      <div className="flex items-center gap-2 text-white">
        <span className="text-[#8a8a8a]">sukhvant@workstation:~$</span>
        <span className="text-white font-medium">{command}</span>
      </div>

      {/* Outputs */}
      <div className="space-y-1 pl-2 sm:pl-4 border-l border-white/10 my-1">
        {outputs.map((out, idx) => {
          if (out.type === 'error') {
            return (
              <div key={idx} className="text-[#ff7b72]">
                {out.text}
              </div>
            );
          }
          if (out.type === 'success') {
            return (
              <div key={idx} className="text-white font-medium flex items-center gap-1.5">
                {out.text}
              </div>
            );
          }
          if (out.type === 'lines' && out.lines) {
            return (
              <div key={idx} className="space-y-0.5 text-[#a3a3a3]">
                {out.lines.map((line, lIdx) => (
                  <div key={lIdx}>{line}</div>
                ))}
              </div>
            );
          }
          if (out.type === 'action' && out.actionLabel) {
            return (
              <div key={idx} className="pt-1.5 pb-0.5">
                <button
                  id={`term-action-${idx}-${out.targetSection || 'cmd'}`}
                  onClick={() => onActionClick(out)}
                  className="group inline-flex items-center gap-1.5 text-xs text-white hover:text-black bg-white/[0.08] hover:bg-white px-3 py-1 rounded border border-white/15 transition-all font-medium cursor-pointer"
                >
                  <span>{out.actionLabel}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform text-xs">↗</span>
                </button>
              </div>
            );
          }
          return (
            <div key={idx} className="text-[#d4d4d4]">
              {out.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};
