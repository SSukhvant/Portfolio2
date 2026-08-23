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

  // Initialize theme class on html tag
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Keyboard shortcut for Command Palette (⌘K or Ctrl+K)
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

  const handleToggleTheme = () => {
    const newTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });

      // Highlight target section briefly with green developer accent
      element.classList.add('ring-1', 'ring-[#00FF66]/50', 'transition-all');
      setTimeout(() => {
        element.classList.remove('ring-1', 'ring-[#00FF66]/50');
      }, 1400);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#000000] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#111111]'} transition-colors duration-200`}>
      
      {/* Sticky Developer Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenCommandPalette={() => setIsCmdPaletteOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
      />

      {/* Main Workstation Layout */}
      <main className="relative">
        {/* Hero Section with Asymmetric Layout & Large Interactive Terminal */}
        <HeroSection
          onOpenAI={() => setIsAIOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          onScrollToSection={handleScrollToSection}
        />

        {/* 01 / ABOUT Section (README.md, Filesystem tree, 4 Capabilities) */}
        <AboutSection
          onOpenAI={() => setIsAIOpen(true)}
          onScrollToSection={handleScrollToSection}
        />

        {/* 02 / AI ENGINEERING Section (Architecture Signal Flow, MCP, Agents) */}
        <AIEngineeringSection
          onOpenAI={() => setIsAIOpen(true)}
          onScrollToSection={handleScrollToSection}
        />

        {/* 03 / WORK (Featured Engineering Projects & Case Study Modals) */}
        <ProjectsSection
          onOpenAI={() => setIsAIOpen(true)}
        />

        {/* 04 / EXPERIENCE (Git Commit Log Tree & Role Inspector) */}
        <ExperienceSection />

        {/* 05 / TECHNICAL SKILLS (Interactive Clusters & Cross-References) */}
        <SkillsSection
          onScrollToSection={handleScrollToSection}
        />

        {/* 06 / GITHUB & REPOSITORIES (git status) */}
        <GithubStatusSection />

        {/* 07 / CURRENTLY BUILDING (Active Sprints) */}
        <CurrentlyBuildingSection />

        {/* 08 / CONTACT (./contact.sh, Direct Channels) */}
        <ContactSection />
      </main>

      {/* System Developer Footer */}
      <Footer
        onOpenCommandPalette={() => setIsCmdPaletteOpen(true)}
      />

      {/* Signature Feature: Floating Sukhvant AI Core at Bottom Center */}
      <SukhvantAICore
        isOpen={isAIOpen}
        onOpen={() => setIsAIOpen(true)}
      />

      {/* Expanded Sukhvant AI Service Panel */}
      <SukhvantAIPanel
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onNavigateSection={handleScrollToSection}
        theme={theme}
      />

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCmdPaletteOpen}
        onClose={() => setIsCmdPaletteOpen(false)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenAI={() => {
          setIsCmdPaletteOpen(false);
          setIsAIOpen(true);
        }}
        onOpenResume={() => {
          setIsCmdPaletteOpen(false);
          setIsResumeOpen(true);
        }}
        onNavigateSection={handleScrollToSection}
      />

      {/* Resume Modal ($ cat resume.pdf) */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

    </div>
  );
}
