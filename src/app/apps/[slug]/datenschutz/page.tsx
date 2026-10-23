import { ArrowLeft, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { appSlugs, getAppBySlug } from '@/content/apps';
import { getAppLegalContentBySlug, getGermanAppLegalSlugs } from '@/content/appLegalContent';
import { canonicalPath } from '@/lib/seo';

type AppPrivacyDePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const germanSlugs = new Set(getGermanAppLegalSlugs());
  return appSlugs.filter((slug) => germanSlugs.has(slug)).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AppPrivacyDePageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  const legal = getAppLegalContentBySlug(slug);

  if (!app || !legal?.de) {
    return {
      title: 'Datenschutzerklärung nicht gefunden - George Valandis',
    };
  }

  return {
    title: `${legal.de.privacy.sourceTitle} - George Valandis`,
    description: `Datenschutzinformationen für die App ${app.title}.`,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: canonicalPath(`/apps/${app.slug}/datenschutz`),
    },
  };
}

export default async function AppPrivacyDePage({ params }: AppPrivacyDePageProps) {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  const legal = getAppLegalContentBySlug(slug);

  if (!app || !legal?.de) {
    notFound();
  }

  const privacyContent = legal.de.privacy;

  return (
    <main lang="de" className="min-h-screen bg-gray-950 text-gray-50">
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <Link
          href={`/apps/${app.slug}/`}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Zurück zu {app.title}
        </Link>

        <header className="mt-8 mb-10">
          <p className="text-amber-400 font-mono text-sm tracking-wider uppercase mb-3">
            App-Datenschutz
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {privacyContent.sourceTitle}
          </h1>
          <p className="mt-3 text-sm">
            <Link
              href={`/apps/${app.slug}/privacy/`}
              hrefLang="en"
              lang="en"
              className="text-gray-400 hover:text-white transition-colors underline"
            >
              English version
            </Link>
          </p>
          {app.appStoreLink ? (
            <a
              href={app.appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-amber-300 hover:text-amber-200 transition-colors"
            >
              {app.title} im App Store ansehen
              <ExternalLink size={14} />
            </a>
          ) : null}
        </header>

        <div
          className="text-gray-300 leading-relaxed [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:text-white [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-4 [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:text-white [&_h4]:mt-6 [&_h4]:mb-3 [&_h5]:text-xl [&_h5]:font-semibold [&_h5]:text-white [&_h5]:mt-6 [&_h5]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-4 [&_li]:text-gray-300 [&_a]:text-amber-300 [&_a]:underline [&_a]:break-all [&_a]:hover:text-amber-200 [&_hr]:my-6 [&_hr]:border-white/10"
          dangerouslySetInnerHTML={{ __html: privacyContent.html }}
        />

        <section className="mt-10 border-t border-white/10 pt-8">
          <h2 className="text-xl font-semibold text-white mb-3">
            Landingpage-Datenschutz
          </h2>
          <p className="text-sm leading-6 text-gray-400">
            Diese Seite beschreibt den Datenschutz für die mobile App. Die separate
            Datenschutzerklärung der Landingpage erläutert Website-Hosting, Cookies
            und die Protokollierung von Einwilligungen für georgevalandis.com.
          </p>
          <Link
            href="/de/privacy-statement/"
            className="mt-3 inline-flex text-amber-300 hover:text-amber-200 transition-colors underline"
          >
            Datenschutzerklärung der Landingpage öffnen
          </Link>
        </section>
      </article>
    </main>
  );
}
