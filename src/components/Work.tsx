'use client';

import AppHubList from '@/components/AppHubList';
import { getSiteCopy } from '@/content/siteCopy';
import { type SiteLocale } from '@/lib/siteLocale';
import { motion } from 'framer-motion';

type AppsProps = {
  locale: SiteLocale;
};

export default function Apps({ locale }: AppsProps) {
  const copy = getSiteCopy(locale);

  return (
    <section id="apps" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-wider text-amber-400">
            {copy.apps.eyebrow}
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            {copy.apps.title}
            <span className="text-gray-500">{copy.apps.titleAccent}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-400">
            {copy.apps.description}
          </p>
        </motion.div>

        <AppHubList groupHeadingLevel={3} />
      </div>
    </section>
  );
}
