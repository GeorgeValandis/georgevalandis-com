'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar } from 'lucide-react';

const blogPosts = [
  {
    title: 'Focus on Marketing',
    date: 'October 19, 2025',
    excerpt:
      'Quick update on what I\'ve been diving into lately. I\'ve started shifting gears towards marketing my apps...',
    link: 'https://georgevalandis.com/focus-on-marketing/',
  },
  {
    title: 'Many Apps, Many Ideas, and Juggling Life',
    date: 'September 24, 2025',
    excerpt:
      'Quick update on where I\'m at right now. I\'ve been leaning more into building multiple apps simultaneously...',
    link: 'https://georgevalandis.com/many-apps-many-ideas-and-juggling-life/',
  },
  {
    title: 'A Little Content Reset and GlanceAway Is Live',
    date: 'September 4, 2025',
    excerpt:
      'Quick life-and-project update. I recently renamed my "LookAway" app to GlanceAway and it\'s now live...',
    link: 'https://georgevalandis.com/a-little-content-reset-and-glanceaway-is-live/',
  },
  {
    title: 'Slowing Down to Speed Up — Shipping Perfect Day and Building LookAway',
    date: 'August 9, 2025',
    excerpt:
      'I\'ve intentionally dialed things down a notch to focus on quality over quantity...',
    link: 'https://georgevalandis.com/slowing-down-to-speed-up-shipping-perfect-day-and-building-lookaway/',
  },
  {
    title: 'Pushing Content & Building Community',
    date: 'May 5, 2025',
    excerpt:
      'Since my last update, I\'ve been shifting gears — not just building apps, but growing communities around them...',
    link: 'https://georgevalandis.com/pushing-content-building-community-the-next-chapter-for-flowa-perfect-day-beyond/',
  },
  {
    title: 'Flowa is Live — My First Paid App on the App Store!',
    date: 'February 16, 2025',
    excerpt:
      'Big news — Flowa is officially live on the App Store! After months of work, my first paid app is out...',
    link: 'https://georgevalandis.com/flowa-is-live-my-first-paid-app-on-the-app-store/',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-32 relative">
      {/* Subtle divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-indigo-400 font-mono text-sm mb-3 tracking-wider uppercase">
            03 &mdash; Blog
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Latest from
            <br />
            <span className="text-gray-500">the journey.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.a
              key={post.title}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const }}
              className="group relative p-7 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/20 transition-all duration-500 block"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
                  <Calendar size={12} />
                  <span>{post.date}</span>
                </div>

                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-semibold leading-snug group-hover:text-white transition-colors">
                    {post.title}
                  </h3>
                  <ArrowUpRight
                    size={16}
                    className="text-gray-600 group-hover:text-indigo-400 transition-colors shrink-0 mt-1"
                  />
                </div>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="https://georgevalandis.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group/link"
          >
            <span className="text-sm font-medium">View all posts</span>
            <span className="group-hover/link:translate-x-1 transition-transform duration-300">
              &rarr;
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
