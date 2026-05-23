export type AppEntry = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  platforms: readonly ('iOS' | 'macOS' | 'Android')[];
  tags: readonly string[];
  gradient: string;
  accentBorder: string;
  appStoreLink?: string;
  websitePath?: string;
  logo: string;
  legal: {
    termsPath: string;
    privacyPath: string;
  };
};

const baseApps = [
  {
    slug: 'flowa',
    title: 'Flowa',
    subtitle: 'Understand Your Cycle, Empower Your Health',
    description:
      'Tracking the female cycle for better understanding and health insights. My first paid app on the App Store.',
    platforms: ['iOS', 'Android'],
    tags: ['Swift', 'SwiftUI', 'HealthKit', 'Paid'],
    gradient: 'from-pink-500/20 to-rose-500/20',
    accentBorder: 'group-hover:border-pink-500/40',
    appStoreLink: 'https://apps.apple.com/us/app/menstrual-calendar-flowa/id6738320165?uo=4',
    logo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d6/fc/ce/d6fcceea-f9e3-29ad-9df6-730585ca9f84/AppIcon-0-0-1x_U007ephone-0-1-0-85-220.png/512x512bb.jpg',
  },
  {
    slug: 'moodflora',
    title: 'MoodFlora',
    subtitle: 'Track Your Moods, Grow Your Well-Being',
    description:
      'An iOS odyssey into mood mastery and journal vibes. Track your emotional well-being and watch your garden grow.',
    platforms: ['iOS', 'Android'],
    tags: ['Swift', 'SwiftUI', 'Journal', 'Free'],
    gradient: 'from-emerald-500/20 to-teal-500/20',
    accentBorder: 'group-hover:border-emerald-500/40',
    appStoreLink: 'https://apps.apple.com/us/app/mood-tracker-moodflora/id6477776787?uo=4',
    logo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/f8/d4/9a/f8d49a83-ddf9-3901-ccc1-196bf4fb1fbc/AppIcon-0-0-1x_U007ephone-0-1-0-85-220.png/512x512bb.jpg',
  },
  {
    slug: 'my-grain-tracker',
    title: 'My Grain Tracker',
    subtitle: 'Track Migraine Episodes and Notice Patterns',
    description:
      'A private migraine tracker for logging attacks, symptoms, intensity, notes, and patterns over time.',
    platforms: ['iOS', 'Android'],
    tags: ['Swift', 'SwiftUI', 'Health', 'Migraine', 'Premium'],
    gradient: 'from-indigo-500/20 to-cyan-500/20',
    accentBorder: 'group-hover:border-indigo-400/40',
    appStoreLink: 'https://apps.apple.com/us/app/id6768293129?uo=4',
    websitePath: '/apps/my-grain-tracker/',
    logo: '/apps/my-grain-tracker-icon.png',
  },
  {
    slug: 'glanceaway',
    title: 'GlanceAway',
    subtitle: 'Your Gentle Reminder to Protect Your Eyes',
    description:
      'A gentle reminder app that helps you protect your eyes by encouraging regular screen breaks throughout the day.',
    platforms: ['iOS', 'macOS'],
    tags: ['Swift', 'SwiftUI', 'Notifications', 'Health'],
    gradient: 'from-sky-500/20 to-blue-500/20',
    accentBorder: 'group-hover:border-sky-500/40',
    appStoreLink: 'https://apps.apple.com/us/app/eye-break-glanceaway/id6751297230?uo=4',
    websitePath: '/apps/glanceaway/',
    logo: '/apps/glanceaway-icon.png',
  },
  {
    slug: 'perfect-day',
    title: 'Perfect Day',
    subtitle: 'Daily Streaks & Routines',
    description:
      'A clean habit tracker for daily routines, weekly progress, reminders, streaks, widgets, and small visual wins.',
    platforms: ['iOS'],
    tags: ['Swift', 'SwiftUI', 'Habits', 'Streaks', 'Widgets'],
    gradient: 'from-amber-500/20 to-orange-500/20',
    accentBorder: 'group-hover:border-amber-500/40',
    appStoreLink: 'https://apps.apple.com/us/app/habit-day-tracker-perfectday/id6741456646?uo=4',
    websitePath: '/apps/perfect-day/',
    logo: '/apps/perfect-day-icon.png',
  },
  {
    slug: 'frokus',
    title: 'Frokus',
    subtitle: 'Focus Better with Pomodoro Sessions',
    description:
      'A focus timer app because everybody has to have one in their app portfolio. Built with love and simplicity.',
    platforms: ['iOS'],
    tags: ['Swift', 'SwiftUI', 'Pomodoro', 'Focus'],
    gradient: 'from-blue-500/20 to-cyan-500/20',
    accentBorder: 'group-hover:border-blue-500/40',
    appStoreLink: 'https://apps.apple.com/us/app/frokus-focus-timer/id6737744446?uo=4',
    logo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/12/3b/91/123b9169-f680-37c6-bb2a-aee05279f039/AppIcon-0-0-1x_U007ephone-0-1-85-220.jpeg/512x512bb.jpg',
  },
  {
    slug: 'savetap',
    title: 'SaveTap',
    subtitle: 'Turn Daily Choices into Real Savings',
    description:
      'Track your daily spending choices and see how small savings add up over time. Simple, motivating, effective.',
    platforms: ['iOS'],
    tags: ['Swift', 'SwiftUI', 'Finance', 'Savings'],
    gradient: 'from-green-500/20 to-emerald-500/20',
    accentBorder: 'group-hover:border-green-500/40',
    appStoreLink: 'https://apps.apple.com/us/app/savings-tracker-savetap/id6752865110?uo=4',
    logo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/4e/73/1d/4e731de4-e0b4-960d-27bc-13b3907c1340/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg',
  },
  {
    slug: 'ring-sizer',
    title: 'Ring Sizer',
    subtitle: 'Measure & Convert Ring Sizes',
    description:
      'Find, convert and save ring sizes before buying rings online. Measure an existing ring, convert US, EU and UK sizes, and keep practical size notes per finger.',
    platforms: ['iOS'],
    tags: ['Swift', 'SwiftUI', 'Shopping', 'Jewelry', 'Premium'],
    gradient: 'from-amber-500/20 to-cyan-500/20',
    accentBorder: 'group-hover:border-amber-400/40',
    websitePath: '/apps/ring-sizer/',
    logo: '/apps/ring-sizer-icon.png',
  },
  {
    slug: 'quitergy',
    title: 'QuitERGY',
    subtitle: 'Energy Drink & Caffeine Log',
    description:
      'A mindful drink counter for logging energy drinks, setting limits, and building healthier caffeine habits at your own pace.',
    platforms: ['iOS', 'macOS'],
    tags: ['Swift', 'SwiftUI', 'Health', 'Caffeine'],
    gradient: 'from-violet-500/20 to-fuchsia-500/20',
    accentBorder: 'group-hover:border-violet-500/40',
    appStoreLink: 'https://apps.apple.com/us/app/quit-energy-drinks-quitergy/id6754967219?uo=4',
    websitePath: '/apps/quitergy/',
    logo: '/apps/quitergy-icon.png',
  },
  {
    slug: 'axlo',
    title: 'Axlo',
    subtitle: 'A cozy virtual axolotl companion',
    description:
      'A calm aquarium app with a charming animated axolotl, gentle touch interactions, and widgets for quiet little breaks.',
    platforms: ['iOS'],
    tags: ['Swift', 'SwiftUI', 'Widget', 'Virtual Pet'],
    gradient: 'from-cyan-500/20 to-pink-500/20',
    accentBorder: 'group-hover:border-cyan-400/40',
    appStoreLink: 'https://apps.apple.com/us/app/axlo/id6763662101?uo=4',
    websitePath: '/apps/axlo/',
    logo: '/apps/axlo-icon.png',
  },
  {
    slug: 'trexlo',
    title: 'T-Rexlo',
    subtitle: 'A cozy virtual T-Rex companion',
    description:
      'Raise a tiny land-dwelling T-Rex with feeding, play, sleep, care scores, and cozy widgets for quick daily breaks.',
    platforms: ['iOS'],
    tags: ['Swift', 'SwiftUI', 'Widget', 'Virtual Pet'],
    gradient: 'from-emerald-500/20 to-amber-500/20',
    accentBorder: 'group-hover:border-emerald-400/40',
    appStoreLink: 'https://apps.apple.com/us/app/t-rexlo/id6763680324?uo=4',
    websitePath: '/apps/trexlo/',
    logo: '/apps/trexlo-icon.png',
  },
  {
    slug: 'store-reviews',
    title: 'Store Reviews',
    subtitle: 'One Inbox for Your App Store Reviews',
    description:
      'A focused review inbox for App Store Connect that pulls feedback across apps into one place with local notes, triage, and lightweight analytics.',
    platforms: ['iOS', 'macOS'],
    tags: ['Swift', 'SwiftUI', 'Developer Tools'],
    gradient: 'from-amber-500/20 to-orange-500/20',
    accentBorder: 'group-hover:border-amber-500/40',
    appStoreLink: 'https://apps.apple.com/us/app/store-reviews-inbox/id6761003137?uo=4',
    logo: '/apps/store-reviews-icon.png',
  },
  {
    slug: 'medimemo',
    title: 'MediMemo',
    subtitle: 'Medication reminders with an optional lifetime unlock',
    description:
      'A calm medication reminder app for daily doses, pharmacy pickup planning, and local adherence check-ins with a free tier and one-time premium unlock.',
    platforms: ['iOS', 'Android'],
    tags: ['Swift', 'SwiftUI', 'Health', 'Medication', 'Lifetime'],
    gradient: 'from-emerald-500/20 to-cyan-500/20',
    accentBorder: 'group-hover:border-emerald-500/40',
    appStoreLink: 'https://apps.apple.com/app/id6761365488',
    logo: '/apps/medimemo-icon.png',
  },
  {
    slug: 'lifechron',
    title: 'LifeChron',
    subtitle: 'See Your Life in Years, Months, Weeks, and Days',
    description:
      'A reflective time tracker that turns your life into perspective with clear countdowns, milestones, and a premium lifetime unlock.',
    platforms: ['iOS'],
    tags: ['Swift', 'SwiftUI', 'Time', 'Perspective'],
    gradient: 'from-orange-500/20 to-red-500/20',
    accentBorder: 'group-hover:border-orange-500/40',
    appStoreLink: 'https://apps.apple.com/us/app/life-time-tracker-lifechron/id6760122665?uo=4',
    logo: '/apps/lifechron-icon.png',
  },
  {
    slug: 'nightlock',
    title: 'NightLock',
    subtitle: 'Stop accidental scrolling after 10:30 PM',
    description:
      'A focused bedtime blocker that adds one deliberate pause before your late-night scroll apps open, then shows the slips the next morning.',
    platforms: ['iOS', 'Android'],
    tags: ['Swift', 'SwiftUI', 'Sleep', 'Digital Wellbeing'],
    gradient: 'from-indigo-500/20 to-amber-500/20',
    accentBorder: 'group-hover:border-indigo-400/40',
    logo: '/apps/nightlock-icon.png',
  },
] as const;

export const apps: AppEntry[] = baseApps.map((app) => ({
  ...app,
  legal: {
    termsPath: `/apps/${app.slug}/terms-and-conditions/`,
    privacyPath: `/apps/${app.slug}/privacy-statement/`,
  },
}));

export const appSlugs = apps.map((app) => app.slug);

export function getAppBySlug(slug: string) {
  return apps.find((app) => app.slug === slug);
}
