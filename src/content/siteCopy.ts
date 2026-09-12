import type { SiteLocale } from '@/lib/siteLocale';

export type NavLink = {
  label: string;
  href: string;
};

export type SkillEntry = {
  name: string;
  level: number;
};

export type HighlightEntry = {
  title: string;
  description: string;
};

export type SiteCopy = {
  nav: {
    links: NavLink[];
    cta: string;
    languageLabel: string;
  };
  hero: {
    badge: string;
    titleLines: [string, string, string];
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  apps: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    legalLabel: string;
    termsLabel: string;
    privacyLabel: string;
    appStoreAriaPrefix: string;
    gridViewLabel: string;
    listViewLabel: string;
  };
  about: {
    eyebrow: string;
    titleTop: string;
    titleBottom: string;
    paragraphs: [string, string];
    skills: SkillEntry[];
    highlights: HighlightEntry[];
  };
  blog: {
    eyebrow: string;
    titleTop: string;
    titleBottom: string;
    viewAll: string;
    overviewTitle: string;
    overviewDescription: string;
    backToHome: string;
    backToBlog: string;
    postNotFoundTitle: string;
    gridViewLabel: string;
    listViewLabel: string;
  };
  contact: {
    eyebrow: string;
    titleTop: string;
    titleBottom: string;
    description: string;
    emailLabel: string;
    locationLabel: string;
    locationValue: string;
    form: {
      name: string;
      email: string;
      message: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      submitted: string;
      error: string;
      validation: {
        missingFields: string;
        invalidEmail: string;
        messageTooShort: string;
      };
    };
  };
  footer: {
    description: string;
    navigationTitle: string;
    connectTitle: string;
    privacy: string;
    imprint: string;
    backToTop: string;
    languageLabel: string;
  };
  consent: {
    bannerEyebrow: string;
    bannerTitle: string;
    bannerDescription: string;
    storageNotice: string;
    bannerLegalPrefix: string;
    privacyLink: string;
    imprintLink: string;
    detailsButton: string;
    continueButton: string;
    modalEyebrow: string;
    modalTitle: string;
    close: string;
    necessaryTitle: string;
    necessaryDescription: string;
    analyticsTitle: string;
    analyticsDescription: string;
    marketingTitle: string;
    marketingDescription: string;
    updateHint: string;
    activeLabel: string;
    notUsedLabel: string;
    settingsButton: string;
  };
};

export const socialLinks = [
  { label: 'X / Twitter', href: 'https://x.com/georgevalandis' },
  { label: 'Instagram', href: 'https://instagram.com/georgevalandis' },
  { label: 'Threads', href: 'https://threads.net/@georgevalandis' },
  { label: 'TikTok', href: 'https://tiktok.com/@georgevalandis' },
  { label: 'Bluesky', href: 'https://bsky.app/profile/georgevalandis.bsky.social' },
] as const;

