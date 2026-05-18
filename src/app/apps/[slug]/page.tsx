import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { appSlugs, getAppBySlug } from '@/content/apps';
import { canonicalPath } from '@/lib/seo';

type AppPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return appSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: AppPageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);

  if (!app) {
    return {
      title: 'App not found - George Valandis',
    };
  }

  return {
    title: `${app.title} - George Valandis`,
    description: app.description,
    alternates: {
      canonical: canonicalPath(`/apps/${app.slug}`),
    },
  };
}

export default async function AppPage({ params }: AppPageProps) {
  const { slug } = await params;
  const app = getAppBySlug(slug);

  if (!app) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-50">
      <article className="max-w-5xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <Link
          href="/#apps"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Apps
        </Link>

        <section className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            <div className="flex items-start gap-5">
              <img
                src={app.logo}
                alt={`${app.title} logo`}
                className="h-20 w-20 rounded-3xl border border-white/10 object-cover"
              />
              <div>
                <p className="text-amber-400 font-mono text-sm tracking-wider uppercase mb-2">
                  iOS App
                </p>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  {app.title}
                </h1>
              </div>
            </div>

            <p className="mt-8 text-2xl font-semibold text-white">
              {app.subtitle}
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-300">
              {app.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {app.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {app.appStoreLink ? (
                <a
                  href={app.appStoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-gray-950 transition-colors hover:bg-amber-400"
                >
                  View in the App Store
                  <ExternalLink size={16} />
                </a>
              ) : null}
              <Link
                href={app.legal.privacyPath}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
              >
                Privacy Statement
              </Link>
              <Link
                href={app.legal.termsPath}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
              >
                Terms
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center gap-3 text-amber-300">
              <ShieldCheck size={20} />
              <h2 className="text-lg font-semibold text-white">Privacy-first</h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-300">
              This app is designed to keep its core app data on your device. See the
              dedicated privacy statement for the specific data and services used by {app.title}.
            </p>
          </aside>
        </section>
      </article>
    </main>
  );
}
