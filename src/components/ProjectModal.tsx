import { useEffect } from 'react';
import { Clock, ExternalLink, Github, X } from 'lucide-react';
import type { ProjectItem } from '../data/portfolio';
import { ProjectArtwork } from './ProjectArtwork';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-xs"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900/90 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <ProjectArtwork variant={project.artworkVariant} title={project.title} />

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="text-blue-600 dark:text-sky-400">{project.categoryLabel}</span>
            {project.status && (
              <>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-300 font-medium">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{project.status}</span>
                </span>
              </>
            )}
          </div>

          <h3
            id="project-modal-title"
            className="mt-2 font-display text-xl sm:text-2xl font-bold text-slate-950 dark:text-white"
          >
            {project.title}
          </h3>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {project.summary}
          </p>

          <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-5">
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Engineering Highlights
            </h4>
            <ul className="mt-3 space-y-2.5">
              {project.details.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-sky-400"
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-5">
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Technologies Used
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-2.5 py-1 font-mono text-xs text-slate-700 dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {(project.githubUrl || project.liveUrl) && (
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-200 dark:border-slate-800 pt-5">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:border-blue-500"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>Source Code</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
