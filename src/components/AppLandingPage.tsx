import { AppEntry } from '@/content/apps';
import { AppLandingPageContent } from '@/content/appLandingPages';
import { getAppSeoMetadata } from '@/content/appSeo';
import { getAppSupportPage } from '@/content/appSupportPages';
import { createDownloadQrSvg } from '@/lib/qrCode';
import { absoluteUrl } from '@/lib/seo';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  Lock,
  QrCode,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

type AppLandingPageProps = {
  app: AppEntry;
  content: AppLandingPageContent;
};

function PhoneShot({
  alt,
  className = '',
  priority = false,
  src,
  variant = 'phone',
}: {
  alt: string;
  className?: string;
  priority?: boolean;
  src: string;
  variant?: 'phone' | 'poster' | 'artwork';
}) {
  if (variant === 'artwork') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`block object-cover drop-shadow-2xl ${className}`}
        loading={priority ? 'eager' : 'lazy'}
      />
    );
  }

  if (variant === 'poster') {
    return (
      <div
        className={`relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/45 p-1 shadow-2xl shadow-slate-950/20 backdrop-blur ${className}`}
      >
        <img
          src={src}
          alt={alt}
          className="block h-full w-full rounded-[1.65rem] object-cover"
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[2.5rem] border border-slate-950/10 bg-slate-950 p-1.5 shadow-2xl shadow-slate-950/20 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="block h-full w-full rounded-[2.1rem] object-cover"
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
}

function appJsonLd(app: AppEntry, content: AppLandingPageContent) {
  const seo = getAppSeoMetadata(app.slug);
  const pageUrl = absoluteUrl(`/apps/${app.slug}/`);
  const supportUrl = absoluteUrl(`/apps/${app.slug}/support/`);
  const supportPage = getAppSupportPage(app.slug);
  const keywords = seo
    ? [seo.primaryKeyword, ...seo.secondaryKeywords]
    : [content.eyebrow, ...app.tags];

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
        breadcrumb: {
          '@id': `${pageUrl}#breadcrumbs`,
        },
        mainEntity: {
          '@id': `${pageUrl}#software`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: absoluteUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Apps',
            item: absoluteUrl('/apps/'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: app.title,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': ['SoftwareApplication', 'MobileApplication'],
        '@id': `${pageUrl}#software`,
        name: content.appStoreName,
        alternateName: app.title,
        applicationCategory: content.category,
        applicationSubCategory: seo?.primaryKeyword,
        operatingSystem: app.platforms.join(', '),
        description: content.intro,
        url: pageUrl,
        downloadUrl: app.appStoreLink,
        installUrl: app.appStoreLink,
        sameAs: app.appStoreLink ? [app.appStoreLink] : undefined,
        image: absoluteUrl(app.logo),
        screenshot: content.screenshots.map((screenshot) => absoluteUrl(screenshot.src)),
        featureList: content.highlights,
        keywords,
        offers: {
          '@type': 'Offer',
          price: content.price,
          priceCurrency: content.priceCurrency,
          url: app.appStoreLink ?? pageUrl,
          availability: app.appStoreLink
            ? 'https://schema.org/InStock'
            : 'https://schema.org/PreOrder',
        },
        publisher: {
          '@type': 'Person',
          name: 'George Valandis',
          url: absoluteUrl('/'),
        },
        author: {
          '@type': 'Person',
          name: 'George Valandis',
          url: absoluteUrl('/'),
        },
        softwareHelp: supportPage
          ? {
              '@type': 'WebPage',
              name: `${app.title} Support`,
              url: supportUrl,
            }
          : undefined,
      },
    ],
  };
}

