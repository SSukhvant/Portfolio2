import React, { useState, useEffect, useRef } from 'react';
import { Search, Terminal, FolderGit2, Briefcase, Cpu, FileText, Mail, Sun, Moon, CornerDownLeft } from 'lucide-react';
import { ThemeMode } from '../../types';
import { AIOrb } from '../ai/AIOrb';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenAI: () => void;
  onOpenResume: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  onOpenAI,
  onOpenResume,
  onNavigateSection
}) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandItems = [
    {
      id: 'ai',
      label: 'Open Sukhvant AI Assistant',
      category: 'AI Engine',
      icon: <AIOrb size="sm" state="idle" showOrbitalRing={false} />,
      action: () => onOpenAI()
    },
    {
      id: 'work',
      label: 'Explore Projects & Case Studies',
      category: 'Navigation',
      icon: <FolderGit2 className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
      action: () => onNavigateSection('projects')
    },
    {
      id: 'ai-eng',
      label: 'AI Engineering & MCP Workflows',
      category: 'Navigation',
      icon: <Cpu className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
      action: () => onNavigateSection('ai-engineering')
    },
    {
      id: 'about',
      label: 'About Sukhvant Singh (README.md)',
      category: 'Navigation',
      icon: <Terminal className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
      action: () => onNavigateSection('about')
    },
    {
      id: 'experience',
      label: 'Professional Experience & Git Commits',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
      action: () => onNavigateSection('experience')
    },
    {
      id: 'skills',
      label: 'Technical Clusters & Stack',
      category: 'Navigation',
      icon: <Cpu className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
      action: () => onNavigateSection('skills')
    },
    {
      id: 'building',
      label: 'Currently Building & Active Sprints',
      category: 'Navigation',
      icon: <FolderGit2 className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
      action: () => onNavigateSection('currently-building')
    },
    {
      id: 'resume',
      label: 'View / Download Verified Resume (/resume.pdf)',
      category: 'Document',
      icon: <FileText className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
      action: () => onOpenResume()
    },
    {
      id: 'contact',
      label: 'Contact Sukhvant ($ ./contact.sh)',
      category: 'Direct',
      icon: <Mail className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
      action: () => onNavigateSection('contact')
    },
    {
      id: 'theme',
      label: theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme',
      category: 'System',
      icon: theme === 'dark' ? <Sun className="w-4 h-4 text-[#00FF66]" /> : <Moon className="w-4 h-4 text-[#111111]" />,
      action: () => onToggleTheme()
    },
    {
      id: 'hire',
      label: '$ sudo hire sukhvant (Direct Recruitment Pipeline)',
      category: 'Pipeline',
      icon: <Terminal className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />,
      action: () => onNavigateSection('contact')
    }
  ];

  const filteredCommands = commandItems.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, [isOpen, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredCommands.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-3 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#FFFFFF] dark:bg-[#080808] border border-[#E5E7E5] dark:border-[#151A15] rounded-2xl shadow-2xl overflow-hidden font-mono-tech text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#E5E7E5] dark:border-[#151A15] bg-[#FAFAFA] dark:bg-[#0C0C0C]">
          <Search className="w-4 h-4 text-[#00873D] dark:text-[#00FF66] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or jump to section..."
            className="w-full bg-transparent text-[#111111] dark:text-white placeholder:text-[#888888] dark:placeholder:text-[#666666] focus:outline-none font-mono text-xs sm:text-sm"
          />
          <kbd className="hidden sm:inline-block bg-[#E5E7E5] dark:bg-[#141414] text-[#666666] dark:text-[#8A8A8A] text-[10px] px-1.5 py-0.5 rounded border border-[#D5D7D5] dark:border-white/10 font-mono">
            ESC
          </kbd>
        </div>

        {/* Command Items List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-6 text-center text-[#777777] dark:text-[#666666] font-mono">
              No matching commands found.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={cmd.id}
                  id={`cmd-item-${cmd.id}`}
                  onClick={() => {
                    cmd.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-[#00A84F]/10 dark:bg-[#00FF66]/10 text-[#111111] dark:text-white border border-[#00A84F]/30 dark:border-[#00FF66]/30'
                      : 'text-[#555555] dark:text-[#A3A3A3] hover:text-black dark:hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className="shrink-0">{cmd.icon}</span>
                    <span className="truncate font-sans sm:text-xs font-normal">
                      {cmd.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#888888] dark:text-[#666666]">
                      {cmd.category}
                    </span>
                    {isSelected && (
                      <CornerDownLeft className="w-3 h-3 text-[#00873D] dark:text-[#00FF66]" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#FAFAFA] dark:bg-[#0D0D0D] border-t border-[#E5E7E5] dark:border-[#151A15] flex items-center justify-between text-[11px] text-[#777777] dark:text-[#666666] font-mono">
          <div className="flex items-center gap-2">
            <span>↑↓ to navigate</span>
            <span>&bull;</span>
            <span>↵ to select</span>
          </div>
          <span>SUKHVANT_PALETTE v2.6</span>
        </div>
      </div>
    </div>
  );
};
