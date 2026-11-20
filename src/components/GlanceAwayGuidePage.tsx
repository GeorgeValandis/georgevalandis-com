import EyeBreakTimer from '@/components/EyeBreakTimer';
import { AppEntry } from '@/content/apps';
import { glanceAwayMacPath } from '@/content/glanceawayMacPage';
import { GlanceAwayGuide, glanceAwayGuidePath, glanceAwayGuides } from '@/content/glanceawayGuides';
import { absoluteUrl } from '@/lib/seo';
import { ArrowLeft, ArrowRight, Check, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const ACCENT = '#00cfc0';
const linkClass = 'font-semibold text-slate-600 transition hover:text-slate-950 active:opacity-60';

const ctaShot = {
  src: '/apps/glanceaway/mac/overlay.webp',
  alt: 'GlanceAway full-screen break on Mac asking you to look at the farthest thing you can see.',
  width: 1600,
  height: 1002,
};

function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function guideJsonLd(app: AppEntry, guide: GlanceAwayGuide) {
  const pageUrl = absoluteUrl(glanceAwayGuidePath(guide.slug));
  const author = { '@type': 'Person', name: 'George Valandis', url: absoluteUrl('/') };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: guide.title,
        description: guide.description,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        inLanguage: 'en',
        datePublished: guide.publishedAt,
        dateModified: guide.updatedAt,
        author,
        publisher: author,
        image: absoluteUrl(ctaShot.src),
        keywords: [guide.primaryKeyword, ...guide.secondaryKeywords],
        about: { '@type': 'SoftwareApplication', name: 'Eye Break Timer: GlanceAway', url: app.appStoreLink },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Apps', item: absoluteUrl('/apps/') },
          { '@type': 'ListItem', position: 3, name: app.title, item: absoluteUrl(`/apps/${app.slug}/`) },
          { '@type': 'ListItem', position: 4, name: guide.navLabel, item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: guide.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };
}

function StoreButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-14 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.97]"
    >
      {label}
      <ExternalLink size={17} />
    </a>
  );
}

