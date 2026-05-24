export type AppScreenshot = {
  src: string;
  alt: string;
  label: string;
  variant?: 'phone' | 'poster' | 'artwork';
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
  heroTone?: 'light' | 'dark';
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
  flower: {
    appStoreName: 'Monthly Tracker Flower',
    eyebrow: 'period tracker and cycle calendar',
    headline: 'A period tracker and cycle calendar for mood, symptoms, and notes.',
    intro:
      'Flower is an Android period tracker app for period dates, ovulation markers, mood, energy, comfort, symptoms, notes, and gentle phase-based recommendations.',
    primaryCta: 'Google Play coming soon',
    secondaryCta: 'See the app',
    availability:
      'Android release is in Google Play review. Optional premium features may be available in the app after release.',
    accent: '#8c4f63',
    background: 'from-[#f3ded9] via-[#fbf6ef] to-[#efe4f7]',
    category: 'HealthApplication',
    price: 0,
    priceCurrency: 'USD',
    highlights: [
      'Period tracker and monthly cycle calendar',
      'Mood, energy, comfort, symptom, and note logs',
      'Phase-based recommendations and pattern signals',
      'Local-first tracking with no account required',
    ],
    screenshots: [
      {
        src: '/apps/flower/screens/home.png',
        alt: 'Flower home screen showing current cycle phase, next period date, cycle setup, and latest mood and symptom entries.',
        label: 'Home',
      },
      {
        src: '/apps/flower/screens/calendar.png',
        alt: 'Flower calendar screen showing period days, ovulation, and journal markers across the monthly cycle.',
        label: 'Calendar',
      },
      {
        src: '/apps/flower/screens/entry.png',
        alt: 'Flower entry screen for logging mood, energy, comfort, symptoms, and journal notes.',
        label: 'Log',
      },
      {
        src: '/apps/flower/screens/recommendations.png',
        alt: 'Flower recommendations screen showing cycle phase guidance, pattern signals, and premium insights.',
        label: 'Insights',
      },
      {
        src: '/apps/flower/screens/settings.png',
        alt: 'Flower premium screen showing cycle tracking, notifications, statistics, recommendations, and data export features.',
        label: 'Premium',
      },
    ],
    featureTitle: 'A period tracker that keeps the daily check-in small.',
    featureIntro:
      'Flower focuses on the facts that matter in the moment, then turns them into a simple calendar and clearer cycle context.',
    features: [
      {
        title: 'See where you are in your cycle',
        description:
          'The home view keeps the current phase, cycle day, next period estimate, and recent entries visible without making you dig through settings.',
      },
      {
        title: 'Add symptoms without a long form',
        description:
          'Log mood, energy, comfort, symptoms, and notes quickly, then keep the history available for later pattern review.',
      },
      {
        title: 'Plan around upcoming days',
        description:
          'Calendar markers and phase recommendations help you understand period, ovulation, journal, and self-care context at a glance.',
      },
    ],
    workflowTitle: 'How Flower fits into monthly cycle tracking',
    workflow: [
      {
        title: 'Set your cycle baseline',
        description:
          'Enter your last period date, average cycle length, period length, and ovulation preference so the calendar has a useful starting point.',
      },
      {
        title: 'Log how today feels',
        description:
          'Use the entry flow for mood, energy, comfort, symptoms, and short notes when you want a private record of the day.',
      },
      {
        title: 'Review your calendar before you plan',
        description:
          'Return to the monthly view and recommendations to notice upcoming cycle windows and repeated signals over time.',
      },
    ],
    privacyTitle: 'Private cycle tracking, not medical advice',
    privacyDescription:
      'Flower stores cycle settings, mood entries, symptom logs, notes, reminders, and progress information locally on your device. It is a self-tracking tool and does not provide medical advice, diagnosis, treatment recommendations, or emergency support.',
    finalCtaDescription:
      'Flower will be available on Google Play after the current review is complete.',
    faq: [
      {
        question: 'What is Flower for?',
        answer:
          'Flower is a period tracker and cycle calendar for recording period dates, ovulation markers, mood, energy, comfort, symptoms, and personal notes.',
      },
      {
        question: 'Does Flower need an account?',
        answer:
          'No. The Android app is designed around local cycle tracking and does not require an account for the core workflow.',
      },
      {
        question: 'Does Flower give medical advice?',
        answer:
          'No. Flower is a self-tracking and organization tool. It does not diagnose conditions, recommend treatment, replace a qualified healthcare professional, or provide emergency support.',
      },
      {
        question: 'Is Flower available on Google Play?',
        answer:
          'The Android release has been prepared for Google Play review. The live store link should be added once Google Play publishes the listing.',
      },
    ],
  },
  moodflora: {
    appStoreName: 'Mood Tracker: MoodFlora',
    eyebrow: 'mood tracker and private journal',
    headline: 'A mood tracker and private journal for clearer daily check-ins.',
    intro:
      'MoodFlora is a calm mood tracker app for daily check-ins, private journal notes, calendar review, personal patterns, and gentle suggestions without requiring an account.',
    primaryCta: 'View in the App Store',
    secondaryCta: 'See the app',
    availability:
      'Free on the App Store. Optional premium features may be available in the app.',
    accent: '#34c759',
    background: 'from-[#e9f8ec] via-[#fbfff9] to-[#eef7f1]',
    category: 'HealthApplication',
    price: 0,
    priceCurrency: 'USD',
    highlights: [
      'Daily mood tracker and private journal',
      'Mood calendar for reviewing emotional patterns',
      'Gentle suggestions for small reflective actions',
      'Local-first app data with no account required',
    ],
    screenshots: [
      {
        src: '/apps/moodflora/screens/journal.png',
        alt: 'MoodFlora journal screen showing recent mood entries with flower mood markers and private notes.',
        label: 'Journal',
      },
      {
        src: '/apps/moodflora/screens/calendar.png',
        alt: 'MoodFlora calendar screen showing a monthly mood calendar and journal entries for selected days.',
        label: 'Calendar',
      },
      {
        src: '/apps/moodflora/screens/suggestions.png',
        alt: 'MoodFlora suggestions screen showing an inspirational mood activity and like or skip actions.',
        label: 'Suggestions',
      },
    ],
    featureTitle: 'A mood journal that keeps the daily check-in gentle.',
    featureIntro:
      'MoodFlora focuses on a small loop: log how you feel, add a note when it helps, and return later with enough context to notice patterns.',
    features: [
      {
        title: 'Log a mood without pressure',
        description:
          'Choose a mood, add an optional reflection, and keep the entry lightweight enough to use on ordinary days.',
      },
      {
        title: 'Review patterns on a calendar',
        description:
          'Mood entries become easier to revisit through a calendar and journal view, so repeated emotional signals are easier to spot.',
      },
      {
        title: 'Use suggestions as gentle prompts',
        description:
          'Inspirational suggestions offer small actions for reflection and mood support, without replacing professional advice.',
      },
    ],
    workflowTitle: 'How MoodFlora fits into daily mood tracking',
    workflow: [
      {
        title: 'Capture the moment',
        description:
          'Open the app when you want a quick check-in, select the mood that fits, and add a short note if the context matters.',
      },
      {
        title: 'Let the journal build naturally',
        description:
          'MoodFlora keeps your entries organized by date, so your private history grows without a complicated tracking routine.',
      },
      {
        title: 'Look back before patterns fade',
        description:
          'Use the calendar, journal, and suggestions to understand what tends to lift, lower, or stabilize your mood over time.',
      },
    ],
    privacyTitle: 'Private mood tracking, not medical advice',
    privacyDescription:
      'MoodFlora stores mood entries, journal notes, settings, reminders, and local app state on your device. It is a self-tracking and reflection tool and does not provide medical advice, diagnosis, treatment recommendations, or emergency support.',
    finalCtaDescription:
      'Install MoodFlora from the App Store and start with one simple mood check-in.',
    faq: [
      {
        question: 'What is MoodFlora for?',
        answer:
          'MoodFlora is a mood tracker and journal for recording daily feelings, personal notes, calendar history, and gentle reflective suggestions.',
      },
      {
        question: 'Does MoodFlora need an account?',
        answer:
          'No. The core mood tracking workflow is designed around local app data and does not require an account.',
      },
      {
        question: 'Does MoodFlora give medical advice?',
        answer:
          'No. MoodFlora is for self-tracking and reflection only. It does not diagnose, treat, recommend therapy, replace professional care, or provide emergency support.',
      },
      {
        question: 'Where can I find the landing page privacy policy?',
        answer:
          'The Privacy link on this page opens the privacy policy for this MoodFlora landing page on georgevalandis.com, including cookies and consent records. It is separate from data processing inside the mobile app.',
      },
    ],
  },
  'my-grain-tracker': {
    appStoreName: 'Migraine Tracker: My Grain',
    eyebrow: 'migraine tracker and headache diary',
    headline: 'A migraine tracker and headache diary for private episode logs.',
    intro:
      'My Grain Tracker is a private migraine tracker app and headache diary for logging attacks, intensity, triggers, aura, medication, relief steps, and notes without creating an account.',
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
    headline: 'A 20-20-20 eye break timer for long screen days.',
    intro:
      'GlanceAway is an eye break timer and 20-20-20 rule reminder with gentle alerts, custom break intervals, and simple progress stats across iPhone and Mac.',
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
    headline: 'A habit tracker and streak tracker for daily routines.',
    intro:
      'Perfect Day is a clean habit tracker app for daily routines, weekly progress, reminders, streaks, widgets, and simple check-in moments without creating an account.',
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
  'ring-sizer': {
    appStoreName: 'Ring Sizer: Size Finder',
    eyebrow: 'ring size finder and converter',
    headline: 'A ring size finder and converter before you buy online.',
    intro:
      'Ring Sizer is a ring size finder app for estimating, converting, and saving ring sizes before checkout, whether you have a ring that fits, need a paper or string guide, or want to compare US, EU, and UK sizes.',
    primaryCta: 'App Store coming soon',
    secondaryCta: 'See the app',
    availability: 'Designed for iPhone. The App Store link will be added when the listing is live.',
    accent: '#d49a31',
    background: 'from-[#f7efe2] via-[#fbfaf7] to-[#eaf7fb]',
    category: 'ShoppingApplication',
    price: 0,
    priceCurrency: 'USD',
    highlights: [
      'Ring size finder for online shopping',
      'Existing-ring and paper or string measurement flows',
      'US, EU, UK, diameter, and circumference conversion',
      'Local saved sizes for fingers, gifts, and notes',
    ],
    screenshots: [
      {
        src: '/apps/ring-sizer/screens/home.jpg',
        alt: 'Ring Sizer home screen showing a best estimate, ring size finder shortcuts, and saved shopping actions.',
        label: 'Home',
      },
      {
        src: '/apps/ring-sizer/screens/find.jpg',
        alt: 'Ring Sizer find size screen for estimating ring size from an existing ring or paper and string measurement.',
        label: 'Find',
      },
      {
        src: '/apps/ring-sizer/screens/convert.jpg',
        alt: 'Ring Sizer convert screen showing ring size conversion between diameter, circumference, EU, US, and UK sizes.',
        label: 'Convert',
      },
      {
        src: '/apps/ring-sizer/screens/saved.jpg',
        alt: 'Ring Sizer saved sizes screen with local ring size entries for different fingers and gift ideas.',
        label: 'Saved',
      },
      {
        src: '/apps/ring-sizer/screens/guide.jpg',
        alt: 'Ring Sizer guide screen showing shopping guidance for known diameter, band width, comfort fit, and between-size decisions.',
        label: 'Guide',
      },
    ],
    featureTitle: 'A practical ring size helper for the moment before checkout.',
    featureIntro:
      'The app focuses on purchase confidence: estimate a size, compare systems, keep a local note, and remember that brands and ring styles can still vary.',
    features: [
      {
        title: 'Estimate from a ring that already fits',
        description:
          'Use the existing-ring flow to enter or measure inner diameter, then review the closest EU, US, UK, diameter, and circumference values.',
      },
      {
        title: 'Convert before you order',
        description:
          'Compare common ring size systems in one place so a seller listing, regional chart, or millimeter measurement is easier to understand.',
      },
      {
        title: 'Save sizes for real buying situations',
        description:
          'Keep local entries for yourself, different fingers, or a gift idea, with notes that help when you return to a store page later.',
      },
    ],
    workflowTitle: 'How Ring Sizer fits into online ring shopping',
    workflow: [
      {
        title: 'Start with the best clue you have',
        description:
          'Measure a ring that already fits, use a paper or string guide, or enter a known diameter, circumference, or regional size.',
      },
      {
        title: 'Compare the result across systems',
        description:
          'Review US, EU, UK, diameter, and circumference values before matching the size to the seller listing.',
      },
      {
        title: 'Save the decision with context',
        description:
          'Store the estimate locally with a finger, person, gift note, or shopping reminder, then confirm final fit with the seller or a jeweler when needed.',
      },
    ],
    privacyTitle: 'Local size notes, no account required',
    privacyDescription:
      'Ring Sizer stores saved size entries, labels, finger selections, and notes locally on your device and does not require an account. If premium access is used, Apple handles billing and RevenueCat may process technical purchase and entitlement data required to unlock or restore access.',
    finalCtaDescription:
      'The App Store link will be added here when the Ring Sizer listing is live.',
    faq: [
      {
        question: 'What is Ring Sizer for?',
        answer:
          'Ring Sizer is a ring size finder and converter for estimating, comparing, and saving ring sizes before buying rings online.',
      },
      {
        question: 'Can I measure a ring I already own?',
        answer:
          'Yes. The app includes an existing-ring flow for estimating size from the inner diameter of a ring that already fits.',
      },
      {
        question: 'Which ring size systems does it support?',
        answer:
          'Ring Sizer is built around common shopping formats such as US, EU, UK, diameter, and circumference, so you can compare seller charts more easily.',
      },
      {
        question: 'Does Ring Sizer guarantee that a ring will fit?',
        answer:
          'No. Ring sizes can vary by brand, ring style, band width, and measurement method. The app gives practical estimates and shopping guidance, not a fit guarantee.',
      },
      {
        question: 'Does Ring Sizer need an account?',
        answer:
          'No. Core use does not require an account, and saved ring size entries are stored locally on your device.',
      },
    ],
  },
  medimemo: {
    appStoreName: 'Pill Reminder: MediMemo',
    eyebrow: 'medication reminder and dose tracker',
    headline: 'A medication reminder and dose tracker without the noise.',
    intro:
      'MediMemo is a medication reminder app and dose tracker for daily medications, dose check-ins, low-supply moments, and pharmacy pickup reminders in one calm iPhone app.',
    primaryCta: 'View in the App Store',
    secondaryCta: 'See the app',
    availability:
      'Available on iPhone. Version 1.0 works locally with local notifications and no account setup.',
    accent: '#22c7c8',
    background: 'from-[#e7fbfb] via-[#f8fcff] to-[#fff3df]',
    category: 'MedicalApplication',
    price: 0,
    priceCurrency: 'USD',
    highlights: [
      'Medication reminder and dose tracker',
      'Taken, skipped, and missed dose check-ins',
      'Low-supply and pharmacy pickup planning',
      'Local-first use with no account required',
    ],
    screenshots: [
      {
        src: '/apps/medimemo/screens/today.png',
        alt: 'MediMemo today screen showing the next medication reminder, adherence progress, planned doses, and low-supply alert.',
        label: 'Today',
      },
      {
        src: '/apps/medimemo/screens/medications.png',
        alt: 'MediMemo medications screen showing active medication plans, dose times, pickup reminders, and remaining supply.',
        label: 'Meds',
      },
      {
        src: '/apps/medimemo/screens/detail.png',
        alt: 'MediMemo medication detail screen showing dose schedule, supply tracking, pharmacy pickup details, and local history.',
        label: 'Details',
      },
      {
        src: '/apps/medimemo/screens/settings.png',
        alt: 'MediMemo settings screen showing language, sample data, notifications, premium, legal, and app version controls.',
        label: 'Settings',
      },
      {
        src: '/apps/medimemo/screens/language.png',
        alt: 'MediMemo language selection screen showing English, French, Spanish, Portuguese, and German options.',
        label: 'Languages',
      },
    ],
    featureTitle: 'A focused medication list for the routine you actually follow.',
    featureIntro:
      'MediMemo keeps the daily loop practical: add medication plans, see what is due today, and mark each dose without turning health organization into admin work.',
    features: [
      {
        title: 'See the next dose first',
        description:
          'The Today view puts the next reminder, planned doses, adherence progress, and supply warnings in one place before you need to search.',
      },
      {
        title: 'Track real dose outcomes',
        description:
          'Mark doses as taken, skipped, or missed so your medication history reflects what actually happened during the day.',
      },
      {
        title: 'Plan refills before they become urgent',
        description:
          'Low-supply visibility and pharmacy pickup reminders help you notice when a prescription needs attention before the last dose is gone.',
      },
    ],
    workflowTitle: 'How MediMemo fits into daily medication routines',
    workflow: [
      {
        title: 'Add the medication plan',
        description:
          'Create a medication or supplement, add dosage notes, choose one or more dose times, and keep the schedule local on your iPhone.',
      },
      {
        title: 'Use the reminder moment',
        description:
          'When a local notification arrives, open the app or use the Today view to confirm whether the dose was taken, skipped, or missed.',
      },
      {
        title: 'Keep pickup and supply visible',
        description:
          'Add pharmacy pickup reminders and track remaining supply so refill tasks stay connected to the medication they belong to.',
      },
    ],
    privacyTitle: 'Local organization, not medical advice',
    privacyDescription:
      'MediMemo stores medication names, dosage notes, dose schedules, pickup reminders, stock information, language preferences, and dose history on your device. It is an organizational tool and does not provide medical advice, diagnosis, treatment recommendations, or emergency support.',
    finalCtaDescription:
      'Install MediMemo from the App Store and start with one clear medication reminder.',
    faq: [
      {
        question: 'What is MediMemo for?',
        answer:
          'MediMemo is a medication reminder app for adding medication plans, scheduling dose times, logging taken, skipped, or missed doses, and planning pharmacy pickups.',
      },
      {
        question: 'Does MediMemo need an account?',
        answer:
          'No. Version 1.0 is designed around local iPhone use and does not require an account or cloud sync for the core medication reminder workflow.',
      },
      {
        question: 'How do MediMemo reminders work?',
        answer:
          'MediMemo uses local notifications on your device. If notification permission is disabled in iOS, dose or pickup reminders may not be delivered.',
      },
      {
        question: 'Does MediMemo give medical advice?',
        answer:
          'No. MediMemo is an organization and reminder tool. It does not calculate dosages, diagnose conditions, recommend treatment, or replace advice from a qualified healthcare professional.',
      },
      {
        question: 'Is MediMemo free?',
        answer:
          'MediMemo is available as a free app. Optional premium or lifetime unlock features may be available through the App Store if enabled in the app.',
      },
    ],
  },
  savetap: {
    appStoreName: 'Savings Tracker: SaveTap',
    eyebrow: 'savings tracker and money goals',
    headline: 'A savings tracker for turning skipped spending into progress.',
    intro:
      'SaveTap is a simple savings tracker app for logging daily spending choices, building money goals, and using smart nudges to keep small wins from disappearing.',
    primaryCta: 'View in the App Store',
    secondaryCta: 'See the app',
    availability:
      'Free on the App Store. Optional premium features and subscriptions may be available in the app.',
    accent: '#13d7b6',
    background: 'from-[#04120f] via-[#07110f] to-[#10130d]',
    heroTone: 'dark',
    category: 'FinanceApplication',
    price: 0,
    priceCurrency: 'USD',
    highlights: [
      'Savings tracker for daily spending choices',
      'Money goals, streaks, and visual progress',
      'Geofence nudges and habit reminders for spending hotspots',
      'Local-first entries with no account required',
    ],
    screenshots: [
      {
        src: '/apps/savetap/screens/today.jpg',
        alt: 'SaveTap onboarding screen showing smart location alerts for savings reminders at spending hotspots.',
        label: 'Nudges',
        variant: 'artwork',
      },
      {
        src: '/apps/savetap/screens/goals.jpg',
        alt: 'SaveTap goal setup screen showing a savings goal and progress-oriented money tracker workflow.',
        label: 'Goals',
        variant: 'artwork',
      },
      {
        src: '/apps/savetap/screens/history.jpg',
        alt: 'SaveTap history screen showing logged savings choices and daily money-saving progress.',
        label: 'History',
        variant: 'artwork',
      },
      {
        src: '/apps/savetap/screens/nudges.jpg',
        alt: 'SaveTap location nudge screen showing reminders for places where the user tends to overspend.',
        label: 'Places',
        variant: 'artwork',
      },
      {
        src: '/apps/savetap/screens/insights.jpg',
        alt: 'SaveTap insights screen showing charts, streaks, and savings progress over time.',
        label: 'Insights',
        variant: 'artwork',
      },
    ],
    featureTitle: 'A savings tracker built around the moment of choice.',
    featureIntro:
      'SaveTap keeps the loop concrete: log what you skipped, connect it to a goal, and let reminders catch the spending moments that usually happen on autopilot.',
    features: [
      {
        title: 'Log small savings before they fade',
        description:
          'Add the money you chose not to spend, tag the entry, and keep everyday decisions visible as real progress instead of vague intention.',
      },
      {
        title: 'Give the money a destination',
        description:
          'Create savings goals for purchases, buffers, or personal targets, then watch each logged choice move the goal forward.',
      },
      {
        title: 'Use nudges where habits happen',
        description:
          'Location-based reminders, scheduled cues, and habit prompts help SaveTap show up near the places where impulse spending tends to start.',
      },
    ],
    workflowTitle: 'How SaveTap fits into everyday money habits',
    workflow: [
      {
        title: 'Set a simple goal',
        description:
          'Choose what you are saving for and give small choices a clear target, whether it is a purchase, a buffer, or a personal challenge.',
      },
      {
        title: 'Tap in the moment',
        description:
          'When you skip a coffee, delivery order, snack, or impulse buy, log the amount so the choice becomes part of your savings history.',
      },
      {
        title: 'Review the momentum',
        description:
          'Use history, charts, streaks, and goal progress to see which choices are actually adding up and where reminders can help next.',
      },
    ],
    privacyTitle: 'Private savings entries, no account required',
    privacyDescription:
      'SaveTap stores savings entries, goals, notes, categories, places, reminders, and app settings locally on your device. The App Store privacy listing states that the developer does not collect data from this app.',
    finalCtaDescription:
      'Install SaveTap from the App Store and start with one spending choice you can turn into savings today.',
    faq: [
      {
        question: 'What is SaveTap for?',
        answer:
          'SaveTap is a savings tracker for logging daily spending choices, setting money goals, reviewing progress, and using nudges to reduce impulse spending.',
      },
      {
        question: 'Can SaveTap remind me at specific places?',
        answer:
          'Yes. SaveTap includes geofence-style nudges so you can receive reminders near places where you tend to overspend, such as coffee shops or convenience stops.',
      },
      {
        question: 'Does SaveTap need an account?',
        answer:
          'No. The core savings tracker workflow is designed around local device data and does not require an account.',
      },
      {
        question: 'Does SaveTap collect my financial data?',
        answer:
          'The App Store privacy listing says data is not collected from this app, and the app privacy policy says user-entered savings information remains on the device.',
      },
      {
        question: 'Is SaveTap free?',
        answer:
          'SaveTap is free to download on the App Store. Optional in-app purchases may unlock additional entries, insights, reminders, and motivation features.',
      },
    ],
  },
  quitergy: {
    appStoreName: 'Drink Counter: QuitERGY',
    eyebrow: 'energy drink and caffeine log',
    headline: 'An energy drink tracker and caffeine log for cutting back.',
    intro:
      'QuitERGY is an energy drink tracker and caffeine log for recording drinks, setting personal limits, following streaks, and building healthier caffeine habits without pressure or tracking accounts.',
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
  trexlo: {
    appStoreName: 'T-Rexlo',
    eyebrow: 'virtual pet and cozy T-Rex companion',
    headline: 'A cozy virtual pet app for raising a tiny T-Rex.',
    intro:
      'T-Rexlo is a cozy virtual pet app and T-Rex companion for feeding, play, sleep, care scores, and Home Screen widgets that keep your little dinosaur close during the day.',
    primaryCta: 'View in the App Store',
    secondaryCta: 'See the app',
    availability:
      'Free on the App Store. An optional lifetime premium unlock may be available in the app.',
    accent: '#00c7b1',
    background: 'from-[#c7ecf4] via-[#eef4cf] to-[#d8a04c]',
    category: 'LifestyleApplication',
    price: 0,
    priceCurrency: 'USD',
    highlights: [
      'Virtual T-Rex companion with feed, play, and sleep actions',
      'Care scores for fullness, joy, energy, and overall mood',
      'Cozy Home Screen widgets for quick check-ins',
      'Local-first pet state with no account required',
    ],
    screenshots: [
      {
        src: '/apps/trexlo/screens/home.png',
        alt: 'T-Rexlo home screen showing a sleepy virtual T-Rex with fullness, joy, energy, and overall care score controls.',
        label: 'Home',
      },
      {
        src: '/apps/trexlo/screens/play.png',
        alt: 'T-Rexlo play interaction screen showing the virtual T-Rex after a fun play action with updated joy and care scores.',
        label: 'Play',
      },
      {
        src: '/apps/trexlo/screens/care.png',
        alt: 'T-Rexlo care interaction screen showing the virtual T-Rex feeling loved after a touch interaction.',
        label: 'Care',
      },
    ],
    featureTitle: 'A small care loop for quick, low-pressure breaks.',
    featureIntro:
      'T-Rexlo keeps the companion routine simple: check the mood, choose one caring action, and let the tiny dinosaur settle back into your day.',
    features: [
      {
        title: 'Read the care state instantly',
        description:
          'Fullness, joy, energy, and the overall care score stay visible so you know what your T-Rex needs before choosing an action.',
      },
      {
        title: 'Use one-tap caring actions',
        description:
          'Feed, play, sleep, and touch interactions make the app feel like a short companion moment instead of a long management screen.',
      },
      {
        title: 'Keep the companion nearby',
        description:
          'Widgets can show your T-Rex from the Home Screen, giving you a small visual check-in without opening the full app every time.',
      },
    ],
    workflowTitle: 'How T-Rexlo fits into a daily break',
    workflow: [
      {
        title: 'Check the little T-Rex',
        description:
          'Open the app or glance at a widget to see whether fullness, joy, energy, or sleepiness needs attention.',
      },
      {
        title: 'Choose one gentle action',
        description:
          'Feed, play, let it sleep, or give it attention depending on the current care state and your own available moment.',
      },
      {
        title: 'Return later without pressure',
        description:
          'The app is built for small daily check-ins, so the companion loop stays cozy rather than demanding.',
      },
    ],
    privacyTitle: 'Local pet state with optional purchase validation',
    privacyDescription:
      'T-Rexlo stores your T-Rex companion state, interaction progress, widget state, language preference, and settings on your device. If you buy or restore the optional lifetime premium unlock, Apple handles the transaction and RevenueCat may process technical purchase and entitlement information needed to unlock premium access.',
    finalCtaDescription:
      'Install T-Rexlo from the App Store and start with one tiny prehistoric companion check-in.',
    faq: [
      {
        question: 'What is T-Rexlo for?',
        answer:
          'T-Rexlo is a cozy virtual pet app where you care for a tiny T-Rex through feeding, play, sleep, touch interactions, care scores, and widgets.',
      },
      {
        question: 'Does T-Rexlo need an account?',
        answer:
          'No. The core virtual pet experience is designed around local app state and does not require an account.',
      },
      {
        question: 'What do the widgets show?',
        answer:
          'T-Rexlo widgets can display selected companion state locally through Apple app group storage, so your T-Rex can stay visible on the Home Screen.',
      },
      {
        question: 'Is there a premium purchase?',
        answer:
          'T-Rexlo may offer an optional one-time lifetime premium unlock through Apple In-App Purchase. Purchase validation and restore support may use RevenueCat.',
      },
      {
        question: 'Does T-Rexlo track me for advertising?',
        answer:
          'No. The privacy statement says T-Rexlo does not use third-party advertising SDKs and is not designed for cross-app advertising tracking.',
      },
    ],
  },
  'store-reviews': {
    appStoreName: 'Store Reviews Inbox',
    eyebrow: 'app store review inbox',
    headline: 'An App Store review inbox for feedback across your apps.',
    intro:
      'Store Reviews is an App Store review tracker and local review inbox that brings App Store Connect customer feedback across your apps into one workspace with filters, triage notes, and lightweight analytics.',
    primaryCta: 'View in the App Store',
    secondaryCta: 'See the workspace',
    availability:
      'Available for iPhone and Mac where the App Store listing is live. Store Reviews is a paid developer tool for App Store Connect workflows.',
    accent: '#ff9a2f',
    background: 'from-[#170f0d] via-[#241715] to-[#071715]',
    heroTone: 'dark',
    category: 'DeveloperApplication',
    price: 9.99,
    priceCurrency: 'USD',
    highlights: [
      'Unified inbox for App Store Connect reviews',
      'Filters for app, status, rating, territory, and response state',
      'Local triage statuses and internal notes',
      'Review signals without sending data to a separate cloud inbox',
    ],
    screenshots: [
      {
        src: '/apps/store-reviews/screens/overview.png',
        alt: 'Store Reviews overview screen showing app count, reviewed apps, open reviews, average rating, review trend, and rating split.',
        label: 'Overview',
      },
      {
        src: '/apps/store-reviews/screens/inbox.png',
        alt: 'Store Reviews inbox screen showing customer reviews across apps with status badges, ratings, territories, and review dates.',
        label: 'Inbox',
      },
      {
        src: '/apps/store-reviews/screens/review-detail.png',
        alt: 'Store Reviews detail screen showing customer review context, sentiment, Apple response state, local status, and an internal note.',
        label: 'Triage',
      },
    ],
    featureTitle: 'A review inbox built for app makers who ship more than one app.',
    featureIntro:
      'The workspace keeps feedback operational: scan the queue, filter the noisy parts, and decide what needs follow-up without bouncing through every App Store listing.',
    features: [
      {
        title: 'Scan all incoming feedback together',
        description:
          'Pull reviews from App Store Connect into one inbox and keep the app name, rating, territory, response state, and review date visible while you triage.',
      },
      {
        title: 'Turn reviews into a lightweight workflow',
        description:
          'Use local statuses and internal notes to mark what is new, in progress, or done without posting anything back to Apple automatically.',
      },
      {
        title: 'Spot rating signals before they drift',
        description:
          'Overview charts summarize review volume, open items, reviewed apps, and rating distribution so feedback becomes easier to prioritize.',
      },
    ],
    workflowTitle: 'How Store Reviews fits into an App Store feedback routine',
    workflow: [
      {
        title: 'Connect your App Store Connect credentials',
        description:
          'Add your issuer ID, key ID, and private key on your device so Store Reviews can make authenticated requests directly to Apple.',
      },
      {
        title: 'Sync and filter the review queue',
        description:
          'Refresh reviews when you want current data, then narrow the inbox by app, rating, territory, local status, or Apple response state.',
      },
      {
        title: 'Triage locally before you act',
        description:
          'Add an internal note, move the review through your workflow, and keep response context close to the original customer feedback.',
      },
    ],
    privacyTitle: 'Local workflow data and direct Apple sync',
    privacyDescription:
      'Store Reviews is designed around local workspace data. App Store Connect credentials, app metadata, customer review content, statuses, and internal notes are used to sync with Apple and organize your review workflow; the app does not operate its own cloud inbox for your review data.',
    finalCtaDescription:
      'Install Store Reviews Inbox from the App Store and bring your App Store Connect reviews into one focused workspace.',
    faq: [
      {
        question: 'What is Store Reviews for?',
        answer:
          'Store Reviews is a developer tool for syncing App Store Connect customer reviews across apps into one inbox with filters, local triage, internal notes, and lightweight analytics.',
      },
      {
        question: 'Does Store Reviews post replies to Apple?',
        answer:
          'The current scope is review viewing, filtering, local triage, notes, and response context. It does not automatically write responses back to Apple.',
      },
      {
        question: 'Where is review data stored?',
        answer:
          'The privacy statement says workspace data is primarily stored locally on your device, and sync requests are sent directly to Apple App Store Connect when you trigger them.',
      },
      {
        question: 'Which platforms does it support?',
        answer:
          'Store Reviews is built for Apple developer workflows and is listed here for iOS and macOS.',
      },
    ],
  },
  nightlock: {
    appStoreName: 'NightLock: App Blocker',
    eyebrow: 'bedtime app blocker and screen time pause',
    headline: 'A bedtime app blocker for stopping late-night scrolling.',
    intro:
      'NightLock is a bedtime app blocker and screen time pause for protecting a bedtime window, choosing late-night scroll apps, and adding one deliberate pause before they open.',
    primaryCta: 'Store links coming soon',
    secondaryCta: 'See the app',
    availability:
      'Built for iOS and Android. Store links will be added here when the public listings are live.',
    accent: '#ffc24b',
    background: 'from-[#080b18] via-[#121827] to-[#241a32]',
    heroTone: 'dark',
    category: 'HealthApplication',
    price: 0,
    priceCurrency: 'USD',
    highlights: [
      'Bedtime app blocker for late-night scroll habits',
      'Protection window and focused trigger-app list',
      '15-second pause, stronger Pro friction modes, and slip tracking',
      'Local-first settings and morning report history',
    ],
    screenshots: [
      {
        src: '/apps/nightlock/screens/welcome.png',
        alt: 'NightLock welcome screen explaining the bedtime app blocker routine for stopping accidental night scrolling.',
        label: 'Start',
      },
      {
        src: '/apps/nightlock/screens/window.png',
        alt: 'NightLock protection window screen for choosing when late-night app blocking starts and ends.',
        label: 'Window',
      },
      {
        src: '/apps/nightlock/screens/apps.png',
        alt: 'NightLock app selection screen for choosing trigger apps to protect during the bedtime window.',
        label: 'Apps',
      },
      {
        src: '/apps/nightlock/screens/tonight.png',
        alt: 'NightLock tonight screen showing the active bedtime blocker status and selected protected apps.',
        label: 'Tonight',
      },
      {
        src: '/apps/nightlock/screens/blocker.png',
        alt: 'NightLock pause screen adding friction before a selected late-night scroll app opens.',
        label: 'Pause',
      },
      {
        src: '/apps/nightlock/screens/morning.png',
        alt: 'NightLock morning report screen showing stopped attempts, slips, and reclaimed minutes after bedtime.',
        label: 'Report',
      },
    ],
    featureTitle: 'A narrow bedtime blocker for the apps you open on reflex.',
    featureIntro:
      'NightLock keeps the system intentionally small: set a window, protect a few trigger apps, and review what happened the next morning.',
    features: [
      {
        title: 'Define your night window',
        description:
          'Choose when protection starts and ends so NightLock focuses on the hours where accidental scrolling usually costs sleep.',
      },
      {
        title: 'Pick the apps that pull you in',
        description:
          'Keep the protected list focused on the social, video, or browser apps you tend to open automatically at night.',
      },
      {
        title: 'Add friction before the scroll',
        description:
          'NightLock places a pause between the reflex and the app, then records stopped attempts and slips for the morning report.',
      },
    ],
    workflowTitle: 'How NightLock fits into a bedtime routine',
    workflow: [
      {
        title: 'Set the evening boundary',
        description:
          'Pick a realistic bedtime window, such as 10:30 PM to morning, and let the app handle that repeated schedule.',
      },
      {
        title: 'Protect only the risky apps',
        description:
          'Choose the apps that usually turn one quick check into a long scroll, instead of blocking the whole phone.',
      },
      {
        title: 'Review the morning after',
        description:
          'Use the morning report to see where the pause worked, where you slipped, and how many minutes you reclaimed.',
      },
    ],
    privacyTitle: 'Local-first bedtime protection',
    privacyDescription:
      'NightLock stores your bedtime window, selected app-blocking preferences, friction mode, language preference, local morning reports, and app settings on your device. App blocking depends on platform permissions such as Screen Time on iOS or Usage Access and Accessibility on Android.',
    finalCtaDescription:
      'NightLock store links will be added here as soon as the public iOS and Android listings are available.',
    faq: [
      {
        question: 'What is NightLock for?',
        answer:
          'NightLock is a bedtime app blocker for people who open scroll apps by accident at night and want a deliberate pause before those apps continue.',
      },
      {
        question: 'Does NightLock block every app on my phone?',
        answer:
          'No. NightLock is built around a focused protected list, so you choose the specific trigger apps that should get bedtime friction.',
      },
      {
        question: 'How does the morning report work?',
        answer:
          'The morning report summarizes stopped attempts, slips, and reclaimed time from the protected bedtime window so the habit becomes visible.',
      },
      {
        question: 'Does NightLock need special permissions?',
        answer:
          'Yes. App blocking depends on platform permissions. iOS uses Screen Time frameworks, while Android may use Usage Access and Accessibility to detect selected protected apps during the configured window.',
      },
      {
        question: 'Does NightLock read messages or screen text?',
        answer:
          'No. The Android privacy text states that the Accessibility Service checks foreground app package names for selected apps and does not read screen text, messages, passwords, or typed input.',
      },
    ],
  },
  axlo: {
    appStoreName: 'Axlo',
    eyebrow: 'virtual axolotl pet and aquarium widget',
    headline: 'A virtual axolotl pet app for a calm pocket aquarium.',
    intro:
      'Axlo is a virtual axolotl pet app for iPhone with an animated aquarium companion, simple feed, play, sleep, and touch interactions, local care progress, and Home Screen widgets.',
    primaryCta: 'View in the App Store',
    secondaryCta: 'See the app',
    availability: 'Free on the App Store. Axlo Lifetime may be available as an optional one-time purchase in the app.',
    accent: '#10c7bd',
    background: 'from-[#d6fbf5] via-[#f8fbff] to-[#ffe6f1]',
    category: 'GameApplication',
    price: 0,
    priceCurrency: 'USD',
    highlights: [
      'Animated virtual axolotl companion',
      'Feed, play, sleep, tap, drag, and stroke interactions',
      'Care stats for fullness, joy, energy, and mood',
      'Local-first app state with Home Screen widgets',
    ],
    screenshots: [
      {
        src: '/apps/axlo/screens/meet.png',
        alt: 'Axlo app screen showing the virtual axolotl aquarium, care stats, mood, and feed, play, and sleep controls.',
        label: 'Meet',
      },
      {
        src: '/apps/axlo/screens/care.png',
        alt: 'Axlo app screen showing quick care actions, updated care stats, and the animated axolotl companion.',
        label: 'Care',
      },
      {
        src: '/apps/axlo/screens/mood.png',
        alt: 'Axlo settings screen showing language selection, pet name, haptics, reset controls, and the optional lifetime upgrade.',
        label: 'Settings',
      },
    ],
    featureTitle: 'A tiny aquarium that responds to small moments of care.',
    featureIntro:
      'Axlo keeps the loop intentionally light: check the mood, give one care action, and watch the aquarium react with gentle motion and feedback.',
    features: [
      {
        title: 'Care without a complicated routine',
        description:
          'Feed, play, and sleep actions update fullness, joy, and energy so the companion feels alive without turning the app into a chore.',
      },
      {
        title: 'Interact directly with Axlo',
        description:
          'Tap, drag, stroke, and nudge the axolotl to trigger haptics, particles, and short feedback moments inside the aquarium.',
      },
      {
        title: 'Keep the companion visible',
        description:
          'Widget support shares local app state with the Home Screen, so Axlo can stay close even when the full aquarium is closed.',
      },
    ],
    workflowTitle: 'How Axlo fits into quiet little breaks',
    workflow: [
      {
        title: 'Open the aquarium',
        description:
          'Start with a calm animated tank, a named axolotl companion, and clear care stats for fullness, joy, energy, and mood.',
      },
      {
        title: 'Give one small care action',
        description:
          'Feed, play, rest, tap, drag, or stroke Axlo when the stats or mood hint that a little attention would help.',
      },
      {
        title: 'Let the widget carry the mood',
        description:
          'Use Home Screen widgets for quick companion visibility while the app keeps state locally on the device.',
      },
    ],
    privacyTitle: 'Local companion state, no account required',
    privacyDescription:
      'Axlo stores companion state, care progress, settings, widget state, and other preferences locally on your device. The app does not require an account and does not transmit your virtual pet state to George Valandis servers.',
    finalCtaDescription:
      'Install Axlo from the App Store and start with one calm aquarium check-in.',
    faq: [
      {
        question: 'What is Axlo?',
        answer:
          'Axlo is a cozy virtual axolotl pet app with an animated aquarium, care stats, feed, play, sleep, touch interactions, and widgets.',
      },
      {
        question: 'Does Axlo need an account?',
        answer:
          'No. Axlo is designed around local app state and does not require an account for the core companion experience.',
      },
      {
        question: 'Can I interact with the axolotl?',
        answer:
          'Yes. The app supports care buttons plus direct interactions such as tapping, dragging, and stroking the axolotl for feedback and particle effects.',
      },
      {
        question: 'Does Axlo have widgets?',
        answer:
          'Yes. Axlo includes Home Screen widget support that can display selected companion state through local app group storage.',
      },
      {
        question: 'Is Axlo free?',
        answer:
          'Axlo is listed as free on the App Store, with an optional Axlo Lifetime purchase that may unlock premium aquarium glow and future premium care features.',
      },
    ],
  },
  flowa: {
    appStoreName: 'Symptom Tracker: Flowa',
    eyebrow: 'period tracker and symptom calendar',
    headline: 'A private period tracker and symptom calendar for daily cycle notes.',
    intro:
      'Flowa is a private period tracker app and symptom calendar for period dates, moods, cycle patterns, and personal notes built for calmer health awareness.',
    primaryCta: 'View in the App Store',
    secondaryCta: 'See the app',
    availability:
      'Available on the App Store. App data is designed to stay private on your device.',
    accent: '#ff6f91',
    background: 'from-[#fff0f4] via-[#fff8fb] to-[#f2f7ff]',
    category: 'HealthApplication',
    price: 0,
    priceCurrency: 'USD',
    highlights: [
      'Cycle calendar for period and fertile window context',
      'Symptom, mood, and personal note tracking',
      'Private-first health tracking without account pressure',
      'Clear summaries for understanding repeated patterns',
    ],
    screenshots: [
      {
        src: '/apps/flowa/screens/calendar-raw.png',
        alt: 'Flowa calendar screen showing monthly period and cycle tracking context.',
        label: 'Calendar',
      },
      {
        src: '/apps/flowa/screens/tracking-raw.png',
        alt: 'Flowa tracking screen showing symptom and cycle entry details.',
        label: 'Track',
      },
      {
        src: '/apps/flowa/screens/overview-raw.png',
        alt: 'Flowa insights screen showing cycle information and personal health patterns.',
        label: 'Insights',
      },
      {
        src: '/apps/flowa/screens/suggestions-raw.png',
        alt: 'Flowa suggestion screen showing cycle-related self-care guidance.',
        label: 'Suggestions',
      },
      {
        src: '/apps/flowa/screens/premium-raw.png',
        alt: 'Flowa premium screen showing optional cycle tracking features and trial details.',
        label: 'Premium',
      },
    ],
    featureTitle: 'A cycle tracker that keeps health context close.',
    featureIntro:
      'Flowa turns small daily entries into a clearer cycle calendar, so period dates, symptoms, and recurring signals are easier to review.',
    features: [
      {
        title: 'Track the cycle day by day',
        description:
          'Use the calendar to record period days, expected windows, symptoms, moods, and notes without turning the app into a complex medical form.',
      },
      {
        title: 'Add details when they matter',
        description:
          'Symptom and note entries help you remember what happened during each phase, from cramps and energy shifts to personal observations.',
      },
      {
        title: 'Review patterns over time',
        description:
          'Return to summaries and calendar history to notice repeated signals and prepare for upcoming cycle windows.',
      },
    ],
    workflowTitle: 'How Flowa fits into private cycle tracking',
    workflow: [
      {
        title: 'Set your cycle baseline',
        description:
          'Start with the dates and cycle information you already know so the calendar can build useful context around upcoming days.',
      },
      {
        title: 'Log symptoms in the moment',
        description:
          'Record mood, symptoms, and notes when they happen, then move on without needing an account or a long setup.',
      },
      {
        title: 'Come back with perspective',
        description:
          'Use the calendar and insights to compare recent entries with previous cycles and understand your own rhythm more clearly.',
      },
    ],
    privacyTitle: 'Private-first cycle records',
    privacyDescription:
      'Flowa is designed around private cycle, symptom, mood, and note tracking. The landing page privacy policy covers website cookies and consent records separately from data you enter inside the mobile app.',
    finalCtaDescription:
      'Open Flowa in the App Store and start with a private cycle calendar.',
    faq: [
      {
        question: 'What is Flowa for?',
        answer:
          'Flowa is a period tracker and symptom calendar for recording cycle dates, symptoms, moods, notes, and repeated personal health patterns.',
      },
      {
        question: 'Does Flowa replace a doctor?',
        answer:
          'No. Flowa is a self-tracking and organization tool. It does not provide diagnosis, treatment, emergency help, or medical advice.',
      },
      {
        question: 'Does Flowa need an account?',
        answer:
          'The app is positioned around private tracking and does not require account-based social features for the core cycle tracking workflow.',
      },
      {
        question: 'Is the privacy policy on this page for the app?',
        answer:
          'The Privacy link on this landing page explains website and landing page data such as cookies, consent records, hosting logs, and outbound store links. Mobile app data processing is described separately in the app privacy information.',
      },
    ],
  },
  frokus: {
    appStoreName: 'Frokus - Focus Timer',
    eyebrow: 'pomodoro focus timer',
    headline: 'A Pomodoro focus timer for quiet work sessions.',
    intro:
      'Frokus is a simple Pomodoro focus timer app for work sessions, breaks, reminders, and quiet productivity routines on iPhone.',
    primaryCta: 'View in the App Store',
    secondaryCta: 'See the app',
    availability:
      'Available on the App Store for iPhone. Built as a lightweight focus companion.',
    accent: '#38bdf8',
    background: 'from-[#edf8ff] via-[#f8fbff] to-[#eef6ff]',
    category: 'ProductivityApplication',
    price: 0,
    priceCurrency: 'USD',
    highlights: [
      'Pomodoro focus sessions and short breaks',
      'Clean timer view for distraction-free work',
      'Notification support for session changes',
      'Simple settings for a personal focus rhythm',
    ],
    screenshots: [
      {
        src: '/apps/frokus/screens/timer.jpg',
        alt: 'Frokus focus timer screen showing an active Pomodoro session.',
        label: 'Timer',
        variant: 'poster',
      },
      {
        src: '/apps/frokus/screens/settings.jpg',
        alt: 'Frokus settings screen showing focus timer and break preferences.',
        label: 'Settings',
        variant: 'poster',
      },
      {
        src: '/apps/frokus/screens/notifications.jpg',
        alt: 'Frokus notification screen showing focus session reminder behavior.',
        label: 'Reminders',
        variant: 'poster',
      },
    ],
    featureTitle: 'A focus timer that stays out of the way.',
    featureIntro:
      'Frokus keeps the core loop direct: choose a session, focus until the timer ends, take a break, then repeat when it helps.',
    features: [
      {
        title: 'Start a focused session fast',
        description:
          'The main timer gives the current session one clear job, so you can start working without managing a heavy productivity system.',
      },
      {
        title: 'Shape the rhythm around your day',
        description:
          'Adjust focus and break behavior so the app supports your own Pomodoro routine instead of forcing one fixed setup.',
      },
      {
        title: 'Let reminders handle transitions',
        description:
          'Notifications can bring you back when a session or break ends, which helps you keep momentum without constantly watching the clock.',
      },
    ],
    workflowTitle: 'How Frokus fits into a work block',
    workflow: [
      {
        title: 'Pick one task',
        description:
          'Open Frokus when you know what you want to work on and need a simple boundary for the next focused interval.',
      },
      {
        title: 'Run the timer',
        description:
          'Let the screen show only the session state and remaining time while you keep attention on the task itself.',
      },
      {
        title: 'Reset before the next round',
        description:
          'Use breaks and notification transitions to decide whether to continue, pause, or close the work block.',
      },
    ],
    privacyTitle: 'Simple focus, simple data',
    privacyDescription:
      'Frokus is built for lightweight focus timing. The landing page privacy policy explains website hosting, cookies, consent records, and outbound App Store links separately from app behavior.',
    finalCtaDescription:
      'Open Frokus in the App Store and start a cleaner focus session.',
    faq: [
      {
        question: 'What is Frokus for?',
        answer:
          'Frokus is a Pomodoro-style focus timer for running work sessions, breaks, and reminder-supported productivity routines.',
      },
      {
        question: 'Is Frokus complicated to set up?',
        answer:
          'No. It is intentionally small: open the timer, start a focus block, and adjust basic settings only when needed.',
      },
      {
        question: 'Does Frokus need an account?',
        answer:
          'No account is needed for the simple focus timer workflow.',
      },
      {
        question: 'Is Frokus available on iPhone?',
        answer:
          'Yes. Frokus is available on the App Store for iPhone.',
      },
    ],
  },
  lifechron: {
    appStoreName: 'Timeleft: LifeChron',
    eyebrow: 'life countdown and time tracker',
    headline: 'A life countdown and time tracker for years, months, weeks, and days.',
    intro:
      'LifeChron is a life countdown app and time tracker that turns time into perspective with life progress views, countdown grids, widgets, milestones, and a calm premium unlock.',
    primaryCta: 'View in the App Store',
    secondaryCta: 'See the app',
    availability:
      'Available on the App Store. Optional premium or lifetime unlock features may be available in the app.',
    accent: '#ff7a45',
    background: 'from-[#fff2e8] via-[#fffaf7] to-[#fff0f0]',
    category: 'LifestyleApplication',
    price: 0,
    priceCurrency: 'USD',
    highlights: [
      'Life progress shown in years, months, weeks, and days',
      'Countdown grids for a clearer sense of time',
      'Widgets and settings for personal reflection',
      'Optional premium unlock for deeper customization',
    ],
    screenshots: [
      {
        src: '/apps/lifechron/screens/home-raw.png',
        alt: 'LifeChron home screen showing life progress and time perspective metrics.',
        label: 'Home',
      },
      {
        src: '/apps/lifechron/screens/grid-raw.png',
        alt: 'LifeChron grid screen showing life in weeks and progress blocks.',
        label: 'Grid',
      },
      {
        src: '/apps/lifechron/screens/settings-raw.png',
        alt: 'LifeChron settings screen showing life expectancy, preferences, and widget configuration.',
        label: 'Settings',
      },
    ],
    featureTitle: 'A reflective time tracker built around perspective.',
    featureIntro:
      'LifeChron makes abstract time visible, so long-term progress becomes easier to understand without turning reflection into a spreadsheet.',
    features: [
      {
        title: 'Start with a personal time view',
        description:
          'The home screen translates your setup into years, months, weeks, and days so the core idea is visible immediately.',
      },
      {
        title: 'Use grids for perspective',
        description:
          'Week and progress grids make long stretches of time easier to scan, compare, and reflect on at a glance.',
      },
      {
        title: 'Keep the app personal',
        description:
          'Settings, widgets, and optional premium features let you tune the experience around the kind of perspective you want to keep nearby.',
      },
    ],
    workflowTitle: 'How LifeChron fits into reflection',
    workflow: [
      {
        title: 'Set your baseline',
        description:
          'Enter the information needed to calculate your time perspective, then choose the view that feels most meaningful.',
      },
      {
        title: 'Check time in a clear unit',
        description:
          'Switch between years, months, weeks, days, and grid views depending on whether you want a broad or concrete reminder.',
      },
      {
        title: 'Return when perspective helps',
        description:
          'Use widgets or the app itself as a quiet prompt for milestones, routines, and longer-term decisions.',
      },
    ],
    privacyTitle: 'Personal reflection stays personal',
    privacyDescription:
      'LifeChron is designed around personal time and settings. The landing page privacy policy covers website cookies, consent records, hosting logs, and outbound App Store links separately from app data.',
    finalCtaDescription:
      'Open LifeChron in the App Store and see your time with more perspective.',
    faq: [
      {
        question: 'What is LifeChron for?',
        answer:
          'LifeChron is a life countdown and time perspective app that visualizes years, months, weeks, days, grids, and milestones.',
      },
      {
        question: 'Is LifeChron medical or financial advice?',
        answer:
          'No. LifeChron is a personal reflection tool. Its estimates and progress views are illustrative and are not medical, financial, legal, or professional advice.',
      },
      {
        question: 'Does LifeChron have widgets?',
        answer:
          'Yes. The app is designed to support widget-based time perspective so you can keep selected progress views nearby.',
      },
      {
        question: 'Does LifeChron need an account?',
        answer:
          'The core experience is built around local profile and settings data rather than an account-based social workflow.',
      },
      {
        question: 'Is LifeChron available on iPhone?',
        answer:
          'Yes. LifeChron is available on the App Store for iPhone.',
      },
    ],
  },
};

export function getAppLandingPage(slug: string) {
  return appLandingPages[slug];
}
