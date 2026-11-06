import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GlanceAwayMacPage from '@/components/GlanceAwayMacPage';
import { getAppBySlug } from '@/content/apps';
import { glanceAwayMacPage, glanceAwayMacPath } from '@/content/glanceawayMacPage';
import { canonicalPath } from '@/lib/seo';

const title = `${glanceAwayMacPage.appStoreName} - ${glanceAwayMacPage.eyebrow}`;
const [heroShot] = glanceAwayMacPage.screenshots;

export const metadata: Metadata = {
  title,
  description: glanceAwayMacPage.intro,
  keywords: [glanceAwayMacPage.primaryKeyword, ...glanceAwayMacPage.secondaryKeywords],
  alternates: {
    canonical: canonicalPath(glanceAwayMacPath),
  },
  openGraph: {
    title,
    description: glanceAwayMacPage.intro,
    url: canonicalPath(glanceAwayMacPath),
    images: [{ url: heroShot.src, alt: heroShot.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: glanceAwayMacPage.intro,
    images: [heroShot.src],
  },
};

export default function GlanceAwayMacRoute() {
  const app = getAppBySlug('glanceaway');

  if (!app) {
    notFound();
  }

  return <GlanceAwayMacPage app={app} />;
}
