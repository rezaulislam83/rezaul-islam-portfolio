import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { AchievementsActivitiesSection } from './components/AchievementsActivitiesSection';
import { CommandPalette } from './components/CommandPalette';
import { ContactSection } from './components/ContactSection';
import { ExperienceEducationSection } from './components/ExperienceEducationSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { ScrollProgress } from './components/ScrollProgress';
import { SkillsSection } from './components/SkillsSection';
import { NAV_SECTIONS } from './data/portfolio';

type Theme = 'dark' | 'light';

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem('ri-theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // Ignore storage read errors
  }
  return 'dark';
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [paletteOpen, setPaletteOpen] = useState<boolean>(false);

  // Sync theme class on <html> and persist in localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('ri-theme', theme);
    } catch {
      // Ignore storage write errors
    }
  }, [theme]);

  // Global Ctrl+K / Cmd+K shortcut for Command Palette
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Scroll spy for active section highlighting
  useEffect(() => {
    const sectionIds = NAV_SECTIONS.map((s) => s.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.35, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#070B14] dark:text-slate-100 transition-colors duration-200">
      <ScrollProgress />

      <Navbar
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceEducationSection />
        <AchievementsActivitiesSection />
        <ContactSection />
      </main>

      <Footer />

      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
}
