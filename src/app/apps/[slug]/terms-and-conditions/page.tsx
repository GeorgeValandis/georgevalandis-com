import { ArrowLeft, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { appSlugs, getAppBySlug } from '@/content/apps';
import { getAppLegalContentBySlug } from '@/content/appLegalContent';

type AppTermsPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return appSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AppTermsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  const legal = getAppLegalContentBySlug(slug);

  if (!app || !legal) {
    return {
      title: 'Terms and Conditions not found - George Valandis',
    };
  }

  return {
    title: `${legal.terms.sourceTitle} - George Valandis`,
    description: `Terms and Conditions for the ${app.title} iOS app.`,
  };
}

export default async function AppTermsPage({ params }: AppTermsPageProps) {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  const legal = getAppLegalContentBySlug(slug);

  if (!app || !legal) {
    notFound();
  }

  const termsContent = legal.terms;

  return (
    <main className="min-h-screen bg-gray-950 text-gray-50">
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <Link
          href="/#apps"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Apps
        </Link>

        <header className="mt-8 mb-10">
          <p className="text-amber-400 font-mono text-sm tracking-wider uppercase mb-3">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {termsContent.sourceTitle}
          </h1>
          <a
            href={app.appStoreLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-amber-300 hover:text-amber-200 transition-colors"
          >
            View {app.title} in the App Store
            <ExternalLink size={14} />
          </a>
          <a
            href={termsContent.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Source link
          </a>
          {termsContent.note ? (
            <p className="mt-3 text-xs text-gray-500">
              {termsContent.note}
            </p>
          ) : null}
        </header>

        <div
          className="text-gray-300 leading-relaxed [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:text-white [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-4 [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:text-white [&_h4]:mt-6 [&_h4]:mb-3 [&_h5]:text-xl [&_h5]:font-semibold [&_h5]:text-white [&_h5]:mt-6 [&_h5]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-4 [&_li]:text-gray-300 [&_a]:text-amber-300 [&_a]:underline [&_a]:break-all [&_a]:hover:text-amber-200 [&_hr]:my-6 [&_hr]:border-white/10"
          dangerouslySetInnerHTML={{ __html: termsContent.html }}
        />

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white mb-3">Related Privacy Statement</h2>
          <Link
            href={app.legal.privacyPath}
            className="text-amber-300 hover:text-amber-200 transition-colors underline"
          >
            {legal.privacy.sourceTitle}
          </Link>
        </section>
      </article>
    </main>
  );
}
