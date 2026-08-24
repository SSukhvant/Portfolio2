import React, { useState, useEffect } from 'react';
import { ThemeMode } from './types';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { AIEngineeringSection } from './components/ai-engineering/AIEngineeringSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { GithubStatusSection } from './components/github/GithubStatusSection';
import { CurrentlyBuildingSection } from './components/currently-building/CurrentlyBuildingSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/ui/Footer';
import { SukhvantAICore } from './components/ai/SukhvantAICore';
import { SukhvantAIPanel } from './components/ai/SukhvantAIPanel';
import { CommandPalette } from './components/command-palette/CommandPalette';
import { ResumeModal } from './components/resume/ResumeModal';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      element.classList.add('ring-1', 'ring-[#00FF66]/50', 'transition-all');
      setTimeout(() => element.classList.remove('ring-1', 'ring-[#00FF66]/50'), 1400);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#000000] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#111111]'} transition-colors duration-200`}>
      <Navbar theme={theme} onToggleTheme={handleToggleTheme} onOpenCommandPalette={() => setIsCmdPaletteOpen(true)} onOpenAI={() => setIsAIOpen(true)} />
      <main className="relative">
        <HeroSection onOpenAI={() => setIsAIOpen(true)} onOpenResume={() => setIsResumeOpen(true)} onScrollToSection={handleScrollToSection} />
        <AboutSection onOpenAI={() => setIsAIOpen(true)} onScrollToSection={handleScrollToSection} />
        <AIEngineeringSection onOpenAI={() => setIsAIOpen(true)} onScrollToSection={handleScrollToSection} />
        <ProjectsSection onOpenAI={() => setIsAIOpen(true)} />
        <ExperienceSection />
        <SkillsSection onScrollToSection={handleScrollToSection} />
        <GithubStatusSection />
        <CurrentlyBuildingSection />
        <ContactSection />
      </main>
      <Footer onOpenCommandPalette={() => setIsCmdPaletteOpen(true)} />
      <SukhvantAICore isOpen={isAIOpen} onOpen={() => setIsAIOpen(true)} />
      <SukhvantAIPanel isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} onNavigateSection={handleScrollToSection} onOpenResume={() => setIsResumeOpen(true)} theme={theme} />
      <CommandPalette isOpen={isCmdPaletteOpen} onClose={() => setIsCmdPaletteOpen(false)} theme={theme} onToggleTheme={handleToggleTheme} onOpenAI={() => { setIsCmdPaletteOpen(false); setIsAIOpen(true); }} onOpenResume={() => { setIsCmdPaletteOpen(false); setIsResumeOpen(true); }} onNavigateSection={handleScrollToSection} />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}
