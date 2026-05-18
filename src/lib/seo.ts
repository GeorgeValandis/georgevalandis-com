export const siteUrl = 'https://georgevalandis.com';

export function absoluteUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}

export function canonicalPath(path: string): string {
  if (path === '/') {
    return '/';
  }

  return path.endsWith('/') ? path : `${path}/`;
}

export function localizedAlternates(enPath: string, dePath: string) {
  return {
    en: canonicalPath(enPath),
    de: canonicalPath(dePath),
  };
}
