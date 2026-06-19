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
  notebuddy: {
    intro:
      'NoteBuddy is an iPhone app for tiny love messages, hand-drawn notes, and one-buddy sharing. These notes cover buddy setup, iCloud sharing, widgets, and notifications.',
    notes: [
      {
        title: 'Buddy sharing',
        description:
          'NoteBuddy uses Apple-native CloudKit sharing for buddy connections. iCloud availability may be required on participating devices.',
      },
      {
        title: 'Local note data',
        description:
          'Drafts, drawings, sent and received notes, buddy details, widget snapshots, and app settings are designed to stay on device unless shared through Apple iCloud/CloudKit.',
      },
      {
        title: 'Widget and notifications',
        description:
          'Widget refresh and notification delivery depend on iOS settings, notification permission, and system background behavior.',
      },
    ],
    faq: [
      {
        question: 'How do I send a note?',
        answer:
          'Create a short message, add a drawing if you want, set your buddy, and use the send action from the composer.',
      },
      {
        question: 'Why do I need iCloud?',
        answer:
          'The prepared release uses Apple CloudKit sharing for buddy delivery, so iCloud may be needed to create, accept, and sync shared notes.',
      },
      {
        question: 'Does NoteBuddy have a public profile?',
        answer:
          'No. NoteBuddy is built around one buddy relationship and does not include a public feed or public profile.',
      },
      {
        question: 'Can I use the widget without opening the app?',
        answer:
          'The widget can show the latest available note snapshot, but iOS controls when widgets refresh and whether notification permissions are enabled.',
      },
      {
        question: 'How do I report a sharing issue?',
        answer:
          'Email support with your device model, iOS version, app version, and whether both people were signed in to iCloud when the invite or note was sent.',
      },
    ],
    contact:
      'For support, email info@georgevalandis.com and mention NoteBuddy in the message.',
  },
  'darts-scorekeeper': {
    intro:
      'Darts Scorekeeper is a local-first iPhone scorer for 301 and 501 darts matches. These notes cover setup, scoring, checkout hints, and purchase questions.',
    notes: [
      {
        title: 'Local match scoring',
        description:
          'Player names, visits, scores, legs, and match history are designed to stay on the device. No account is required for the scorer workflow.',
      },
      {
        title: 'X01 match flow',
        description:
          'The initial release focuses on 301 and 501 scoring with quick visit entry, bust handling, undo, checkout hints, and two to four players.',
      },
      {
        title: 'Purchase support',
        description:
          'The planned Pro model is a one-time lifetime unlock. Purchase and restore behavior will be handled through Apple In-App Purchase after release.',
      },
    ],
    faq: [
      {
        question: 'Which darts modes are supported?',
        answer:
          'The initial version is built for X01 scoring with 301 and 501 match setup.',
      },
      {
        question: 'Can I undo a wrong score?',
        answer:
          'Yes. The scorer includes undo support so incorrect visits can be corrected during a match.',
      },
      {
        question: 'Does the app calculate checkout hints?',
        answer:
          'Yes. Darts Scorekeeper shows suggested finish context where it can help the current leg.',
      },
      {
        question: 'Does it require an account?',
        answer:
          'No. The app is planned as a local-first match scorer without account setup.',
      },
      {
        question: 'How will Pro purchases work?',
        answer:
          'The planned model is a free download with an optional lifetime Pro unlock through Apple In-App Purchase.',
      },
    ],
    contact:
      'For support, email info@georgevalandis.com and mention Darts Scorekeeper in the message.',
  },
};

export const appSupportSlugs = Object.keys(appSupportPages);

export function getAppSupportPage(slug: string) {
  return appSupportPages[slug];
}
