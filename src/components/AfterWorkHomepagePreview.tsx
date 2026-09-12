'use client';

import { apps } from '@/content/apps';
import { germanAppSubtitles, previewCopy } from '@/content/afterWorkPreviewCopy';
import { blogPosts } from '@/content/blogPosts';
import type { SiteLocale } from '@/lib/siteLocale';
import { ArrowUpRight, Menu, Sparkles, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import LanguageSwitch from './LanguageSwitch';

const marqueeApps = apps;

function AppMarqueeSet({ duplicate = false, locale }: { duplicate?: boolean; locale: SiteLocale }) {
  return (
    <div className="flex shrink-0 gap-6 pr-6 lg:gap-7 lg:pr-7" aria-hidden={duplicate}>
      {marqueeApps.map((app) => (
        <a
          key={`${duplicate ? 'duplicate-' : ''}${app.slug}`}
          href={app.websitePath || app.appStoreLink || '#preview-apps'}
          tabIndex={duplicate ? -1 : undefined}
          className="group flex w-[285px] shrink-0 items-center gap-5 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Image
            src={app.logo}
            alt=""
            width={104}
            height={104}
            className="h-[104px] w-[104px] shrink-0 rounded-[25px] object-cover shadow-[0_14px_30px_rgba(0,0,0,0.22)]"
          />
          <div className="min-w-0">
            <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-white">{app.title}</h3>
            <p className="mt-1.5 max-w-[165px] text-[14px] leading-[1.35] text-slate-300/80">
              {locale === 'de' ? germanAppSubtitles[app.slug] ?? app.subtitle : app.subtitle}
            </p>
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.22em] text-slate-400/80">
              {app.platforms.join(' · ')}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

function PreviewSectionTransition({ from, to }: { from: string; to: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-36 z-0 h-36 sm:-top-48 sm:h-48"
      style={{
        background: `linear-gradient(to bottom, ${from}00 0%, ${from}00 54%, ${to}10 70%, ${to}38 84%, ${to}a0 95%, ${to} 100%)`,
      }}
    />
  );
}

export default function AfterWorkHomepagePreview({ locale }: { locale: SiteLocale }) {
  const copy = previewCopy[locale];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050a13] text-[#f7f8f9]">
      <style>{`
        @keyframes preview-app-marquee-right {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        .preview-app-marquee {
          animation: preview-app-marquee-right 64s linear infinite;
          will-change: transform;
        }

        .preview-about-image {
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.72) 18%, #000 44%, #000 100%);
          mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.72) 18%, #000 44%, #000 100%);
        }

        @media (max-width: 1023px) {
          .preview-about-image {
            -webkit-mask-image: none;
            mask-image: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .preview-app-marquee {
            animation: none;
            transform: none;
          }
        }
      `}</style>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.04] bg-[#050a13]/75 backdrop-blur-xl">
        <div className="relative mx-auto flex h-20 max-w-[1600px] items-center justify-start px-6 lg:h-16 lg:px-[52px]">
          <a href="#preview-home" className="mr-auto text-xl font-semibold tracking-tight text-white">
            george<span className="text-[#ff9d19]">.</span>valandis
          </a>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {copy.nav.links.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative px-3 py-2 text-xs text-slate-400 transition-colors hover:text-white"
              >
                {item.label}
                <span className={`absolute inset-x-3 bottom-0 h-px origin-left bg-[#ff8a3d] transition-transform duration-300 ${index === 0 ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </a>
            ))}
            <LanguageSwitch locale={locale} />
          </div>

          <a
            href="#preview-contact"
            className="ml-auto hidden rounded-full bg-[#ff9d19] px-4 py-2 text-xs font-semibold text-[#17120b] transition-transform hover:-translate-y-0.5 hover:bg-[#ffad3b] lg:inline-flex"
          >
              {copy.nav.cta}
          </a>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-full border border-white/10 p-2 text-slate-300 lg:hidden"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-white/5 bg-[#050a13] px-6 py-5 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {copy.nav.links.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 pt-2">
                <LanguageSwitch locale={locale} />
              </div>
            </div>
          </div>
        )}
      </nav>

      <section id="preview-home" className="relative isolate overflow-hidden bg-[#050a13] pt-20 lg:pt-16">
        <div className="absolute inset-0 -z-20 bg-[#050a13]" />
        <div className="absolute inset-0 -z-10 w-full">
          <Image
            src="/after-work-preview/hero-desk.png"
            alt={copy.hero.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 67vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050a13] via-[#050a13]/90 via-35% to-[#050a13]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050a13]/65 via-transparent to-[#050a13]/10" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-b from-transparent via-[#050a13]/85 to-[#050a13] sm:h-28" />

        <div className="relative mx-auto flex min-h-[590px] max-w-[1600px] items-center px-6 py-20 sm:px-10 lg:min-h-[388px] lg:items-start lg:px-[54px] lg:py-7">
          <div className="relative z-10 max-w-[635px]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.16] bg-[#111c28]/75 px-3.5 py-1.5 text-[10px] font-medium tracking-[0.09em] text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_26px_rgba(0,0,0,0.14)] backdrop-blur-md">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#ff8a3d]/[0.14] text-[#ffad70]">
                <Sparkles size={12} strokeWidth={1.8} />
              </span>
              <span>{copy.hero.badge}</span>
            </div>
            <h1 className="max-w-[640px] text-[50px] font-bold leading-[0.98] tracking-[-0.055em] text-white sm:text-[58px] lg:text-[64px] lg:leading-[0.82]">
              {copy.hero.prefix}{' '}
              <span className="text-[#ff8a3d]">{copy.hero.highlight}</span>
              <br />
              {copy.hero.suffix}
            </h1>
            <p className="mt-5 max-w-[430px] text-[16px] leading-[1.5] text-slate-200/90 sm:text-[17px]">
              {copy.hero.description}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href="#preview-apps"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#ff8a3d] px-4 text-[14px] font-semibold text-[#18120d] transition-transform hover:-translate-y-0.5 hover:bg-[#ff9b59]"
              >
                {copy.hero.primaryCta} <ArrowUpRight size={16} />
              </a>
              <a
                href="#preview-contact"
                className="inline-flex h-11 items-center justify-center rounded-[8px] border border-white/60 px-5 text-[14px] font-medium text-white transition-colors hover:border-white hover:bg-white/10"
              >
                {copy.hero.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="preview-apps" className="pb-14 pt-10 sm:pb-20 sm:pt-12">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-[54px]">
          <div className="mb-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-1 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-[#ff8a3d]">{copy.apps.eyebrow}</p>
              <h2 className="text-[36px] font-bold tracking-[-0.045em] text-white sm:text-[38px]">
                {copy.apps.title}<span className="text-slate-500">.</span>
              </h2>
            </div>
            <Link href="/apps/" className="inline-flex items-center gap-2 pb-1 text-[13px] text-[#ff8a3d] hover:text-[#ffb27b]">
              {copy.apps.viewAll} <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="relative overflow-hidden" role="region" aria-label={copy.apps.ariaLabel}>
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#070d17] to-transparent sm:w-16" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#070d17] to-transparent sm:w-16" />
            <div className="preview-app-marquee flex w-max">
              <AppMarqueeSet locale={locale} />
              <AppMarqueeSet duplicate locale={locale} />
            </div>
          </div>
        </div>
      </section>

      <section id="preview-after-work" className="relative scroll-mt-20 bg-[#f7efe3] py-10 text-[#171717] sm:scroll-mt-16 sm:py-14">
        <PreviewSectionTransition from="#050a13" to="#f7efe3" />
        <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 sm:px-10 lg:grid-cols-[1fr_430px] lg:gap-10 lg:pl-[54px] lg:pr-[44px]">
          <div className="max-w-[535px]">
            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.27em] text-[#f47734]">
              {copy.afterWork.eyebrow}
            </p>
            <h2 className="max-w-[520px] text-[38px] font-bold leading-[1.06] tracking-[-0.045em] sm:text-[42px]">
              {copy.afterWork.title}
            </h2>
            <p className="mt-6 max-w-[470px] text-[17px] leading-[1.45] text-[#514a43]">
              {copy.afterWork.description}
            </p>

            <form onSubmit={handleSubmit} className="mt-7 flex max-w-[445px] flex-col gap-2.5 sm:flex-row">
              <label htmlFor="preview-email" className="sr-only">{copy.afterWork.inputLabel}</label>
              <input
                id="preview-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={copy.afterWork.inputPlaceholder}
                required
                className="min-w-0 flex-1 rounded-[8px] border border-[#d9d0c3] bg-white/80 px-4 py-3.5 text-[13px] text-[#171717] outline-none transition-colors placeholder:text-[#8e867e] focus:border-[#f47734] focus:ring-2 focus:ring-[#f47734]/20"
              />
              <button
                type="submit"
                className="w-[182px] shrink-0 rounded-[8px] bg-[#ff7b39] px-6 py-3.5 text-[13px] font-semibold text-[#24170b] transition-transform hover:-translate-y-0.5 hover:bg-[#ff8f55]"
              >
                {submitted ? copy.afterWork.submitted : copy.afterWork.submit}
              </button>
            </form>
            <p className="mt-3 text-[11px] text-[#8c8176]">
              {submitted ? copy.afterWork.previewNote : copy.afterWork.helper}
            </p>
          </div>

          <article className="relative w-full max-w-[465px] justify-self-end overflow-hidden rounded-[14px] border border-[#e3d9cc] bg-[#fbf7ef] p-4 shadow-[0_16px_42px_rgba(70,48,24,0.11)] sm:p-[14px]">
            <div className="flex items-center justify-between border-b-2 border-[#ff7b39] pb-3">
              <h3 className="font-serif text-[32px] leading-none tracking-[-0.035em] text-[#171717]">After Work</h3>
              <span className="text-[11px] text-[#514a43]">{copy.afterWork.issue}</span>
            </div>
            <div className="relative mt-3 aspect-[1.7/1] overflow-hidden rounded-[8px]">
              <Image
                src="/after-work-preview/issue-001.png"
                alt={copy.afterWork.imageAlt}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            <p className="pt-3 font-mono text-[9px] uppercase tracking-[0.27em] text-[#514a43]">{copy.afterWork.footer}</p>
          </article>
        </div>
      </section>

      <section id="preview-about" className="relative isolate scroll-mt-20 overflow-visible bg-[#07101a] py-0 lg:scroll-mt-16">
        <PreviewSectionTransition from="#f7efe3" to="#07101a" />
        <div className="absolute inset-0 -z-20 bg-[#07101a]" />
        <div className="preview-about-image absolute inset-y-0 right-0 -z-10 w-full lg:w-[76%]">
          <Image
            src="/after-work-preview/george-at-desk.png"
            alt={copy.about.imageAlt}
            fill
            sizes="(min-width: 1024px) 76vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07101a] via-[#07101a]/45 via-30% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07101a]/65 via-transparent to-[#07101a]/10" />
        </div>
        <div className="relative mx-auto flex min-h-[500px] max-w-[1600px] items-center px-6 sm:px-10 lg:px-[54px]">
          <div className="relative z-10 max-w-[480px]">
            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-[#ff8a3d]">{copy.about.eyebrow}</p>
            <h2 className="max-w-[440px] text-[38px] font-bold leading-[1.03] tracking-[-0.045em] text-white sm:text-[42px]">
              {copy.about.title}
            </h2>
            <p className="mt-6 max-w-[430px] text-[16px] leading-[1.5] text-slate-200/80">
              {copy.about.description}
            </p>
            <a
              href="#preview-contact"
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-[8px] border border-white/65 px-5 text-[13px] font-medium text-white transition-colors hover:border-white hover:bg-white/10"
            >
              {copy.about.cta} <ArrowUpRight size={15} />
            </a>
          </div>
          <p className="absolute bottom-2 right-8 hidden max-w-[130px] rotate-[-5deg] font-serif text-[17px] italic leading-[1.15] text-white/80 lg:block">
            {copy.about.quote.slice(0, 3).map((line) => <span key={line} className="block">{line}</span>)}
            <span className="text-[13px]">{copy.about.quote[3]}</span>
          </p>
        </div>
      </section>

      <section id="preview-blog" className="bg-[#07101a] px-6 pb-36 lg:px-8">
        <div className="mx-auto max-w-7xl pt-24">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-[#ff9d19]">{copy.blog.eyebrow}</p>
          <div className="grid gap-4 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((post, index) => (
              <Link key={post.slug} href={`${locale === 'de' ? '/de' : ''}/blog/${post.slug}/`} className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors hover:border-[#ff9d19]/40">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">{post.date}</p>
                <h3 className="mt-5 text-lg font-semibold leading-snug text-white group-hover:text-[#ffbd65]">{copy.blog.posts[index].title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{copy.blog.posts[index].excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="preview-contact" className="relative bg-[#050a13] px-6 py-28 text-center lg:px-8">
        <PreviewSectionTransition from="#07101a" to="#050a13" />
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#ff9d19]">{copy.contact.eyebrow}</p>
        <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">{copy.contact.title}</h2>
        <a href="mailto:info@georgevalandis.com" className="mt-8 inline-flex items-center gap-2 text-lg text-slate-300 transition-colors hover:text-white">
          info@georgevalandis.com <ArrowUpRight size={18} />
        </a>
      </section>

      <footer className="bg-[#050a13] px-6 py-8 text-center text-xs text-slate-600 lg:px-8">
        <span>{copy.footer}</span>
      </footer>
    </main>
  );
}
