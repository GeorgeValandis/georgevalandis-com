'use client';

import { motion } from 'framer-motion';
import { Code2, Globe, Palette, Zap } from 'lucide-react';

const skills = [
  { name: 'React / Next.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Tailwind CSS', level: 92 },
  { name: 'Node.js', level: 85 },
  { name: 'UI/UX Design', level: 80 },
];

const highlights = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable code that stands the test of time.',
  },
  {
    icon: Palette,
    title: 'Pixel Perfect',
    description: 'Obsessing over every detail to deliver flawless visual experiences.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Lightning-fast load times with optimized, efficient architectures.',
  },
  {
    icon: Globe,
    title: 'Accessible',
    description: 'Building inclusive products that work for everyone, everywhere.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' as const },
  }),
};

export default function About() {
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
          <p className="text-indigo-400 font-mono text-sm mb-3 tracking-wider uppercase">
            01 &mdash; About
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Building the web,
            <br />
            <span className="text-gray-500">one pixel at a time.</span>
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
              I&apos;m a creative developer with a passion for turning complex
              problems into elegant, user-friendly solutions. With years of
              experience in modern web technologies, I bridge the gap between
              design and engineering to create products that feel alive.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 text-lg leading-relaxed mb-12"
            >
              When I&apos;m not coding, you&apos;ll find me exploring new design
              trends, contributing to open-source projects, or experimenting
              with the latest frameworks and tools.
            </motion.p>

            {/* Skill bars */}
            <div className="space-y-5">
              {skills.map((skill, i) => (
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
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: highlight cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors duration-500">
                  <item.icon size={22} className="text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
