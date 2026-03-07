export type BlogContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: BlogContentBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'juggling-7-apps-taking-a-breath-and-creating-more-long-form-content',
    title: 'Juggling 7 Apps and Finding My Way Back',
    date: 'March 5, 2026',
    excerpt:
      "Quick update from me. Right now, I'm juggling 7 apps, getting back into content after a short personal break...",
    content: [
      { type: 'paragraph', text: 'Hey friends,' },
      { type: 'paragraph', text: 'Quick update from me.' },
      {
        type: 'paragraph',
        text: "Right now, I'm juggling 7 apps at the same time. Some are further along, some are still evolving, and some are just small ideas slowly turning into something real. It's a lot to balance, but in a strange way, I enjoy that chaos. Each app teaches me something different, and switching between them keeps the whole journey exciting.",
      },
      {
        type: 'paragraph',
        text: "At the same time, I've kept creating content around everything I'm building. Sharing the process, the wins, the messy middle, and the little lessons along the way still feels like an important part of this journey for me.",
      },
      {
        type: 'paragraph',
        text: 'I did take a short break recently for personal reasons. Sometimes life just asks you to slow down for a moment, step back, and focus on what matters outside of work and projects. That pause was needed. And now, I am back, with fresh energy and a clearer mind.',
      },
      {
        type: 'paragraph',
        text: 'One thing I have also started doing more of is experimenting with longer-form content. I published one or two longer YouTube videos, which felt like a different challenge compared to short clips. It takes more planning, more structure, and more patience, but I really like the deeper format. It gives me more space to share the full story, not just quick snapshots.',
      },
      { type: 'heading', text: 'So right now, it is all about:' },
      {
        type: 'list',
        items: [
          'Juggling 7 apps and keeping them moving forward.',
          'Getting back into content creation after a short personal break.',
          'Exploring longer YouTube videos alongside short-form content.',
          'Continuing to build in public, one step at a time.',
        ],
      },
      {
        type: 'paragraph',
        text: "It still feels like a lot sometimes, but I'm learning to trust the pace and keep going.",
      },
      {
        type: 'paragraph',
        text: 'Step by step, figuring it out as I go.',
      },
      { type: 'paragraph', text: 'Until next time, George' },
    ],
  },
  {
    slug: 'focus-on-marketing',
    title: 'Focus on Marketing',
    date: 'October 19, 2025',
    excerpt:
      "Quick update on what I've been diving into lately. I've started shifting gears towards marketing my apps...",
    content: [
      { type: 'paragraph', text: 'Hey friends,' },
      { type: 'paragraph', text: "Quick update on what I've been diving into lately." },
      {
        type: 'paragraph',
        text: "I've started shifting more of my focus toward marketing. Not only building apps, but actually learning how to get them in front of people. I've been watching tutorials, testing formats, and studying how others create content that really connects. From UGC to TikToks, Reels, and simple slideshows, I am experimenting with it all.",
      },
      {
        type: 'paragraph',
        text: "It's a whole new world compared to coding. But honestly, I find it very creative. Figuring out how to tell a story around an app, how to grab attention in the first few seconds, or how to make someone feel something through a short clip is challenging and fun.",
      },
      {
        type: 'paragraph',
        text: "I've also been talking to people who already do this well. Hearing their insights, watching how they approach videos, and trying to adapt what fits my own style feels like learning a new craft, one experiment at a time.",
      },
      { type: 'heading', text: 'Right now, my days look like this:' },
      {
        type: 'list',
        items: [
          'Learning how to make content that resonates.',
          'Testing different marketing styles across platforms.',
          'Talking to creators who have mastered this game.',
          'Still building apps, with a stronger focus on sharing them.',
        ],
      },
      {
        type: 'paragraph',
        text: "It's all part of the same journey, just a new chapter.",
      },
      {
        type: 'paragraph',
        text: 'Step by step, figuring it out as I go.',
      },
      { type: 'paragraph', text: 'Until next time, George' },
    ],
  },
  {
    slug: 'many-apps-many-ideas-and-juggling-life',
    title: 'Many Apps, Many Ideas, and Juggling Life',
    date: 'September 24, 2025',
    excerpt:
      "Quick update on where I'm at right now. I've been leaning more into building multiple apps simultaneously...",
    content: [
      { type: 'paragraph', text: 'Hey friends,' },
      { type: 'paragraph', text: "Quick update on where I'm at right now." },
      {
        type: 'paragraph',
        text: "I've been leaning more and more into building many small apps. For me, it is the best way to test ideas quickly, see what sticks, and learn fast. Every new app is another experiment. Some will work, some will not, and that is part of the process.",
      },
      {
        type: 'paragraph',
        text: "On top of that, I'm trying to understand how the Apple App Store algorithm works. Every tweak in keywords, screenshots, or updates changes how users discover my apps. Sometimes the results make sense, sometimes they do not. But I enjoy learning it.",
      },
      {
        type: 'paragraph',
        text: "Along the way, I share my progress in a build-in-public style. Posting content about what I'm building, what works, and what I struggle with helps me stay accountable and maybe encourages others to start building too.",
      },
      {
        type: 'paragraph',
        text: "And of course, there is life outside of apps. I'm juggling family life, spending time with my kids, and enjoying moments in between. The balance is messy sometimes, but it keeps me grounded.",
      },
      { type: 'heading', text: 'So right now, it is all about:' },
      {
        type: 'list',
        items: [
          'Shipping many small apps and testing ideas.',
          'Learning the App Store algorithm.',
          'Creating build-in-public content around the journey.',
          'Not missing the good moments with my kids.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Step by step, figuring it out as I go.',
      },
      { type: 'paragraph', text: 'Until next time, George' },
    ],
  },
  {
    slug: 'a-little-content-reset-and-glanceaway-is-live',
    title: 'A Little Content Reset and GlanceAway Is Live',
    date: 'September 4, 2025',
    excerpt:
      "Quick life-and-project update. I recently renamed my 'LookAway' app to GlanceAway and it's now live...",
    content: [
      { type: 'paragraph', text: 'Hey friends,' },
      { type: 'paragraph', text: 'Quick life-and-project update from me.' },
      {
        type: 'paragraph',
        text: 'I recently renamed my LookAway app to GlanceAway. The name fits better: short, clear, and aligned with what it does, reminding you to glance away from your screen and give your eyes a break.',
      },
      {
        type: 'paragraph',
        text: "The app is now live. It's simple on purpose, just a gentle nudge for healthier screen habits, and I'm excited to share it. I also started posting behind-the-scenes content about GlanceAway on my social channels.",
      },
      {
        type: 'paragraph',
        text: 'Next up, I plan to experiment with AI-generated UGC using Nano Banana. It seems like a fun way to test content that feels authentic but is easier to produce.',
      },
      {
        type: 'paragraph',
        text: "On a personal note, I'm easing back into a regular posting rhythm. I want to share what I'm building in a sustainable way: less pressure, more honesty.",
      },
      { type: 'heading', text: 'So right now, it is all about:' },
      {
        type: 'list',
        items: [
          'GlanceAway is live.',
          'Creating content for the launch.',
          'Trying AI UGC workflows with Nano Banana.',
          'Finding a posting flow that feels sustainable.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Thanks for following along while I figure this out step by step.',
      },
      { type: 'paragraph', text: 'Until next time, George' },
    ],
  },
  {
    slug: 'slowing-down-to-speed-up-shipping-perfect-day-and-building-lookaway',
    title: 'Slowing Down to Speed Up - Shipping Perfect Day and Building LookAway',
    date: 'August 9, 2025',
    excerpt:
      "I've intentionally dialed things down a notch to focus on quality over quantity...",
    content: [
      { type: 'paragraph', text: 'Hey everyone,' },
      {
        type: 'paragraph',
        text: "Quick update from my side. I've intentionally dialed things down a notch lately. Not quitting, just breathing. I create content when I feel like it, not because a calendar says so.",
      },
      { type: 'heading', text: 'Creating at a humane pace' },
      {
        type: 'paragraph',
        text: "I still believe in showing the journey, but I relearned how hard consistency can be. Some weeks ideas flow, other weeks life takes over. So I optimize for honesty over output: fewer forced posts, more real moments.",
      },
      { type: 'heading', text: 'Product news' },
      {
        type: 'paragraph',
        text: 'I shipped my second paid app, Perfect Day, my habit tracker. It is simple on purpose with quick check-ins and low friction to help build momentum through tiny wins.',
      },
      {
        type: 'paragraph',
        text: 'On the side, I am building LookAway, a tiny app that nudges you to look away from your phone. Micro-breaks for eyes and mind. A small idea with a big quality-of-life payoff.',
      },
      { type: 'heading', text: "Where I'm at" },
      {
        type: 'list',
        items: [
          'Slowed down to protect energy and joy in building.',
          'Creating content when it feels right, not out of guilt.',
          'Building simple systems for consistency: batching, simple formats, fewer takes.',
          'Shipping and iterating in public, one step at a time.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Thanks for being here and cheering from the sidelines. If you are balancing creation, consistency, and real life too, we will figure it out together.',
      },
      { type: 'paragraph', text: 'Until next time, George' },
    ],
  },
  {
    slug: 'pushing-content-building-community-the-next-chapter-for-flowa-perfect-day-beyond',
    title: 'Pushing Content & Building Community',
    date: 'May 5, 2025',
    excerpt:
      "Since my last update, I've been shifting gears - not just building apps, but growing communities around them...",
    content: [
      { type: 'paragraph', text: 'Hey everyone,' },
      {
        type: 'paragraph',
        text: "Since my last update, I've been shifting gears. Not just building apps, but also sharing the journey behind them: building, content, community, and connection.",
      },
      { type: 'heading', text: 'Creating content - TikTok, Reels, and YouTube Shorts' },
      {
        type: 'paragraph',
        text: 'I have been posting on TikTok and Instagram Reels, and I started publishing YouTube Shorts too. The goal is to show a real behind-the-scenes look at building indie apps like Flowa and Perfect Day.',
      },
      {
        type: 'list',
        items: [
          'Short-form content is powerful.',
          'People respond to honest and unpolished stories.',
          'Consistency beats perfection.',
        ],
      },
      { type: 'heading', text: 'Expanding the network - one DM at a time' },
      {
        type: 'paragraph',
        text: 'I have been reaching out to more indie developers and creators, sharing what I know and learning from what they do. Growth happens through conversations.',
      },
      {
        type: 'list',
        items: [
          'Connecting with indie devs and creators.',
          'Exchanging lessons and practical tactics.',
          'Building real friendships in the indie space.',
        ],
      },
      { type: 'heading', text: 'Started Indie App & Content Lab' },
      {
        type: 'paragraph',
        text: 'One of the biggest updates: I launched a Discord community called Indie App & Content Lab. It is a space for builders and creators to share progress, ideas, and feedback.',
      },
      { type: 'heading', text: "What's next" },
      {
        type: 'list',
        items: [
          'Keep posting TikToks, Shorts, and Reels.',
          'Keep refining Perfect Day and improving Flowa.',
          'Keep growing Indie App & Content Lab into something valuable.',
          'Stay consistent, stay curious, and keep building in public.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Thanks for following along and supporting the journey. More updates soon.',
      },
      { type: 'paragraph', text: 'Until next time, George' },
    ],
  },
  {
    slug: 'flowa-is-live-my-first-paid-app-on-the-app-store',
    title: 'Flowa is Live - My First Paid App on the App Store!',
    date: 'February 16, 2025',
    excerpt:
      'Big news - Flowa is officially live on the App Store! After months of work, my first paid app is out...',
    content: [
      { type: 'paragraph', text: 'Hey everyone,' },
      {
        type: 'paragraph',
        text: 'Big news: Flowa is officially live on the App Store. After an intense development phase with many iterations and hurdles, my first paid app is now available.',
      },
      { type: 'heading', text: 'The road to launch' },
      {
        type: 'paragraph',
        text: 'Building Flowa was intense and rewarding. This project pushed me beyond my comfort zone, from UX improvements to data model decisions and App Store guideline details.',
      },
      {
        type: 'paragraph',
        text: "Getting through Apple's approval process was not easy. Between fixing edge cases and optimizing layouts for smaller devices, every blocker became a lesson.",
      },
      { type: 'heading', text: 'The first sales and future plans' },
      {
        type: 'paragraph',
        text: 'Launching a paid app for the first time is a major milestone for me. It is still early, but I already have ideas for updates and improvements, including more customization and deeper insights.',
      },
      { type: 'heading', text: 'Lessons learned' },
      {
        type: 'list',
        items: [
          'Move fast, improve continuously.',
          'App Store guidelines matter down to small details.',
          'The indie journey is challenging and deeply rewarding.',
        ],
      },
      { type: 'heading', text: "What's next" },
      {
        type: 'paragraph',
        text: 'Now my focus is on updates, feedback loops, and content creation. I am committed to sharing the journey openly.',
      },
      {
        type: 'paragraph',
        text: 'App Store link: https://apps.apple.com/de/app/track-your-cycle-flowa/id6738320165',
      },
      { type: 'paragraph', text: 'Thanks for being part of this adventure.' },
      { type: 'paragraph', text: 'Until next time, George' },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
