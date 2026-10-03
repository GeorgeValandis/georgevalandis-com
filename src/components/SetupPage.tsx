import { amazonUrl, setupCopy, setupSections } from '@/content/setupGear';
import type { SiteLocale } from '@/lib/siteLocale';
import { localizedPath } from '@/lib/siteLocale';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type SetupPageProps = {
  locale: SiteLocale;
};

export default function SetupPage({ locale }: SetupPageProps) {
  const copy = setupCopy[locale];

  return (
    <main className="min-h-screen bg-gray-950 text-gray-50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <Link
          href={localizedPath(locale, '/')}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          {copy.back}
        </Link>

        <header className="mt-8 mb-10">
          <p className="text-amber-400 font-mono text-sm tracking-wider uppercase mb-3">
            {copy.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{copy.title}</h1>
          <p className="text-gray-400 mt-4 max-w-2xl">{copy.intro}</p>
        </header>

        <Image
          src="/setup/desk.jpg"
          alt={copy.imageAlt}
          width={1791}
          height={1440}
          priority
          className="w-full h-auto rounded-3xl"
        />

        <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-x-12">
          {setupSections.map((section) => (
            <section key={section.id}>
              <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                {section.title[locale]}
              </h2>
              <ul>
                {section.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={amazonUrl(item)}
                      target="_blank"
                      rel="sponsored nofollow noopener noreferrer"
                      className="group flex items-center justify-between gap-4 rounded-xl px-3 py-3 -mx-3 transition-colors hover:bg-white/[0.04]"
                    >
                      <span className="min-w-0">
                        <span className="block font-medium text-white">{item.name}</span>
                        <span className="block text-sm text-gray-500">{item.note[locale]}</span>
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1 text-xs text-gray-500 transition-colors group-hover:text-amber-400">
                        {copy.cta}
                        <ArrowUpRight size={14} />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-16 max-w-2xl text-xs leading-relaxed text-gray-600">{copy.disclosure}</p>
      </div>
    </main>
  );
}
