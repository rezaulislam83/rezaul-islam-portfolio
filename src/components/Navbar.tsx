import { useState, useEffect } from 'react';
import { Download, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { NAV_SECTIONS, PORTFOLIO_CONFIG } from '../data/portfolio';

interface NavbarProps {
  activeSection: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenPalette: () => void;
}

export function Navbar({
  activeSection,
  theme,
  onToggleTheme,
  onOpenPalette,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-white/85 dark:bg-[#070B14]/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-1"
        >
          {PORTFOLIO_CONFIG.brand}
        </a>

        {/* Zone 2: Concise single-line desktop navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-6"
        >
          {NAV_SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(section.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-[13px] xl:text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded ${
                  isActive
                    ? 'text-blue-600 dark:text-sky-400'
                    : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-100'
                }`}
              >
                {section.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-blue-600 dark:bg-sky-400"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Interactive utility actions + Primary Download CV button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            title="Command Palette (Ctrl+K)"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 px-2.5 py-1.5 text-xs font-mono text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden xl:inline">Search</span>
            <kbd className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
              Ctrl K
            </kbd>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-950 dark:hover:text-white transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <a
            href={PORTFOLIO_CONFIG.cvDownloadPath}
            download={PORTFOLIO_CONFIG.cvDownloadFilename}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 px-4 py-2 text-xs xl:text-sm font-medium text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#070B14]"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Download CV</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex lg:hidden h-11 w-11 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-lg px-4 pb-6 pt-3"
        >
          <nav aria-label="Mobile navigation" className="grid grid-cols-2 gap-2">
            {NAV_SECTIONS.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(section.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-[44px] items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-sky-300'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/70'
                  }`}
                >
                  {section.label}
                </a>
              );
            })}
          </nav>

          <div className="mt-4 flex flex-col gap-2.5 border-t border-slate-200 dark:border-slate-800 pt-4">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPalette();
              }}
              className="flex min-h-[44px] w-full items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              <span className="inline-flex items-center gap-2">
                <Search className="h-4 w-4" aria-hidden="true" />
                <span>Command Palette</span>
              </span>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                Ctrl K
              </span>
            </button>

            <a
              href={PORTFOLIO_CONFIG.cvDownloadPath}
              download={PORTFOLIO_CONFIG.cvDownloadFilename}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-sm font-medium text-white transition-colors"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
