export type AppSeoGroup =
  | 'health-self-tracking'
  | 'habits-focus-wellbeing'
  | 'utilities-tools'
  | 'cozy-companions';

export type AppSeoMetadata = {
  primaryKeyword: string;
  secondaryKeywords: readonly string[];
  searchIntent: string;
  group: AppSeoGroup;
  updatedAt: string;
};

export const appSeoGroups: Record<AppSeoGroup, { title: string; description: string }> = {
  'health-self-tracking': {
    title: 'Health and self-tracking apps',
    description:
      'Private trackers for cycles, mood, migraines, medication routines, and daily health context.',
  },
  'habits-focus-wellbeing': {
    title: 'Habits, focus, and wellbeing apps',
    description:
      'Small utilities for routines, screen breaks, Pomodoro sessions, savings habits, caffeine reduction, time perspective, and bedtime boundaries.',
  },
  'utilities-tools': {
    title: 'Utilities and developer tools',
    description:
      'Focused tools for practical shopping decisions and App Store feedback workflows.',
  },
  'cozy-companions': {
    title: 'Cozy companion apps',
    description:
      'Lightweight virtual pets and widgets designed for calm daily check-ins.',
  },
};

export const appSeoGroupOrder: readonly AppSeoGroup[] = [
  'health-self-tracking',
  'habits-focus-wellbeing',
  'utilities-tools',
  'cozy-companions',
];

