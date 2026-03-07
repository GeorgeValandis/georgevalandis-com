'use client';

import { getAlternateLocalePath, type SiteLocale } from '@/lib/siteLocale';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type LanguageSwitchProps = {
  locale: SiteLocale;
  variant?: 'nav' | 'footer';
};

export default function LanguageSwitch({
  locale,
  variant = 'nav',
}: LanguageSwitchProps) {
  const pathname = usePathname();
  const targetLocale: SiteLocale = locale === 'de' ? 'en' : 'de';
  const href = getAlternateLocalePath(pathname, targetLocale);

  const className =
    variant === 'footer'
      ? 'inline-flex items-center rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-gray-300 transition-colors hover:bg-white/5 hover:text-white'
      : 'inline-flex items-center rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-gray-300 transition-colors hover:bg-white/5 hover:text-white';

  return (
    <Link href={href} className={className} aria-label={`Switch language to ${targetLocale}`}>
      {locale === 'de' ? 'EN' : 'DE'}
    </Link>
  );
}
