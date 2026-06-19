import type { Metadata } from 'next';
import Link from 'next/link';
import { canonicalPath } from '@/lib/seo';

const targetPath = '/apps/quitergy/privacy/';

export const metadata: Metadata = {
  title: 'Privacy Policy for QuitERGY - George Valandis',
  description: 'Privacy policy for the QuitERGY app.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: canonicalPath(targetPath),
  },
};

export default function QuitERGYLegacyPrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-950 px-6 py-16 text-gray-50">
      <meta httpEquiv="refresh" content={`0; url=${targetPath}`} />
      <section className="mx-auto max-w-2xl">
        <p className="mb-3 font-mono text-sm uppercase tracking-wider text-amber-400">
          App Privacy
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Privacy Policy for QuitERGY
        </h1>
        <p className="mt-5 text-gray-300">
          This privacy page has moved to the canonical app privacy URL.
        </p>
        <Link
          href={targetPath}
          className="mt-6 inline-flex text-amber-300 underline hover:text-amber-200"
        >
          Open the current QuitERGY privacy policy
        </Link>
      </section>
    </main>
  );
}
