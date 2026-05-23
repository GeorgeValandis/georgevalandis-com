import type { AppLandingPageContent } from './appLandingPages';

export const appLandingPageContentTemplate = {
  appStoreName: 'Keyword App Name: ProductName',
  eyebrow: 'primary keyword phrase',
  headline: 'Write a clear benefit headline in one or two lines.',
  intro:
    'Explain what the app helps people do, using natural search language and one concrete product promise.',
  primaryCta: 'View in the App Store',
  secondaryCta: 'See the app',
  availability: 'Free on the App Store. Optional premium features may be available in the app.',
  accent: '#00cfc0',
  background: 'from-[#ecfff7] via-[#f7fbf8] to-[#eef7ff]',
  category: 'ProductivityApplication',
  price: 0,
  priceCurrency: 'USD',
  highlights: [
    'Main product outcome',
    'Important workflow feature',
    'Progress, history, or insight feature',
    'Privacy, simplicity, or no-account trust point',
  ],
  screenshots: [
    {
      src: '/apps/app-slug/screens/main.png',
      alt: 'ProductName main screen showing the core app workflow.',
      label: 'Main',
    },
    {
      src: '/apps/app-slug/screens/action.png',
      alt: 'ProductName action screen showing the primary task in progress.',
      label: 'Action',
    },
    {
      src: '/apps/app-slug/screens/insights.png',
      alt: 'ProductName insights screen showing history, trends, or progress.',
      label: 'Insights',
    },
    {
      src: '/apps/app-slug/screens/settings.png',
      alt: 'ProductName settings screen showing customization options.',
      label: 'Settings',
    },
  ],
  featureTitle: 'Show the concrete app system, not a vague marketing claim.',
  featureIntro:
    'Describe how the app works in one calm sentence. Keep it scan-friendly and product-specific.',
  features: [
    {
      title: 'Start with the core action',
      description:
        'Describe what the user does first and why this screen makes the value obvious.',
    },
    {
      title: 'Continue through the natural workflow',
      description:
        'Explain the second moment in the app, ideally tied to a real screenshot and user intent.',
    },
    {
      title: 'Review progress or outcome',
      description:
        'Use this for history, insight, saved result, statistics, reminders, or the clear end state.',
    },
  ],
  workflowTitle: 'How ProductName fits into your day',
  workflow: [
    {
      title: 'Choose your setup',
      description:
        'Describe the first lightweight setup step without making the app sound complicated.',
    },
    {
      title: 'Use it in the moment',
      description:
        'Describe how the app supports the user during the actual task or habit.',
    },
    {
      title: 'Come back with context',
      description:
        'Describe why history, reminders, saved state, or insights make the app worth returning to.',
    },
  ],
  privacyTitle: 'Private by design',
  privacyDescription:
    'Use this trust section for local-first behavior, no account, no tracking, or the app-specific privacy promise.',
  finalCtaDescription:
    'Install it from the App Store and start with the app-specific core benefit.',
  faq: [
    {
      question: 'What is ProductName for?',
      answer:
        'Answer with the exact search intent and product category in plain language.',
    },
    {
      question: 'Does ProductName need an account?',
      answer:
        'Answer the trust/privacy question honestly and tie it to the product behavior.',
    },
    {
      question: 'Is ProductName available for iPhone, iPad, or Mac?',
      answer:
        'State the supported Apple platforms and keep it aligned with the App Store record.',
    },
  ],
} satisfies AppLandingPageContent;
