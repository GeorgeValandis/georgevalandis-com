import { AppEntry } from '@/content/apps';
import { glanceAwayMacPage as content, glanceAwayMacPath, MacScreenshot } from '@/content/glanceawayMacPage';
import { absoluteUrl } from '@/lib/seo';
import { ArrowLeft, ArrowRight, Check, ExternalLink, Lock, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type GlanceAwayMacPageProps = {
  app: AppEntry;
};

const linkClass = 'font-semibold text-slate-600 transition hover:text-slate-950';

function MacShot({
  screenshot,
  priority = false,
  sizes,
  className = '',
}: {
  screenshot: MacScreenshot;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  return (
    <Image
      src={screenshot.src}
      alt={screenshot.alt}
      width={screenshot.width}
      height={screenshot.height}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      sizes={sizes}
      className={`block h-auto w-full drop-shadow-[0_24px_48px_rgba(15,23,42,0.22)] ${className}`}
    />
  );
}

function AppStoreBadgeLink({ app, appStoreLink }: { app: AppEntry; appStoreLink: string }) {
  return (
    <a
      href={appStoreLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${app.title} on the App Store`}
      className="inline-flex transition hover:scale-[1.02]"
    >
      <span
        aria-hidden="true"
        className="inline-flex h-11 w-40 items-center gap-1.5 rounded-[0.85rem] bg-slate-950 px-3 text-white shadow-sm ring-1 ring-white/25"
      >
        <svg viewBox="0 0 24 24" className="h-[1.35rem] w-[1.35rem] shrink-0" fill="currentColor" role="img">
          <path d="M16.7 12.5c0-2 1.7-3 1.8-3.1-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.8-2.7-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.6-.4 6.3 1.1 8.4.7 1 1.5 2.2 2.6 2.1 1 0 1.5-.7 2.8-.7 1.3 0 1.7.7 2.8.7s1.9-1 2.6-2c.8-1.2 1.1-2.3 1.2-2.4-.1-.1-2.7-1.1-2.7-3.6ZM14.7 6.4c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2.1-.5 2.7-1.3Z" />
        </svg>
        <span className="min-w-0 flex-1 leading-none">
          <span className="block whitespace-nowrap text-[0.5rem] font-bold">Download on the</span>
          <span className="block whitespace-nowrap text-[1.06rem] font-bold tracking-tight">App Store</span>
        </span>
        <ExternalLink size={12} className="ml-auto shrink-0 opacity-80" />
      </span>
    </a>
  );
}

function macJsonLd(app: AppEntry) {
  const pageUrl = absoluteUrl(glanceAwayMacPath);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        name: `${content.appStoreName} - ${content.eyebrow}`,
        description: content.intro,
        url: pageUrl,
        inLanguage: 'en',
        isPartOf: {
          '@type': 'WebSite',
          name: 'George Valandis',
          url: absoluteUrl('/'),
        },
        breadcrumb: { '@id': `${pageUrl}#breadcrumbs` },
        mainEntity: { '@id': `${pageUrl}#software` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Apps', item: absoluteUrl('/apps/') },
          { '@type': 'ListItem', position: 3, name: app.title, item: absoluteUrl(`/apps/${app.slug}/`) },
          { '@type': 'ListItem', position: 4, name: 'Mac', item: pageUrl },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${pageUrl}#software`,
        name: content.appStoreName,
        alternateName: app.title,
        applicationCategory: 'HealthApplication',
        applicationSubCategory: content.primaryKeyword,
        operatingSystem: 'macOS',
        description: content.intro,
        url: pageUrl,
        downloadUrl: app.appStoreLink,
        installUrl: app.appStoreLink,
        sameAs: app.appStoreLink ? [app.appStoreLink] : undefined,
        image: absoluteUrl(app.logo),
        screenshot: content.screenshots.map((screenshot) => absoluteUrl(screenshot.src)),
        featureList: content.highlights,
        keywords: [content.primaryKeyword, ...content.secondaryKeywords],
        ...(app.appStoreLink
          ? {
              offers: {
                '@type': 'Offer',
                price: 0,
                priceCurrency: 'USD',
                url: app.appStoreLink,
                availability: 'https://schema.org/InStock',
              },
            }
          : {}),
        publisher: { '@type': 'Person', name: 'George Valandis', url: absoluteUrl('/') },
        author: { '@type': 'Person', name: 'George Valandis', url: absoluteUrl('/') },
      },
    ],
  };
}

export default function GlanceAwayMacPage({ app }: GlanceAwayMacPageProps) {
  const [heroShot, overlayShot, ...moreShots] = content.screenshots;
  const appStoreLink = app.appStoreLink;

  return (
    <main lang="en" className="min-h-screen bg-slate-50 text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(macJsonLd(app)) }}
      />

      <section className={`relative overflow-hidden bg-gradient-to-br ${content.background}`}>
        <div className="absolute inset-x-0 top-0 h-px bg-slate-950/10" />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <Link
            href="/apps/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950"
          >
            <ArrowLeft size={16} />
            Apps
          </Link>
          {appStoreLink ? (
            <a
              href={appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800 xl:inline-flex"
            >
              App Store
              <ExternalLink size={15} />
            </a>
          ) : null}
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 pb-16 pt-10 lg:px-8 lg:pb-24 lg:pt-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-center xl:gap-12">
          <div
            className="absolute left-[8%] top-[45%] h-56 w-56 rounded-full blur-3xl"
            style={{ backgroundColor: `${content.accent}55` }}
          />
          <div className="absolute right-[6%] top-[30%] h-72 w-72 rounded-full bg-white/80 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="mb-8 flex items-center gap-4">
              <Image
                src={app.logo}
                alt={`${app.title} app icon`}
                width={64}
                height={64}
                className="h-16 w-16 rounded-2xl shadow-xl shadow-slate-950/10"
              />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {content.eyebrow}
                </p>
                <p className="mt-1 text-lg font-bold text-slate-950">{app.title}</p>
              </div>
            </div>

            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl xl:text-[3.5rem] xl:leading-[1.05]">
              {content.headline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-700 sm:mt-6 sm:text-lg sm:leading-8">
              {content.intro}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              {appStoreLink ? (
                <a
                  href={appStoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition hover:scale-[1.02] hover:bg-slate-800"
                >
                  {content.primaryCta}
                  <ExternalLink size={17} />
                </a>
              ) : null}
              <a
                href="#screens"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-slate-950/15 bg-white/60 px-6 text-sm font-bold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                {content.secondaryCta}
                <ArrowRight size={16} />
              </a>
            </div>

            <p className="mt-5 max-w-lg text-sm leading-6 text-slate-600">{content.availability}</p>

            <div className="mt-9 grid max-w-2xl gap-3 sm:grid-cols-2">
              {content.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <span
                    className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: content.accent }}
                  >
                    <Check size={14} className="text-slate-950" />
                  </span>
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <MacShot
              screenshot={heroShot}
              priority
              sizes="(min-width: 1280px) 700px, (min-width: 1024px) 1024px, calc(100vw - 3rem)"
            />
          </div>
        </div>
      </section>

      <section id="screens" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Product view</p>
              <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                {content.featureTitle}
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">{content.featureIntro}</p>
          </div>

          <div className="mt-16 grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center">
            <MacShot screenshot={overlayShot} sizes="(min-width: 1024px) 640px, calc(100vw - 3rem)" />

            <div className="grid gap-5">
              {content.features.map((feature, index) => (
                <div key={feature.title} className="border-t border-slate-950/10 py-6">
                  <p className="font-mono text-sm text-slate-400">0{index + 1}</p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">{feature.title}</h3>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {moreShots.map((screenshot) => (
              <figure key={screenshot.src} className="min-w-0">
                <MacShot screenshot={screenshot} sizes="(min-width: 640px) 50vw, calc(100vw - 3rem)" />
                <figcaption className="mt-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                  {screenshot.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 text-slate-950 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
            <div>
              <div
                className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: content.accent }}
              >
                <Sparkles size={22} className="text-slate-950" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{content.workflowTitle}</h2>
            </div>
            <div className="grid gap-5">
              {content.workflow.map((step, index) => (
                <div key={step.title} className="grid gap-5 border-t border-slate-950/10 py-6 sm:grid-cols-[4rem_1fr]">
                  <p className="font-mono text-sm text-slate-400">0{index + 1}</p>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">{step.title}</h3>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 grid gap-8 rounded-[2rem] border border-slate-950/10 bg-slate-50 p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:p-10">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{ backgroundColor: `${content.accent}22` }}
            >
              <Lock size={24} style={{ color: content.accent }} />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{content.privacyTitle}</h2>
              <p className="mt-2 max-w-3xl text-base leading-7 text-slate-600">{content.privacyDescription}</p>
            </div>
            <a
              href={absoluteUrl(`/apps/${app.slug}/privacy/`)}
              className="inline-flex items-center justify-center rounded-full border border-slate-950/15 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-950/5"
            >
              App Privacy
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">FAQ</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Common questions before you install.
            </h2>
          </div>
          <div className="divide-y divide-slate-950/10">
            {content.faq.map((item) => (
              <div key={item.question} className="py-7">
                <h3 className="text-xl font-bold tracking-tight text-slate-950">{item.question}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
          <div className="border-t border-slate-950/10 pt-10">
            <p className="text-2xl font-bold tracking-tight text-slate-950">Ready to try {app.title}?</p>
            <p className="mt-2 text-sm text-slate-600">{content.finalCtaDescription}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
              {appStoreLink ? <AppStoreBadgeLink app={app} appStoreLink={appStoreLink} /> : null}
              <Link href={`/apps/${app.slug}/`} className={`inline-flex items-center gap-2 text-sm ${linkClass}`}>
                GlanceAway for iPhone
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        <footer className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-5 border-t border-slate-950/10 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} George Valandis. {app.title} is an app by George Valandis.
            </p>
            <nav aria-label={`${app.title} legal links`} className="flex flex-wrap gap-x-5 gap-y-2">
              <a href={absoluteUrl(app.legal.privacyPath)} className={linkClass}>
                Website Privacy &amp; Cookies
              </a>
              <a href={absoluteUrl(`/apps/${app.slug}/privacy/`)} className={linkClass}>
                App Privacy
              </a>
              <a href={absoluteUrl(app.legal.termsPath)} className={linkClass}>
                Terms
              </a>
              <a href={absoluteUrl('/imprint/')} className={linkClass}>
                Imprint
              </a>
            </nav>
          </div>
        </footer>
      </section>
      <script src="/apps/glanceaway/campaign.js" data-campaign="mac_landing" data-source-prefix="mac" defer />
    </main>
  );
}
