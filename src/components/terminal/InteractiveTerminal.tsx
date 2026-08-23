import React, { useState, useEffect, useRef } from 'react';
import { Terminal, RotateCcw, HelpCircle, CornerDownLeft } from 'lucide-react';
import { TerminalHistoryEntry, TerminalOutputItem, executeTerminalCommand } from '../../lib/terminalCommands';
import { TerminalCommand } from './TerminalCommand';

interface InteractiveTerminalProps {
  onOpenAI: () => void;
  onOpenResume: () => void;
  onScrollToSection: (id: string) => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  onOpenAI,
  onOpenResume,
  onScrollToSection
}) => {
  const [bootState, setBootState] = useState<number>(0); // 0: booting, 1: whoami, 2: stack, 3: status, 4: ready
  const [history, setHistory] = useState<TerminalHistoryEntry[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistoryList, setCommandHistoryList] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Boot sequence simulation
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      setBootState(4);
      return;
    }

    const t1 = setTimeout(() => setBootState(1), 350);
    const t2 = setTimeout(() => setBootState(2), 700);
    const t3 = setTimeout(() => setBootState(3), 1100);
    const t4 = setTimeout(() => setBootState(4), 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Auto-scroll terminal to bottom when history updates
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [bootState, history]);

  const handleActionClick = (output: TerminalOutputItem) => {
    if (output.actionType === 'open-ai') {
      onOpenAI();
    } else if (output.actionType === 'open-resume') {
      onOpenResume();
    } else if (output.actionType === 'scroll' && output.targetSection) {
      onScrollToSection(output.targetSection);
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
      setInputVal('');
      setHistoryIndex(-1);
      return;
    }

    const outputs = executeTerminalCommand(cmd, {
      onOpenAI,
      onOpenResume,
      onScrollTo: onScrollToSection
    });

    setHistory(prev => [
      ...prev,
      {
        id: `cmd-${Date.now()}-${Math.random()}`,
        command: cmd,
        outputs
      }
    ]);

    setCommandHistoryList(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    setInputVal('');

    // Handle instant triggers for hire commands
    if (cmd.toLowerCase().includes('hire')) {
      setTimeout(() => {
        onScrollToSection('contact');
      }, 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistoryList.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandHistoryList.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(commandHistoryList[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandHistoryList.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistoryList[nextIdx] || '');
      }
    }
  };

  const runQuickCommand = (cmd: string) => {
    setInputVal(cmd);
    const outputs = executeTerminalCommand(cmd, {
      onOpenAI,
      onOpenResume,
      onScrollTo: onScrollToSection
    });
    setHistory(prev => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: cmd,
        outputs
      }
    ]);
    setInputVal('');
  };

  return (
    <div
      className="w-full rounded-xl border border-[#151A15] bg-[#050505] shadow-2xl overflow-hidden flex flex-col font-mono-tech transition-all focus-within:border-[#00FF66]/40"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Linux Window Header */}
      <div className="bg-[#0A0A0A] px-4 py-2.5 border-b border-[#151A15] flex items-center justify-between select-none">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="text-[#333333] text-xs">|</span>
          <div className="flex items-center gap-1.5 text-xs text-[#8A8A8A]">
            <Terminal className="w-3.5 h-3.5 text-[#00FF66]" />
            <span className="font-medium text-[#E5E5E5]">sukhvant@workstation:~ (bash)</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#8A8A8A]">
          <span className="hidden sm:inline-block bg-[#00FF66]/10 text-[#00FF66] px-2 py-0.5 rounded text-[10px] border border-[#00FF66]/30 tracking-widest uppercase font-mono">
            ● ONLINE
          </span>
          <button
            id="term-reset-btn"
            onClick={(e) => {
              e.stopPropagation();
              setHistory([]);
            }}
            title="Reset Terminal Screen"
            className="hover:text-white transition-colors p-1"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#8A8A8A] hover:text-white" />
          </button>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div
        ref={terminalBodyRef}
        className="p-4 sm:p-5 text-xs sm:text-[13px] overflow-y-auto max-h-[380px] sm:max-h-[420px] min-h-[280px] space-y-3 scroll-smooth text-[#E5E5E5] bg-[#050505]"
      >
        {/* Boot Sequence */}
        <div className="space-y-1 text-[#8A8A8A]">
          <div className="text-white flex items-center gap-1.5 font-medium">
            <span className="text-[#00FF66]">$</span>
            <span>./initialize.sh</span>
          </div>
          <div className="text-[#666666]">Loading profile and workstation environment...</div>

          {bootState >= 1 && (
            <div className="space-y-0.5 pt-1">
              <div className="text-[#D4D4D4]"><span className="text-[#00FF66]">✓</span> Profile loaded: Sukhvant Singh</div>
              <div className="text-[#D4D4D4]"><span className="text-[#00FF66]">✓</span> Projects loaded: [AI SaaS, Invoice Builder, CareerLooms]</div>
              <div className="text-[#D4D4D4]"><span className="text-[#00FF66]">✓</span> Sukhvant AI service: ONLINE</div>
            </div>
          )}

          {bootState >= 2 && (
            <div className="pt-2 space-y-1">
              <div className="text-white font-medium flex items-center gap-1">
                <span className="text-[#00FF66]">$</span>
                <span>whoami</span>
              </div>
              <div className="text-[#FFFFFF] font-normal">Sukhvant Singh — Full Stack Developer & AI Engineer</div>
            </div>
          )}

          {bootState >= 3 && (
            <div className="pt-2 space-y-1">
              <div className="text-white font-medium flex items-center gap-1">
                <span className="text-[#00FF66]">$</span>
                <span>stack</span>
              </div>
              <div className="text-[#A3A3A3]">React • Next.js • TypeScript • Node.js • PostgreSQL • AI Agents • MCP</div>
            </div>
          )}

          {bootState >= 4 && (
            <div className="pt-2 space-y-1">
              <div className="text-white font-medium flex items-center gap-1">
                <span className="text-[#00FF66]">$</span>
                <span>status</span>
              </div>
              <div className="text-[#00FF66] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] shadow-[0_0_6px_#00FF66] animate-pulse"></span>
                Available for full-time opportunities & bespoke AI architecture
              </div>
            </div>
          )}
        </div>

        {/* Divider after boot */}
        {bootState >= 4 && (
          <div className="border-t border-[#151A15] pt-2 text-[11px] text-[#666666]">
            Type <span className="text-[#00FF66] font-medium">help</span> to explore commands, or click shortcuts below:
          </div>
        )}

        {/* Command History */}
        {history.map((item) => (
          <TerminalCommand
            key={item.id}
            command={item.command}
            outputs={item.outputs}
            onActionClick={handleActionClick}
          />
        ))}

        {/* Interactive Prompt Input */}
        {bootState >= 4 && (
          <form onSubmit={handleCommandSubmit} className="pt-1 flex items-center gap-2">
            <label htmlFor="terminal-input" className="text-white whitespace-nowrap text-xs sm:text-[13px] flex items-center gap-1 font-mono">
              <span className="text-[#00FF66]">sukhvant@workstation</span>
              <span className="text-[#8A8A8A]">:~$</span>
            </label>
            <div className="relative flex-1 flex items-center">
              <input
                id="terminal-input"
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type 'help', 'projects', 'skills', 'ai'..."
                autoComplete="off"
                spellCheck="false"
                className="w-full bg-transparent text-[#FFFFFF] focus:outline-none font-mono-tech text-xs sm:text-[13px] placeholder:text-[#444444]"
              />
              <span className="terminal-cursor inline-block w-1.5 h-3.5 bg-[#00FF66] ml-0.5"></span>
            </div>
            <button
              id="term-submit-btn"
              type="submit"
              aria-label="Run command"
              className="text-[#666666] hover:text-[#00FF66] p-1 transition-colors"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>

      {/* Quick Command Toolbar */}
      <div className="bg-[#0A0A0A] border-t border-[#151A15] px-3 py-2 flex flex-wrap items-center gap-1.5 text-[11px]">
        <span className="text-[#666666] font-medium mr-1 flex items-center gap-1 text-[10px] uppercase tracking-wider font-mono">
          <HelpCircle className="w-3 h-3 text-[#00FF66]" />
          Quick:
        </span>
        {['projects', 'skills', 'ai', 'experience', 'whoami', 'npm run hire'].map((cmd) => (
          <button
            key={cmd}
            id={`quick-cmd-${cmd.replace(/[^a-zA-Z0-9]/g, '-')}`}
            onClick={(e) => {
              e.stopPropagation();
              runQuickCommand(cmd);
            }}
            className="bg-[#0E0E0E] hover:bg-[#151515] text-[#A3A3A3] hover:text-[#00FF66] border border-white/10 hover:border-[#00FF66]/30 px-2 py-0.5 rounded transition-all font-mono-tech text-[11px]"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};
