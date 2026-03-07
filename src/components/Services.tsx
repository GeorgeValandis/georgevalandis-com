'use client';

import { blogPosts } from '@/content/blogPosts';
import { getSiteCopy } from '@/content/siteCopy';
import { localizedPath, type SiteLocale } from '@/lib/siteLocale';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar } from 'lucide-react';
import Link from 'next/link';

type BlogProps = {
  locale: SiteLocale;
};

export default function Blog({ locale }: BlogProps) {
  const copy = getSiteCopy(locale);

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
          <p className="text-amber-400 font-mono text-sm mb-3 tracking-wider uppercase">
            {copy.blog.eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {copy.blog.titleTop}
            <br />
            <span className="text-gray-500">{copy.blog.titleBottom}</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.a
              key={post.slug}
              href={localizedPath(locale, `/blog/${post.slug}`)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const }}
              className="group relative p-7 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-all duration-500 block"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

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
                    className="text-gray-600 group-hover:text-amber-400 transition-colors shrink-0 mt-1"
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
          <Link
            href={localizedPath(locale, '/blog')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group/link"
          >
            <span className="text-sm font-medium">{copy.blog.viewAll}</span>
            <span className="group-hover/link:translate-x-1 transition-transform duration-300">
              &rarr;
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
