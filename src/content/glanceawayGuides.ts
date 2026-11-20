/**
 * Search-intent guide pages for GlanceAway under /apps/glanceaway/{slug}/.
 * Each page answers one Google question and points to the App Store through the download redirect
 * (campaign token per page, position per link). Copy supports inline links as [text](url).
 * Keyword map and measurement: LookAway repo docs/seo-landingpage-2026-11-20.md.
 */

export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: { title: string; text: string }[];
  /** Emit this section's steps as HowTo structured data. */
  howTo?: boolean;
};

export type GuideComparisonRow = {
  name: string;
  platforms: string;
  price: string;
  bestFor: string;
  note: string;
  ours?: boolean;
  /** Official page of a third-party app (nofollow). */
  url?: string;
  urlLabel?: string;
};

export type GuideSource = { label: string; url: string };

export type GlanceAwayGuide = {
  slug: string;
  /** Short label used in breadcrumbs and related links. */
  navLabel: string;
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  intro: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  publishedAt: string;
  updatedAt: string;
  /** App Store Connect campaign token (ct) for clicks from this page. */
  campaign: string;
  hasTimer?: boolean;
  sections: GuideSection[];
  comparisonTitle?: string;
  comparisonIntro?: string;
  comparison?: GuideComparisonRow[];
  /** Screenshot and App Store link placed after sections[afterSection]. */
  midCta?: { afterSection: number; title: string; text: string };
  cta: { title: string; text: string };
  faq: { question: string; answer: string }[];
  sources: GuideSource[];
};

const aaoComputerUsage: GuideSource = {
  label: 'American Academy of Ophthalmology: Computers, Digital Devices and Eye Strain',
  url: 'https://www.aao.org/eye-health/tips-prevention/computer-usage',
};

const aoaComputerVision: GuideSource = {
  label: 'American Optometric Association: Computer vision syndrome',
  url: 'https://www.aoa.org/healthy-eyes/eye-and-vision-conditions/computer-vision-syndrome',
};

const aaoBlueLight: GuideSource = {
  label: 'American Academy of Ophthalmology: Should you be worried about blue light?',
  url: 'https://www.aao.org/eye-health/tips-prevention/should-you-be-worried-about-blue-light',
};

