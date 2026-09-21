import { socialLinks } from '@/content/siteCopy';
import { absoluteUrl } from '@/lib/seo';
import type { SiteLocale } from '@/lib/siteLocale';

const personId = `${absoluteUrl('/')}#person`;
const websiteId = `${absoluteUrl('/')}#website`;

export function homeJsonLd(locale: SiteLocale) {
  const isGerman = locale === 'de';
  const canonicalPath = isGerman ? '/de/' : '/';
  const language = isGerman ? 'de-DE' : 'en-US';
  const title = isGerman
    ? 'George Valandis — Indie-iOS-Apps & After Work'
    : 'George Valandis — Indie iOS Apps & After Work';
  const description = isGerman
    ? 'Indie-iOS-Apps, echte Probleme und eine ruhigere Art zu arbeiten. Begleite George Valandis von 17 bis 21 Uhr und abonniere den After-Work-Newsletter.'
    : 'Indie iOS apps, real problems, and a calmer kind of work life. Follow George Valandis from 5 to 9 and join the After Work newsletter.';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: 'George Valandis',
        url: absoluteUrl('/'),
        image: absoluteUrl('/profile/george-valandis.webp'),
        jobTitle: isGerman ? 'iOS-Entwickler und Solopreneur' : 'iOS Developer and Solopreneur',
        description: isGerman
          ? 'Unabhängiger iOS-Entwickler und Solopreneur aus Deutschland.'
          : 'Independent iOS developer and solopreneur based in Germany.',
        sameAs: socialLinks.map((link) => link.href),
        knowsAbout: ['iOS development', 'Swift', 'SwiftUI', 'mobile app development'],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: absoluteUrl('/'),
        name: 'George Valandis',
        inLanguage: ['en-US', 'de-DE'],
        publisher: { '@id': personId },
      },
      {
        '@type': 'WebPage',
        '@id': `${absoluteUrl(canonicalPath)}#webpage`,
        url: absoluteUrl(canonicalPath),
        name: title,
        description,
        inLanguage: language,
        isPartOf: { '@id': websiteId },
        about: { '@id': personId },
      },
    ],
  };
}
