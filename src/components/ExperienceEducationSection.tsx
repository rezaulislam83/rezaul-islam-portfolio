import { Briefcase, GraduationCap } from 'lucide-react';
import { EDUCATION_HISTORY, EXPERIENCES } from '../data/portfolio';
import { SectionHeader } from './SectionHeader';

export function ExperienceEducationSection() {
  return (
    <>
      {/* 04. Professional Experience */}
      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="border-b border-slate-200/80 dark:border-slate-800/70 bg-slate-100/60 dark:bg-[#090E1A] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div id="experience-heading">
            <SectionHeader
              index="04"
              title="Professional Experience"
              subtitle="Hands-on experience delivering digital public services and guiding citizens through online workflows."
            />
          </div>

          <div className="relative pl-6 sm:pl-8">
            {/* Vertical timeline rail */}
            <div
              aria-hidden="true"
              className="absolute bottom-2 left-2.5 top-2 w-px bg-slate-300 dark:bg-slate-800"
            />

            <div className="space-y-8">
              {EXPERIENCES.map((exp) => (
                <article
                  key={exp.id}
                  className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] p-6 sm:p-8"
                >
                  {/* Timeline node */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-[22px] sm:-left-[30px] top-8 flex h-5 w-5 items-center justify-center rounded-full border border-blue-500/40 bg-white dark:bg-[#0D1322]"
                  >
                    <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-sky-400" />
                  </span>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs text-blue-600 dark:text-sky-400">
                        <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{exp.organization}</span>
                        <span aria-hidden="true">·</span>
                        <span>{exp.location}</span>
                      </div>
                      <h3 className="mt-1.5 font-display text-xl font-semibold text-slate-950 dark:text-white">
                        {exp.role}
                      </h3>
                    </div>

                    <span className="font-mono text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 tabular-nums shrink-0">
                      {exp.duration}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2.5 border-t border-slate-200/80 dark:border-slate-800 pt-5">
                    {exp.responsibilities.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm sm:text-[15px] leading-relaxed text-slate-600 dark:text-slate-300"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-sky-400"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 05. Education */}
      <section
        id="education"
        aria-labelledby="education-heading"
        className="border-b border-slate-200/80 dark:border-slate-800/70 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div id="education-heading">
            <SectionHeader
              index="05"
              title="Education"
              subtitle="Academic progression in Computer Science & Engineering and foundational science studies."
            />
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {EDUCATION_HISTORY.map((edu) => (
              <article
                key={edu.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1.5 text-blue-600 dark:text-sky-400">
                      <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="tabular-nums">{edu.period}</span>
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-slate-950 dark:text-white">
                    {edu.degree}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    {edu.institution}
                  </p>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {edu.field}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-200/80 dark:border-slate-800 pt-4 font-mono text-xs">
                  <span className="text-slate-500 dark:text-slate-400">
                    {edu.resultLabel}
                  </span>
                  <span className="text-sm font-semibold text-slate-950 dark:text-white tabular-nums">
                    {edu.resultValue}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
