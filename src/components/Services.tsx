'use client';

import { motion } from 'framer-motion';
import {
  Database,
  Monitor,
  PenTool,
  Rocket,
  Search,
  Smartphone,
} from 'lucide-react';

const services = [
  {
    icon: Monitor,
    title: 'Web Development',
    description:
      'Custom websites and web applications built with cutting-edge frameworks for maximum performance.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description:
      'Pixel-perfect interfaces that look stunning on every device, from mobile to ultra-wide displays.',
  },
  {
    icon: PenTool,
    title: 'UI / UX Design',
    description:
      'User-centered design that balances aesthetics with usability, backed by research and iteration.',
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    description:
      'Technical SEO strategies that improve visibility, drive organic traffic, and boost rankings.',
  },
  {
    icon: Database,
    title: 'Backend & APIs',
    description:
      'Scalable server architectures, REST & GraphQL APIs, and seamless third-party integrations.',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description:
      'Blazing-fast load times through code splitting, lazy loading, and advanced caching strategies.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 relative">
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
            03 &mdash; Services
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            What I can do
            <br />
            <span className="text-gray-500">for you.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const }}
              className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/20 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors duration-500 group-hover:scale-110 transform">
                  <service.icon
                    size={24}
                    className="text-indigo-400 group-hover:text-indigo-300 transition-colors"
                  />
                </div>

                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
