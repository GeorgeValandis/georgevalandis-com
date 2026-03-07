export type SiteLocale = 'en' | 'de';

export function getLocalePrefix(locale: SiteLocale): string {
  return locale === 'de' ? '/de' : '';
}

export function localizedPath(locale: SiteLocale, path = ''): string {
  const prefix = getLocalePrefix(locale);
  if (!path || path === '/') {
    return prefix || '/';
  }
  return `${prefix}${path}`;
}

export function localizedAnchor(locale: SiteLocale, anchor: string): string {
  const normalizedAnchor = anchor.startsWith('#') ? anchor : `#${anchor}`;
  return locale === 'de' ? `/de${normalizedAnchor}` : normalizedAnchor;
}

export function detectLocaleFromPathname(pathname: string | null | undefined): SiteLocale {
  return pathname?.startsWith('/de') ? 'de' : 'en';
}

export function getAlternateLocalePath(
  pathname: string | null | undefined,
  targetLocale: SiteLocale
): string {
  const currentPath = pathname || '/';
  const normalizedPath = currentPath.startsWith('/de')
    ? currentPath.slice(3) || '/'
    : currentPath;

  if (targetLocale === 'de') {
    return normalizedPath === '/' ? '/de' : `/de${normalizedPath}`;
  }

  return normalizedPath || '/';
}
