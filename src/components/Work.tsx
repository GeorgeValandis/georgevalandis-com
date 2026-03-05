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
    link: 'https://apps.apple.com/us/app/menstrual-calendar-flowa/id6738320165?uo=4',
    logo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d6/fc/ce/d6fcceea-f9e3-29ad-9df6-730585ca9f84/AppIcon-0-0-1x_U007ephone-0-1-0-85-220.png/512x512bb.jpg',
  },
  {
    title: 'MoodFlora',
    subtitle: 'Track Your Moods, Grow Your Well-Being',
    description:
      'An iOS odyssey into mood mastery and journal vibes. Track your emotional well-being and watch your garden grow.',
    tags: ['Swift', 'SwiftUI', 'Journal', 'Free'],
    gradient: 'from-emerald-500/20 to-teal-500/20',
    accentBorder: 'group-hover:border-emerald-500/40',
    link: 'https://apps.apple.com/us/app/mood-tracker-moodflora/id6477776787?uo=4',
    logo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/f8/d4/9a/f8d49a83-ddf9-3901-ccc1-196bf4fb1fbc/AppIcon-0-0-1x_U007ephone-0-1-0-85-220.png/512x512bb.jpg',
  },
  {
    title: 'GlanceAway',
    subtitle: 'Your Gentle Reminder to Protect Your Eyes',
    description:
      'A gentle reminder app that helps you protect your eyes by encouraging regular screen breaks throughout the day.',
    tags: ['Swift', 'SwiftUI', 'Notifications', 'Health'],
    gradient: 'from-sky-500/20 to-blue-500/20',
    accentBorder: 'group-hover:border-sky-500/40',
    link: 'https://apps.apple.com/us/app/eye-break-glanceaway/id6751297230?uo=4',
    logo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/fa/dc/60/fadc601c-f3bc-f694-273c-0f78dfd0af4e/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg',
  },
  {
    title: 'Perfect Day',
    subtitle: 'Form Habits and Build Your Perfect Day',
    description:
      'A habit formation app designed to help you build consistent daily routines and create your ideal day.',
    tags: ['Swift', 'SwiftUI', 'Habits', 'Productivity'],
    gradient: 'from-amber-500/20 to-orange-500/20',
    accentBorder: 'group-hover:border-amber-500/40',
    link: 'https://apps.apple.com/us/app/habit-day-tracker-perfectday/id6741456646?uo=4',
    logo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/f0/7b/68/f07b6864-a8cd-eecb-1753-4589e67ed784/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg',
  },
  {
    title: 'Frokus',
    subtitle: 'Focus Better with Pomodoro Sessions',
    description:
      'A focus timer app because everybody has to have one in their app portfolio. Built with love and simplicity.',
    tags: ['Swift', 'SwiftUI', 'Pomodoro', 'Focus'],
    gradient: 'from-indigo-500/20 to-purple-500/20',
    accentBorder: 'group-hover:border-indigo-500/40',
    link: 'https://apps.apple.com/us/app/frokus-focus-timer/id6737744446?uo=4',
    logo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/12/3b/91/123b9169-f680-37c6-bb2a-aee05279f039/AppIcon-0-0-1x_U007ephone-0-1-85-220.jpeg/512x512bb.jpg',
  },
  {
    title: 'SaveTap',
    subtitle: 'Turn Daily Choices into Real Savings',
    description:
      'Track your daily spending choices and see how small savings add up over time. Simple, motivating, effective.',
    tags: ['Swift', 'SwiftUI', 'Finance', 'Savings'],
    gradient: 'from-green-500/20 to-emerald-500/20',
    accentBorder: 'group-hover:border-green-500/40',
    link: 'https://apps.apple.com/us/app/savings-tracker-savetap/id6752865110?uo=4',
    logo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/4e/73/1d/4e731de4-e0b4-960d-27bc-13b3907c1340/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg',
  },
  {
    title: 'QuitERGY',
    subtitle: 'Your Gentle Companion to Reduce Energy Drinks',
    description:
      'A supportive companion app that helps you gradually reduce your energy drink consumption at your own pace.',
    tags: ['Swift', 'SwiftUI', 'Health', 'Wellness'],
    gradient: 'from-violet-500/20 to-fuchsia-500/20',
    accentBorder: 'group-hover:border-violet-500/40',
    link: 'https://apps.apple.com/us/app/quit-energy-drinks-quitergy/id6754967219?uo=4',
    logo:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/7b/06/bd/7b06bd9e-130a-bbb9-6304-020a92160ea4/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.jpg',
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
                <div className="flex items-start justify-between mb-3 gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={app.logo}
                      alt={`${app.title} logo`}
                      className="w-11 h-11 rounded-xl border border-white/10 object-cover shrink-0"
                      loading="lazy"
                    />
                    <h3 className="text-xl font-bold truncate">{app.title}</h3>
                  </div>
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