const siteCopy: Record<SiteLocale, SiteCopy> = {
  en: {
    nav: {
      links: [
        { label: 'Home', href: '#home' },
        { label: 'Apps', href: '#apps' },
        { label: 'About', href: '#about' },
        { label: 'Blog', href: '#blog' },
        { label: 'Contact', href: '#contact' },
      ],
      cta: 'Let\'s Talk',
      languageLabel: 'DE',
    },
    hero: {
      badge: 'iOS Developer & Solopreneur',
      titleLines: ['I build', 'iOS apps', 'from 5 to 9.'],
      description:
        "Hey, I'm George — a passionate iOS developer and solopreneur building apps after hours. Turning bold ideas into polished, user-friendly mobile experiences with Swift & SwiftUI.",
      primaryCta: 'Explore My Apps',
      secondaryCta: 'Get in Touch',
    },
    apps: {
      eyebrow: '01 — Apps',
      title: 'My iOS apps',
      titleAccent: '.',
      description:
        "Every app starts as a simple idea and grows into something that helps real people. Here's what I've been building.",
      legalLabel: 'Legal',
      termsLabel: 'Terms',
      privacyLabel: 'Privacy',
      appStoreAriaPrefix: 'Open',
      gridViewLabel: 'Grid',
      listViewLabel: 'List',
    },
    about: {
      eyebrow: '02 — About',
      titleTop: 'Building apps,',
      titleBottom: 'one idea at a time.',
      paragraphs: [
        "I'm George — a passionate iOS developer and blogger. Since 2014, I've been working in quality, process, and project management. I started my career in the insurance industry as a claims adjuster and later as a fraud investigator, building a solid foundation in analytical thinking and problem-solving.",
        "I hold a Master's degree in Economics & Management from the Technical University of Kaiserslautern and a Bachelor's in Business Law from FOM University. On this blog, I share my journey as a solopreneur in mobile app development — insights into what inspires me daily, working after-hours from 5 to 9.",
      ],
      skills: [
        { name: 'Swift / SwiftUI', level: 95 },
        { name: 'iOS Development', level: 92 },
        { name: 'UI/UX Design', level: 85 },
        { name: 'App Store Optimization', level: 80 },
        { name: 'Content Creation', level: 78 },
      ],
      highlights: [
        {
          title: 'Solopreneur',
          description:
            'Building and shipping iOS apps independently — from idea to App Store.',
        },
        {
          title: 'Detail-Oriented',
          description:
            'Obsessing over every pixel and interaction to deliver polished experiences.',
        },
        {
          title: 'After-Hours Builder',
          description:
            'Working from 5 to 9 — turning side projects into real products.',
        },
        {
          title: 'Multilingual',
          description:
            'Fluent in Greek, German and English. Building for a global audience.',
        },
      ],
    },
    blog: {
      eyebrow: '03 — Blog',
      titleTop: 'Latest from',
      titleBottom: 'the journey.',
      viewAll: 'View all posts',
      overviewTitle: 'All Posts',
      overviewDescription:
        'Updates from my journey as an iOS developer and solopreneur.',
      backToHome: 'Back to Home',
      backToBlog: 'Back to Blog',
      postNotFoundTitle: 'Post not found - George Valandis',
      gridViewLabel: 'Grid',
      listViewLabel: 'List',
    },
    contact: {
      eyebrow: '04 — Contact',
      titleTop: "Let's work",
      titleBottom: 'together.',
      description:
        "Have an idea, a project, or just want to say hello? I'd love to hear from you. Drop me a message and I'll get back to you as soon as possible.",
      emailLabel: 'Email',
      locationLabel: 'Location',
      locationValue: 'Germany',
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        namePlaceholder: 'John Doe',
        emailPlaceholder: 'john@example.com',
        messagePlaceholder: 'Tell me about your project...',
        submit: 'Send Message',
        sending: 'Sending...',
        submitted: 'Message Sent!',
        error: 'Sending failed. Please email me directly at info@georgevalandis.com.',
        validation: {
          missingFields: 'Please fill out all fields before sending.',
          invalidEmail: 'Please enter a valid email address.',
          messageTooShort: 'Please write a slightly longer message.',
        },
      },
    },
    footer: {
      description: 'iOS Developer & Solopreneur. Building apps from 5 to 9. Based in Germany.',
      navigationTitle: 'Navigation',
      connectTitle: 'Connect',
      privacy: 'Website Privacy & Cookies',
      imprint: 'Imprint',
      backToTop: 'Back to top',
      languageLabel: 'Deutsch',
    },
    consent: {
      bannerEyebrow: 'Cookie Information',
      bannerTitle: 'Only necessary cookies.',
      bannerDescription:
        'This website does not use analytics or marketing cookies. It uses only a necessary first-party cookie to remember that you acknowledged this notice.',
      storageNotice:
        'No analytics, advertising pixels, profiling, or marketing tracking is activated.',
      bannerLegalPrefix: 'See',
      privacyLink: 'Website Privacy & Cookies',
      imprintLink: 'Imprint',
      detailsButton: 'View details',
      continueButton: 'Continue with necessary only',
      modalEyebrow: 'Cookie Information',
      modalTitle: 'Technologies used on this website',
      close: 'Close',
      necessaryTitle: 'Necessary',
      necessaryDescription:
        'A first-party cookie remembers that you acknowledged this notice. It contains only the notice version and is kept for up to 180 days.',
      analyticsTitle: 'Analytics',
      analyticsDescription: 'Not used. No analytics service or analytics cookie is active.',
      marketingTitle: 'Marketing',
      marketingDescription: 'Not used. No advertising pixel or marketing tracker is active.',
      updateHint:
        'Acknowledging this notice is not consent to analytics or marketing. Those technologies are not used.',
      activeLabel: 'Always active',
      notUsedLabel: 'Not used',
      settingsButton: 'Cookie Information',
    },
  },
  de: {
    nav: {
      links: [
        { label: 'Start', href: '#home' },
        { label: 'Apps', href: '#apps' },
        { label: 'Über mich', href: '#about' },
        { label: 'Blog', href: '#blog' },
        { label: 'Kontakt', href: '#contact' },
      ],
      cta: 'Kontakt',
      languageLabel: 'EN',
    },
    hero: {
      badge: 'iOS-Entwickler & Solopreneur',
      titleLines: ['Ich baue', 'iOS-Apps', 'von 17 bis 21 Uhr.'],
      description:
        'Hi, ich bin George — leidenschaftlicher iOS-Entwickler und Solopreneur. Nach Feierabend entwickle ich Apps und mache aus mutigen Ideen saubere, benutzerfreundliche mobile Produkte mit Swift und SwiftUI.',
      primaryCta: 'Meine Apps ansehen',
      secondaryCta: 'Kontakt aufnehmen',
    },
    apps: {
      eyebrow: '01 — Apps',
      title: 'Meine iOS-Apps',
      titleAccent: '.',
      description:
        'Jede App beginnt als einfache Idee und entwickelt sich zu etwas, das echten Menschen hilft. Daran arbeite ich gerade.',
      legalLabel: 'Rechtliches',
      termsLabel: 'AGB',
      privacyLabel: 'Datenschutz',
      appStoreAriaPrefix: 'Öffne',
      gridViewLabel: 'Kacheln',
      listViewLabel: 'Liste',
    },
    about: {
      eyebrow: '02 — Über mich',
      titleTop: 'Apps bauen,',
      titleBottom: 'eine Idee nach der anderen.',
      paragraphs: [
        'Ich bin George — iOS-Entwickler und Blogger aus Leidenschaft. Seit 2014 arbeite ich in den Bereichen Qualität, Prozesse und Projektmanagement. Gestartet habe ich in der Versicherungsbranche, zunächst als Schadensachbearbeiter und später als Betrugsermittler. Das hat mein analytisches Denken und meine strukturierte Problemlösung stark geprägt.',
        'Ich habe einen Master in Economics & Management an der Technischen Universität Kaiserslautern und einen Bachelor in Wirtschaftsrecht an der FOM abgeschlossen. Auf diesem Blog teile ich meinen Weg als Solopreneur in der mobilen App-Entwicklung — inklusive Einblicken in das, was mich täglich antreibt, wenn ich nach Feierabend von 17 bis 21 Uhr an meinen Produkten arbeite.',
      ],
      skills: [
        { name: 'Swift / SwiftUI', level: 95 },
        { name: 'iOS-Entwicklung', level: 92 },
        { name: 'UI/UX-Design', level: 85 },
        { name: 'App-Store-Optimierung', level: 80 },
        { name: 'Content Creation', level: 78 },
      ],
      highlights: [
        {
          title: 'Solopreneur',
          description:
            'Ich entwickle und veröffentliche iOS-Apps eigenständig — von der Idee bis in den App Store.',
        },
        {
          title: 'Detailverliebt',
          description:
            'Ich achte auf jedes Pixel und jede Interaktion, damit am Ende ein rundes Produkt entsteht.',
        },
        {
          title: 'After-Hours Builder',
          description:
            'Ich arbeite von 17 bis 21 Uhr an Side Projects und forme daraus echte Produkte.',
        },
        {
          title: 'Mehrsprachig',
          description:
            'Ich spreche Griechisch, Deutsch und Englisch und baue für ein internationales Publikum.',
        },
      ],
    },
    blog: {
      eyebrow: '03 — Blog',
      titleTop: 'Neu aus',
      titleBottom: 'meiner Reise.',
      viewAll: 'Alle Beiträge ansehen',
      overviewTitle: 'Alle Beiträge',
      overviewDescription:
        'Updates von meiner Reise als iOS-Entwickler und Solopreneur.',
      backToHome: 'Zurück zur Startseite',
      backToBlog: 'Zurück zum Blog',
      postNotFoundTitle: 'Beitrag nicht gefunden - George Valandis',
      gridViewLabel: 'Kacheln',
      listViewLabel: 'Liste',
    },
    contact: {
      eyebrow: '04 — Kontakt',
      titleTop: 'Lass uns',
      titleBottom: 'zusammenarbeiten.',
      description:
        'Du hast eine Idee, ein Projekt oder willst einfach Hallo sagen? Schreib mir gern. Ich melde mich so schnell wie möglich zurück.',
      emailLabel: 'E-Mail',
      locationLabel: 'Standort',
      locationValue: 'Deutschland',
      form: {
        name: 'Name',
        email: 'E-Mail',
        message: 'Nachricht',
        namePlaceholder: 'Max Mustermann',
        emailPlaceholder: 'max@example.com',
        messagePlaceholder: 'Erzähl mir etwas über dein Projekt ...',
        submit: 'Nachricht senden',
        sending: 'Wird gesendet...',
        submitted: 'Nachricht gesendet!',
        error:
          'Senden fehlgeschlagen. Bitte schreibe mir direkt an info@georgevalandis.com.',
        validation: {
          missingFields: 'Bitte fülle alle Felder aus.',
          invalidEmail: 'Bitte gib eine gültige E-Mail-Adresse ein.',
          messageTooShort: 'Bitte schreibe eine etwas längere Nachricht.',
        },
      },
    },
    footer: {
      description:
        'iOS-Entwickler & Solopreneur. Ich baue Apps von 17 bis 21 Uhr. Zuhause in Deutschland.',
      navigationTitle: 'Navigation',
      connectTitle: 'Vernetzen',
      privacy: 'Website-Datenschutz & Cookies',
      imprint: 'Impressum',
      backToTop: 'Nach oben',
      languageLabel: 'English',
    },
    consent: {
      bannerEyebrow: 'Cookie-Information',
      bannerTitle: 'Nur notwendige Cookies.',
      bannerDescription:
        'Diese Website verwendet keine Analyse- oder Marketing-Cookies. Es wird nur ein notwendiges Erstanbieter-Cookie gespeichert, damit wir uns merken können, dass du diesen Hinweis bestätigt hast.',
      storageNotice:
        'Es sind keine Analyse, Werbepixel, Profilbildung oder Marketing-Tracker aktiviert.',
      bannerLegalPrefix: 'Siehe',
      privacyLink: 'Website-Datenschutz & Cookies',
      imprintLink: 'Impressum',
      detailsButton: 'Details ansehen',
      continueButton: 'Nur mit notwendigen fortfahren',
      modalEyebrow: 'Cookie-Information',
      modalTitle: 'Auf dieser Website verwendete Technologien',
      close: 'Schließen',
      necessaryTitle: 'Notwendig',
      necessaryDescription:
        'Ein Erstanbieter-Cookie merkt sich, dass du diesen Hinweis bestätigt hast. Es enthält nur die Version des Hinweises und wird bis zu 180 Tage gespeichert.',
      analyticsTitle: 'Analyse',
      analyticsDescription: 'Nicht verwendet. Es ist kein Analysedienst oder Analyse-Cookie aktiv.',
      marketingTitle: 'Marketing',
      marketingDescription: 'Nicht verwendet. Es ist kein Werbepixel oder Marketing-Tracker aktiv.',
      updateHint:
        'Die Bestätigung dieses Hinweises ist keine Einwilligung in Analyse oder Marketing. Diese Technologien werden nicht verwendet.',
      activeLabel: 'Immer aktiv',
      notUsedLabel: 'Nicht verwendet',
      settingsButton: 'Cookie-Information',
    },
  },
};

export function getSiteCopy(locale: SiteLocale): SiteCopy {
  return siteCopy[locale];
}
