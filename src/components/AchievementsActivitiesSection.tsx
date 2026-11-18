import { Award, CheckCircle2, Compass } from 'lucide-react';
import { ACHIEVEMENTS, ACTIVITIES } from '../data/portfolio';
import { SectionHeader } from './SectionHeader';

export function AchievementsActivitiesSection() {
  return (
    <>
      {/* 06. Achievements & Certifications */}
      <section
        id="achievements"
        aria-labelledby="achievements-heading"
        className="border-b border-slate-200/80 dark:border-slate-800/70 bg-slate-100/60 dark:bg-[#090E1A] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div id="achievements-heading">
            <SectionHeader
              index="06"
              title="Achievements & Certifications"
              subtitle="Verified credentials, competitive programming standings, and specialized training programs."
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ACHIEVEMENTS.map((item) => (
              <article
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] p-6"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                      <Award
                        className="h-5 w-5 text-blue-600 dark:text-sky-400"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 text-right">
                      {item.type}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-base font-semibold leading-snug text-slate-950 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/80 dark:border-slate-800 pt-4 text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400">
                    {item.issuer}
                  </span>
                  {item.status && (
                    <span className="text-blue-600 dark:text-sky-400 font-medium">
                      {item.status}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 07. Extra-Curricular Activities */}
      <section
        id="activities"
        aria-labelledby="activities-heading"
        className="border-b border-slate-200/80 dark:border-slate-800/70 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div id="activities-heading">
            <SectionHeader
              index="07"
              title="Beyond Coding"
              subtitle="Student leadership, competitive programming participation, event organization, and volunteer service."
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ACTIVITIES.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] p-5"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-900 text-blue-600 dark:text-sky-400">
                  {activity.id.includes('member') || activity.id === 'diu-cpc' || activity.id === 'shopnodrosta' ? (
                    <Compass className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-semibold leading-snug text-slate-900 dark:text-slate-100">
                    {activity.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">
                    {activity.context}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