export const glanceAwayGuides: GlanceAwayGuide[] = [
  {
    slug: '20-20-20-rule-timer',
    navLabel: '20-20-20 timer',
    title: '20-20-20 Rule Timer: Free Online Eye Break Timer',
    description:
      'Free 20-20-20 rule timer in your browser: work for 20 minutes, then look 20 feet away for 20 seconds. With a chime, a countdown in the tab, and a 30 minute option.',
    eyebrow: '20-20-20 rule timer',
    headline: 'A free 20-20-20 timer that tells you when to look away.',
    intro:
      'The 20-20-20 rule: every 20 minutes, look at something about 20 feet away for 20 seconds. Press start and keep working. The timer chimes when it is time to look away and counts the 20 seconds for you.',
    primaryKeyword: '20 20 20 rule timer',
    secondaryKeywords: [
      '20-20-20 timer online',
      'look away from screen every 20 minutes',
      '20 20 20 rule for eye strain',
      '20 20 20 rule for screen time',
      'eye break timer',
    ],
    publishedAt: '2026-11-20',
    updatedAt: '2026-11-20',
    campaign: 'seo_timer',
    hasTimer: true,
    sections: [
      {
        heading: 'What is the 20-20-20 rule?',
        paragraphs: [
          'Every 20 minutes of screen time, look at something about 20 feet (6 meters) away for at least 20 seconds. The American Optometric Association recommends the rule to ease digital eye strain.',
          'Up close, the focusing muscles in your eyes work the whole time. Looking into the distance lets them relax for a moment. You also tend to blink again, which you do much less while staring at a screen. For the full picture, see [how to reduce eye strain from screens](/apps/glanceaway/eye-strain-from-screens/).',
        ],
      },
      {
        heading: 'How to use this timer',
        howTo: true,
        steps: [
          {
            title: 'Start the timer and go back to work',
            text: 'Pick 20 or 30 minutes and press start. Keep this tab open; the tab title shows the countdown, so you can check it without switching windows.',
          },
          {
            title: 'Look away when it chimes',
            text: 'Find something far away: a window, the end of a hallway, a tree outside. Let your eyes rest on it until the 20 seconds are up.',
          },
          {
            title: 'Repeat for the rest of the day',
            text: 'The next focus block starts automatically after each break. The habit only helps if it repeats.',
          },
        ],
      },
      {
        heading: 'Why a browser timer is only half the solution',
        paragraphs: [
          'A browser tab works while you sit at the computer with this tab open. It does not follow you to your phone, it stops when you close the browser, and a chime is easy to ignore when you are in the middle of something.',
          'That is why I built GlanceAway. It runs the same 20-20-20 rhythm on iPhone and Mac, shows a calm full-screen break on Mac so you actually look away, waits while you are in a video call, and keeps a streak so you can see whether the habit sticks. If you want to compare options first, here are [the best 20-20-20 rule apps](/apps/glanceaway/20-20-20-rule-app/).',
        ],
      },
      {
        heading: 'Tips that make the 20 seconds count',
        bullets: [
          'Look as far as you can. A window is better than the wall behind your monitor.',
          'Blink slowly a few times during the break.',
          'Stand up every second or third break. Your neck and back will thank you too.',
          'If 20 minutes feels too often at first, switch the timer to 30 minutes and work your way down. A break you actually take beats a perfect schedule you skip.',
        ],
      },
    ],
    midCta: {
      afterSection: 2,
      title: 'The same timer, on your iPhone and Mac.',
      text: 'GlanceAway keeps the 20-20-20 rhythm going when this tab is closed. Free to try with 3 breaks a day; premium removes the limit.',
    },
    cta: {
      title: 'Let your iPhone and Mac do the timing.',
      text: 'GlanceAway runs the 20-20-20 rhythm in the background on iPhone and Mac, with full-screen breaks on Mac and stats that show your streak. Free to try with 3 breaks a day; premium removes the limit.',
    },
    faq: [
      {
        question: 'Does the 20-20-20 rule actually work?',
        answer:
          'It is a simple, widely recommended way to give your eyes regular breaks. Eye care organizations such as the American Optometric Association recommend it to reduce digital eye strain. The hard part is remembering to do it, which is what a timer solves.',
      },
      {
        question: 'Is 20 feet a strict distance?',
        answer:
          'No. The point is to look far enough away that your eyes stop focusing up close. About 6 meters or more works, and looking out of a window is ideal.',
      },
      {
        question: 'Will this timer work in the background?',
        answer:
          'On a computer, yes, as long as the tab stays open. It keeps time in background tabs, shows the countdown in the tab title, and can send a notification when a break starts if you allow it. Phones pause web pages when you switch apps, so on a phone keep the page open or use an app.',
      },
      {
        question: 'Is there a 20-20-20 timer app for iPhone and Mac?',
        answer:
          'Yes. GlanceAway is an eye break timer for iPhone and Mac built around the 20-20-20 rule. The free version covers 3 breaks a day; premium removes the limit.',
      },
    ],
    sources: [aoaComputerVision, aaoComputerUsage],
  },
  {
    slug: '20-20-20-rule-app',
    navLabel: '20-20-20 apps',
    title: 'Best 20-20-20 Rule Apps for iPhone and Mac (2026)',
    description:
      'An honest look at 20-20-20 rule apps for iPhone and Mac in 2026: what each app does well, what it costs, and which one fits how you work.',
    eyebrow: '20-20-20 rule apps',
    headline: 'The best 20-20-20 rule apps for iPhone and Mac.',
    intro:
      'Short answer: for one rhythm on iPhone and Mac, try GlanceAway (my own app, disclosed below). On a Mac alone, LookAway, Time Out, and Intermission are good picks, and Stretchly is free on every desktop system. For a simple phone reminder, Eye Care 20 20 20 or 20.20.20 will do.',
    primaryKeyword: '20-20-20 rule app',
    secondaryKeywords: [
      '20 20 20 rule app iphone',
      '20 20 20 rule app mac',
      'best app for eye strain',
      'eye break app',
      'break reminder app mac',
    ],
    publishedAt: '2026-11-20',
    updatedAt: '2026-11-20',
    campaign: 'seo_apps',
    sections: [
      {
        heading: 'What to look for in a 20-20-20 app',
        bullets: [
          'A reminder you cannot miss. A small notification is easy to swipe away. A full-screen break works better at a desk.',
          'Respect for your work. Breaks should wait during video calls and give you a short heads-up before they start.',
          'Every device you use. If you switch between Mac and iPhone during the day, the rhythm should follow you.',
          'Proof that it works. Stats and streaks show whether you are actually taking breaks, not just dismissing them.',
          'No account, little data. A timer does not need your email address.',
        ],
      },
      {
        heading: 'How I picked these apps',
        paragraphs: [
          'I looked at the apps that show up when you search the App Store and Google for 20-20-20, eye break, and break reminder, and checked their official listings and websites in November 2026. Prices and features change, so check before you decide. No app at all yet? The [free 20-20-20 timer](/apps/glanceaway/20-20-20-rule-timer/) runs in your browser.',
          'Full disclosure: GlanceAway is my own app. I built it because I wanted full-screen breaks on my Mac and the same rhythm on my iPhone in one app. I still list the others because one of them may fit you better. Most of them differ less in the timer itself than in how hard the reminder is to ignore and which devices it covers.',
        ],
      },
    ],
    comparisonTitle: 'The apps at a glance',
    comparisonIntro: 'Listing details as of November 2026.',
    comparison: [
      {
        name: 'GlanceAway',
        platforms: 'iPhone, Mac',
        price: 'Free: 3 breaks a day, premium unlimited',
        bestFor: 'One rhythm across iPhone and Mac',
        note: 'Full-screen breaks on Mac, menu bar timer, a heads-up before each break, waits during video calls, streaks and stats. No account.',
        ours: true,
      },
      {
        name: 'LookAway',
        platforms: 'Mac (iPhone and iPad through the LookAway Mirror companion)',
        price: 'One-time purchase from $19',
        bestFor: 'A polished Mac break app',
        note: 'Waits for a natural moment before a break and adds posture and blink reminders.',
        url: 'https://lookaway.com',
        urlLabel: 'lookaway.com',
      },
      {
        name: 'Time Out',
        platforms: 'Mac',
        price: 'Free, optional supporter purchases',
        bestFor: 'Customizable Mac breaks',
        note: 'A long-running Mac app with short and long breaks and many options for how they look and behave.',
        url: 'https://www.dejal.com/timeout/',
        urlLabel: 'dejal.com',
      },
      {
        name: 'Intermission',
        platforms: 'Mac',
        price: '7-day trial, then $7.99 once',
        bestFor: 'Choosing how strict breaks are',
        note: 'Shows breaks as a subtle reminder or full screen, depending on how firm a stop you want.',
        url: 'https://tryintermission.com',
        urlLabel: 'tryintermission.com',
      },
      {
        name: 'Stretchly',
        platforms: 'Mac, Windows, Linux',
        price: 'Free, open source',
        bestFor: 'Windows and Linux, or zero cost',
        note: 'Break reminders for any desktop computer, with short micro breaks and longer pauses.',
        url: 'https://hovancik.net/stretchly/',
        urlLabel: 'hovancik.net',
      },
      {
        name: 'Eye Care 20 20 20',
        platforms: 'iPhone, iPad',
        price: 'Free, optional subscription',
        bestFor: 'A simple phone reminder',
        note: 'A repeating 20 minute reminder for your phone.',
        url: 'https://apps.apple.com/us/app/eye-care-20-20-20/id967901219',
        urlLabel: 'App Store',
      },
      {
        name: '20.20.20: Eye Care & Tracker',
        platforms: 'iPhone, Apple Watch',
        price: 'Free, Plus from $0.99 a month',
        bestFor: 'Reminders on your wrist',
        note: 'Reminds you every 20 minutes and tracks your progress over time.',
        url: 'https://apps.apple.com/us/app/20-20-20-eye-care-tracker/id872763741',
        urlLabel: 'App Store',
      },
      {
        name: 'Eye Reliever',
        platforms: 'iPhone',
        price: 'Free, no in-app purchases',
        bestFor: 'A free phone reminder',
        note: 'Simple break reminders on iPhone without any purchases.',
        url: 'https://apps.apple.com/us/app/eye-reliever/id1451148741',
        urlLabel: 'App Store',
      },
    ],
    midCta: {
      afterSection: 1,
      title: 'Want to try mine first?',
      text: 'GlanceAway runs on iPhone and Mac, shows a full-screen break on Mac, and needs no account. Free to try with 3 breaks a day; premium removes the limit.',
    },
    cta: {
      title: 'Try the one that works on iPhone and Mac.',
      text: 'GlanceAway keeps the 20-20-20 rhythm on your iPhone and Mac, with full-screen breaks on Mac and stats that show your streak. Free to try with 3 breaks a day; premium removes the limit.',
    },
    faq: [
      {
        question: 'What is the best app for the 20-20-20 rule?',
        answer:
          'It depends on your setup. If you only want a phone reminder, a simple free app is enough. If you work at a Mac and also use an iPhone, an app that runs on both and shows a full-screen break, such as GlanceAway, makes the habit much harder to skip.',
      },
      {
        question: 'Is there a 20-20-20 app for Mac?',
        answer:
          'Yes. GlanceAway, LookAway, Time Out, Intermission, and Stretchly all run on Mac. GlanceAway also runs on iPhone with the same rhythm.',
      },
      {
        question: 'Can I use the 20-20-20 rule without an app?',
        answer:
          'Yes, any timer works. The [free 20-20-20 timer](/apps/glanceaway/20-20-20-rule-timer/) on this site runs in your browser. Apps help because they keep running when the tab is closed and make the break harder to ignore.',
      },
      {
        question: 'Do eye break apps help with eye strain?',
        answer:
          'They help you take the regular breaks that eye care organizations recommend for digital eye strain. They are not a treatment. More habits that help are in [how to reduce eye strain from screens](/apps/glanceaway/eye-strain-from-screens/). If symptoms persist, see an eye doctor.',
      },
    ],
    sources: [aoaComputerVision],
  },
  {
    slug: 'eye-strain-from-screens',
    navLabel: 'Eye strain from screens',
    title: 'How to Reduce Eye Strain From Screens: 8 Habits That Help',
    description:
      'Tired, dry, or aching eyes after a day at the computer or on your phone? Eight practical habits to reduce eye strain from screens, based on advice from eye care organizations.',
    eyebrow: 'eye strain from screens',
    headline: 'How to reduce eye strain from screens.',
    intro:
      'To reduce eye strain from screens, take a 20 second break every 20 minutes, blink more, and keep your screen at arm’s length and slightly below eye level. Those three habits do most of the work. Here are all eight, and when to see an eye doctor.',
    primaryKeyword: 'how to reduce eye strain from screens',
    secondaryKeywords: [
      'eye strain from computer',
      'eye strain from phone',
      'dry eyes from screen time',
      'computer eye strain relief',
      'digital eye strain',
    ],
    publishedAt: '2026-11-20',
    updatedAt: '2026-11-20',
    campaign: 'seo_strain',
    sections: [
      {
        heading: 'Why screens strain your eyes',
        paragraphs: [
          'Looking at something close for a long time keeps the focusing muscles in your eyes working without a pause. On top of that, we blink far less at a screen: about 5 to 7 times a minute instead of the usual 15, according to the American Academy of Ophthalmology. Fewer blinks mean drier eyes.',
          'Typical signs are eye strain, headaches, blurred vision, dry eyes, and neck and shoulder pain, as the American Optometric Association lists them. They usually ease once you step away from the screen.',
        ],
      },
      {
        heading: '8 habits that reduce eye strain',
        steps: [
          {
            title: 'Follow the 20-20-20 rule',
            text: 'Every 20 minutes, look at something about 20 feet away for 20 seconds. It is the single most recommended habit, and the easiest to forget. A [free 20-20-20 timer](/apps/glanceaway/20-20-20-rule-timer/) or an [eye break app](/apps/glanceaway/20-20-20-rule-app/) solves that.',
          },
          {
            title: 'Blink on purpose',
            text: 'Use each break to blink slowly a few times. Some people put a small note on their screen as a reminder.',
          },
          {
            title: 'Move the screen back and down',
            text: 'Sit about an arm’s length (around 25 inches) from your monitor, with the screen slightly below eye level so you look a little downward.',
          },
          {
            title: 'Match brightness to the room',
            text: 'A screen that is much brighter than its surroundings makes your eyes work harder. Turn brightness down in dim rooms and raise contrast instead.',
          },
          {
            title: 'Cut glare',
            text: 'Avoid windows or lamps reflecting in the screen. A matte screen filter can help.',
          },
          {
            title: 'Keep your eyes moist',
            text: 'Artificial tears can help when your eyes feel dry. In a dry, warm room, a humidifier adds moisture to the air.',
          },
          {
            title: 'Give your phone the same rules',
            text: 'Phones are held closer than monitors, so the strain can be similar. Hold it a little further away and take the same breaks.',
          },
          {
            title: 'Get your eyes checked',
            text: 'An outdated prescription or uncorrected vision makes screen work harder. Tell your eye doctor how much time you spend at screens; some people benefit from glasses made for computer distance.',
          },
        ],
      },
      {
        heading: 'What about blue light glasses?',
        paragraphs: [
          'The American Academy of Ophthalmology does not recommend blue light glasses for eye strain. Discomfort from screens comes mostly from how we use them, long close-up focus and too little blinking, not from the blue light itself. Breaks do more than filters.',
        ],
      },
      {
        heading: 'When to see an eye doctor',
        paragraphs: [
          'Screen-related eye strain is usually temporary. If your symptoms do not ease after breaks, keep coming back, or come with pain or changes in vision, see an optometrist or ophthalmologist. This page is general information, not medical advice.',
        ],
      },
    ],
    midCta: {
      afterSection: 1,
      title: 'Habit one, on autopilot.',
      text: 'GlanceAway reminds you every 20 minutes on iPhone and Mac and shows a calm full-screen break on Mac. Free to try with 3 breaks a day; premium removes the limit.',
    },
    cta: {
      title: 'Make the breaks automatic.',
      text: 'GlanceAway reminds you to look away every 20 minutes on iPhone and Mac, shows a calm full-screen break on Mac, and tracks your streak. Free to try with 3 breaks a day; premium removes the limit.',
    },
    faq: [
      {
        question: 'How long does eye strain from screens last?',
        answer:
          'Usually not long. Symptoms typically ease after you rest your eyes or stop using the screen. If they last or keep returning, talk to an eye doctor.',
      },
      {
        question: 'Can eye strain from screens damage your eyes?',
        answer:
          'Eye care organizations describe digital eye strain as uncomfortable but generally temporary. Persistent symptoms are worth checking, since they can point to an uncorrected vision problem or dry eye.',
      },
      {
        question: 'Is phone eye strain different from computer eye strain?',
        answer:
          'The causes are the same: close focus and less blinking. Because phones are held closer and used in short, frequent bursts, breaks and distance matter just as much.',
      },
      {
        question: 'What is the fastest way to relieve eye strain?',
        answer:
          'Look away from the screen at something far away, blink slowly several times, and rest your eyes for a few minutes. Artificial tears can help if your eyes feel dry.',
      },
    ],
    sources: [aaoComputerUsage, aoaComputerVision, aaoBlueLight],
  },
];

export function glanceAwayGuidePath(slug: string): string {
  return `/apps/glanceaway/${slug}/`;
}

export function getGlanceAwayGuide(slug: string): GlanceAwayGuide | undefined {
  return glanceAwayGuides.find((guide) => guide.slug === slug);
}
