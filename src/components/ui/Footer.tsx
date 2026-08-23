import React from 'react';
import { Shield, ArrowUpRight } from 'lucide-react';
import { profileData } from '../../data/profile';
import { socialsData } from '../../data/skills';

interface FooterProps {
  onOpenCommandPalette: () => void;
  onOpenTerminalEasterEgg?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCommandPalette }) => {
  return (
    <footer className="border-t border-[#E5E7E5] dark:border-[#151A15] bg-[#FFFFFF] dark:bg-[#000000] text-[#666666] dark:text-[#8A8A8A] font-mono-tech text-xs pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative z-10 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#E5E7E5] dark:border-[#151A15]">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF66] shadow-[0_0_6px_#00FF66] animate-pulse"></span>
              <span className="font-editorial-serif text-lg text-[#111111] dark:text-white font-normal tracking-wide">SUKHVANT SINGH</span>
              <span className="text-[#888888] dark:text-[#555555]">::</span>
              <span className="text-[#00873D] dark:text-[#00FF66] text-xs font-mono font-medium">portfolio-workstation</span>
            </div>
            <p className="text-[#555555] dark:text-[#8A8A8A] text-xs max-w-md leading-relaxed font-sans font-light">
              Full Stack Developer & AI Engineer specializing in modern Next.js architectures, scalable Node.js services, and context-aware AI agent workflows.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                id="footer-email-link"
                href={`mailto:${profileData.contactEmail}`}
                className="text-[#222222] dark:text-[#E5E5E5] hover:text-[#00873D] dark:hover:text-[#00FF66] hover:underline flex items-center gap-1 font-mono transition-colors"
              >
                <span>{profileData.contactEmail}</span>
                <ArrowUpRight className="w-3 h-3 text-[#777777] dark:text-[#666666]" />
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-[#111111] dark:text-white font-semibold text-xs tracking-widest uppercase mb-3 font-mono">
              SYSTEM SPECS
            </div>
            <div className="space-y-1.5 text-[#666666] dark:text-[#666666] font-mono">
              <div className="flex justify-between">
                <span>build:</span>
                <span className="text-[#333333] dark:text-[#A3A3A3]">production-v2.6</span>
              </div>
              <div className="flex justify-between">
                <span>framework:</span>
                <span className="text-[#333333] dark:text-[#A3A3A3]">React 19 / Vite</span>
              </div>
              <div className="flex justify-between">
                <span>runtime:</span>
                <span className="text-[#333333] dark:text-[#A3A3A3]">node-linux-x64</span>
              </div>
              <div className="flex justify-between">
                <span>status:</span>
                <span className="text-[#00873D] dark:text-[#00FF66] flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] shadow-[0_0_6px_#00FF66]"></span>
                  operational
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-[#111111] dark:text-white font-semibold text-xs tracking-widest uppercase mb-3 font-mono">
              QUICK COMMANDS
            </div>
            <div className="space-y-1.5 font-mono">
              <button
                id="footer-cmd-palette-btn"
                onClick={onOpenCommandPalette}
                className="w-full text-left text-[#444444] dark:text-[#A3A3A3] hover:text-[#00873D] dark:hover:text-[#00FF66] transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>⌘K Command Palette</span>
                <span className="text-[#00873D] dark:text-[#00FF66] text-[10px] bg-[#F0F0F0] dark:bg-[#0E0E0E] px-1.5 py-0.5 rounded border border-[#E5E7E5] dark:border-[#151A15]">⌘K</span>
              </button>
              <a
                id="footer-github-link"
                href={socialsData.github}
                target="_blank"
                rel="noreferrer"
                className="block text-[#444444] dark:text-[#A3A3A3] hover:text-[#00873D] dark:hover:text-[#00FF66] transition-colors"
              >
                $ git remote -v (GitHub)
              </a>
              <a
                id="footer-linkedin-link"
                href={socialsData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="block text-[#444444] dark:text-[#A3A3A3] hover:text-[#00873D] dark:hover:text-[#00FF66] transition-colors"
              >
                $ open linkedin/sukhvant
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#777777] dark:text-[#666666] text-xs font-mono">
          <div>
            © {profileData.currentYear} Sukhvant Singh. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#00873D] dark:text-[#00FF66]">
              <Shield className="w-3 h-3" />
              <span>verified portfolio record</span>
            </span>
            <span className="text-[#CCCCCC] dark:text-[#333333]">|</span>
            <span className="text-[#777777] dark:text-[#666666]">$ exit 0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
