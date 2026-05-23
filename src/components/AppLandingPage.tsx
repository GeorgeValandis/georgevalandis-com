import { AppEntry } from '@/content/apps';
import { AppLandingPageContent } from '@/content/appLandingPages';
import { absoluteUrl } from '@/lib/seo';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  Lock,
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
}: {
  alt: string;
  className?: string;
  priority?: boolean;
  src: string;
}) {
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
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: content.appStoreName,
    alternateName: app.title,
    applicationCategory: content.category,
    operatingSystem: app.platforms.join(', '),
    description: content.intro,
    url: absoluteUrl(`/apps/${app.slug}/`),
    downloadUrl: app.appStoreLink,
    image: absoluteUrl(app.logo),
    screenshot: content.screenshots.map((screenshot) => absoluteUrl(screenshot.src)),
    author: {
      '@type': 'Person',
      name: 'George Valandis',
      url: absoluteUrl('/'),
    },
    offers: {
      '@type': 'Offer',
      price: content.price,
      priceCurrency: content.priceCurrency,
      url: app.appStoreLink,
    },
  };
}

export default function AppLandingPage({ app, content }: AppLandingPageProps) {
  const [heroShot, secondaryShot, progressShot, settingsShot] = content.screenshots;
  const featureShot = settingsShot ?? progressShot ?? secondaryShot ?? heroShot;
  const supportingShot = secondaryShot ?? heroShot;
  const tertiaryShot = progressShot ?? supportingShot;
  const privacyUrl = absoluteUrl(app.legal.privacyPath);
  const termsUrl = absoluteUrl(app.legal.termsPath);
  const imprintUrl = absoluteUrl('/imprint/');

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd(app, content)) }}
      />

      <section
        className={`relative overflow-hidden bg-gradient-to-br ${content.background}`}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-slate-950/10" />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <Link
            href="/#apps"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950"
          >
            <ArrowLeft size={16} />
            Apps
          </Link>
          <a
            href={app.appStoreLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            App Store
            <ExternalLink size={15} />
          </a>
        </div>

        <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 pb-16 pt-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1fr)] lg:px-8 lg:pb-12 lg:pt-8">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-8 flex items-center gap-4">
              <img
                src={app.logo}
                alt={`${app.title} app icon`}
                className="h-16 w-16 rounded-2xl shadow-xl shadow-slate-950/10"
              />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {content.eyebrow}
                </p>
                <p className="mt-1 text-lg font-bold text-slate-950">{app.title}</p>
              </div>
            </div>

            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
              {content.headline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-700 sm:mt-6 sm:text-lg sm:leading-8">
              {content.intro}
            </p>

            <div className="mt-8 lg:hidden">
              <PhoneShot
                src={heroShot.src}
                alt={heroShot.alt}
                priority
                className="mx-auto h-[470px] w-[216px] rotate-2"
              />
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={app.appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                {content.primaryCta}
                <ExternalLink size={16} />
              </a>
              <a
                href="#screens"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-950/15 bg-white/60 px-6 py-3.5 text-sm font-bold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                {content.secondaryCta}
                <ArrowRight size={16} />
              </a>
            </div>

            <p className="mt-5 max-w-lg text-sm leading-6 text-slate-600">
              {content.availability}
            </p>

            <div className="mt-9 grid max-w-xl gap-3 sm:grid-cols-2">
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

          <div className="relative hidden min-h-[600px] lg:block">
            <div
              className="absolute left-[12%] top-[9%] h-44 w-44 rounded-full blur-3xl"
              style={{ backgroundColor: `${content.accent}66` }}
            />
            <div className="absolute right-[4%] top-[8%] h-72 w-72 rounded-full bg-white/80 blur-3xl" />
            <PhoneShot
              src={heroShot.src}
              alt={heroShot.alt}
              priority
              className="absolute left-1/2 top-0 z-20 h-[600px] w-[276px] -translate-x-1/2 rotate-2"
            />
            <PhoneShot
              src={supportingShot.src}
              alt={supportingShot.alt}
              className="absolute left-0 top-24 z-10 hidden h-[420px] w-[193px] -rotate-6 opacity-90 sm:block lg:left-3"
            />
            <PhoneShot
              src={tertiaryShot.src}
              alt={tertiaryShot.alt}
              className="absolute right-0 top-32 z-10 hidden h-[420px] w-[193px] rotate-6 opacity-90 md:block"
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

          <div className="mt-20 grid gap-5 md:grid-cols-4">
            {content.screenshots.map((screenshot) => (
              <figure key={screenshot.src} className="min-w-0">
                <PhoneShot
                  src={screenshot.src}
                  alt={screenshot.alt}
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

      <section className="bg-slate-950 py-24 text-white sm:py-32">
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
                  className="grid gap-5 border-t border-white/10 py-6 sm:grid-cols-[4rem_1fr]"
                >
                  <p className="font-mono text-sm text-white/40">
                    0{index + 1}
                  </p>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-white/65">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:p-10">
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
              <p className="mt-2 max-w-3xl text-base leading-7 text-white/65">
                {content.privacyDescription}
              </p>
            </div>
            <a
              href={privacyUrl}
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
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
          <div className="flex flex-col items-start justify-between gap-6 border-t border-slate-950/10 pt-10 sm:flex-row sm:items-center">
            <div>
              <p className="text-2xl font-bold tracking-tight text-slate-950">
                Ready to try {app.title}?
              </p>
              <p className="mt-2 text-sm text-slate-600">
                {content.finalCtaDescription}
              </p>
            </div>
            <a
              href={app.appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              {content.primaryCta}
              <ExternalLink size={16} />
            </a>
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
