'use client';

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Apps', href: '#apps' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { label: 'X / Twitter', href: 'https://x.com/georgevalandis' },
  { label: 'Instagram', href: 'https://instagram.com/georgevalandis' },
  { label: 'Threads', href: 'https://threads.net/@georgevalandis' },
  { label: 'TikTok', href: 'https://tiktok.com/@georgevalandis' },
  { label: 'Bluesky', href: 'https://bsky.app/profile/georgevalandis.bsky.social' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <a href="#home" className="text-2xl font-bold tracking-tight">
              george<span className="text-amber-400">.</span>
            </a>
            <p className="text-gray-500 text-sm mt-4 max-w-xs leading-relaxed">
              iOS Developer &amp; Solopreneur. Building apps from 5 to 9.
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
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span>&copy; {new Date().getFullYear()} George Valandis.</span>
            <a
              href="/privacy-statement"
              className="hover:text-gray-400 transition-colors"
            >
              Privacy Statement
            </a>
            <a
              href="/imprint"
              className="hover:text-gray-400 transition-colors"
            >
              Imprint
            </a>
          </div>
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
