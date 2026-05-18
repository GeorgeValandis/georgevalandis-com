import { appSlugs } from '@/content/apps';
import { blogPosts } from '@/content/blogPosts';
import { absoluteUrl, canonicalPath } from '@/lib/seo';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const lastModified = new Date('2026-04-24T00:00:00.000Z');

function sitemapEntry(
  path: string,
  options: Omit<MetadataRoute.Sitemap[number], 'url'> = {}
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(canonicalPath(path)),
    lastModified,
    ...options,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    sitemapEntry('/', { changeFrequency: 'weekly', priority: 1 }),
    sitemapEntry('/de/', { changeFrequency: 'weekly', priority: 0.9 }),
    sitemapEntry('/blog/', { changeFrequency: 'weekly', priority: 0.8 }),
    sitemapEntry('/de/blog/', { changeFrequency: 'weekly', priority: 0.7 }),
    sitemapEntry('/privacy-statement/', { changeFrequency: 'yearly', priority: 0.4 }),
    sitemapEntry('/de/privacy-statement/', { changeFrequency: 'yearly', priority: 0.4 }),
    sitemapEntry('/imprint/', { changeFrequency: 'yearly', priority: 0.4 }),
    sitemapEntry('/de/imprint/', { changeFrequency: 'yearly', priority: 0.4 }),
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

  const appPages = appSlugs.flatMap((slug) => [
    sitemapEntry(`/apps/${slug}/`, {
      changeFrequency: 'monthly',
      priority: 0.5,
    }),
    sitemapEntry(`/apps/${slug}/terms-and-conditions/`, {
      changeFrequency: 'yearly',
      priority: 0.3,
    }),
    sitemapEntry(`/apps/${slug}/privacy-statement/`, {
      changeFrequency: 'yearly',
      priority: 0.3,
    }),
  ]);

  return [...staticPages, ...blogPages, ...appPages];
}
