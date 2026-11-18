import { PORTFOLIO_CONFIG } from '../data/portfolio';
import { SectionHeader } from './SectionHeader';

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-slate-200/80 dark:border-slate-800/70 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div id="about-heading">
          <SectionHeader
            index="01"
            title="About Me"
            subtitle="Academic foundation in Artificial Intelligence paired with practical backend and systems engineering."
          />
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Side: Professional Biography */}
          <div className="lg:col-span-7 space-y-5">
            {PORTFOLIO_CONFIG.summaryParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-base leading-7 text-slate-700 dark:text-slate-300"
              >
                {paragraph}
              </p>
            ))}

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                Current Focus &amp; Engineering Interests
              </h3>
              <ul className="mt-3 space-y-2.5">
                {PORTFOLIO_CONFIG.aboutHighlights.map((item) => (
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
            </div>
          </div>

          {/* Right Side: Compact Developer Information Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] p-6 sm:p-7">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <p className="font-mono text-xs text-blue-600 dark:text-sky-400">
                    profile.summary
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-slate-950 dark:text-white">
                    {PORTFOLIO_CONFIG.name}
                  </h3>
                </div>
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                  CSE · AI Major
                </span>
              </div>

              <dl className="mt-4 divide-y divide-slate-200/80 dark:divide-slate-800/80">
                {PORTFOLIO_CONFIG.quickFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-3.5"
                  >
                    <dt className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      {fact.label}
                    </dt>
                    <dd className="text-sm font-medium text-slate-900 dark:text-slate-100 tabular-nums sm:text-right">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
