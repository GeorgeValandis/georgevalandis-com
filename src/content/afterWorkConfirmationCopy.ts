import type { SiteLocale } from '@/lib/siteLocale';

type AfterWorkConfirmationCopy = {
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
  primaryCta: string;
  privacyLink: string;
  languageCode: string;
  languageLabel: string;
  issueLabel: string;
  imageAlt: string;
  imageCaption: string;
  footer: string;
};

export const afterWorkConfirmationCopy: Record<SiteLocale, AfterWorkConfirmationCopy> = {
  en: {
    eyebrow: 'After Work / Newsletter',
    title: "You're in.",
    description: 'Your email address is confirmed.',
    detail:
      'The next note about building useful apps after everyone else goes offline will arrive in your inbox.',
    primaryCta: 'Back to the website',
    privacyLink: 'Privacy & cookies',
    languageCode: 'DE',
    languageLabel: 'Switch language to German',
    issueLabel: 'Issue 001',
    imageAlt: 'A softly lit developer desk with a laptop, monitor, notebook and coffee',
    imageCaption: 'A little room for the next idea.',
    footer: 'Apps / Decisions / A calmer kind of progress',
  },
  de: {
    eyebrow: 'After Work / Newsletter',
    title: 'Du bist dabei.',
    description: 'Deine E-Mail-Adresse ist bestätigt.',
    detail:
      'Die nächste Notiz über nützliche Apps, nachdem alle anderen offline gehen, landet in deinem Postfach.',
    primaryCta: 'Zur Website',
    privacyLink: 'Datenschutz & Cookies',
    languageCode: 'EN',
    languageLabel: 'Switch language to English',
    issueLabel: 'Ausgabe 001',
    imageAlt: 'Ein sanft beleuchteter Entwicklerarbeitsplatz mit Laptop, Monitor, Notizbuch und Kaffee',
    imageCaption: 'Ein bisschen Raum für die nächste Idee.',
    footer: 'Apps / Entscheidungen / Ein ruhigerer Fortschritt',
  },
};
