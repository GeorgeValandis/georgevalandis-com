import { getLocalizedBlogPost } from '@/content/blogPostTranslations';
import type { BlogPost } from '@/content/blogPosts';
import type { SiteLocale } from '@/lib/siteLocale';
import { absoluteUrl } from '@/lib/seo';
import { localizedPath } from '@/lib/siteLocale';

const blogImage = absoluteUrl('/after-work-preview/hero-desk.webp');

export function blogPostPath(post: BlogPost, locale: SiteLocale): string {
  return localizedPath(locale, `/blog/${post.slug}/`);
}

export function blogPostJsonLd(post: BlogPost, locale: SiteLocale) {
  const localizedPost = getLocalizedBlogPost(post, locale);
  const path = blogPostPath(post, locale);
  const publishedAt = `${post.publishedAt}T00:00:00.000Z`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${absoluteUrl(path)}#article`,
    headline: localizedPost.title,
    description: localizedPost.excerpt,
    datePublished: publishedAt,
    dateModified: publishedAt,
    inLanguage: locale === 'de' ? 'de-DE' : 'en-US',
    image: [blogImage],
    url: absoluteUrl(path),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(path),
    },
    author: {
      '@type': 'Person',
      '@id': absoluteUrl('/#person'),
      name: 'George Valandis',
      url: absoluteUrl('/'),
    },
    publisher: {
      '@type': 'Person',
      '@id': absoluteUrl('/#person'),
      name: 'George Valandis',
      url: absoluteUrl('/'),
    },
    isPartOf: {
      '@type': 'Blog',
      '@id': absoluteUrl(locale === 'de' ? '/de/blog/#blog' : '/blog/#blog'),
      name: locale === 'de' ? 'Blog von George Valandis' : 'George Valandis Blog',
      url: absoluteUrl(locale === 'de' ? '/de/blog/' : '/blog/'),
    },
  };
}
