import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GlanceAwayGuidePage from '@/components/GlanceAwayGuidePage';
import { getAppBySlug } from '@/content/apps';
import { getGlanceAwayGuide, glanceAwayGuidePath, glanceAwayGuides } from '@/content/glanceawayGuides';
import { canonicalPath } from '@/lib/seo';

type GuideRouteProps = {
  params: Promise<{ guide: string }>;
};

const ogImage = {
  url: '/apps/glanceaway/mac/overlay.webp',
  alt: 'GlanceAway full-screen eye break on Mac.',
};

export const dynamicParams = false;

export function generateStaticParams() {
  return glanceAwayGuides.map((guide) => ({ guide: guide.slug }));
}

export async function generateMetadata({ params }: GuideRouteProps): Promise<Metadata> {
  const { guide: slug } = await params;
  const guide = getGlanceAwayGuide(slug);

  if (!guide) {
    return {};
  }

  const path = canonicalPath(glanceAwayGuidePath(guide.slug));

  return {
    title: guide.title,
    description: guide.description,
    keywords: [guide.primaryKeyword, ...guide.secondaryKeywords],
    alternates: { canonical: path },
    // Safari Smart App Banner for GlanceAway on iPhone.
    itunes: { appId: '6751297230' },
    openGraph: {
      type: 'article',
      title: guide.title,
      description: guide.description,
      url: path,
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
      images: [ogImage.url],
    },
  };
}

export default async function GlanceAwayGuideRoute({ params }: GuideRouteProps) {
  const { guide: slug } = await params;
  const guide = getGlanceAwayGuide(slug);
  const app = getAppBySlug('glanceaway');

  if (!guide || !app) {
    notFound();
  }

  return <GlanceAwayGuidePage app={app} guide={guide} />;
}
