import React, { useEffect } from 'react';
import { X, Terminal, Github, Layers, Shield } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#FFFFFF] dark:bg-[#080808] border border-[#E5E7E5] dark:border-[#151A15] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] font-mono-tech text-[#111111] dark:text-[#E5E5E5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Window Header */}
        <div className="bg-[#FAFAFA] dark:bg-[#0D0D0D] border-b border-[#E5E7E5] dark:border-[#151A15] px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <Terminal className="w-4 h-4 text-[#00873D] dark:text-[#00FF66]" />
            <span className="font-semibold text-[#111111] dark:text-white">{project.title}</span>
            <span className="text-[#888888] dark:text-[#555555]">/</span>
            <span className="text-[#666666] dark:text-[#8A8A8A] text-xs">case-study.md</span>
          </div>

          <button
            id="close-case-study-btn"
            onClick={onClose}
            title="Close Case Study (Esc)"
            className="p-1.5 rounded-lg text-[#666666] dark:text-[#8A8A8A] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6 text-xs sm:text-sm">
          
          {/* Header Summary */}
          <div className="border-b border-[#E5E7E5] dark:border-[#151A15] pb-4 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] bg-[#00A84F]/10 dark:bg-[#00FF66]/10 text-[#00873D] dark:text-[#00FF66] border border-[#00A84F]/30 dark:border-[#00FF66]/30 px-2.5 py-0.5 rounded uppercase tracking-wider font-medium font-mono">
                {project.category}
              </span>
              <span className="text-xs text-[#888888] dark:text-[#555555]">&bull;</span>
              <span className="text-xs text-[#555555] dark:text-[#A3A3A3] font-light">{project.tagline}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="bg-[#F0F0F0] dark:bg-[#0E0E0E] text-[#444444] dark:text-[#A3A3A3] border border-[#E5E7E5] dark:border-white/10 px-2 py-0.5 rounded text-[11px]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* SECTION: OVERVIEW */}
          <div className="space-y-2 font-sans">
            <h4 className="font-mono-tech text-xs text-[#00873D] dark:text-[#00FF66] font-medium uppercase tracking-wider">
              ## 01. OVERVIEW
            </h4>
            <p className="text-[#555555] dark:text-[#A3A3A3] leading-relaxed font-light">
              {project.caseStudy.overview}
            </p>
          </div>

          {/* SECTION: THE PROBLEM */}
          <div className="space-y-2 font-sans">
            <h4 className="font-mono-tech text-xs text-[#00873D] dark:text-[#00FF66] font-medium uppercase tracking-wider">
              ## 02. THE PROBLEM
            </h4>
            <p className="text-[#555555] dark:text-[#A3A3A3] leading-relaxed font-light">
              {project.caseStudy.problem}
            </p>
          </div>

          {/* SECTION: THE APPROACH */}
          <div className="space-y-2 font-sans">
            <h4 className="font-mono-tech text-xs text-[#00873D] dark:text-[#00FF66] font-medium uppercase tracking-wider">
              ## 03. THE APPROACH
            </h4>
            <p className="text-[#555555] dark:text-[#A3A3A3] leading-relaxed font-light">
              {project.caseStudy.approach}
            </p>
          </div>

          {/* SECTION: ARCHITECTURE */}
          <div className="space-y-2 bg-[#FAFAFA] dark:bg-[#050505] border border-[#E5E7E5] dark:border-[#151A15] p-4 rounded-xl">
            <h4 className="font-mono-tech text-xs text-[#00873D] dark:text-[#00FF66] font-medium uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#00873D] dark:text-[#00FF66]" />
              ## 04. SYSTEM ARCHITECTURE
            </h4>
            <p className="font-sans text-xs text-[#555555] dark:text-[#A3A3A3] leading-relaxed mb-2 font-light">
              {project.caseStudy.architecture}
            </p>
            <div className="text-[11px] text-[#111111] dark:text-white bg-[#FFFFFF] dark:bg-[#0E0E0E] p-2.5 rounded border border-[#E5E7E5] dark:border-white/10">
              <code>{project.architectureSummary}</code>
            </div>
          </div>

          {/* SECTION: KEY FEATURES */}
          <div className="space-y-2 font-sans">
            <h4 className="font-mono-tech text-xs text-[#00873D] dark:text-[#00FF66] font-medium uppercase tracking-wider">
              ## 05. KEY FEATURES & DELIVERABLES
            </h4>
            <ul className="space-y-1.5 text-[#555555] dark:text-[#A3A3A3] text-xs sm:text-sm font-light">
              {project.caseStudy.keyFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#00873D] dark:text-[#00FF66] font-bold mt-0.5">&gt;</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION: CHALLENGES */}
          <div className="space-y-2 font-sans">
            <h4 className="font-mono-tech text-xs text-[#00873D] dark:text-[#00FF66] font-medium uppercase tracking-wider">
              ## 06. ENGINEERING CHALLENGES & RESOLUTION
            </h4>
            <p className="text-[#555555] dark:text-[#A3A3A3] leading-relaxed font-light">
              {project.caseStudy.challenges}
            </p>
          </div>

          {/* SECTION: IMPACT */}
          <div className="space-y-2 font-sans bg-[#00A84F]/[0.05] dark:bg-[#00FF66]/[0.03] border border-[#00A84F]/30 dark:border-[#00FF66]/20 p-4 rounded-xl">
            <h4 className="font-mono-tech text-xs text-[#00873D] dark:text-[#00FF66] font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#00873D] dark:text-[#00FF66]" />
              ## 07. MEASURED IMPACT & OUTCOMES
            </h4>
            <p className="text-[#222222] dark:text-[#E5E5E5] leading-relaxed font-light">
              {project.caseStudy.impact}
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAFAFA] dark:bg-[#0D0D0D] border-t border-[#E5E7E5] dark:border-[#151A15] px-6 py-3.5 flex items-center justify-between text-xs">
          <div className="text-[#666666] dark:text-[#8A8A8A]">
            Verified Workstation Case Study
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-[#FFFFFF] dark:bg-[#0E0E0E] hover:bg-[#F0F0F0] dark:hover:bg-[#151515] text-[#222222] dark:text-white border border-[#E5E7E5] dark:border-white/10 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="bg-[#00FF66] text-black font-semibold px-4 py-1.5 rounded-lg hover:bg-[#00D957] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