export const appSeoMetadata: Record<string, AppSeoMetadata> = {
  flowa: {
    primaryKeyword: 'period tracker app',
    secondaryKeywords: ['symptom calendar', 'cycle tracker', 'private cycle calendar'],
    searchIntent:
      'Find a private period tracker for cycle dates, symptoms, moods, and personal notes.',
    group: 'health-self-tracking',
    updatedAt: '2026-05-23',
  },
  flower: {
    primaryKeyword: 'Android period tracker app',
    secondaryKeywords: ['cycle calendar', 'ovulation tracker', 'symptom tracker'],
    searchIntent:
      'Find an Android period tracker for cycle dates, ovulation markers, mood, symptoms, and notes.',
    group: 'health-self-tracking',
    updatedAt: '2026-05-23',
  },
  moodflora: {
    primaryKeyword: 'mood tracker app',
    secondaryKeywords: ['private journal', 'mood calendar', 'daily mood check-in'],
    searchIntent:
      'Find a mood tracker and private journal for daily check-ins, calendar review, and reflection.',
    group: 'health-self-tracking',
    updatedAt: '2026-05-23',
  },
  'my-grain-tracker': {
    primaryKeyword: 'migraine tracker app',
    secondaryKeywords: ['headache diary', 'migraine log', 'trigger tracker'],
    searchIntent:
      'Find a migraine tracker and headache diary for attacks, triggers, aura, medication, and notes.',
    group: 'health-self-tracking',
    updatedAt: '2026-05-23',
  },
  glanceaway: {
    primaryKeyword: 'eye break timer',
    secondaryKeywords: ['20-20-20 rule reminder', 'screen break reminder', 'eye rest app'],
    searchIntent:
      'Find a 20-20-20 eye break timer for gentle screen-break reminders and progress stats.',
    group: 'habits-focus-wellbeing',
    updatedAt: '2026-05-23',
  },
  'perfect-day': {
    primaryKeyword: 'habit tracker app',
    secondaryKeywords: ['streak tracker', 'daily routine tracker', 'weekly habit board'],
    searchIntent:
      'Find a habit tracker and streak tracker for daily routines, reminders, widgets, and weekly progress.',
    group: 'habits-focus-wellbeing',
    updatedAt: '2026-05-23',
  },
  frokus: {
    primaryKeyword: 'Pomodoro focus timer',
    secondaryKeywords: ['focus timer app', 'productivity timer', 'work session timer'],
    searchIntent:
      'Find a simple Pomodoro focus timer for work sessions, breaks, reminders, and quiet routines.',
    group: 'habits-focus-wellbeing',
    updatedAt: '2026-05-23',
  },
  savetap: {
    primaryKeyword: 'savings tracker app',
    secondaryKeywords: ['money goal tracker', 'spending choice tracker', 'daily savings log'],
    searchIntent:
      'Find a savings tracker for turning skipped spending and daily money choices into visible progress.',
    group: 'habits-focus-wellbeing',
    updatedAt: '2026-05-23',
  },
  'ring-sizer': {
    primaryKeyword: 'ring size finder app',
    secondaryKeywords: ['ring size converter', 'ring measurement guide', 'jewelry size helper'],
    searchIntent:
      'Find a ring size finder and converter before buying rings online.',
    group: 'utilities-tools',
    updatedAt: '2026-05-23',
  },
  quitergy: {
    primaryKeyword: 'energy drink tracker',
    secondaryKeywords: ['caffeine log', 'drink counter', 'energy drink habit tracker'],
    searchIntent:
      'Find an energy drink tracker and caffeine log for cutting back with limits, streaks, and reminders.',
    group: 'habits-focus-wellbeing',
    updatedAt: '2026-05-23',
  },
  axlo: {
    primaryKeyword: 'virtual axolotl pet app',
    secondaryKeywords: ['aquarium widget', 'cozy virtual pet', 'axolotl companion'],
    searchIntent:
      'Find a virtual axolotl pet app with a calm aquarium, care loop, touch interactions, and widgets.',
    group: 'cozy-companions',
    updatedAt: '2026-05-23',
  },
  trexlo: {
    primaryKeyword: 'virtual T-Rex pet app',
    secondaryKeywords: ['cozy virtual pet', 'dinosaur companion', 'pet widget'],
    searchIntent:
      'Find a cozy virtual pet app for feeding, playing with, and caring for a tiny T-Rex companion.',
    group: 'cozy-companions',
    updatedAt: '2026-05-23',
  },
  'store-reviews': {
    primaryKeyword: 'App Store review inbox',
    secondaryKeywords: ['App Store review tracker', 'App Store Connect feedback', 'review triage'],
    searchIntent:
      'Find a local inbox for App Store reviews, customer feedback triage, notes, and lightweight analytics.',
    group: 'utilities-tools',
    updatedAt: '2026-05-23',
  },
  medimemo: {
    primaryKeyword: 'medication reminder app',
    secondaryKeywords: ['dose tracker', 'pill reminder', 'pharmacy pickup reminder'],
    searchIntent:
      'Find a medication reminder and dose tracker for daily doses, pickup planning, and local check-ins.',
    group: 'health-self-tracking',
    updatedAt: '2026-05-23',
  },
  notebuddy: {
    primaryKeyword: 'love messages',
    secondaryKeywords: ['love notes', 'cute notes', 'romantic messages'],
    searchIntent:
      'Find a cute love messages app for sending small handwritten notes, drawings, and sweet daily thoughts to one favorite person.',
    group: 'cozy-companions',
    updatedAt: '2026-06-04',
  },
  lifechron: {
    primaryKeyword: 'life countdown app',
    secondaryKeywords: ['time tracker', 'life progress tracker', 'countdown grid'],
    searchIntent:
      'Find a life countdown and time tracker for years, months, weeks, days, milestones, and widgets.',
    group: 'habits-focus-wellbeing',
    updatedAt: '2026-05-23',
  },
  nightlock: {
    primaryKeyword: 'bedtime app blocker',
    secondaryKeywords: ['screen time pause', 'late-night scrolling blocker', 'digital wellbeing app'],
    searchIntent:
      'Find a bedtime app blocker that adds a deliberate pause before late-night scrolling apps open.',
    group: 'habits-focus-wellbeing',
    updatedAt: '2026-05-23',
  },
  'darts-scorekeeper': {
    primaryKeyword: 'darts scorekeeper',
    secondaryKeywords: ['dart scoreboard', '501 darts scorer', 'darts scoring app'],
    searchIntent:
      'Find a darts scorekeeper and scoreboard for 301, 501, quick visit entry, checkout hints, bust handling, and match stats.',
    group: 'utilities-tools',
    updatedAt: '2026-05-27',
  },
};

export const supportSeoMetadata: Record<string, { updatedAt: string }> = {
  medimemo: {
    updatedAt: '2026-05-23',
  },
  notebuddy: {
    updatedAt: '2026-06-04',
  },
  'darts-scorekeeper': {
    updatedAt: '2026-05-27',
  },
};

export function getAppSeoMetadata(slug: string) {
  return appSeoMetadata[slug];
}
