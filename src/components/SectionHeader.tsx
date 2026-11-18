interface SectionHeaderProps {
  index: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ index, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-10 sm:mb-12 max-w-2xl">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm font-medium text-blue-600 dark:text-sky-400 tabular-nums">
          {index}.
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white text-balance">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}
