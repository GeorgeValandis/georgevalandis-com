'use client';

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { label: 'GitHub', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Dribbble', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <a href="#home" className="text-2xl font-bold tracking-tight">
              george<span className="text-indigo-400">.</span>
            </a>
            <p className="text-gray-500 text-sm mt-4 max-w-xs leading-relaxed">
              Crafting modern digital experiences with passion and precision.
              Based in Germany.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
              Navigation
            </p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
              Connect
            </p>
            <ul className="space-y-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors duration-300"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} George Valandis. All rights reserved.
          </p>
          <motion.a
            href="#home"
            whileHover={{ y: -2 }}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors duration-300 group"
          >
            Back to top
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