export default function GlanceAwayGuidePage({ app, guide }: { app: AppEntry; guide: GlanceAwayGuide }) {
  const appStoreLink = app.appStoreLink;
  const related = glanceAwayGuides.filter((item) => item.slug !== guide.slug);

  return (
    <main lang="en" className="min-h-screen bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd(app, guide)) }}
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#ecfff7] via-[#f7fbf8] to-[#eef7ff]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <a
            href={`/apps/${app.slug}/`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950 active:opacity-60"
          >
            <ArrowLeft size={16} />
            {app.title}
          </a>
        </div>

        <div
          className={`relative mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-6 lg:px-8 lg:pb-24 ${
            guide.hasTimer ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-center lg:gap-16' : ''
          }`}
        >
          <div
            className="absolute left-[6%] top-[40%] h-56 w-56 rounded-full blur-3xl"
            style={{ backgroundColor: `${ACCENT}44` }}
          />

          <div className="relative z-10 max-w-3xl">
            <div className="mb-7 flex items-center gap-3">
              <Image
                src={app.logo}
                alt={`${app.title} app icon`}
                width={44}
                height={44}
                className="h-11 w-11 rounded-xl shadow-lg shadow-slate-950/10"
              />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{guide.eyebrow}</p>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl sm:leading-[1.05]">
              {guide.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">{guide.intro}</p>
            <p className="mt-6 text-sm text-slate-500">
              By George Valandis · Updated {formatDate(guide.updatedAt)}
            </p>
            {!guide.hasTimer && appStoreLink ? (
              <div className="mt-8">
                <StoreButton href={appStoreLink} label="Get GlanceAway" />
              </div>
            ) : null}
          </div>

          {guide.hasTimer ? (
            <div className="relative z-10">
              <EyeBreakTimer accent={ACCENT} appStoreLink={appStoreLink} />
            </div>
          ) : null}
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-20 sm:py-24 lg:px-8">
        {guide.sections.map((section) => (
          <section key={section.heading} className="mb-16 last:mb-0">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-lg leading-8 text-slate-700">
                {paragraph}
              </p>
            ))}
            {section.bullets ? (
              <ul className="mt-6 grid gap-4">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-lg leading-8 text-slate-700">
                    <span
                      className="mt-[0.45rem] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    >
                      <Check size={12} className="text-slate-950" />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
            {section.steps ? (
              <ol className="mt-8 grid gap-8">
                {section.steps.map((step, index) => (
                  <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4">
                    <span className="font-mono text-sm leading-8 text-slate-400">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold leading-8 tracking-tight text-slate-950">{step.title}</h3>
                      <p className="mt-2 text-lg leading-8 text-slate-700">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : null}
          </section>
        ))}

        {guide.comparison ? (
          <section className="mt-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{guide.comparisonTitle}</h2>
            {guide.comparisonIntro ? <p className="mt-3 text-sm text-slate-500">{guide.comparisonIntro}</p> : null}
            <div className="mt-8 grid gap-3">
              {guide.comparison.map((row) => (
                <div
                  key={row.name}
                  className="rounded-3xl p-6"
                  style={{ backgroundColor: row.ours ? `${ACCENT}1f` : 'rgb(248 250 252)' }}
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-xl font-bold tracking-tight text-slate-950">{row.name}</h3>
                    <p className="text-sm font-semibold text-slate-500">
                      {row.platforms} · {row.price}
                    </p>
                  </div>
                  <p className="mt-1 text-sm font-bold text-slate-700">Best for: {row.bestFor}</p>
                  <p className="mt-3 text-base leading-7 text-slate-600">{row.note}</p>
                  {row.ours && appStoreLink ? (
                    <a
                      href={appStoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-slate-950 underline underline-offset-4 active:scale-[0.97]"
                    >
                      View on the App Store
                      <ExternalLink size={14} />
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </article>

      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={app.logo}
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 rounded-xl shadow-lg shadow-slate-950/10"
              />
              <p className="text-lg font-bold text-slate-950">{app.title}</p>
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{guide.cta.title}</h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-700">{guide.cta.text}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              {appStoreLink ? <StoreButton href={appStoreLink} label="View in the App Store" /> : null}
              <a href={glanceAwayMacPath} className={`inline-flex items-center gap-2 text-sm ${linkClass}`}>
                GlanceAway for Mac
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
          <Image
            src={ctaShot.src}
            alt={ctaShot.alt}
            width={ctaShot.width}
            height={ctaShot.height}
            loading="lazy"
            sizes="(min-width: 1024px) 640px, calc(100vw - 3rem)"
            className="block h-auto w-full drop-shadow-[0_24px_48px_rgba(15,23,42,0.22)]"
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-24 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Frequently asked questions</h2>
        <div className="mt-8 grid gap-10">
          {guide.faq.map((item) => (
            <div key={item.question}>
              <h3 className="text-xl font-bold tracking-tight text-slate-950">{item.question}</h3>
              <p className="mt-3 text-lg leading-8 text-slate-700">{item.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Sources</h2>
          <ul className="mt-4 grid gap-2">
            {guide.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-slate-600 underline underline-offset-4 transition hover:text-slate-950 active:opacity-60"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="More GlanceAway guides" className="mt-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Keep reading</h2>
          <ul className="mt-4 grid gap-3">
            {related.map((item) => (
              <li key={item.slug}>
                <a
                  href={glanceAwayGuidePath(item.slug)}
                  className="inline-flex items-center gap-2 text-lg font-semibold text-slate-950 transition hover:text-slate-600 active:opacity-60"
                >
                  {item.title}
                  <ArrowRight size={16} />
                </a>
              </li>
            ))}
            <li>
              <a
                href={`/apps/${app.slug}/`}
                className="inline-flex items-center gap-2 text-lg font-semibold text-slate-950 transition hover:text-slate-600 active:opacity-60"
              >
                GlanceAway: eye break timer for iPhone
                <ArrowRight size={16} />
              </a>
            </li>
          </ul>
        </nav>
      </section>

      <footer className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
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
      <script src="/apps/glanceaway/campaign.js" data-campaign={guide.campaign} defer />
    </main>
  );
}
