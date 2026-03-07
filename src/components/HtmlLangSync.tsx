'use client';

import { detectLocaleFromPathname } from '@/lib/siteLocale';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function HtmlLangSync() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = detectLocaleFromPathname(pathname);
  }, [pathname]);

  return null;
}
