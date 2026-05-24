import AppHubList from '@/components/AppHubList';
import { appsWithSeo, getAppHubGroups } from '@/lib/appHub';
import { absoluteUrl, canonicalPath } from '@/lib/seo';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Apps by George Valandis - iOS, Android, and Mac utilities',
  description:
    'Explore George Valandis apps for period tracking, mood journaling, migraine logs, eye breaks, habit streaks, ring sizing, medication reminders, savings, caffeine reduction, focus, and more.',
  alternates: {
    canonical: canonicalPath('/apps'),
  },
  openGraph: {
    title: 'Apps by George Valandis',
    description:
      'A focused portfolio of iOS, Android, and Mac apps for health tracking, habits, focus, utilities, and calm companion experiences.',
    url: canonicalPath('/apps'),
  },
};

function appsHubJsonLd() {
  const groupedApps = getAppHubGroups();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': absoluteUrl('/apps/#webpage'),
        name: 'Apps by George Valandis',
        description: metadata.description,
        url: absoluteUrl('/apps/'),
        isPartOf: {
          '@type': 'WebSite',
          name: 'George Valandis',
          url: absoluteUrl('/'),
        },
        about: groupedApps.map((group) => group.title),
        mainEntity: {
          '@id': absoluteUrl('/apps/#item-list'),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': absoluteUrl('/apps/#breadcrumbs'),
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: absoluteUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Apps',
            item: absoluteUrl('/apps/'),
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': absoluteUrl('/apps/#item-list'),
        name: 'George Valandis app portfolio',
        itemListElement: appsWithSeo.map(({ app, landingPage, seo }, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': ['SoftwareApplication', 'MobileApplication'],
            name: landingPage?.appStoreName ?? app.title,
            alternateName: app.title,
            description: landingPage?.intro ?? app.description,
            url: absoluteUrl(`/apps/${app.slug}/`),
            image: absoluteUrl(app.logo),
            applicationCategory: landingPage?.category,
            operatingSystem: app.platforms.join(', '),
            keywords: [seo?.primaryKeyword, ...(seo?.secondaryKeywords ?? [])].filter(Boolean),
          },
        })),
      },
    ],
  };
}

export default function AppsHubPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appsHubJsonLd()) }}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(245,158,11,0.22),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.18),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Home
          </Link>

          <div className="grid gap-10 pb-14 pt-16 lg:grid-cols-[minmax(0,0.82fr)_minmax(280px,0.42fr)] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
                App portfolio
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
                Apps for tracking, focus, routines, and small daily decisions.
              </h1>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-300">
              Explore focused iOS, Android, and Mac apps by George Valandis. Each landing page shows the real product workflow, screenshots, privacy notes, and a direct store path where available.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 pb-20 pt-10 text-white sm:pb-24 sm:pt-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AppHubList />
        </div>
      </section>
    </main>
  );
}
