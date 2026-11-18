import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setProgress(ratio * 100);
      setShowTopBtn(scrollTop > 420);
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Reading progress bar at the top edge */}
      <div
        aria-hidden="true"
        className="fixed left-0 top-0 z-50 h-[2px] w-full bg-transparent pointer-events-none"
      >
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 transition-[width] duration-75 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Back to top button */}
      {showTopBtn && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
          className="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 shadow-lg backdrop-blur-md hover:border-blue-500/60 hover:text-blue-600 dark:hover:text-sky-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </>
  );
}
