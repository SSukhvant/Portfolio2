import React, { useState, useEffect } from 'react';
import { Terminal, Command, Sun, Moon, Menu, X } from 'lucide-react';
import { ThemeMode } from '../../types';
import { AIOrb } from '../ai/AIOrb';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenCommandPalette: () => void;
  onOpenAI: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenCommandPalette,
  onOpenAI
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: 'about', label: '01 ABOUT' },
    { id: 'ai-engineering', label: '02 AI' },
    { id: 'projects', label: '03 WORK' },
    { id: 'experience', label: '04 EXP' },
    { id: 'skills', label: '05 SKILLS' },
    { id: 'contact', label: '06 CONTACT' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'ai-engineering', 'projects', 'experience', 'skills', 'github', 'currently-building', 'contact'];
      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? theme === 'dark'
            ? 'bg-[#000000]/95 backdrop-blur-md border-b border-[#151A15] shadow-lg shadow-black/80'
            : 'bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E5E7E5] shadow-sm'
          : theme === 'dark'
          ? 'bg-[#000000]/70 backdrop-blur-sm border-b border-transparent'
          : 'bg-[#FFFFFF]/70 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Linux Prompt */}
        <button
          id="nav-brand-btn"
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2.5 group text-left"
        >
          <div className="w-2 h-2 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66] group-hover:scale-125 transition-transform"></div>
          <span className={`font-mono-tech text-xs font-semibold tracking-widest transition-colors ${
            theme === 'dark' ? 'text-[#FFFFFF] group-hover:text-[#00FF66]' : 'text-[#111111] group-hover:text-[#00A84F]'
          }`}>
            SUKHVANT.DEV
          </span>
          <span className={`hidden sm:inline-block font-mono-tech text-[10px] tracking-wider uppercase border px-1.5 py-0.5 rounded ${
            theme === 'dark' ? 'text-[#8A8A8A] border-white/10' : 'text-[#666666] border-black/10'
          }`}>
            v2.6.0
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className={`hidden lg:flex items-center gap-1 border rounded-full px-2.5 py-1 shadow-sm ${
          theme === 'dark' ? 'bg-[#080808] border-[#151A15]' : 'bg-[#F5F5F5] border-[#E5E7E5]'
        }`}>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`font-mono-tech text-[11px] tracking-wider uppercase px-3 py-1 rounded-full transition-all duration-150 relative ${
                  isActive
                    ? theme === 'dark'
                      ? 'text-[#00FF66] bg-[#00FF66]/10 border border-[#00FF66]/30 font-medium'
                      : 'text-[#00A84F] bg-white font-medium shadow-xs'
                    : theme === 'dark'
                    ? 'text-[#8A8A8A] hover:text-[#FFFFFF] hover:bg-white/[0.04]'
                    : 'text-[#555555] hover:text-[#111111] hover:bg-black/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: AI Quick Launch, Command Palette & Theme */}
        <div className="flex items-center gap-2">
          {/* Ask AI Mini Button with Colorful AI Orb */}
          <button
            id="nav-ai-btn"
            onClick={onOpenAI}
            className={`hidden sm:flex items-center gap-2 font-mono-tech text-xs border px-2.5 py-1.5 rounded-lg transition-all shadow-sm group ${
              theme === 'dark'
                ? 'text-[#FFFFFF] bg-[#080808] hover:bg-[#121212] border-[#151A15] hover:border-[#00FF66]/40'
                : 'text-[#111111] bg-[#F5F5F5] hover:bg-[#EBEBEB] border-[#E0E0E0]'
            }`}
            title="Open Sukhvant AI Core"
          >
            <AIOrb size="sm" state="idle" showOrbitalRing={false} />
            <span className="font-medium tracking-wider text-[11px]">AI CORE</span>
          </button>

          {/* Command Palette Trigger ⌘K */}
          <button
            id="nav-command-palette-btn"
            onClick={onOpenCommandPalette}
            className={`flex items-center gap-1.5 font-mono-tech text-xs border px-2.5 py-1.5 rounded-lg transition-all shadow-sm ${
              theme === 'dark'
                ? 'bg-[#080808] hover:bg-[#121212] border-[#151A15] hover:border-white/20 text-[#8A8A8A] hover:text-[#FFFFFF]'
                : 'bg-[#F5F5F5] hover:bg-[#EBEBEB] border-[#E0E0E0] text-[#555555] hover:text-[#111111]'
            }`}
            title="Open Command Palette (⌘K or Ctrl+K)"
          >
            <Command className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[10px] tracking-widest font-mono-tech">⌘K</span>
          </button>

          {/* Theme Toggle (Dark Primary / Light Option) */}
          <button
            id="nav-theme-toggle-btn"
            onClick={onToggleTheme}
            className={`p-1.5 rounded-lg border transition-colors ${
              theme === 'dark'
                ? 'bg-[#080808] hover:bg-[#121212] border-[#151A15] text-[#8A8A8A] hover:text-[#FFFFFF]'
                : 'bg-[#F5F5F5] hover:bg-[#EBEBEB] border-[#E0E0E0] text-[#555555] hover:text-[#111111]'
            }`}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#00FF66]" />
            ) : (
              <Moon className="w-4 h-4 text-[#111111]" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="nav-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-1.5 rounded-lg border ${
              theme === 'dark'
                ? 'bg-[#080808] border-[#151A15] text-[#FFFFFF]'
                : 'bg-[#F5F5F5] border-[#E0E0E0] text-[#111111]'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200 ${
          theme === 'dark' ? 'bg-[#050505] border-[#151A15]' : 'bg-[#FFFFFF] border-[#E5E7E5]'
        }`}>
          <div className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase tracking-widest px-3 pb-1">
            WORKSTATION DIRECTORY
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-link-${item.id}`}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left font-mono-tech text-xs tracking-wider px-3 py-2 rounded-md transition-colors flex items-center justify-between ${
                activeSection === item.id
                  ? theme === 'dark'
                    ? 'text-[#00FF66] bg-[#00FF66]/10 font-medium border-l-2 border-[#00FF66]'
                    : 'text-[#00A84F] bg-[#F5F5F5] font-medium border-l-2 border-[#00A84F]'
                  : theme === 'dark'
                  ? 'text-[#8A8A8A] hover:text-[#FFFFFF] hover:bg-white/[0.04]'
                  : 'text-[#555555] hover:text-[#111111] hover:bg-black/5'
              }`}
            >
              <span>{item.label}</span>
              <span className="text-[#8A8A8A] text-xs">→</span>
            </button>
          ))}
          <div className="pt-2 border-t border-white/10 flex items-center gap-2">
            <button
              id="mobile-nav-ai-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAI();
              }}
              className="flex-1 font-mono-tech text-xs bg-[#080808] text-[#FFFFFF] border border-[#151A15] py-2 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <AIOrb size="sm" state="idle" showOrbitalRing={false} />
              <span>Ask Sukhvant AI</span>
            </button>
            <button
              id="mobile-nav-cmd-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="px-3 py-2 font-mono-tech text-xs bg-[#080808] border border-[#151A15] text-[#8A8A8A] rounded-lg"
            >
              ⌘K
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
