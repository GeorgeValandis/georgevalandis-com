import type { SiteLocale } from '@/lib/siteLocale';

export type PreviewCopy = {
  nav: {
    links: { label: string; href: string }[];
    cta: string;
  };
  hero: {
    badge: [string, string];
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
    ariaLabel: string;
  };
  afterWork: {
    eyebrow: string;
    title: string;
    description: string;
    expectations: string[];
    inputLabel: string;
    inputPlaceholder: string;
    submit: string;
    submitted: string;
    confirmationRequired: string;
    alreadySubscribed: string;
    consentSaving: string;
    consentRecorded: string;
    consentError: string;
    legalNotice: string;
    privacyLink: string;
    previewNote: string;
    helper: string;
    issue: string;
    galleryTitle: string;
    imageAlt: string;
    footer: string;
    galleryLabel: string;
    gallery: { image: string; alt: string; caption: string }[];
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
    title: string;
    viewAll: string;
    postsBySlug: Record<string, { title: string; excerpt: string }>;
  };
  contact: {
    eyebrow: string;
    title: string;
  };
  footer: {
    copyright: string;
    cookieSettings: string;
    privacy: string;
    imprint: string;
    setup: string;
    backToTop: string;
  };
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
        { label: 'Newsletter', href: '#preview-after-work' },
        { label: 'Bio', href: '#preview-about' },
        { label: 'Blog', href: '#preview-blog' },
        { label: 'Contact', href: '#preview-contact' },
      ],
      cta: "Let's Talk",
    },
    hero: {
      badge: ['iOS Developer', 'Solopreneur'],
      prefix: 'I build',
      highlight: 'iOS apps',
      suffix: 'from 5 to 9.',
      description: "Indie iOS apps. Real problems. A calmer kind of work life. I'm George Valandis, an independent developer based in Germany, building useful tools for everyday life.",
      primaryCta: 'Explore My Apps',
      secondaryCta: 'Join my Newsletter',
      imageAlt: 'A warm late-night developer desk with a laptop and notebook',
    },
    apps: {
      eyebrow: '01 — Apps',
      title: 'My Apps',
      viewAll: 'View all apps',
      ariaLabel: 'All apps',
    },
    afterWork: {
      eyebrow: 'George Valandis — Afterwork Newsletter',
      title: 'Notes from building apps after everyone else goes offline.',
      description: "A short weekly note about the apps I'm building, the decisions behind them, and what I learn along the way.",
      expectations: [
        "What I'm building and what I'm stuck on",
        "I'll share new betas here first",
        'Want to talk indie apps? Just hit reply',
      ],
      inputLabel: 'Email address',
      inputPlaceholder: 'you@your.email',
      submit: 'Subscribe',
      submitted: 'Thanks for signing up',
      confirmationRequired: 'Please confirm your email',
      alreadySubscribed: 'You are already subscribed. No further action is needed.',
      consentSaving: 'Saving…',
      consentRecorded: "If a confirmation is needed, you'll receive an email.",
      consentError: 'Something went wrong. Please try again.',
      legalNotice: 'By subscribing, you agree to receive the Afterwork Newsletter. You can unsubscribe at any time.',
      privacyLink: 'Privacy details',
      previewNote: 'After subscribing, check your inbox to confirm.',
      helper: 'One calm note per week. No noise.',
      issue: 'Issue 001',
      galleryTitle: 'Afterwork Newsletter',
      imageAlt: 'A late-night desk with a laptop, notebook, coffee and city lights',
      footer: 'Apps / Decisions / A calmer kind of progress',
      galleryLabel: 'Afterwork Newsletter preview',
      gallery: [
        {
          image: '/after-work-preview/newsletter-social-desk-01.webp',
          alt: 'A warm developer desk with a laptop, external monitor, code and a compact keyboard',
          caption: 'The work gets quieter. The ideas get clearer.',
        },
        {
          image: '/after-work-preview/newsletter-social-desk-02.webp',
          alt: 'A dark late-night coding desk with two glowing screens and a coffee cup',
          caption: 'Keep a little room for the next idea.',
        },
        {
          image: '/after-work-preview/newsletter-social-desk-03.webp',
          alt: 'A softly lit developer workstation with a laptop, monitor, notebook and coffee',
          caption: 'Make something worth coming back to.',
        },
      ],
    },
    about: {
      eyebrow: '02 — Bio',
      title: 'Building apps, one idea at a time.',
      description: "I'm George Valandis, an indie iOS developer and solopreneur based in Germany. I build apps because I enjoy turning ideas into something real — useful tools that make everyday life a little bit better.",
      cta: 'More about me',
      quote: ['An idea becomes', 'a product when', 'patience gives it shape.', '— George'],
      imageAlt: 'George Valandis',
    },
    blog: {
      eyebrow: '03 — Blog',
      title: 'Latest from the journey.',
      viewAll: 'View all posts',
      postsBySlug: {
        'finding-a-better-rhythm-while-the-app-list-keeps-growing': {
          title: 'Finding a Better Rhythm While the App List Keeps Growing',
          excerpt: 'A look at finding a steadier rhythm between building new apps, improving existing products, and sharing the work honestly.',
        },
        'juggling-7-apps-taking-a-breath-and-creating-more-long-form-content': {
          title: 'Juggling 7 Apps and Finding My Way Back',
          excerpt: "I'm juggling seven apps, returning to content after a short break, and experimenting with longer-form videos.",
        },
        'focus-on-marketing': {
          title: 'Focus on Marketing',
          excerpt: "I'm shifting more attention from building apps to marketing them, learning how UGC, short-form video, and story shape discovery.",
        },
      },
    },
    contact: {
      eyebrow: '04 — Contact',
      title: "Let's work together.",
    },
    footer: {
      copyright: '© 2026 George Valandis.',
      cookieSettings: 'Cookie Information',
      privacy: 'Website Privacy & Cookies',
      imprint: 'Imprint',
      setup: 'My setup',
      backToTop: 'Back to top',
    },
  },
  de: {
    nav: {
      links: [
        { label: 'Start', href: '#preview-home' },
        { label: 'Apps', href: '#preview-apps' },
        { label: 'Newsletter', href: '#preview-after-work' },
        { label: 'Bio', href: '#preview-about' },
        { label: 'Blog', href: '#preview-blog' },
        { label: 'Kontakt', href: '#preview-contact' },
      ],
      cta: 'Kontakt aufnehmen',
    },
    hero: {
      badge: ['iOS-Entwickler', 'Solopreneur'],
      prefix: 'Ich baue',
      highlight: 'iOS-Apps',
      suffix: 'von 17 bis 21 Uhr.',
      description: 'Indie-iOS-Apps. Echte Probleme. Eine ruhigere Art zu arbeiten. Ich bin George Valandis, unabhängiger Entwickler aus Deutschland, und baue nützliche Werkzeuge für den Alltag.',
      primaryCta: 'Meine Apps ansehen',
      secondaryCta: 'Newsletter abonnieren',
      imageAlt: 'Ein warmer Entwicklerarbeitsplatz am späten Abend mit Laptop und Notizbuch',
    },
    apps: {
      eyebrow: '01 — Apps',
      title: 'Meine Apps',
      viewAll: 'Alle Apps ansehen',
      ariaLabel: 'Alle Apps',
    },
    afterWork: {
      eyebrow: 'George Valandis — Afterwork-Newsletter',
      title: 'Notizen vom App-Bauen, nachdem alle anderen offline gegangen sind.',
      description: 'Eine kurze wöchentliche Notiz über die Apps, die ich baue, die Entscheidungen dahinter und das, was ich dabei lerne.',
      expectations: [
        'Was ich baue und woran ich gerade hänge',
        'Neue Betas teile ich zuerst hier',
        'Fragen zu Indie-Apps? Schreib mir einfach',
      ],
      inputLabel: 'E-Mail-Adresse',
      inputPlaceholder: 'du@deine.email',
      submit: 'Abonnieren',
      submitted: 'Danke für deine Anmeldung',
      confirmationRequired: 'Bitte bestätige deine E-Mail-Adresse',
      alreadySubscribed: 'Du bist bereits angemeldet. Es ist nichts weiter nötig.',
      consentSaving: 'Wird gespeichert …',
      consentRecorded: 'Wenn eine Bestätigung erforderlich ist, erhältst du eine E-Mail.',
      consentError: 'Das hat nicht geklappt. Bitte versuche es erneut.',
      legalNotice: 'Mit deiner Anmeldung stimmst du dem Afterwork-Newsletter zu. Du kannst dich jederzeit abmelden.',
      privacyLink: 'Datenschutz',
      previewNote: 'Nach der Anmeldung erhältst du eine E-Mail zur Bestätigung.',
      helper: 'Eine ruhige Notiz pro Woche. Kein Rauschen.',
      issue: 'Ausgabe 001',
      galleryTitle: 'Afterwork-Newsletter',
      imageAlt: 'Ein nächtlicher Schreibtisch mit Laptop, Notizbuch, Kaffee und Stadtlichtern',
      footer: 'Apps / Entscheidungen / Ein ruhigerer Fortschritt',
      galleryLabel: 'Afterwork-Newsletter-Vorschau',
      gallery: [
        {
          image: '/after-work-preview/newsletter-social-desk-01.webp',
          alt: 'Warm beleuchteter Entwickler-Schreibtisch mit Laptop, Monitor, Code und kompakter Tastatur',
          caption: 'Die Arbeit wird ruhiger. Die Ideen werden klarer.',
        },
        {
          image: '/after-work-preview/newsletter-social-desk-02.webp',
          alt: 'Dunkler nächtlicher Coding-Schreibtisch mit zwei leuchtenden Bildschirmen und einer Tasse Kaffee',
          caption: 'Lass ein wenig Raum für die nächste Idee.',
        },
        {
          image: '/after-work-preview/newsletter-social-desk-03.webp',
          alt: 'Weich beleuchteter Entwickler-Arbeitsplatz mit Laptop, Monitor, Notizbuch und Kaffee',
          caption: 'Baue etwas, zu dem du gern zurückkehrst.',
        },
      ],
    },
    about: {
      eyebrow: '02 — Bio',
      title: 'Apps bauen, eine Idee nach der anderen.',
      description: 'Ich bin George Valandis, Indie-iOS-Entwickler und Solopreneur aus Deutschland. Ich baue Apps, weil ich es mag, Ideen in etwas Echtes zu verwandeln — in nützliche Werkzeuge, die den Alltag ein kleines bisschen besser machen.',
      cta: 'Mehr über mich',
      quote: ['Aus einer Idee wird', 'ein Produkt, wenn', 'Geduld ihr Form gibt.', '— George'],
      imageAlt: 'George Valandis',
    },
    blog: {
      eyebrow: '03 — Blog',
      title: 'Aktuelles aus meiner Reise.',
      viewAll: 'Alle Beiträge ansehen',
      postsBySlug: {
        'finding-a-better-rhythm-while-the-app-list-keeps-growing': {
          title: 'Einen besseren Rhythmus finden, während die App-Liste wächst',
          excerpt: 'Ein Blick darauf, wie ich zwischen neuen Apps, Verbesserungen bestehender Produkte und ehrlichem Teilen einen ruhigeren Rhythmus finde.',
        },
        'juggling-7-apps-taking-a-breath-and-creating-more-long-form-content': {
          title: '7 Apps jonglieren und wieder meinen Weg finden',
          excerpt: 'Ich jongliere gerade mit sieben Apps, kehre nach einer kurzen Pause zum Content zurück und probiere längere Videos aus.',
        },
        'focus-on-marketing': {
          title: 'Fokus auf Marketing',
          excerpt: 'Ich richte meine Aufmerksamkeit stärker auf das Marketing meiner Apps und lerne, wie UGC, Kurzvideos und gute Geschichten ihre Entdeckung beeinflussen.',
        },
      },
    },
    contact: {
      eyebrow: '04 — Kontakt',
      title: 'Lass uns zusammenarbeiten.',
    },
    footer: {
      copyright: '© 2026 George Valandis.',
      cookieSettings: 'Cookie-Information',
      privacy: 'Datenschutz & Cookies',
      imprint: 'Impressum',
      setup: 'Mein Setup',
      backToTop: 'Nach oben',
    },
  },
};
