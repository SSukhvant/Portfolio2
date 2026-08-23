import React from 'react';
import { Github, ArrowRight, Layers } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenCaseStudy }) => {
  return (
    <div
      className="bg-[#FAFAFA] dark:bg-[#080808] border border-[#E5E7E5] dark:border-[#151A15] hover:border-[#00A84F]/40 dark:hover:border-[#00FF66]/40 rounded-xl overflow-hidden transition-all flex flex-col justify-between group shadow-xs hover:shadow-sm"
    >
      {/* Top Header */}
      <div>
        <div className="bg-[#F0F0F0] dark:bg-[#0D0D0D] border-b border-[#E5E7E5] dark:border-[#151A15] px-4 py-2.5 flex items-center justify-between font-mono-tech text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] shadow-[0_0_6px_#00FF66]"></span>
            <span className="font-medium text-[#111111] dark:text-[#FFFFFF]">{project.title}</span>
          </div>
          <span className="text-[10px] text-[#00873D] dark:text-[#00FF66] bg-[#00A84F]/10 dark:bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00A84F]/30 dark:border-[#00FF66]/30 uppercase tracking-wider font-mono font-medium">
            {project.category}
          </span>
        </div>

        {/* Card Content */}
        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-xs sm:text-sm text-[#111111] dark:text-[#FFFFFF] font-normal leading-relaxed">
            {project.tagline}
          </p>

          <p className="text-xs text-[#555555] dark:text-[#8A8A8A] leading-relaxed font-light">
            {project.description}
          </p>

          {/* Architecture Summary Callout */}
          <div className="bg-[#FFFFFF] dark:bg-[#050505] border border-[#E5E7E5] dark:border-[#151A15] rounded-lg p-3 font-mono-tech text-[11px] text-[#555555] dark:text-[#8A8A8A]">
            <div className="text-[#00873D] dark:text-[#00FF66] font-semibold mb-1 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
              <Layers className="w-3 h-3 text-[#00873D] dark:text-[#00FF66]" />
              <span>ARCHITECTURE:</span>
            </div>
            <div className="text-[#222222] dark:text-[#C5C5C5] truncate font-light">
              {project.architectureSummary}
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-1.5 pt-1">
            <div className="font-mono-tech text-[10px] text-[#777777] dark:text-[#666666] uppercase tracking-widest flex items-center gap-1.5">
              <span className="text-[#00873D] dark:text-[#00FF66]">//</span>
              <span>KEY HIGHLIGHTS</span>
            </div>
            {project.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[#555555] dark:text-[#8A8A8A] font-light">
                <span className="text-[#00873D] dark:text-[#00FF66] font-bold mt-0.5">&gt;</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer & Actions */}
      <div className="p-5 sm:p-6 pt-0 space-y-4">
        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#E5E7E5] dark:border-[#151A15]">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono-tech text-[10px] bg-[#FFFFFF] dark:bg-[#0E0E0E] text-[#444444] dark:text-[#A3A3A3] border border-[#E5E7E5] dark:border-white/10 px-2 py-0.5 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-1 font-mono-tech text-xs">
          <button
            id={`open-case-study-${project.id}`}
            onClick={() => onOpenCaseStudy(project)}
            className="text-[#00873D] dark:text-[#00FF66] hover:text-[#00A84F] dark:hover:text-[#00D957] flex items-center gap-1.5 font-medium transition-colors tracking-wide text-xs cursor-pointer"
          >
            <span>[ Case Study & Architecture ]</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-[#666666] dark:text-[#8A8A8A] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-[#121212] transition-colors"
                title="View GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
