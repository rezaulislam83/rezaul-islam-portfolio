import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJECTS } from '../data/portfolio';
import {
  buildMailtoHref,
  filterCommands,
  filterProjects,
  validateContactForm,
  type PaletteCommand,
} from './portfolioLogic';

test('filterProjects returns all projects when filter is "all"', () => {
  const result = filterProjects(PROJECTS, 'all');
  assert.equal(result.length, 3);
});

test('filterProjects narrows correctly by category', () => {
  const backend = filterProjects(PROJECTS, 'backend');
  assert.equal(backend.length, 1);
  assert.equal(backend[0].id, 'zero-pay');

  const ai = filterProjects(PROJECTS, 'ai-ml');
  assert.equal(ai.length, 1);
  assert.equal(ai[0].id, 'dental-xray-dl');
  assert.equal(ai[0].status, 'In Progress');

  const linux = filterProjects(PROJECTS, 'linux-server');
  assert.equal(linux.length, 1);
  assert.equal(linux[0].id, 'samba-server');
});

test('validateContactForm catches empty and malformed fields', () => {
  const errors = validateContactForm({
    name: 'A',
    email: 'not-an-email',
    subject: 'Hi',
    message: 'Too short',
  });

  assert.ok(errors.name);
  assert.ok(errors.email);
  assert.ok(errors.subject);
  assert.ok(errors.message);
  assert.equal(Object.keys(errors).length, 4);
});

test('validateContactForm passes for valid contact details', () => {
  const errors = validateContactForm({
    name: 'Sarah Ahmed',
    email: 'sarah@example.com',
    subject: 'Backend Collaboration',
    message: 'Hello Rezaul, I would like to discuss a Django API project with you.',
  });
  assert.equal(Object.keys(errors).length, 0);
});

test('buildMailtoHref formats encoded recipient, subject, and sender details', () => {
  const href = buildMailtoHref('rezaulislamakib@gmail.com', {
    name: 'Sarah Ahmed',
    email: 'sarah@example.com',
    subject: 'Project Inquiry',
    message: 'Let us connect regarding backend engineering.',
  });

  assert.ok(href.startsWith('mailto:rezaulislamakib@gmail.com?subject=Project%20Inquiry&body='));
  assert.ok(href.includes('Sarah%20Ahmed'));
  assert.ok(href.includes('sarah%40example.com'));
});

test('filterCommands matches label, keywords, and group case-insensitively', () => {
  const commands: PaletteCommand[] = [
    { id: 'nav-projects', label: 'Go to Projects', group: 'Navigate', keywords: 'work zero pay samba', sectionId: 'projects' },
    { id: 'action-theme', label: 'Toggle Light / Dark Theme', group: 'Actions', keywords: 'appearance mode' },
  ];

  assert.equal(filterCommands(commands, '').length, 2);
  assert.equal(filterCommands(commands, 'samba').length, 1);
  assert.equal(filterCommands(commands, 'THEME')[0].id, 'action-theme');
  assert.equal(filterCommands(commands, 'nonexistent').length, 0);
});
