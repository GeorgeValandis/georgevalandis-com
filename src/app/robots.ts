import { siteUrl } from '@/lib/seo';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Download redirects only count clicks; crawlers should not follow them.
      disallow: ['/apps/glanceaway/download/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
