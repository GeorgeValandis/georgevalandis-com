import { appSlugs } from '@/content/apps';
import { appSeoMetadata, supportSeoMetadata } from '@/content/appSeo';
import { appSupportSlugs } from '@/content/appSupportPages';
import { blogPosts } from '@/content/blogPosts';
import { absoluteUrl, canonicalPath } from '@/lib/seo';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const defaultLastModified = new Date('2026-04-24T00:00:00.000Z');
const siteContentLastModified = new Date('2026-05-23T00:00:00.000Z');
const legalLastModified = new Date('2026-05-23T00:00:00.000Z');

function dateFromIsoDate(date?: string): Date {
  return date ? new Date(`${date}T00:00:00.000Z`) : defaultLastModified;
}

function sitemapEntry(
  path: string,
  options: Omit<MetadataRoute.Sitemap[number], 'url'> = {}
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(canonicalPath(path)),
    lastModified: defaultLastModified,
    ...options,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    sitemapEntry('/', {
      lastModified: siteContentLastModified,
      changeFrequency: 'weekly',
      priority: 1,
    }),
    sitemapEntry('/de/', {
      lastModified: siteContentLastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    }),
    sitemapEntry('/apps/', {
      lastModified: siteContentLastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    }),
    sitemapEntry('/blog/', {
      lastModified: siteContentLastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    }),
    sitemapEntry('/de/blog/', {
      lastModified: siteContentLastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    }),
    sitemapEntry('/privacy-statement/', {
      lastModified: legalLastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    }),
    sitemapEntry('/de/privacy-statement/', {
      lastModified: legalLastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    }),
    sitemapEntry('/imprint/', {
      lastModified: legalLastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    }),
    sitemapEntry('/de/imprint/', {
      lastModified: legalLastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    }),
  ];

  const blogPages = blogPosts.flatMap((post) => {
    const postDate = new Date(post.date);

    return [
      sitemapEntry(`/blog/${post.slug}/`, {
        lastModified: postDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      }),
      sitemapEntry(`/de/blog/${post.slug}/`, {
        lastModified: postDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      }),
    ];
  });

  const appPages = appSlugs.flatMap((slug) => {
    const appDate = dateFromIsoDate(appSeoMetadata[slug]?.updatedAt);

    return [
      sitemapEntry(`/apps/${slug}/`, {
        lastModified: appDate,
        changeFrequency: 'monthly',
        priority: 0.65,
      }),
    ];
  });

  const supportPages = appSupportSlugs.map((slug) =>
    sitemapEntry(`/apps/${slug}/support/`, {
      lastModified: dateFromIsoDate(supportSeoMetadata[slug]?.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.35,
    })
  );

  return [...staticPages, ...blogPages, ...appPages, ...supportPages];
}
