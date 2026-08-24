import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AIOrb } from './AIOrb';
import { ThemeMode } from '../../types';

interface SukhvantAICoreProps {
  onOpen: () => void;
  isOpen: boolean;
  theme?: ThemeMode;
}

export const SukhvantAICore: React.FC<SukhvantAICoreProps> = ({ onOpen, isOpen, theme = 'dark' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="floating-ai-core"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ scale: 1.3, opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center select-none pointer-events-auto"
        >
          {/* Developer Tooltip on Hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="mb-2.5 px-3.5 py-1 rounded-full font-mono-tech text-[11px] shadow-lg flex items-center gap-2 whitespace-nowrap bg-[#080808]/95 dark:bg-[#080808]/95 light:bg-[#FFFFFF]/95 text-[#FFFFFF] dark:text-[#FFFFFF] border border-[#151A15] dark:border-[#151A15]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse"></div>
                <span className="font-medium">Ask Sukhvant AI</span>
                <span className="text-[#8A8A8A] text-[10px] bg-[#141414] px-1.5 py-0.5 rounded border border-white/10 font-mono">
                  ⌘ Click
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Interactive Core Trigger Pill */}
          <motion.button
            id="sukhvant-ai-core-trigger"
            onClick={onOpen}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Open Sukhvant AI Assistant"
            className={`group relative flex items-center gap-3 backdrop-blur-2xl  transition-all duration-300 rounded-full ${
              theme === 'dark'
                ? 'bg-[#050505]/95 border-white/15 hover:border-[#00FF66]/50 shadow-[0_8px_32px_rgba(0,0,0,0.85)]'
                : 'bg-[#FFFFFF]/95 border-[#E5E7E5] hover:border-[#00A84F]/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
            }`}
          >
            {/* Perfectly Circular Colorful AI Energy Core */}
            <div className="relative shrink-0">
              <AIOrb size="md" state={isHovered ? 'hover' : 'idle'} />
            </div>

            {/* Brand / Online Service Label */}
            {/* <div className="flex flex-col text-left pr-1.5">
              <div className="flex items-center gap-1.5">
                <span className={`font-mono-tech text-[11px] font-semibold tracking-wider transition-colors ${
                  theme === 'dark' ? 'text-white group-hover:text-[#00FF66]' : 'text-[#111111] group-hover:text-[#00873D]'
                }`}>
                  SUKHVANT AI
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] shadow-[0_0_6px_#00FF66]"></span>
              </div>
              <span className={`font-mono text-[9px] tracking-wider uppercase ${
                theme === 'dark' ? 'text-[#8A8A8A]' : 'text-[#666666]'
              }`}>
                ● ONLINE • v2.6
              </span>
            </div> */}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
