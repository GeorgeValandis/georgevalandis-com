/** Content for the Mac-focused GlanceAway landing page at /apps/glanceaway/mac/. */

export type MacScreenshot = {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
};

export const glanceAwayMacPath = '/apps/glanceaway/mac/';

export const glanceAwayMacPage = {
  appStoreName: 'Eye Break Timer: GlanceAway',
  eyebrow: 'break reminder for Mac',
  headline: 'A break reminder for Mac that actually makes you look away.',
  intro:
    'GlanceAway is a break reminder for Mac and iPhone: 20-20-20 eye breaks, a calm full-screen overlay, menu bar controls, and breaks that wait during video calls.',
  primaryCta: 'View in the App Store',
  secondaryCta: 'See the app',
  availability: 'Free on the App Store. Optional premium features may be available in the app.',
  accent: '#00cfc0',
  background: 'from-[#ecfff7] via-[#f7fbf8] to-[#eef7ff]',
  primaryKeyword: 'break reminder for Mac',
  secondaryKeywords: [
    'eye break app mac',
    'eye break timer app',
    '20-20-20 rule app',
    'screen break reminder',
    'eye rest reminder',
  ],
  updatedAt: '2026-11-06',
  highlights: [
    'Break reminder for Mac with menu bar controls',
    'Full-screen breaks that pause during video calls',
    'Eye break timer for the 20-20-20 rule',
    'Custom work and break intervals',
    'Session stats, streaks, and trends',
    'No account required',
  ],
  screenshots: [
    {
      src: '/apps/glanceaway/mac/timer.png',
      alt: 'GlanceAway on Mac showing a 20-20-20 focus timer.',
      label: 'Timer',
      width: 1600,
      height: 1035,
    },
    {
      src: '/apps/glanceaway/mac/overlay.png',
      alt: 'GlanceAway full-screen break overlay on Mac reminding you to look away.',
      label: 'Break',
      width: 1600,
      height: 1035,
    },
    {
      src: '/apps/glanceaway/mac/statistics.png',
      alt: 'GlanceAway statistics on Mac with completed sessions and streaks.',
      label: 'Progress',
      width: 1600,
      height: 1057,
    },
    {
      src: '/apps/glanceaway/mac/settings.png',
      alt: 'GlanceAway settings on Mac for custom work and break intervals.',
      label: 'Settings',
      width: 1600,
      height: 1057,
    },
  ] satisfies MacScreenshot[],
  featureTitle: 'A small break reminder for healthier screen habits.',
  featureIntro:
    'The app is intentionally simple: set a rhythm, stay in your flow, and let GlanceAway create moments where your eyes can reset.',
  features: [
    {
      title: 'Lives in your Mac menu bar',
      description:
        'Start, pause, or check the next break from the menu bar. A heads-up comes 30 seconds before each break, and you can snooze when you are mid-sentence.',
    },
    {
      title: 'Take the break when it matters',
      description:
        'A calm full-screen break makes the reminder obvious, so you actually look away instead of dismissing another tiny alert. During video calls, breaks wait until you are done.',
    },
    {
      title: 'Track consistency over time',
      description:
        'Simple stats show completed sessions, success rate, streaks, and recent history so the habit becomes visible.',
    },
  ],
  workflowTitle: 'How GlanceAway fits into your day',
  workflow: [
    {
      title: 'Choose your rhythm',
      description:
        'Start with the classic 20 minute focus and 20 second eye break cadence, or adjust the interval to match your work.',
    },
    {
      title: 'Work without babysitting a timer',
      description:
        'Let gentle reminders do the timing while you keep reading, coding, writing, studying, or working at your desk.',
    },
    {
      title: 'Review your progress',
      description:
        'Use the stats view to see whether you are actually taking breaks and where your screen routine can improve.',
    },
  ],
  privacyTitle: 'Private by design',
  privacyDescription:
    'GlanceAway keeps timer settings, session history, statistics, and reminder preferences on your device. After a cancelled session, an optional anonymous Tally survey may collect the answers you choose to submit, without asking for your name or email address. Purchase validation and privacy-focused product analytics may be handled by Apple, RevenueCat, and TelemetryDeck without advertising tracking.',
  finalCtaDescription:
    'Install the break reminder for Mac and iPhone from the App Store and start with a simple 20-20-20 rhythm.',
  faq: [
    {
      question: 'Does GlanceAway work as a break reminder on Mac?',
      answer:
        'Yes. On Mac, GlanceAway runs from the menu bar, shows a full-screen break overlay, warns you 30 seconds before a break, and holds breaks while you are in a video call. The same app also runs on iPhone and iPad.',
    },
    {
      question: 'What is the 20-20-20 rule?',
      answer:
        'The 20-20-20 rule is a common screen-break habit: after about 20 minutes of screen time, look at something roughly 20 feet away for about 20 seconds.',
    },
    {
      question: 'What is an eye break timer app?',
      answer:
        'An eye break timer app reminds you to pause during long screen sessions, rest your eyes, and build a repeatable screen-break rhythm.',
    },
    {
      question: 'Does GlanceAway need an account?',
      answer:
        'No. GlanceAway is built as a lightweight utility without requiring an account for the core screen-break workflow.',
    },
  ],
};
