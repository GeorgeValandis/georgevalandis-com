export type AppSupportPageContent = {
  intro: string;
  notes: readonly {
    title: string;
    description: string;
  }[];
  faq: readonly {
    question: string;
    answer: string;
  }[];
  contact: string;
};

export const appSupportPages: Record<string, AppSupportPageContent> = {
  medimemo: {
    intro:
      'MediMemo is a local-first medication reminder app for iPhone. These notes cover the most common setup and reminder questions.',
    notes: [
      {
        title: 'Local reminders',
        description:
          'Dose, refill, and pharmacy pickup reminders use local device notifications. Notification permission must stay enabled in iOS settings.',
      },
      {
        title: 'Local app data',
        description:
          'Medication schedules, dose logs, pickup reminders, language preference, and settings stay on the device unless platform-level backups are enabled by the user.',
      },
      {
        title: 'Not medical advice',
        description:
          'MediMemo organizes reminders and logs. It does not provide medical advice, dosage decisions, diagnosis, treatment recommendations, or emergency support.',
      },
    ],
    faq: [
      {
        question: 'How do reminders work?',
        answer:
          'MediMemo schedules local iPhone notifications for medication doses and pharmacy pickups. No account is required for reminders.',
      },
      {
        question: 'Why am I not receiving reminders?',
        answer:
          'Open Settings in MediMemo and check that notifications are enabled for the app in iOS. If notifications are disabled, reminders may not be delivered.',
      },
      {
        question: 'Does MediMemo sync across devices?',
        answer:
          'No. Version 1.0 stores medication plans and logs locally on the current device and does not include account sync.',
      },
      {
        question: 'Does MediMemo send medication data by email?',
        answer:
          'No. Version 1.0 does not include email reminders or developer-operated cloud delivery for medication data.',
      },
      {
        question: 'How can I reset the demo data?',
        answer:
          'Open Settings in the app and use the sample data option where available. You can also delete app data by removing MediMemo from the device.',
      },
    ],
    contact:
      'For support, email info@georgevalandis.com and mention MediMemo in the message.',
  },
};

export const appSupportSlugs = Object.keys(appSupportPages);

export function getAppSupportPage(slug: string) {
  return appSupportPages[slug];
}
