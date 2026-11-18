import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  Terminal,
} from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolio';
import { copyTextToClipboard } from '../utils/clipboard';

const DEVELOPER_SNIPPET = `const developer = {
  name: "Rezaul Islam",
  role: "AI & Backend Engineer",
  passion: ["Coding", "Problem Solving", "Technology"]
};`;

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [portraitError, setPortraitError] = useState(false);
  const [snippetCopied, setSnippetCopied] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const interval = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PORTFOLIO_CONFIG.cyclingRoles.length);
    }, 3200);
    return () => window.clearInterval(interval);
  }, []);

  const handleCopySnippet = async () => {
    const ok = await copyTextToClipboard(DEVELOPER_SNIPPET);
    if (ok) {
      setSnippetCopied(true);
      window.setTimeout(() => setSnippetCopied(false), 1800);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800/70 bg-dev-grid"
    >
      {/* Subtle atmospheric light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-blue-500/10 dark:bg-blue-600/12 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Terminal prompt, identity, headline, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0D1322]/90 px-3.5 py-2 font-mono text-xs sm:text-sm text-slate-700 dark:text-sky-300 shadow-xs">
              <Terminal className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400" aria-hidden="true" />
              <span>{PORTFOLIO_CONFIG.terminalPrompt}</span>
              <span
                aria-hidden="true"
                className="inline-block h-4 w-2 bg-blue-600 dark:bg-sky-400 animate-cursor"
              />
            </div>

            <p className="mt-6 text-base sm:text-lg font-medium text-slate-600 dark:text-slate-300">
              Hi, I&apos;m{' '}
              <span className="text-slate-950 dark:text-white font-semibold">
                {PORTFOLIO_CONFIG.name}
              </span>
            </p>

            <h1 className="mt-2 font-display text-[clamp(2.25rem,4.3vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-slate-950 dark:text-white text-balance max-w-2xl">
              {PORTFOLIO_CONFIG.title}
            </h1>

            {/* Animated cycling role */}
            <div className="mt-4 flex h-8 items-center gap-2.5 text-sm sm:text-base font-mono text-blue-700 dark:text-sky-300">
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-500">
                &gt;
              </span>
              <span
                key={PORTFOLIO_CONFIG.cyclingRoles[roleIndex]}
                className="inline-block animate-role-in"
              >
                {PORTFOLIO_CONFIG.cyclingRoles[roleIndex]}
              </span>
            </div>

            <p className="mt-4 max-w-xl text-base sm:text-[17px] leading-relaxed text-slate-600 dark:text-slate-300">
              {PORTFOLIO_CONFIG.heroSupportingText}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('projects');
                }}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#070B14]"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 hover:border-slate-400 dark:hover:border-slate-500 px-5 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-100 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Links (GitHub shown strictly when real URL is configured) */}
            <div className="mt-7 flex flex-wrap items-center gap-5 text-sm text-slate-600 dark:text-slate-400">
              <a
                href={PORTFOLIO_CONFIG.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-blue-600 dark:hover:text-sky-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1 py-0.5"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>

              {PORTFOLIO_CONFIG.githubUrl.trim().length > 0 && (
                <a
                  href={PORTFOLIO_CONFIG.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-blue-600 dark:hover:text-sky-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1 py-0.5"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
              )}

              <a
                href={`mailto:${PORTFOLIO_CONFIG.email}`}
                className="inline-flex items-center gap-2 hover:text-blue-600 dark:hover:text-sky-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1 py-0.5"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>{PORTFOLIO_CONFIG.email}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Portrait Frame + Stack Tags + Code Editor Panel */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-5">
            <div className="relative w-full max-w-md">
              {/* Subtle blue/indigo glow behind portrait */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 rounded-3xl bg-gradient-to-tr from-blue-600/20 via-sky-400/15 to-indigo-500/20 blur-2xl"
              />

              {/* Visual workspace card containing portrait + stack index + code panel */}
              <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0D1322]/95 p-5 shadow-xl shadow-slate-900/5 dark:shadow-black/40">
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  {/* Rounded portrait frame */}
                  <div className="relative shrink-0">
                    <div
                      aria-hidden="true"
                      className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-500/50 via-sky-400/40 to-indigo-500/50 blur-sm"
                    />
                    <div className="relative h-40 w-32 sm:h-44 sm:w-36 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">
                      {!portraitError ? (
                        <img
                          src={PORTFOLIO_CONFIG.portraitUrl}
                          alt="Portrait of Rezaul Islam"
                          referrerPolicy="no-referrer"
                          onError={() => setPortraitError(true)}
                          className="h-full w-full object-cover object-top"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 text-slate-200">
                          <span className="font-display text-2xl font-bold">RI</span>
                          <span className="mt-1 font-mono text-[11px] text-slate-400">
                            Rezaul Islam
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Floating/surrounding technology tags cleanly organized */}
                  <div className="flex-1 text-center sm:text-left">
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      Core Stack &amp; Exploration
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                      Dhaka, Bangladesh
                    </p>
                    <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-1.5">
                      {PORTFOLIO_CONFIG.heroStackTags.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-900/90 px-2 py-1 font-mono text-[11px] text-slate-700 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Syntax-highlighted code editor panel */}
                <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-100">
                  <div className="flex items-center justify-between border-b border-slate-800 px-3.5 py-2">
                    <span className="font-mono text-[11px] text-slate-400">
                      developer.ts
                    </span>
                    <button
                      type="button"
                      onClick={handleCopySnippet}
                      aria-label="Copy developer code snippet"
                      className="inline-flex items-center gap-1.5 rounded px-2 py-1 font-mono text-[11px] text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      {snippetCopied ? (
                        <>
                          <Check className="h-3 w-3 text-sky-400" aria-hidden="true" />
                          <span className="text-sky-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="overflow-x-auto p-3.5 font-mono text-xs leading-6">
                    <code>
                      <span className="text-indigo-400">const</span>{' '}
                      <span className="text-sky-300">developer</span>{' '}
                      <span className="text-slate-400">=</span>{' '}
                      <span className="text-slate-300">{'{'}</span>
                      {'\n'}
                      {'  '}
                      <span className="text-slate-300">name:</span>{' '}
                      <span className="text-emerald-300">&quot;Rezaul Islam&quot;</span>
                      <span className="text-slate-400">,</span>
                      {'\n'}
                      {'  '}
                      <span className="text-slate-300">role:</span>{' '}
                      <span className="text-emerald-300">&quot;AI &amp; Backend Engineer&quot;</span>
                      <span className="text-slate-400">,</span>
                      {'\n'}
                      {'  '}
                      <span className="text-slate-300">passion:</span>{' '}
                      <span className="text-slate-300">[</span>
                      <span className="text-amber-300">&quot;Coding&quot;</span>
                      <span className="text-slate-400">,</span>{' '}
                      <span className="text-amber-300">&quot;Problem Solving&quot;</span>
                      <span className="text-slate-400">,</span>{' '}
                      <span className="text-amber-300">&quot;Technology&quot;</span>
                      <span className="text-slate-300">]</span>
                      {'\n'}
                      <span className="text-slate-300">{'};'}</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
