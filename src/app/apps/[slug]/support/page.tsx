import { ArrowLeft, ExternalLink, Mail } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { appSupportSlugs, getAppSupportPage } from '@/content/appSupportPages';
import { getAppBySlug } from '@/content/apps';
import { canonicalPath } from '@/lib/seo';

type AppSupportPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return appSupportSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AppSupportPageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  const support = getAppSupportPage(slug);

  if (!app || !support) {
    return {
      title: 'Support not found - George Valandis',
    };
  }

  return {
    title: `${app.title} Support - George Valandis`,
    description: support.intro,
    alternates: {
      canonical: canonicalPath(`/apps/${app.slug}/support`),
    },
  };
}

export default async function AppSupportPage({ params }: AppSupportPageProps) {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  const support = getAppSupportPage(slug);

  if (!app || !support) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-50">
      <article className="mx-auto max-w-5xl px-6 py-16 md:py-24 lg:px-8">
        <Link
          href={`/apps/${app.slug}/`}
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to {app.title}
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="mb-3 font-mono text-sm uppercase tracking-wider text-amber-400">
            Support
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {app.title} Support
          </h1>
          <p className="mt-5 text-base leading-7 text-gray-300">
            {support.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {app.appStoreLink ? (
              <a
                href={app.appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-gray-950 transition-colors hover:bg-amber-300"
              >
                View in the App Store
                <ExternalLink size={16} />
              </a>
            ) : null}
            <a
              href="mailto:info@georgevalandis.com?subject=MediMemo%20Support"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              Contact support
              <Mail size={16} />
            </a>
          </div>
        </header>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {support.notes.map((note) => (
            <div key={note.title} className="border-t border-white/10 pt-5">
              <h2 className="text-xl font-semibold text-white">{note.title}</h2>
              <p className="mt-3 text-sm leading-6 text-gray-300">
                {note.description}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)]">
          <div>
            <p className="font-mono text-sm uppercase tracking-wider text-amber-400">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Common setup questions
            </h2>
          </div>
          <div className="divide-y divide-white/10">
            {support.faq.map((item) => (
              <div key={item.question} className="py-6">
                <h3 className="text-xl font-semibold text-white">
                  {item.question}
                </h3>
                <p className="mt-3 text-base leading-7 text-gray-300">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-12 border-t border-white/10 pt-8">
          <p className="text-sm leading-6 text-gray-400">{support.contact}</p>
          <nav
            aria-label={`${app.title} support links`}
            className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm"
          >
            <Link
              href={app.legal.privacyPath}
              className="font-semibold text-amber-300 transition-colors hover:text-amber-200"
            >
              Privacy Policy
            </Link>
            <Link
              href={app.legal.termsPath}
              className="font-semibold text-amber-300 transition-colors hover:text-amber-200"
            >
              Terms
            </Link>
            <Link
              href="/imprint/"
              className="font-semibold text-amber-300 transition-colors hover:text-amber-200"
            >
              Imprint
            </Link>
          </nav>
        </footer>
      </article>
    </main>
  );
}
