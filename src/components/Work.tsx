'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const apps = [
  {
    title: 'Flowa',
    subtitle: 'Understand Your Cycle, Empower Your Health',
    description:
      'Tracking the female cycle for better understanding and health insights. My first paid app on the App Store.',
    tags: ['Swift', 'SwiftUI', 'HealthKit', 'Paid'],
    gradient: 'from-pink-500/20 to-rose-500/20',
    accentBorder: 'group-hover:border-pink-500/40',
    link: 'https://georgevalandis.com/flowa/',
  },
  {
    title: 'MoodFlora',
    subtitle: 'Track Your Moods, Grow Your Well-Being',
    description:
      'An iOS odyssey into mood mastery and journal vibes. Track your emotional well-being and watch your garden grow.',
    tags: ['Swift', 'SwiftUI', 'Journal', 'Free'],
    gradient: 'from-emerald-500/20 to-teal-500/20',
    accentBorder: 'group-hover:border-emerald-500/40',
    link: 'https://apps.apple.com/de/app/journal-tracker-moodflora/id6477776787',
  },
  {
    title: 'GlanceAway',
    subtitle: 'Your Gentle Reminder to Protect Your Eyes',
    description:
      'A gentle reminder app that helps you protect your eyes by encouraging regular screen breaks throughout the day.',
    tags: ['Swift', 'SwiftUI', 'Notifications', 'Health'],
    gradient: 'from-sky-500/20 to-blue-500/20',
    accentBorder: 'group-hover:border-sky-500/40',
    link: 'https://georgevalandis.com/lookaway/',
  },
  {
    title: 'Perfect Day',
    subtitle: 'Form Habits and Build Your Perfect Day',
    description:
      'A habit formation app designed to help you build consistent daily routines and create your ideal day.',
    tags: ['Swift', 'SwiftUI', 'Habits', 'Productivity'],
    gradient: 'from-amber-500/20 to-orange-500/20',
    accentBorder: 'group-hover:border-amber-500/40',
    link: 'https://georgevalandis.com/perfectday/',
  },
  {
    title: 'Frokus',
    subtitle: 'Focus Better with Pomodoro Sessions',
    description:
      'A focus timer app because everybody has to have one in their app portfolio. Built with love and simplicity.',
    tags: ['Swift', 'SwiftUI', 'Pomodoro', 'Focus'],
    gradient: 'from-indigo-500/20 to-purple-500/20',
    accentBorder: 'group-hover:border-indigo-500/40',
    link: 'https://apps.apple.com/de/app/frokus-focus-timer/id6737744446',
  },
  {
    title: 'SaveTap',
    subtitle: 'Turn Daily Choices into Real Savings',
    description:
      'Track your daily spending choices and see how small savings add up over time. Simple, motivating, effective.',
    tags: ['Swift', 'SwiftUI', 'Finance', 'Savings'],
    gradient: 'from-green-500/20 to-emerald-500/20',
    accentBorder: 'group-hover:border-green-500/40',
    link: 'https://georgevalandis.com/savetap-turn-daily-choices-into-real-savings/',
  },
  {
    title: 'QuitERGY',
    subtitle: 'Your Gentle Companion to Reduce Energy Drinks',
    description:
      'A supportive companion app that helps you gradually reduce your energy drink consumption at your own pace.',
    tags: ['Swift', 'SwiftUI', 'Health', 'Wellness'],
    gradient: 'from-violet-500/20 to-fuchsia-500/20',
    accentBorder: 'group-hover:border-violet-500/40',
    link: 'https://georgevalandis.com/quitergy-your-gentle-companion-to-reduce-energy-drinks/',
  },
];

export default function Apps() {
  return (
    <section id="apps" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-indigo-400 font-mono text-sm mb-3 tracking-wider uppercase">
            01 &mdash; Apps
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            My iOS apps
            <span className="text-gray-500">.</span>
          </h2>
          <p className="text-gray-400 mt-4 text-lg max-w-2xl">
            Every app starts as a simple idea and grows into something that helps real people.
            Here&apos;s what I&apos;ve been building.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, i) => (
            <motion.a
              key={app.title}
              href={app.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const }}
              className={`group relative rounded-2xl border border-white/5 ${app.accentBorder} bg-white/[0.02] overflow-hidden transition-all duration-500 hover:bg-white/[0.04] block`}
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${app.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />

              <div className="relative p-7">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold">{app.title}</h3>
                  <ExternalLink
                    size={16}
                    className="text-gray-600 group-hover:text-white transition-colors duration-300 mt-1 shrink-0"
                  />
                </div>

                <p className="text-indigo-400/70 text-sm font-medium mb-4">
                  {app.subtitle}
                </p>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {app.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {app.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono text-gray-400 bg-white/5 rounded-full border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
