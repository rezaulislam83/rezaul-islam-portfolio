import type { ProjectFilterCategory, ProjectItem } from '../data/portfolio';

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export interface PaletteCommand {
  id: string;
  label: string;
  group: 'Navigate' | 'Actions';
  keywords: string;
  sectionId?: string;
}

export function filterProjects(
  projects: ProjectItem[],
  filter: ProjectFilterCategory
): ProjectItem[] {
  if (filter === 'all') {
    return projects;
  }
  return projects.filter((project) => project.filterKey === filter);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  if (!values.email.trim() || !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.subject.trim() || values.subject.trim().length < 3) {
    errors.subject = 'Please enter a subject (at least 3 characters).';
  }

  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = 'Please enter a message (at least 10 characters).';
  }

  return errors;
}

export function buildMailtoHref(
  recipientEmail: string,
  values: ContactFormValues
): string {
  const subject = encodeURIComponent(values.subject.trim());
  const bodyLines = [
    `Hi Rezaul,`,
    '',
    values.message.trim(),
    '',
    '---',
    `From: ${values.name.trim()} (${values.email.trim()})`,
  ];
  const body = encodeURIComponent(bodyLines.join('\n'));
  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}

export function filterCommands(
  commands: PaletteCommand[],
  query: string
): PaletteCommand[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return commands;
  }
  return commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(normalized) ||
      cmd.keywords.toLowerCase().includes(normalized) ||
      cmd.group.toLowerCase().includes(normalized)
  );
}
