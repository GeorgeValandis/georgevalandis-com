import type { SiteLocale } from '@/lib/siteLocale';

export type PreviewCopy = {
  nav: {
    links: { label: string; href: string }[];
    cta: string;
  };
  hero: {
    badge: string;
    prefix: string;
    highlight: string;
    suffix: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    imageAlt: string;
  };
  apps: {
    eyebrow: string;
    title: string;
    viewAll: string;
    pause: string;
    resume: string;
    ariaLabel: string;
  };
  afterWork: {
    eyebrow: string;
    title: string;
    description: string;
    inputLabel: string;
    inputPlaceholder: string;
    submit: string;
    submitted: string;
    previewNote: string;
    helper: string;
    issue: string;
    imageAlt: string;
    footer: string;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    quote: string[];
    imageAlt: string;
  };
  blog: {
    eyebrow: string;
    posts: { title: string; excerpt: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
  };
  footer: string;
};

export const germanAppSubtitles: Record<string, string> = {
  flowa: 'Verstehe deinen Zyklus. Stärke deine Gesundheit',
  flower: 'Zyklus, Stimmung & Self-Care im Blick',
  moodflora: 'Stimmungen tracken. Wohlbefinden stärken',
  'my-grain-tracker': 'Migräneepisoden erfassen und Muster erkennen',
  glanceaway: 'Deine sanfte Erinnerung für gesunde Augen',
  'perfect-day': 'Tägliche Routinen & kleine Fortschritte',
  frokus: 'Besser fokussieren mit Pomodoro-Sessions',
  savetap: 'Alltägliche Entscheidungen in echtes Sparen verwandeln',
  'ring-sizer': 'Ringgrößen messen & umrechnen',
  quitergy: 'Energiegetränke & Koffein im Blick',
  axlo: 'Ein gemütlicher virtueller Axolotl-Begleiter',
  trexlo: 'Ein gemütlicher virtueller T-Rex-Begleiter',
  'store-reviews': 'Eine Inbox für deine App-Store-Bewertungen',
  medimemo: 'Medikamentenerinnerungen mit optionalem Lifetime-Unlock',
  notebuddy: 'Liebe Notizen & kleine Zeichnungen',
  lifechron: 'Dein Leben in Jahren, Monaten, Wochen und Tagen',
  nightlock: 'Kein versehentliches Scrollen nach 22:30 Uhr',
  'darts-scorekeeper': 'Dart-Anzeigetafel & 501-Scorer',
  'padel-scorekeeper': 'Schnelle Padel-Anzeige für Doppelmatches',
  'topf-budget': 'Monatsbudget, klar und übersichtlich',
  'one-sentence': 'Ein ruhiges Tagesjournal für einen wichtigen Gedanken',
};

export const previewCopy: Record<SiteLocale, PreviewCopy> = {
  en: {
    nav: {
      links: [
        { label: 'Home', href: '#preview-home' },
        { label: 'Apps', href: '#preview-apps' },
        { label: 'After Hours', href: '#preview-after-work' },
        { label: 'About', href: '#preview-about' },
        { label: 'Blog', href: '#preview-blog' },
        { label: 'Contact', href: '#preview-contact' },
      ],
      cta: "Let's Talk",
    },
    hero: {
      badge: 'iOS Developer · Solopreneur',
      prefix: 'I build',
      highlight: 'iOS apps',
      suffix: 'from 5 to 9.',
      description: "Indie iOS apps. Real problems. A calmer kind of work life. I'm George Valandis, an independent developer based in Germany, building useful tools for everyday life.",
      primaryCta: 'Explore My Apps',
      secondaryCta: 'Get in Touch',
      imageAlt: 'A warm late-night developer desk with a laptop and notebook',
    },
    apps: {
      eyebrow: '01 — Apps',
      title: 'My iOS apps',
      viewAll: 'View all apps',
      pause: 'Pause motion',
      resume: 'Resume motion',
      ariaLabel: 'All apps',
    },
    afterWork: {
      eyebrow: 'George Valandis — After Work',
      title: 'Notes from building apps after everyone else goes offline.',
      description: 'A short note every week about apps, decisions, and the work behind them.',
      inputLabel: 'Email address',
      inputPlaceholder: 'Your email address',
      submit: 'Get the next note',
      submitted: "You're on the list",
      previewNote: 'Preview confirmation only — MailerLite will be connected after visual approval.',
      helper: 'One calm note per week. No noise.',
      issue: 'Issue 001',
      imageAlt: 'A late-night desk with a laptop, notebook, coffee and city lights',
      footer: 'Apps / Decisions / A calmer kind of progress',
    },
    about: {
      eyebrow: '02 — About',
      title: 'Building apps, one idea at a time.',
      description: "I'm George Valandis, an indie iOS developer and solopreneur based in Germany. I build apps because I enjoy turning ideas into something real — useful tools that make everyday life a little bit better.",
      cta: 'More about me',
      quote: ['An idea becomes', 'a product when', 'patience gives it shape.', '— George'],
      imageAlt: 'George Valandis working at his desk in the evening',
    },
    blog: {
      eyebrow: '03 — Blog',
      posts: [
        { title: 'Finding a Better Rhythm While the App List Keeps Growing', excerpt: "Quick update from me. The app list keeps growing, and I'm trying to find a better rhythm between building, improving, and sharing..." },
        { title: 'Juggling 7 Apps and Finding My Way Back', excerpt: "Quick update from me. Right now, I'm juggling 7 apps, getting back into content after a short personal break..." },
        { title: 'Focus on Marketing', excerpt: "Quick update on what I've been diving into lately. I've started shifting gears towards marketing my apps..." },
      ],
    },
    contact: {
      eyebrow: '04 — Contact',
      title: "Let's work together.",
    },
    footer: 'Preview version · George Valandis',
  },
  de: {
    nav: {
      links: [
        { label: 'Start', href: '#preview-home' },
        { label: 'Apps', href: '#preview-apps' },
        { label: 'After Hours', href: '#preview-after-work' },
        { label: 'Über mich', href: '#preview-about' },
        { label: 'Blog', href: '#preview-blog' },
        { label: 'Kontakt', href: '#preview-contact' },
      ],
      cta: 'Kontakt aufnehmen',
    },
    hero: {
      badge: 'iOS-Entwickler · Solopreneur',
      prefix: 'Ich baue',
      highlight: 'iOS-Apps',
      suffix: 'von 17 bis 21 Uhr.',
      description: 'Indie-iOS-Apps. Echte Probleme. Eine ruhigere Art zu arbeiten. Ich bin George Valandis, unabhängiger Entwickler aus Deutschland, und baue nützliche Werkzeuge für den Alltag.',
      primaryCta: 'Meine Apps ansehen',
      secondaryCta: 'Kontakt aufnehmen',
      imageAlt: 'Ein warmer Entwicklerarbeitsplatz am späten Abend mit Laptop und Notizbuch',
    },
    apps: {
      eyebrow: '01 — Apps',
      title: 'Meine iOS-Apps',
      viewAll: 'Alle Apps ansehen',
      pause: 'Bewegung pausieren',
      resume: 'Bewegung fortsetzen',
      ariaLabel: 'Alle Apps',
    },
    afterWork: {
      eyebrow: 'George Valandis — After Work',
      title: 'Notizen vom App-Bauen, nachdem alle anderen offline gegangen sind.',
      description: 'Eine kurze Notiz pro Woche über Apps, Entscheidungen und die Arbeit dahinter.',
      inputLabel: 'E-Mail-Adresse',
      inputPlaceholder: 'Deine E-Mail-Adresse',
      submit: 'Nächste Ausgabe erhalten',
      submitted: 'Du bist dabei',
      previewNote: 'Nur eine Preview-Bestätigung — MailerLite wird nach der visuellen Freigabe verbunden.',
      helper: 'Eine ruhige Notiz pro Woche. Kein Rauschen.',
      issue: 'Ausgabe 001',
      imageAlt: 'Ein nächtlicher Schreibtisch mit Laptop, Notizbuch, Kaffee und Stadtlichtern',
      footer: 'Apps / Entscheidungen / Ein ruhigerer Fortschritt',
    },
    about: {
      eyebrow: '02 — Über mich',
      title: 'Apps bauen, eine Idee nach der anderen.',
      description: 'Ich bin George Valandis, Indie-iOS-Entwickler und Solopreneur aus Deutschland. Ich baue Apps, weil ich es mag, Ideen in etwas Echtes zu verwandeln — in nützliche Werkzeuge, die den Alltag ein kleines bisschen besser machen.',
      cta: 'Mehr über mich',
      quote: ['Aus einer Idee wird', 'ein Produkt, wenn', 'Geduld ihr Form gibt.', '— George'],
      imageAlt: 'George Valandis arbeitet abends an seinem Schreibtisch',
    },
    blog: {
      eyebrow: '03 — Blog',
      posts: [
        { title: 'Einen besseren Rhythmus finden, obwohl die App-Liste weiter wächst', excerpt: 'Ein kurzes Update von mir. Die App-Liste wächst weiter und ich versuche, einen besseren Rhythmus zwischen Bauen, Verbessern und Teilen zu finden ...' },
        { title: '7 Apps jonglieren und wieder zurückfinden', excerpt: 'Ein kurzes Update von mir. Gerade jongliere ich mit 7 Apps und finde nach einer kurzen persönlichen Pause wieder zurück zum Content ...' },
        { title: 'Fokus auf Marketing', excerpt: 'Ein kurzes Update zu dem, womit ich mich gerade beschäftige. Ich richte meinen Fokus langsam stärker auf das Marketing meiner Apps ...' },
      ],
    },
    contact: {
      eyebrow: '04 — Kontakt',
      title: 'Lass uns zusammenarbeiten.',
    },
    footer: 'Preview-Version · George Valandis',
  },
};
