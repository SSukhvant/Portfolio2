import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { projectsData } from '../../data/projects';
import { Project } from '../../types';
import { ProjectCard } from './ProjectCard';
import { ProjectCaseStudyModal } from './ProjectCaseStudyModal';
import { Filter } from 'lucide-react';

interface ProjectsSectionProps {
  onOpenAI: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenAI }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCaseStudyProject, setActiveCaseStudyProject] = useState<Project | null>(null);

  const categories = ['All', 'AI Engineering', 'Full Stack', 'Frontend Architecture', 'Client Platforms'];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 border-b border-[#E5E7E5] dark:border-white/10 bg-[#FFFFFF] dark:bg-[#000000] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="03 / WORK"
          title="FEATURED ENGINEERING CASE STUDIES"
          subtitle="Production web applications, database-backed architectures, and AI product implementations."
          commandPrompt="ls -la ~/sukhvant/projects"
        />

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-[#FAFAFA] dark:bg-[#080808] border border-[#E5E7E5] dark:border-[#151A15] p-3.5 rounded-xl font-mono-tech text-xs shadow-xs">
          <div className="flex items-center gap-2 text-[#555555] dark:text-[#8A8A8A]">
            <Filter className="w-3.5 h-3.5 text-[#00873D] dark:text-[#00FF66]" />
            <span className="uppercase text-[11px] font-semibold text-[#111111] dark:text-[#FFFFFF] tracking-wider">Filter by subsystem:</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-cat-${cat.replace(/[^a-zA-Z0-9]/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg transition-all text-xs tracking-wider uppercase font-mono cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#00FF66] text-black font-semibold shadow-[0_0_10px_rgba(0,255,102,0.3)]'
                    : 'bg-[#FFFFFF] dark:bg-[#0E0E0E] text-[#444444] dark:text-[#A3A3A3] hover:text-black dark:hover:text-white border border-[#E5E7E5] dark:border-white/10 hover:border-[#00A84F]/40 dark:hover:border-[#00FF66]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenCaseStudy={(proj) => setActiveCaseStudyProject(proj)}
            />
          ))}
        </div>

        {/* Case Study Modal */}
        <ProjectCaseStudyModal
          project={activeCaseStudyProject}
          onClose={() => setActiveCaseStudyProject(null)}
        />
      </div>
    </section>
  );
};
