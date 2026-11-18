import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Copy,
  Download,
  ExternalLink,
  Moon,
  Search,
  Sun,
  X,
} from 'lucide-react';
import { NAV_SECTIONS, PORTFOLIO_CONFIG } from '../data/portfolio';
import { copyTextToClipboard } from '../utils/clipboard';
import { filterCommands, type PaletteCommand } from '../utils/portfolioLogic';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<PaletteCommand[]>(() => {
    const navCmds: PaletteCommand[] = [
      ...NAV_SECTIONS.map((s) => ({
        id: `nav-${s.id}`,
        label: `Go to ${s.label}`,
        group: 'Navigate' as const,
        keywords: `${s.label} section jump scroll`,
        sectionId: s.id,
      })),
      {
        id: 'nav-activities',
        label: 'Go to Beyond Coding',
        group: 'Navigate',
        keywords: 'extra curricular activities clubs leadership',
        sectionId: 'activities',
      },
    ];

    const actionCmds: PaletteCommand[] = [
      {
        id: 'action-theme',
        label:
          theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
        group: 'Actions',
        keywords: 'theme dark light mode appearance toggle',
      },
      {
        id: 'action-copy-email',
        label: `Copy Email (${PORTFOLIO_CONFIG.email})`,
        group: 'Actions',
        keywords: 'copy email contact mail',
      },
      {
        id: 'action-download-cv',
        label: 'Download CV (PDF)',
        group: 'Actions',
        keywords: 'resume cv pdf download',
      },
      {
        id: 'action-linkedin',
        label: 'Open LinkedIn Profile',
        group: 'Actions',
        keywords: 'linkedin social profile external',
      },
    ];

    return [...navCmds, ...actionCmds];
  }, [theme]);

  const filtered = useMemo(
    () => filterCommands(commands, query),
    [commands, query]
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setActionNotice(null);
      window.setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const executeCommand = async (cmd: PaletteCommand) => {
    if (cmd.sectionId) {
      onClose();
      const target = document.getElementById(cmd.sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (cmd.id === 'action-theme') {
      onToggleTheme();
      onClose();
      return;
    }

    if (cmd.id === 'action-copy-email') {
      const ok = await copyTextToClipboard(PORTFOLIO_CONFIG.email);
      if (ok) {
        setActionNotice(`Copied ${PORTFOLIO_CONFIG.email}`);
        window.setTimeout(() => onClose(), 800);
      } else {
        setActionNotice('Clipboard unavailable');
      }
      return;
    }

    if (cmd.id === 'action-download-cv') {
      const a = document.createElement('a');
      a.href = PORTFOLIO_CONFIG.cvDownloadPath;
      a.download = PORTFOLIO_CONFIG.cvDownloadFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      onClose();
      return;
    }

    if (cmd.id === 'action-linkedin') {
      const a = document.createElement('a');
      a.href = PORTFOLIO_CONFIG.linkedinUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filtered.length > 0 ? (prev + 1) % filtered.length : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filtered.length > 0
            ? (prev - 1 + filtered.length) % filtered.length
            : 0
        );
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        executeCommand(filtered[selectedIndex]);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/70 px-4 pt-20 sm:pt-28 backdrop-blur-xs"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
          <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search sections or actions"
            placeholder="Type a section or action..."
            className="w-full bg-transparent text-sm text-slate-950 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
              No matching commands found.
            </p>
          ) : (
            <ul role="listbox" aria-label="Available commands" className="space-y-1">
              {filtered.map((cmd, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <li key={cmd.id}>
                    <button
                      type="button"
                      onClick={() => executeCommand(cmd)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors ${
                        isSelected
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-600/20 dark:text-sky-300'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 font-medium">
                        {cmd.id === 'action-theme' ? (
                          theme === 'dark' ? (
                            <Sun className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <Moon className="h-4 w-4" aria-hidden="true" />
                          )
                        ) : cmd.id === 'action-copy-email' ? (
                          <Copy className="h-4 w-4" aria-hidden="true" />
                        ) : cmd.id === 'action-download-cv' ? (
                          <Download className="h-4 w-4" aria-hidden="true" />
                        ) : cmd.id === 'action-linkedin' ? (
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <ArrowRight className="h-4 w-4 opacity-70" aria-hidden="true" />
                        )}
                        <span>{cmd.label}</span>
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">
                        {cmd.group}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 px-4 py-2.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <span>
            {actionNotice ?? 'Use ↑↓ arrows to navigate, Enter to select'}
          </span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
