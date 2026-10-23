import { setupCopy, setupItemUrl, setupSections } from '@/content/setupGear';
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
      <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-6 pb-16 md:pt-10 md:pb-24">
        <Link
          href={localizedPath(locale, '/')}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          {copy.back}
        </Link>

        <header className="relative mt-5 aspect-[4/5] overflow-hidden rounded-3xl md:aspect-[16/10]">
          <Image
            src="/setup/desk.jpg"
            alt={copy.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <p className="text-amber-400 font-mono text-xs md:text-sm tracking-wider uppercase mb-2 md:mb-3">
              {copy.eyebrow}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{copy.title}</h1>
            <p className="text-gray-300 mt-2 md:mt-4 max-w-2xl">{copy.intro}</p>
          </div>
        </header>

        <p className="mt-10 max-w-2xl leading-relaxed md:text-lg text-gray-300">{copy.story}</p>

        <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-x-12">
          {setupSections.map((section) => (
            <section key={section.id}>
              <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                {section.title[locale]}
              </h2>
              <ul>
                {section.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={setupItemUrl(item)}
                      target="_blank"
                      rel={item.href ? 'noopener noreferrer' : 'sponsored nofollow noopener noreferrer'}
                      className="group flex items-center justify-between gap-4 rounded-xl px-3 py-3 -mx-3 transition-colors hover:bg-white/[0.04]"
                    >
                      <span className="min-w-0">
                        <span className="block font-medium text-white">{item.name}</span>
                        <span className="block text-sm text-gray-500">{item.note[locale]}</span>
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1 text-xs text-gray-500 transition-colors group-hover:text-amber-400">
                        {item.href ? copy.ownCta : copy.cta}
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
