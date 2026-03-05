'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description:
      'A full-featured online store with real-time inventory, Stripe payments, and a sleek admin dashboard.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Prisma'],
    gradient: 'from-indigo-500/20 to-purple-500/20',
    accentBorder: 'group-hover:border-indigo-500/40',
  },
  {
    title: 'SaaS Dashboard',
    description:
      'Analytics dashboard with interactive charts, real-time data streaming, and role-based access control.',
    tags: ['React', 'D3.js', 'Node.js', 'WebSocket'],
    gradient: 'from-emerald-500/20 to-teal-500/20',
    accentBorder: 'group-hover:border-emerald-500/40',
  },
  {
    title: 'Creative Portfolio',
    description:
      'An award-winning portfolio site with smooth page transitions, 3D elements, and immersive storytelling.',
    tags: ['Next.js', 'Framer Motion', 'Three.js', 'GSAP'],
    gradient: 'from-orange-500/20 to-rose-500/20',
    accentBorder: 'group-hover:border-orange-500/40',
  },
  {
    title: 'AI Content Tool',
    description:
      'An AI-powered writing assistant that generates, edits, and optimizes content for multiple platforms.',
    tags: ['React', 'OpenAI API', 'Tailwind', 'Vercel'],
    gradient: 'from-sky-500/20 to-blue-500/20',
    accentBorder: 'group-hover:border-sky-500/40',
  },
];

export default function Work() {
  return (
    <section id="work" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-indigo-400 font-mono text-sm mb-3 tracking-wider uppercase">
            02 &mdash; Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Selected projects
            <span className="text-gray-500">.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' as const }}
              className={`group relative rounded-2xl border border-white/5 ${project.accentBorder} bg-white/[0.02] overflow-hidden transition-all duration-500 hover:bg-white/[0.04]`}
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />

              <div className="relative p-8 md:p-10">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-xl md:text-2xl font-bold">{project.title}</h3>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="text-gray-500 hover:text-white transition-colors duration-300"
                      aria-label="View on GitHub"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-white transition-colors duration-300"
                      aria-label="Open live site"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                <p className="text-gray-400 leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono text-gray-400 bg-white/5 rounded-full border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
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
            href="#"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group/link"
          >
            <span className="text-sm font-medium">View all projects</span>
            <span className="group-hover/link:translate-x-1 transition-transform duration-300">
              &rarr;
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
