export type SiteLocale = 'en' | 'de';

export function getLocalePrefix(locale: SiteLocale): string {
  return locale === 'de' ? '/de' : '';
}

export function localizedPath(locale: SiteLocale, path = ''): string {
  const prefix = getLocalePrefix(locale);
  if (!path || path === '/') {
    return prefix ? `${prefix}/` : '/';
  }

  const suffixStart = path.search(/[?#]/);
  const pathname = suffixStart === -1 ? path : path.slice(0, suffixStart);
  const suffix = suffixStart === -1 ? '' : path.slice(suffixStart);
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const canonicalPath = normalizedPath.endsWith('/')
    ? normalizedPath
    : `${normalizedPath}/`;

  return `${prefix}${canonicalPath}${suffix}`;
}

export function localizedAnchor(locale: SiteLocale, anchor: string): string {
  const normalizedAnchor = anchor.startsWith('#') ? anchor : `#${anchor}`;
  return locale === 'de' ? `/de/${normalizedAnchor}` : normalizedAnchor;
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
  const canonicalPath = normalizedPath === '/' || normalizedPath.endsWith('/')
    ? normalizedPath
    : `${normalizedPath}/`;

  if (targetLocale === 'de') {
    return canonicalPath === '/' ? '/de/' : `/de${canonicalPath}`;
  }

  return canonicalPath || '/';
}
