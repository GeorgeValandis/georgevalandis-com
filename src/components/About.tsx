'use client';

import { getSiteCopy } from '@/content/siteCopy';
import { type SiteLocale } from '@/lib/siteLocale';
import { motion } from 'framer-motion';
import { Code2, Globe, Palette, Zap } from 'lucide-react';

const profileImageUrl =
  'https://georgevalandis.com/wp-content/uploads/2024/08/Bildschirmfoto-2024-08-14-um-22.10.29-1-1009x1024.png';

const highlightIcons = [Code2, Palette, Zap, Globe] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' as const },
  }),
};

type AboutProps = {
  locale: SiteLocale;
};

export default function About({ locale }: AboutProps) {
  const copy = getSiteCopy(locale);

  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-amber-400 font-mono text-sm mb-3 tracking-wider uppercase">
            {copy.about.eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {copy.about.titleTop}
            <br />
            <span className="text-gray-500">{copy.about.titleBottom}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left: story + skills */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg leading-relaxed mb-8"
            >
              {copy.about.paragraphs[0]}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 text-lg leading-relaxed mb-12"
            >
              {copy.about.paragraphs[1]}
            </motion.p>

            {/* Skill bars */}
            <div className="space-y-5">
              {copy.about.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300 font-medium">{skill.name}</span>
                    <span className="text-gray-500 font-mono">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.6 + i * 0.1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: profile image + highlight cards */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]"
            >
              <img
                src={profileImageUrl}
                alt="George Valandis"
                className="w-full h-80 object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-transparent">
                <p className="text-sm text-gray-300">George Valandis</p>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {copy.about.highlights.map((item, i) => {
                const Icon = highlightIcons[i];
                return (
                  <motion.div
                    key={item.title}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 hover:bg-white/[0.04] transition-all duration-500"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors duration-500">
                      <Icon size={22} className="text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
