import { useState } from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import {
  PROJECTS,
  PROJECT_FILTER_OPTIONS,
  type ProjectFilterCategory,
  type ProjectItem,
} from '../data/portfolio';
import { filterProjects } from '../utils/portfolioLogic';
import { ProjectArtwork } from './ProjectArtwork';
import { ProjectModal } from './ProjectModal';
import { SectionHeader } from './SectionHeader';

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const visibleProjects = filterProjects(PROJECTS, activeFilter);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-b border-slate-200/80 dark:border-slate-800/70 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div id="projects-heading">
            <SectionHeader
              index="03"
              title="Featured Projects"
              subtitle="Practical systems across Java & MySQL backends, Linux server administration, and deep learning research."
            />
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="mb-8 lg:mb-12 inline-flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-[#0D1322] p-1"
          >
            {PROJECT_FILTER_OPTIONS.map((option) => {
              const isSelected = activeFilter === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActiveFilter(option.key)}
                  className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isSelected
                      ? 'bg-white dark:bg-blue-600 text-slate-950 dark:text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          data-testid="projects-grid"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              data-testid={`project-card-${project.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/50 dark:hover:border-sky-500/50"
            >
              <div className="border-b border-slate-200 dark:border-slate-800">
                <ProjectArtwork variant={project.artworkVariant} title={project.title} />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="truncate text-blue-600 dark:text-sky-400">
                    {project.categoryLabel}
                  </span>
                  {project.status && (
                    <span className="inline-flex shrink-0 items-center gap-1 text-amber-600 dark:text-amber-300 font-medium whitespace-nowrap">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{project.status}</span>
                    </span>
                  )}
                </div>

                <h3 className="mt-2.5 font-display text-lg font-semibold leading-snug text-slate-950 dark:text-white">
                  {project.title}
                </h3>

                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {project.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 px-2 py-0.5 font-mono text-[11px] text-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-200/80 dark:border-slate-800/80 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    aria-label={`View details for ${project.title}`}
                    className="inline-flex min-h-[36px] items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-sky-400 hover:text-blue-700 dark:hover:text-sky-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
                  >
                    <span>Project Details</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      Repository
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
