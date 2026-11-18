import { ArrowUp, Linkedin, Mail } from 'lucide-react';
import { NAV_SECTIONS, PORTFOLIO_CONFIG } from '../data/portfolio';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#070B14] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-display text-base font-semibold text-slate-950 dark:text-white">
              Designed &amp; Built by {PORTFOLIO_CONFIG.name}
            </p>
            <p className="mt-2 font-mono text-xs text-blue-600 dark:text-sky-400">
              console.log(&quot;Thanks for visiting my portfolio!&quot;);
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600 dark:text-slate-400"
          >
            {NAV_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="hover:text-slate-950 dark:hover:text-white transition-colors"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-slate-200/80 dark:border-slate-800/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            &copy; {currentYear} {PORTFOLIO_CONFIG.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={PORTFOLIO_CONFIG.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
            >
              <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${PORTFOLIO_CONFIG.email}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Email</span>
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-sky-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Back to top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
