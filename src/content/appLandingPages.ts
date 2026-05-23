export type AppScreenshot = {
  src: string;
  alt: string;
  label: string;
};

export type AppLandingPageContent = {
  appStoreName: string;
  eyebrow: string;
  headline: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  availability: string;
  accent: string;
  background: string;
  category: string;
  price: number;
  priceCurrency: string;
  highlights: readonly string[];
  screenshots: readonly AppScreenshot[];
  featureTitle: string;
  featureIntro: string;
  features: readonly {
    title: string;
    description: string;
  }[];
  workflowTitle: string;
  workflow: readonly {
    title: string;
    description: string;
  }[];
  privacyTitle: string;
  privacyDescription: string;
  finalCtaDescription: string;
  faq: readonly {
    question: string;
    answer: string;
  }[];
};

export const appLandingPages: Record<string, AppLandingPageContent> = {
  'my-grain-tracker': {
    appStoreName: 'Migraine Tracker: My Grain',
    eyebrow: 'migraine tracker and headache diary',
    headline: 'Track migraine episodes in one private headache diary.',
    intro:
      'My Grain Tracker helps you log migraine attacks, intensity, triggers, aura, medication, relief steps, and notes, then review patterns over time without creating an account.',
    primaryCta: 'View in the App Store',
    secondaryCta: 'See the app',
    availability: 'Free on the App Store. Premium features and subscriptions may be available in the app.',
    accent: '#4d55d8',
    background: 'from-[#f2f1ff] via-[#fff9f4] to-[#eff7ff]',
    category: 'HealthApplication',
    price: 0,
    priceCurrency: 'USD',
    highlights: [
      'Migraine attack and headache diary',
      'Intensity, triggers, aura, medication, and relief notes',
      'Calendar, journal, and private pattern insights',
      'No account required for core tracking',
    ],
    screenshots: [
      {
        src: '/apps/my-grain-tracker/screens/home.png',
        alt: 'My Grain Tracker home screen showing a migraine tracker dashboard with latest episode, calendar, insights, journal, and settings.',
        label: 'Home',
      },
      {
        src: '/apps/my-grain-tracker/screens/new-episode.png',
        alt: 'My Grain Tracker new episode screen for logging migraine intensity, symptoms, triggers, aura, medication, relief, and notes.',
        label: 'Log',
      },
      {
        src: '/apps/my-grain-tracker/screens/calendar.png',
        alt: 'My Grain Tracker episode calendar screen showing migraine diary dates and a monthly headache log.',
        label: 'Calendar',
      },
      {
        src: '/apps/my-grain-tracker/screens/insights.png',
        alt: 'My Grain Tracker insights screen showing private migraine pattern summaries, common triggers, average intensity, and care notes.',
        label: 'Insights',
      },
    ],
    featureTitle: 'A calm migraine log for the details you forget later.',
    featureIntro:
      'Use the app during or after an episode to capture the facts, then return to a clearer record when patterns matter.',
    features: [
      {
        title: 'Log an attack in seconds',
        description:
          'Start with a simple intensity scale, then add structured details like symptoms, triggers, aura, medication, relief, and notes when you have the energy.',
      },
      {
        title: 'Keep a calendar-backed diary',
        description:
          'See which days had migraine activity and use the episode history as a practical headache diary for personal review or care conversations.',
      },
      {
        title: 'Review private pattern signals',
        description:
          'Summaries surface repeated triggers, symptom patterns, intensity trends, and care notes so your logs become easier to understand over time.',
      },
    ],
    workflowTitle: 'How My Grain Tracker fits into migraine self-tracking',
    workflow: [
      {
        title: 'Record the episode',
        description:
          'Capture the date, intensity, and key migraine details while the experience is still fresh, without forcing a long form every time.',
      },
      {
        title: 'Add context when you can',
        description:
          'Use notes, symptoms, triggers, aura, medication, and relief fields to build a more useful private record after the worst moment has passed.',
      },
      {
        title: 'Look back before your next care decision',
        description:
          'Review the calendar and insights to notice repeated patterns and prepare clearer notes for conversations with a qualified healthcare professional.',
      },
    ],
    privacyTitle: 'Private self-tracking, not medical advice',
    privacyDescription:
      'My Grain Tracker stores the migraine information you enter on your device and does not require an account. It is an organizational self-tracking tool and does not provide medical advice, diagnosis, treatment recommendations, or emergency support.',
    finalCtaDescription:
      'Install My Grain Tracker from the App Store and start with one clear migraine episode log.',
    faq: [
      {
        question: 'What is My Grain Tracker for?',
        answer:
          'My Grain Tracker is a migraine tracker and headache diary for privately logging migraine episodes, intensity, symptoms, triggers, aura, medication, relief steps, and notes.',
      },
      {
        question: 'Can I use it as a headache diary?',
        answer:
          'Yes. The calendar, episode history, and notes are designed to help you keep a private headache diary and look back at migraine patterns over time.',
      },
      {
        question: 'Does My Grain Tracker give medical advice?',
        answer:
          'No. The app is for self-tracking and organization only. It does not diagnose, treat, recommend medication, or replace advice from a qualified healthcare professional.',
      },
      {
        question: 'Does My Grain Tracker need an account?',
        answer:
          'No. Core migraine tracking works without an account, and the privacy statement says your migraine logs and notes are not transmitted to George Valandis servers.',
      },
      {
        question: 'Is My Grain Tracker available for iPhone and iPad?',
        answer:
          'My Grain Tracker is available on the App Store for Apple devices, with iPhone and iPad screenshots prepared for the App Store listing.',
      },
    ],
  },
  glanceaway: {
    appStoreName: 'Eye Break Timer: GlanceAway',
    eyebrow: '20-20-20 screen break reminder',
    headline: 'Give your eyes a calm break from long screen days.',
    intro:
      'GlanceAway helps you follow the 20-20-20 rule with gentle reminders, custom break intervals, and simple progress stats across iPhone and Mac.',
    primaryCta: 'View in the App Store',
    secondaryCta: 'See the app',
    availability: 'Free on the App Store. Optional premium features may be available in the app.',
    accent: '#00cfc0',
    background: 'from-[#ecfff7] via-[#f7fbf8] to-[#eef7ff]',
    category: 'HealthApplication',
    price: 0,
    priceCurrency: 'USD',
    highlights: [
      '20-20-20 eye break timer',
      'Custom work and break intervals',
      'Session stats, streaks, and trends',
      'No account required',
    ],
    screenshots: [
      {
        src: '/apps/glanceaway/screens/timer.png',
        alt: 'GlanceAway timer screen showing the 20-20-20 eye break timer.',
        label: 'Timer',
      },
      {
        src: '/apps/glanceaway/screens/break-countdown.png',
        alt: 'GlanceAway break countdown screen reminding the user to glance away.',
        label: 'Break',
      },
      {
        src: '/apps/glanceaway/screens/statistics.png',
        alt: 'GlanceAway statistics screen with completed sessions and streaks.',
        label: 'Progress',
      },
      {
        src: '/apps/glanceaway/screens/settings.png',
        alt: 'GlanceAway settings screen for customizing reminders and break intervals.',
        label: 'Settings',
      },
    ],
    featureTitle: 'A small reminder system for healthier screen habits.',
    featureIntro:
      'The app is intentionally simple: set a rhythm, stay in your flow, and let GlanceAway create moments where your eyes can reset.',
    features: [
      {
        title: 'Start a focused screen session',
        description:
          'Use a clean 20-20-20 timer that tells you when to rest your eyes without turning the app into another distraction.',
      },
      {
        title: 'Take the break when it matters',
        description:
          'Full-screen break moments make the reminder obvious and calm, so you actually look away instead of dismissing another tiny alert.',
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
      'GlanceAway does not require an account and is designed around local app settings and usage history. Your screen-break routine stays simple and personal.',
    finalCtaDescription:
      'Install it from the App Store and start with a simple eye-break rhythm.',
    faq: [
      {
        question: 'What is the 20-20-20 rule?',
        answer:
          'The 20-20-20 rule is a common screen-break habit: after about 20 minutes of screen time, look at something roughly 20 feet away for about 20 seconds.',
      },
      {
        question: 'Is GlanceAway only for iPhone?',
        answer:
          'GlanceAway is designed for Apple devices and supports iPhone and Mac, so it can fit both mobile and desk-based screen routines.',
      },
      {
        question: 'Does GlanceAway need an account?',
        answer:
          'No. GlanceAway is built as a lightweight utility without requiring an account for the core screen-break workflow.',
      },
    ],
  },
  'perfect-day': {
    appStoreName: 'Habit Day Tracker: PerfectDay',
    eyebrow: 'habit tracker and streak tracker',
    headline: 'Build better habits one visual check at a time.',
    intro:
      'Perfect Day is a clean habit tracker for daily routines, weekly progress, reminders, streaks, widgets, and simple check-in moments without creating an account.',
    primaryCta: 'View in the App Store',
    secondaryCta: 'See the app',
    availability: 'Free on the App Store. Optional weekly and yearly premium plans may be available in the app.',
    accent: '#ff9f0a',
    background: 'from-[#fff4e4] via-[#fffaf5] to-[#f4f7ff]',
    category: 'HealthApplication',
    price: 0,
    priceCurrency: 'USD',
    highlights: [
      'Daily habit tracker and streak view',
      'Weekly grid for fast progress checks',
      'Custom habits, reminders, and widgets',
      'No account required and no data collected',
    ],
    screenshots: [
      {
        src: '/apps/perfect-day/screens/weekly-grid.png',
        alt: 'Perfect Day habit tracker weekly grid showing checked boxes for Monday, Tuesday, and Wednesday with remaining habit days ahead.',
        label: 'Week',
      },
      {
        src: '/apps/perfect-day/screens/settings.png',
        alt: 'Perfect Day settings screen showing premium access, number of habits, editable habit slots, theme selection, and notifications.',
        label: 'Setup',
      },
      {
        src: '/apps/perfect-day/screens/triangle-grid.png',
        alt: 'Perfect Day habit tracker using triangle check shapes for a weekly daily routine and streak view.',
        label: 'Shapes',
      },
      {
        src: '/apps/perfect-day/screens/square-grid.png',
        alt: 'Perfect Day habit tracker using square check boxes for a weekly habit progress overview.',
        label: 'Progress',
      },
    ],
    featureTitle: 'A weekly habit board that makes consistency visible.',
    featureIntro:
      'The app keeps the daily loop small: choose a habit, mark the day, and see your week fill in without turning self-improvement into admin work.',
    features: [
      {
        title: 'Check off daily habits',
        description:
          'Track 3 to 6 daily habits in a focused weekly view so routine progress stays visible at a glance.',
      },
      {
        title: 'Shape the tracker around your routine',
        description:
          'Edit habit slots, choose a simple visual style, and keep the interface dark, calm, and easy to scan.',
      },
      {
        title: 'Keep momentum with reminders and widgets',
        description:
          'Optional reminders and widget support help the habit check happen in the flow of the day, not only when the app is already open.',
      },
    ],
    workflowTitle: 'How Perfect Day fits into a daily routine',
    workflow: [
      {
        title: 'Pick the habits that matter this week',
        description:
          'Start with a small set of routines such as fitness, mindfulness, study, writing, or cleanup.',
      },
      {
        title: 'Mark each day as a visual win',
        description:
          'Use the weekly grid to check off completed habits and build a clear chain of small actions.',
      },
      {
        title: 'Adjust before the routine gets stale',
        description:
          'Use settings, reminders, widgets, and progress signals to keep the system aligned with how your week actually works.',
      },
    ],
    privacyTitle: 'Private routine tracking',
    privacyDescription:
      'Perfect Day does not require an account. The App Store privacy listing states that the developer does not collect data from this app, and the privacy policy says habit entries, notes, and progress tracking data stay on the user device.',
    finalCtaDescription:
      'Install Perfect Day from the App Store and start with one habit check today.',
    faq: [
      {
        question: 'What is Perfect Day for?',
        answer:
          'Perfect Day is a habit tracker for daily routines, weekly progress, streaks, reminders, widgets, and simple visual check-ins.',
      },
      {
        question: 'Can I track more than one habit?',
        answer:
          'Yes. The app is designed for a small set of daily habits, with the App Store copy describing support for 3 to 6 habits.',
      },
      {
        question: 'Does Perfect Day collect my habit data?',
        answer:
          'The App Store privacy listing says the developer does not collect data from the app, and the privacy policy says user-entered habit data stays on the device.',
      },
      {
        question: 'Does Perfect Day need an account?',
        answer:
          'No. The core habit tracking workflow is built around local use without requiring an account.',
      },
      {
        question: 'Is Perfect Day free?',
        answer:
          'Perfect Day is listed as free on the App Store, with optional in-app purchases for premium access.',
      },
    ],
  },
  quitergy: {
    appStoreName: 'Drink Counter: QuitERGY',
    eyebrow: 'energy drink and caffeine log',
    headline: 'Reduce energy drinks with a calmer drink counter.',
    intro:
      'QuitERGY helps you log energy drinks, set personal limits, follow streaks, and build healthier caffeine habits without pressure or tracking accounts.',
    primaryCta: 'View in the App Store',
    secondaryCta: 'See the app',
    availability: 'Free on the App Store. Lifetime Premium may be available in the app.',
    accent: '#9d5cff',
    background: 'from-[#f8f0ff] via-[#fff7fb] to-[#effaf8]',
    category: 'HealthApplication',
    price: 0,
    priceCurrency: 'USD',
    highlights: [
      'Energy drink counter and caffeine log',
      'Daily limits, streaks, and gentle reminders',
      'Progress views for healthier routines',
      'Private local tracking with no data collected',
    ],
    screenshots: [
      {
        src: '/apps/quitergy/screens/drink-counter.png',
        alt: 'QuitERGY drink counter screen showing an energy drink log and daily caffeine progress.',
        label: 'Log',
      },
      {
        src: '/apps/quitergy/screens/progress.png',
        alt: 'QuitERGY progress screen showing streaks and energy drink reduction insights.',
        label: 'Progress',
      },
      {
        src: '/apps/quitergy/screens/reminders.png',
        alt: 'QuitERGY reminders screen showing supportive cues for reducing energy drink habits.',
        label: 'Reminders',
      },
    ],
    featureTitle: 'A mindful counter for the drinks you want to reduce.',
    featureIntro:
      'The app turns each energy drink into a clear signal: what you consumed, how often, and whether your routine is moving in the right direction.',
    features: [
      {
        title: 'Log every drink in seconds',
        description:
          'Use the drink counter to stay aware of energy drink intake without turning the habit into a complicated spreadsheet.',
      },
      {
        title: 'Set limits before cravings decide',
        description:
          'Personal goals and reminders create a calmer pause before impulse purchases or automatic caffeine routines.',
      },
      {
        title: 'Make progress visible',
        description:
          'Streaks, trends, and milestones help small reductions feel tangible while you cut back at your own pace.',
      },
    ],
    workflowTitle: 'How QuitERGY fits into your day',
    workflow: [
      {
        title: 'Set your daily limit',
        description:
          'Choose a realistic target for energy drinks or caffeine so the app supports reduction instead of all-or-nothing pressure.',
      },
      {
        title: 'Log the moment honestly',
        description:
          'When you drink one, record it quickly and keep the day grounded in facts rather than memory or guilt.',
      },
      {
        title: 'Review the pattern',
        description:
          'Use streaks and progress views to understand triggers, notice better days, and keep building a healthier routine.',
      },
    ],
    privacyTitle: 'Private by design',
    privacyDescription:
      'QuitERGY stores user-entered drink logs, notes, reminders, and progress locally on your device. The App Store privacy listing states that the developer does not collect data from this app.',
    finalCtaDescription:
      'Install QuitERGY from the App Store and start with one honest drink log today.',
    faq: [
      {
        question: 'What is QuitERGY for?',
        answer:
          'QuitERGY is a drink counter and caffeine log for people who want to track, reduce, or quit energy drinks at their own pace.',
      },
      {
        question: 'Can QuitERGY help me quit energy drinks completely?',
        answer:
          'Yes. You can use it for gradual reduction, awareness, daily limits, and streaks, whether your goal is cutting back or quitting completely.',
      },
      {
        question: 'Does QuitERGY collect my drink logs?',
        answer:
          'No. QuitERGY is designed around local tracking, and the App Store privacy listing says the developer does not collect data from the app.',
      },
      {
        question: 'Is QuitERGY available for iPhone and iPad?',
        answer:
          'QuitERGY is available on the App Store for iPhone and iPad, with Apple-platform compatibility listed on the App Store page.',
      },
    ],
  },
};

export function getAppLandingPage(slug: string) {
  return appLandingPages[slug];
}
