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
      submitted: string;
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
    bannerLegalPrefix: string;
    privacyLink: string;
    imprintLink: string;
    rejectAll: string;
    customize: string;
    acceptAll: string;
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
    saveSelection: string;
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
        submitted: 'Message Sent!',
      },
    },
    footer: {
      description: 'iOS Developer & Solopreneur. Building apps from 5 to 9. Based in Germany.',
      navigationTitle: 'Navigation',
      connectTitle: 'Connect',
      privacy: 'Privacy Statement',
      imprint: 'Imprint',
      backToTop: 'Back to top',
      languageLabel: 'Deutsch',
    },
    consent: {
      bannerEyebrow: 'Privacy Settings',
      bannerTitle: 'We use cookies.',
      bannerDescription:
        'We only use optional analytics or marketing cookies with your consent. Necessary cookies for basic site functionality are always active. You can change your choice at any time.',
      bannerLegalPrefix: 'See',
      privacyLink: 'Privacy Statement',
      imprintLink: 'Imprint',
      rejectAll: 'Reject all',
      customize: 'Customize',
      acceptAll: 'Accept all',
      modalEyebrow: 'Cookie Preferences',
      modalTitle: 'Manage your consent',
      close: 'Close',
      necessaryTitle: 'Necessary',
      necessaryDescription: 'Required for core site functions and security.',
      analyticsTitle: 'Analytics',
      analyticsDescription: 'Helps us understand usage and improve content.',
      marketingTitle: 'Marketing',
      marketingDescription: 'Allows personalized marketing and ad measurement.',
      updateHint: 'You can update this selection anytime from the Cookie Settings button.',
      saveSelection: 'Save selection',
      settingsButton: 'Cookie Settings',
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
        submitted: 'Nachricht gesendet!',
      },
    },
    footer: {
      description:
        'iOS-Entwickler & Solopreneur. Ich baue Apps von 17 bis 21 Uhr. Zuhause in Deutschland.',
      navigationTitle: 'Navigation',
      connectTitle: 'Vernetzen',
      privacy: 'Datenschutzerklärung',
      imprint: 'Impressum',
      backToTop: 'Nach oben',
      languageLabel: 'English',
    },
    consent: {
      bannerEyebrow: 'Datenschutzeinstellungen',
      bannerTitle: 'Wir verwenden Cookies.',
      bannerDescription:
        'Optionale Analyse- oder Marketing-Cookies setzen wir nur mit deiner Einwilligung. Notwendige Cookies für die Grundfunktionen der Website sind immer aktiv. Du kannst deine Auswahl jederzeit ändern.',
      bannerLegalPrefix: 'Siehe',
      privacyLink: 'Datenschutzerklärung',
      imprintLink: 'Impressum',
      rejectAll: 'Alle ablehnen',
      customize: 'Anpassen',
      acceptAll: 'Alle akzeptieren',
      modalEyebrow: 'Cookie-Einstellungen',
      modalTitle: 'Einwilligung verwalten',
      close: 'Schließen',
      necessaryTitle: 'Notwendig',
      necessaryDescription: 'Erforderlich für Grundfunktionen und Sicherheit der Website.',
      analyticsTitle: 'Analyse',
      analyticsDescription: 'Hilft uns, die Nutzung zu verstehen und Inhalte zu verbessern.',
      marketingTitle: 'Marketing',
      marketingDescription: 'Erlaubt personalisiertes Marketing und Werbemessung.',
      updateHint: 'Du kannst diese Auswahl jederzeit über den Button Cookie-Einstellungen ändern.',
      saveSelection: 'Auswahl speichern',
      settingsButton: 'Cookie-Einstellungen',
    },
  },
};

export function getSiteCopy(locale: SiteLocale): SiteCopy {
  return siteCopy[locale];
}
