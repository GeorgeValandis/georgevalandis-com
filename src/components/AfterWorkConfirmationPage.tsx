import { afterWorkConfirmationCopy } from '@/content/afterWorkConfirmationCopy';
import { localizedPath, type SiteLocale } from '@/lib/siteLocale';
import { ArrowUpRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AfterWorkConfirmationPage({ locale }: { locale: SiteLocale }) {
  const copy = afterWorkConfirmationCopy[locale];
  const languagePath = locale === 'de' ? '/after-work-confirmed/' : '/de/after-work-confirmed/';

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050a13] text-[#f7f8f9]">
      <style>{`
        @keyframes after-work-confirmation-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .after-work-confirmation-content {
          animation: after-work-confirmation-in 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .after-work-confirmation-content {
            animation: none;
          }
        }
      `}</style>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-[#ff8a3d]/[0.08] blur-3xl" />
        <div className="absolute bottom-[-15rem] left-[-12rem] h-[34rem] w-[34rem] rounded-full bg-[#163452]/[0.34] blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-white/[0.06] bg-[#050a13]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 sm:px-10 lg:h-16 lg:px-[54px]">
          <Link href={localizedPath(locale, '/')} className="text-xl font-semibold tracking-tight text-white">
            george<span className="text-[#ff9d19]">.</span>valandis
          </Link>
          <div className="flex items-center gap-5">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500 sm:inline">
              After Work
            </span>
            <Link
              href={languagePath}
              aria-label={copy.languageLabel}
              className="inline-flex items-center rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {copy.languageCode}
            </Link>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-129px)] max-w-[1600px] items-center px-6 py-14 sm:px-10 sm:py-20 lg:px-[54px] lg:py-24">
        <div className="after-work-confirmation-content grid w-full items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.72fr)] lg:gap-24">
          <div className="max-w-[650px]">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-[#ff8a3d]">
              {copy.eyebrow}
            </p>

            <div className="mt-8 inline-flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-300/10 text-emerald-300 shadow-[0_0_45px_rgba(52,211,153,0.12)]">
              <Check size={32} strokeWidth={2.25} aria-hidden="true" />
            </div>

            <h1 className="mt-7 max-w-[680px] text-[clamp(3.5rem,8vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-white">
              {copy.title}
            </h1>
            <p className="mt-7 max-w-[570px] text-xl leading-[1.35] text-slate-200 sm:text-2xl">
              {copy.description}
            </p>
            <p className="mt-4 max-w-[540px] text-[16px] leading-[1.55] text-slate-400 sm:text-[17px]">
              {copy.detail}
            </p>

            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href={localizedPath(locale, '/')}
                className="inline-flex h-12 items-center gap-2 rounded-[8px] bg-[#ff8a3d] px-5 text-sm font-semibold text-[#18120d] transition-transform hover:-translate-y-0.5 hover:bg-[#ff9b59]"
              >
                {copy.primaryCta}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href={localizedPath(locale, '/privacy-statement')}
                className="text-sm text-slate-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
              >
                {copy.privacyLink}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[470px] lg:justify-self-end">
            <div className="relative aspect-[0.9/1] overflow-hidden rounded-[24px] border border-white/10 bg-[#111a25] shadow-[0_30px_80px_rgba(0,0,0,0.34)]">
              <Image
                src="/after-work-preview/newsletter-social-desk-03.webp"
                alt={copy.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 470px, 90vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050a13]/90 via-[#050a13]/[0.05] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4 border-b border-white/20 pb-4">
                  <span className="font-serif text-2xl tracking-[-0.03em] text-white">After Work</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-300">
                    {copy.issueLabel}
                  </span>
                </div>
                <p className="pt-4 font-serif text-lg italic leading-[1.25] text-slate-200">
                  {copy.imageCaption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-7 text-xs text-slate-500 sm:px-10 lg:px-[54px]">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 George Valandis.</span>
          <span>{copy.footer}</span>
        </div>
      </footer>
    </main>
  );
}
