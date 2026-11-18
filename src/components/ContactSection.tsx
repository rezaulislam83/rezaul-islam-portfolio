import { useState, type FormEvent } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolio';
import { copyTextToClipboard } from '../utils/clipboard';
import {
  buildMailtoHref,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '../utils/portfolioLogic';
import { SectionHeader } from './SectionHeader';

const INITIAL_FORM: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function ContactSection() {
  const [formValues, setFormValues] = useState<ContactFormValues>(INITIAL_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [mailtoDraftUrl, setMailtoDraftUrl] = useState<string | null>(null);

  const handleCopy = async (field: 'email' | 'phone', value: string) => {
    const ok = await copyTextToClipboard(value);
    if (ok) {
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((current) => (current === field ? null : current));
      }, 2000);
    }
  };

  const handleChange = (field: keyof ContactFormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (mailtoDraftUrl) {
      setMailtoDraftUrl(null);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateContactForm(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMailtoDraftUrl(null);
      return;
    }

    const href = buildMailtoHref(PORTFOLIO_CONFIG.email, formValues);
    setErrors({});
    setMailtoDraftUrl(href);

    // Trigger default mail client via temporary anchor without opening a blank window
    const link = document.createElement('a');
    link.href = href;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-slate-100/60 dark:bg-[#090E1A] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div id="contact-heading">
          <SectionHeader
            index="08"
            title="Let's Connect"
            subtitle="I'm always interested in connecting with developers, learning new technologies, and exploring opportunities to build meaningful software solutions."
          />
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Headline + Direct Contact Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-950 dark:text-white text-balance">
                Have a project in mind or want to discuss technology?
              </h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Reach out directly via email, phone, or LinkedIn. You can also draft a message using the form, which opens in your email client.
              </p>
            </div>

            <div className="space-y-3.5">
              {/* Email Card */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] p-4">
                <div className="flex min-w-0 items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-900 text-blue-600 dark:text-sky-400">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      Email
                    </p>
                    <a
                      href={`mailto:${PORTFOLIO_CONFIG.email}`}
                      className="block truncate text-sm font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-sky-400"
                    >
                      {PORTFOLIO_CONFIG.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('email', PORTFOLIO_CONFIG.email)}
                  aria-label="Copy email address"
                  className="inline-flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 font-mono text-xs text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-sky-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone Card */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] p-4">
                <div className="flex min-w-0 items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-900 text-blue-600 dark:text-sky-400">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      Phone
                    </p>
                    <a
                      href={`tel:${PORTFOLIO_CONFIG.phoneRaw}`}
                      className="block truncate text-sm font-medium text-slate-900 dark:text-slate-100 tabular-nums hover:text-blue-600 dark:hover:text-sky-400"
                    >
                      {PORTFOLIO_CONFIG.phone}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('phone', PORTFOLIO_CONFIG.phone)}
                  aria-label="Copy phone number"
                  className="inline-flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 font-mono text-xs text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-sky-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {copiedField === 'phone' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-900 text-blue-600 dark:text-sky-400">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    Location
                  </p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {PORTFOLIO_CONFIG.location}
                  </p>
                </div>
              </div>

              {/* LinkedIn Card */}
              <a
                href={PORTFOLIO_CONFIG.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] p-4 hover:border-blue-500/50 dark:hover:border-sky-500/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-900 text-blue-600 dark:text-sky-400">
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      LinkedIn
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      My LinkedIn Profile
                    </p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: Validated Contact Form (Mailto Fallback) */}
          <div className="lg:col-span-7">
            <form
              noValidate
              onSubmit={handleSubmit}
              aria-label="Contact message form"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1322] p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formValues.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    placeholder="Your full name"
                    className="mt-1.5 block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-950 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="mt-1.5 text-xs text-rose-600 dark:text-rose-400"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formValues.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    placeholder="you@example.com"
                    className="mt-1.5 block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-950 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="mt-1.5 text-xs text-rose-600 dark:text-rose-400"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={formValues.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                  placeholder="Collaboration, project discussion, or opportunity"
                  className="mt-1.5 block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-950 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                {errors.subject && (
                  <p
                    id="contact-subject-error"
                    role="alert"
                    className="mt-1.5 text-xs text-rose-600 dark:text-rose-400"
                  >
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={formValues.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  placeholder="Write your message here..."
                  className="mt-1.5 block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-950 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    role="alert"
                    className="mt-1.5 text-xs text-rose-600 dark:text-rose-400"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Submitting validates your message and prepares an email draft via your mail client.
                </p>

                <button
                  type="submit"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0D1322]"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>Send Message</span>
                </button>
              </div>

              {mailtoDraftUrl && (
                <div
                  role="status"
                  className="mt-5 rounded-xl border border-blue-200 dark:border-sky-500/30 bg-blue-50/70 dark:bg-sky-500/10 p-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
                >
                  <p>
                    No email backend is connected on this static site—your email draft was prepared for{' '}
                    <span className="font-mono font-medium">{PORTFOLIO_CONFIG.email}</span>.
                  </p>
                  <a
                    href={mailtoDraftUrl}
                    className="mt-2 inline-flex items-center gap-1.5 font-medium text-blue-700 dark:text-sky-300 underline underline-offset-4"
                  >
                    <span>Open draft in email app</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
