import {
  Brain,
  Cloud,
  Code2,
  Database,
  Server,
  Wrench,
} from 'lucide-react';
import { SKILL_CATEGORIES, type SkillCategory } from '../data/portfolio';
import { SectionHeader } from './SectionHeader';

function SkillIcon({ name }: { name: SkillCategory['iconName'] }) {
  const iconClass = 'h-5 w-5 text-blue-600 dark:text-sky-400';
  switch (name) {
    case 'code':
      return <Code2 className={iconClass} aria-hidden="true" />;
    case 'server':
      return <Server className={iconClass} aria-hidden="true" />;
    case 'database':
      return <Database className={iconClass} aria-hidden="true" />;
    case 'brain':
      return <Brain className={iconClass} aria-hidden="true" />;
    case 'cloud':
      return <Cloud className={iconClass} aria-hidden="true" />;
    case 'wrench':
      return <Wrench className={iconClass} aria-hidden="true" />;
  }
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-b border-slate-200/80 dark:border-slate-800/70 bg-slate-100/60 dark:bg-[#090E1A] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div id="skills-heading">
          <SectionHeader
            index="02"
            title="Technical Arsenal"
            subtitle="Core languages, backend frameworks, artificial intelligence coursework, and system tools—presented honestly alongside active learning areas."
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category) => (
            <article
              key={category.id}
              className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] p-6 transition-colors duration-150 hover:border-blue-500/40 dark:hover:border-sky-500/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90">
                    <SkillIcon name={category.iconName} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-slate-950 dark:text-white">
                      {category.title}
                    </h3>
                    {category.focusNote && (
                      <p className="mt-0.5 font-mono text-[11px] text-blue-600 dark:text-sky-400">
                        {category.focusNote}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/70 px-2.5 py-1 text-xs sm:text-[13px] font-medium text-slate-700 dark:text-slate-300"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
