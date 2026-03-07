'use client';

import LanguageSwitch from '@/components/LanguageSwitch';
import { getSiteCopy, socialLinks } from '@/content/siteCopy';
import { localizedAnchor, localizedPath, type SiteLocale } from '@/lib/siteLocale';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

type FooterProps = {
  locale: SiteLocale;
};

export default function Footer({ locale }: FooterProps) {
  const copy = getSiteCopy(locale);

  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <a href={localizedAnchor(locale, '#home')} className="text-2xl font-bold tracking-tight">
              george<span className="text-amber-400">.</span>valandis
            </a>
            <p className="text-gray-500 text-sm mt-4 max-w-xs leading-relaxed">
              {copy.footer.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
              {copy.footer.navigationTitle}
            </p>
            <ul className="space-y-3">
              {copy.nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={localizedAnchor(locale, link.href)}
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
              {copy.footer.connectTitle}
            </p>
            <ul className="space-y-3 mb-5">
              {socialLinks.map((social) => (
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
            <div>
              <LanguageSwitch locale={locale} variant="footer" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span>&copy; {new Date().getFullYear()} George Valandis.</span>
            <a
              href={localizedPath(locale, '/privacy-statement')}
              className="hover:text-gray-400 transition-colors"
            >
              {copy.footer.privacy}
            </a>
            <a
              href={localizedPath(locale, '/imprint')}
              className="hover:text-gray-400 transition-colors"
            >
              {copy.footer.imprint}
            </a>
          </div>
          <motion.a
            href={localizedAnchor(locale, '#home')}
            whileHover={{ y: -2 }}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors duration-300 group"
          >
            {copy.footer.backToTop}
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