function DownloadQrCard({
  app,
  appStoreLink,
  qrCodeSvg,
}: {
  app: AppEntry;
  appStoreLink?: string;
  qrCodeSvg?: string;
}) {
  if (!appStoreLink || !qrCodeSvg) {
    return (
      <aside className="rounded-3xl border border-slate-950/10 bg-slate-50 p-5">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950/5 text-slate-500">
            <QrCode size={22} />
          </span>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
              QR code
            </p>
            <p className="mt-2 text-base font-bold text-slate-950">
              Store link coming soon
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              A scan-to-install code will appear here once the public store listing is available.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="grid gap-4 rounded-3xl border border-slate-950/10 bg-slate-50 p-5 sm:grid-cols-[8.5rem_1fr] sm:items-center">
      <a
        href={appStoreLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open the store listing for ${app.title}`}
        className="inline-flex h-[8.5rem] w-[8.5rem] items-center justify-center rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-950/10 transition hover:ring-slate-950/20 [&_svg]:h-full [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
      />
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
          Scan to install
        </p>
        <p className="mt-2 text-lg font-bold tracking-tight text-slate-950">
          Download {app.title}
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Scan the QR code with your phone camera to open the store listing directly.
        </p>
        <a
          href={appStoreLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-slate-950 transition hover:text-slate-700"
        >
          Open store
          <ExternalLink size={15} />
        </a>
      </div>
    </aside>
  );
}

function HeroQrCode({
  app,
  appStoreLink,
  className = '',
  qrCodeSvg,
}: {
  app: AppEntry;
  appStoreLink?: string;
  className?: string;
  qrCodeSvg?: string;
}) {
  if (!appStoreLink || !qrCodeSvg) {
    return null;
  }

  return (
    <a
      href={appStoreLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open the store listing for ${app.title}`}
      className={`inline-flex h-24 w-24 items-center justify-center rounded-2xl bg-white p-2 shadow-2xl shadow-slate-950/15 ring-1 ring-slate-950/10 transition hover:scale-[1.02] hover:ring-slate-950/20 [&_svg]:h-full [&_svg]:w-full ${className}`}
      dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
    />
  );
}

export default function AppLandingPage({ app, content }: AppLandingPageProps) {
  const [heroShot, secondaryShot, progressShot, settingsShot] = content.screenshots;
  const featureShot = settingsShot ?? progressShot ?? secondaryShot ?? heroShot;
  const supportingShot = secondaryShot ?? heroShot;
  const tertiaryShot = progressShot ?? supportingShot;
  const privacyUrl = absoluteUrl(app.legal.privacyPath);
  const termsUrl = absoluteUrl(app.legal.termsPath);
  const imprintUrl = absoluteUrl('/imprint/');
  const supportPage = getAppSupportPage(app.slug);
  const appStoreLink = app.appStoreLink;
  const storeLabel = app.platforms.includes('Android')
    ? app.platforms.includes('iOS')
      ? 'Stores'
      : 'Google Play'
    : 'App Store';
  const isDarkHero = content.heroTone === 'dark';
  const heroMutedText = isDarkHero ? 'text-slate-300' : 'text-slate-700';
  const heroSoftText = isDarkHero ? 'text-slate-400' : 'text-slate-600';
  const heroStrongText = isDarkHero ? 'text-white' : 'text-slate-950';
  const workflowSectionClass = 'bg-white text-slate-950';
  const workflowDividerClass = 'border-slate-950/10';
  const workflowIndexClass = 'text-slate-400';
  const workflowBodyClass = 'text-slate-600';
  const privacyCardClass = 'border-slate-950/10 bg-slate-50';
  const privacyButtonClass = 'border-slate-950/15 text-slate-950 hover:bg-slate-950/5';
  const downloadQrSvg = appStoreLink ? createDownloadQrSvg(appStoreLink) : undefined;
  const showHeroQrCode = Boolean(downloadQrSvg);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd(app, content)) }}
      />

      <section
        className={`relative overflow-hidden bg-gradient-to-br ${content.background}`}
      >
        <div className={`absolute inset-x-0 top-0 h-px ${isDarkHero ? 'bg-white/10' : 'bg-slate-950/10'}`} />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <Link
            href="/apps/"
            className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
              isDarkHero ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <ArrowLeft size={16} />
            Apps
          </Link>
          {appStoreLink ? (
            <a
              href={appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors xl:inline-flex ${
                isDarkHero
                  ? 'bg-white text-slate-950 hover:bg-slate-200'
                  : 'bg-slate-950 text-white hover:bg-slate-800'
              }`}
            >
              {storeLabel}
              <ExternalLink size={15} />
            </a>
          ) : (
            <span
              className={`hidden items-center rounded-full px-4 py-2 text-sm font-semibold xl:inline-flex ${
                isDarkHero ? 'bg-white/10 text-slate-300' : 'bg-slate-950/10 text-slate-600'
              }`}
            >
              {storeLabel} coming soon
            </span>
          )}
        </div>

        <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 pb-16 pt-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8 lg:px-8 lg:pb-12 lg:pt-8 xl:grid-cols-[minmax(0,0.92fr)_minmax(420px,1fr)] xl:gap-12">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-8 flex items-center gap-4">
              <img
                src={app.logo}
                alt={`${app.title} app icon`}
                className="h-16 w-16 rounded-2xl shadow-xl shadow-slate-950/10"
              />
              <div>
                <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${isDarkHero ? 'text-slate-400' : 'text-slate-500'}`}>
                  {content.eyebrow}
                </p>
                <p className={`mt-1 text-lg font-bold ${heroStrongText}`}>{app.title}</p>
              </div>
            </div>

            <h1 className={`max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl ${heroStrongText}`}>
              {content.headline}
            </h1>
            <p className={`mt-5 max-w-xl text-base leading-7 sm:mt-6 sm:text-lg sm:leading-8 ${heroMutedText}`}>
              {content.intro}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              {appStoreLink ? (
                <a
                  href={appStoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition ${
                    isDarkHero
                      ? 'bg-white text-slate-950 hover:bg-slate-200'
                      : 'bg-slate-950 text-white hover:bg-slate-800'
                  }`}
                >
                  {content.primaryCta}
                  <ExternalLink size={16} />
                </a>
              ) : (
                <span
                  className={`inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-bold ${
                    isDarkHero ? 'bg-white/10 text-slate-300' : 'bg-slate-950/10 text-slate-600'
                  }`}
                >
                  {content.primaryCta}
                </span>
              )}
              {showHeroQrCode ? (
                <HeroQrCode
                  app={app}
                  appStoreLink={appStoreLink}
                  qrCodeSvg={downloadQrSvg}
                />
              ) : (
                <a
                  href="#screens"
                  className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-bold backdrop-blur transition ${
                    isDarkHero
                      ? 'border-white/15 bg-white/10 text-white hover:bg-white/15'
                      : 'border-slate-950/15 bg-white/60 text-slate-900 hover:bg-white'
                  }`}
                >
                  {content.secondaryCta}
                  <ArrowRight size={16} />
                </a>
              )}
            </div>

            <p className={`mt-5 max-w-lg text-sm leading-6 ${heroSoftText}`}>
              {content.availability}
            </p>

            <div className="mt-8 lg:hidden">
              <PhoneShot
                src={heroShot.src}
                alt={heroShot.alt}
                variant={heroShot.variant}
                priority
                className="mx-auto h-[470px] w-[216px] rotate-2"
              />
            </div>

            <div className="mt-9 grid max-w-xl gap-3 sm:grid-cols-2">
              {content.highlights.map((highlight) => (
                <div key={highlight} className={`flex items-center gap-3 text-sm font-semibold ${heroMutedText}`}>
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

          <div className="relative hidden min-h-[560px] lg:block xl:min-h-[600px]">
            <div
              className="absolute left-[12%] top-[9%] h-44 w-44 rounded-full blur-3xl"
              style={{ backgroundColor: `${content.accent}66` }}
            />
            <div className={`absolute right-[4%] top-[8%] h-72 w-72 rounded-full blur-3xl ${isDarkHero ? 'bg-indigo-400/20' : 'bg-white/80'}`} />
            <PhoneShot
              src={heroShot.src}
              alt={heroShot.alt}
              variant={heroShot.variant}
              priority
              className="absolute left-1/2 top-0 z-20 h-[560px] w-[258px] -translate-x-1/2 rotate-2 xl:h-[600px] xl:w-[276px]"
            />
            <PhoneShot
              src={supportingShot.src}
              alt={supportingShot.alt}
              variant={supportingShot.variant}
              className="absolute left-0 top-24 z-10 hidden h-[420px] w-[193px] -rotate-6 opacity-90 xl:block"
            />
            <PhoneShot
              src={tertiaryShot.src}
              alt={tertiaryShot.alt}
              variant={tertiaryShot.variant}
              className="absolute right-0 top-32 z-10 hidden h-[420px] w-[193px] rotate-6 opacity-90 xl:block"
            />
          </div>
        </div>
      </section>

      <section id="screens" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                Product view
              </p>
              <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                {content.featureTitle}
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              {content.featureIntro}
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(280px,420px)_minmax(0,1fr)] lg:items-center">
            <PhoneShot
              src={featureShot.src}
              alt={featureShot.alt}
              variant={featureShot.variant}
              className="mx-auto h-[640px] w-[294px] lg:h-[700px] lg:w-[322px]"
            />

            <div className="grid gap-5">
              {content.features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="border-t border-slate-950/10 py-6"
                >
                  <p className="font-mono text-sm text-slate-400">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
                    {feature.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
            {content.screenshots.map((screenshot) => (
              <figure key={screenshot.src} className="min-w-0">
                <PhoneShot
                  src={screenshot.src}
                  alt={screenshot.alt}
                  variant={screenshot.variant}
                  className="mx-auto aspect-[1206/2622] h-auto w-full max-w-[240px]"
                />
                <figcaption className="mt-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                  {screenshot.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-24 sm:py-32 ${workflowSectionClass}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
            <div>
              <div
                className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: content.accent }}
              >
                <Sparkles size={22} className="text-slate-950" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {content.workflowTitle}
              </h2>
            </div>
            <div className="grid gap-5">
              {content.workflow.map((step, index) => (
                <div
                  key={step.title}
                  className={`grid gap-5 border-t py-6 sm:grid-cols-[4rem_1fr] ${workflowDividerClass}`}
                >
                  <p className={`font-mono text-sm ${workflowIndexClass}`}>
                    0{index + 1}
                  </p>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">
                      {step.title}
                    </h3>
                    <p className={`mt-3 max-w-2xl text-base leading-7 ${workflowBodyClass}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`mt-20 grid gap-8 rounded-[2rem] border p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:p-10 ${privacyCardClass}`}>
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{ backgroundColor: `${content.accent}22` }}
            >
              <Lock size={24} style={{ color: content.accent }} />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {content.privacyTitle}
              </h2>
              <p className={`mt-2 max-w-3xl text-base leading-7 ${workflowBodyClass}`}>
                {content.privacyDescription}
              </p>
            </div>
            <a
              href={privacyUrl}
              className={`inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-bold transition ${privacyButtonClass}`}
            >
              Privacy
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
              FAQ
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Common questions before you install.
            </h2>
          </div>
          <div className="divide-y divide-slate-950/10">
            {content.faq.map((item) => (
              <div key={item.question} className="py-7">
                <h3 className="text-xl font-bold tracking-tight text-slate-950">
                  {item.question}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 border-t border-slate-950/10 pt-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(22rem,0.5fr)] lg:items-center">
            <div>
              <p className="text-2xl font-bold tracking-tight text-slate-950">
                Ready to try {app.title}?
              </p>
              <p className="mt-2 text-sm text-slate-600">
                {content.finalCtaDescription}
              </p>
              <div className="mt-6">
                {appStoreLink ? (
                  <a
                    href={appStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800"
                  >
                    {content.primaryCta}
                    <ExternalLink size={16} />
                  </a>
                ) : (
                  <span className="inline-flex items-center justify-center rounded-full bg-slate-950/10 px-6 py-3.5 text-sm font-bold text-slate-600">
                    {content.primaryCta}
                  </span>
                )}
              </div>
            </div>
            <DownloadQrCard
              app={app}
              appStoreLink={appStoreLink}
              qrCodeSvg={downloadQrSvg}
            />
          </div>
        </div>

        <footer className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-5 border-t border-slate-950/10 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} George Valandis. {app.title} is an app by George Valandis.
            </p>
            <nav aria-label={`${app.title} legal links`} className="flex flex-wrap gap-x-5 gap-y-2">
              <a href={privacyUrl} className="font-semibold text-slate-600 transition hover:text-slate-950">
                Privacy Policy
              </a>
              <a href={termsUrl} className="font-semibold text-slate-600 transition hover:text-slate-950">
                Terms
              </a>
              {supportPage ? (
                <a href={`/apps/${app.slug}/support/`} className="font-semibold text-slate-600 transition hover:text-slate-950">
                  Support
                </a>
              ) : null}
              <a href={imprintUrl} className="font-semibold text-slate-600 transition hover:text-slate-950">
                Imprint
              </a>
            </nav>
          </div>
        </footer>
      </section>
    </main>
  );
}
