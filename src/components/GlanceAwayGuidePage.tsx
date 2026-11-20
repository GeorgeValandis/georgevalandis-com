import GlanceAwayGuideHero from '@/components/GlanceAwayGuideHero';
import GlanceAwayHorizon from '@/components/GlanceAwayHorizon';
import { AppEntry } from '@/content/apps';
import { glanceAwayMacPath } from '@/content/glanceawayMacPage';
import { GlanceAwayGuide, glanceAwayGuidePath, glanceAwayGuides } from '@/content/glanceawayGuides';
import { absoluteUrl } from '@/lib/seo';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Fragment, ReactNode } from 'react';

const ACCENT = '#00cfc0';
const DOWNLOAD_PATH = '/apps/glanceaway/download/';
const inlineLinkClass =
  'font-semibold text-slate-950 underline underline-offset-4 transition hover:text-slate-600 active:opacity-60';

type StorePosition = 'nav' | 'hero' | 'timer' | 'mid' | 'compare' | 'cta';

/** Static download link; the PHP redirect counts the click per page and position. */
function storeHref(guide: GlanceAwayGuide, position: StorePosition): string {
  return `${DOWNLOAD_PATH}?campaign=${guide.campaign}&pos=${position}`;
}

const INLINE_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Renders [text](url) links inside guide copy; internal paths stay in the same tab. */
function renderInline(text: string, className = inlineLinkClass): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE_LINK)) {
    const [whole, label, url] = match;
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    const external = /^https?:\/\//.test(url);
    parts.push(
      <a
        key={`${index}-${url}`}
        href={url}
        className={className}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {label}
      </a>
    );
    last = index + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 ? parts[0] : <Fragment>{parts}</Fragment>;
}

const NUMBER_RUN = /(\d+(?:-\d+)+)/;

/** Keeps runs like "20-20-20" on one line in headings. */
export function keepTogether(text: string): ReactNode {
  const parts = text.split(NUMBER_RUN);
  if (parts.length === 1) return text;
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    )
  );
}

function plainText(text: string): string {
  return text.replace(INLINE_LINK, '$1');
}
const linkClass = 'font-semibold text-slate-600 transition hover:text-slate-950 active:opacity-60';
const darkInlineLinkClass =
  'font-semibold text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white active:opacity-60';

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
  const howTo = guide.sections.find((section) => section.howTo);

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
          acceptedAnswer: { '@type': 'Answer', text: plainText(item.answer) },
        })),
      },
      ...(howTo?.steps
        ? [
            {
              '@type': 'HowTo',
              '@id': `${pageUrl}#howto`,
              name: howTo.heading,
              step: howTo.steps.map((step, index) => ({
                '@type': 'HowToStep',
                position: index + 1,
                name: step.title,
                text: plainText(step.text),
              })),
            },
          ]
        : []),
    ],
  };
}

const iphoneShot = {
  src: '/apps/glanceaway/screens/ios-home.webp',
  alt: 'GlanceAway on iPhone with the next 20-minute eye break ready to start.',
  width: 720,
  height: 1564,
};

const RULE = [
  { value: '20', unit: 'min', text: 'Work in blocks of twenty minutes.' },
  { value: '20', unit: 'ft', text: 'Look at something about six meters away.' },
  { value: '20', unit: 's', text: 'Hold it for twenty seconds, then blink.' },
];

export function StoreButton({ href, label, dark = false }: { href: string; label: string; dark?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={`inline-flex h-14 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full px-7 text-sm font-bold shadow-lg transition active:scale-[0.97] ${
        dark
          ? 'bg-white text-slate-950 shadow-black/25 hover:bg-white/90'
          : 'bg-slate-950 text-white shadow-slate-950/15 hover:bg-slate-800'
      }`}
    >
      {label}
      <ExternalLink size={17} />
    </a>
  );
}

export function PhoneFrame({ className = '', sizes = '12rem' }: { className?: string; sizes?: string }) {
  return (
    <div className={`rounded-[1.5rem] bg-[#0b1114] p-1 shadow-[0_36px_80px_rgba(2,12,18,0.35)] sm:rounded-[2.25rem] sm:p-[0.4rem] ${className}`}>
      <Image
        src={iphoneShot.src}
        alt={iphoneShot.alt}
        width={iphoneShot.width}
        height={iphoneShot.height}
        loading="lazy"
        sizes={sizes}
        className="block h-auto w-full rounded-[1.25rem] sm:rounded-[1.85rem]"
      />
    </div>
  );
}

/** Two-column editorial row: sticky heading on the left, reading column on the right. */
export function EditorialRow({ heading, children, id }: { heading: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="ga-reveal grid gap-6 py-14 first:pt-0 last:pb-0 lg:grid-cols-[minmax(0,19rem)_minmax(0,40rem)] lg:gap-20 lg:py-20">
      <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-slate-950 sm:text-4xl lg:sticky lg:top-12 lg:self-start">
        {keepTogether(heading)}
      </h2>
      <div>{children}</div>
    </section>
  );
}

function GuideSectionBlock({ section }: { section: GlanceAwayGuide['sections'][number] }) {
  return (
    <EditorialRow heading={section.heading}>
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="mb-5 text-lg leading-8 text-slate-700 last:mb-0">
          {renderInline(paragraph)}
        </p>
      ))}
      {section.bullets ? (
        <ul className="mt-6 grid gap-4 first:mt-0">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="grid grid-cols-[1.25rem_1fr] text-lg leading-8 text-slate-700">
              <span aria-hidden="true" className="mt-[0.8rem] h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
              <span>{renderInline(bullet)}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {section.steps ? (
        <ol className="mt-8 grid gap-10 first:mt-0">
          {section.steps.map((step, index) => (
            <li key={step.title} className="grid grid-cols-[3.75rem_1fr] gap-4 sm:grid-cols-[4.5rem_1fr]">
              <span
                aria-hidden="true"
                className="text-4xl font-semibold leading-none tracking-[-0.04em] tabular-nums sm:text-5xl"
                style={{ color: ACCENT }}
              >
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-xl font-semibold leading-7 tracking-tight text-slate-950">{step.title}</h3>
                <p className="mt-2 text-lg leading-8 text-slate-700">{renderInline(step.text)}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : null}
    </EditorialRow>
  );
}

export function RuleBand() {
  return (
    <section aria-label="The 20-20-20 rule at a glance" className="bg-[#071a20] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-5 px-6 pb-20 pt-6 sm:gap-8 sm:pb-24 lg:px-8 lg:pb-32">
        {RULE.map((item) => (
          <div key={item.unit} className="ga-reveal">
            <p className="flex items-baseline gap-x-1 sm:gap-x-3">
              <span className="bg-gradient-to-b from-white to-white/30 bg-clip-text text-[3rem] font-semibold leading-[0.9] tracking-[-0.06em] text-transparent sm:text-[7rem] lg:text-[10rem]">
                {item.value}
              </span>
              <span className="text-base font-semibold tracking-tight sm:text-2xl lg:text-3xl" style={{ color: ACCENT }}>
                {item.unit}
              </span>
            </p>
            <p className="mt-4 max-w-[16rem] text-sm leading-6 text-white/60 sm:mt-6 sm:text-base sm:leading-7">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MidArticleCta({ guide }: { guide: GlanceAwayGuide }) {
  if (!guide.midCta) return null;
  return (
    <div className="ga-reveal grid py-14 lg:grid-cols-[minmax(0,19rem)_minmax(0,40rem)] lg:gap-20 lg:py-20">
      <figure className="grid grid-cols-[7.5rem_1fr] items-center gap-7 sm:grid-cols-[10rem_1fr] sm:gap-10 lg:col-start-2">
        <PhoneFrame sizes="10rem" />
        <figcaption>
          <p className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-slate-950">{guide.midCta.title}</p>
          <p className="mt-3 text-base leading-7 text-slate-600">{guide.midCta.text}</p>
          <a
            href={storeHref(guide, 'mid')}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="mt-5 inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-slate-950 underline underline-offset-4 transition hover:text-slate-600 active:scale-[0.97]"
          >
            Get GlanceAway on the App Store
            <ExternalLink size={14} />
          </a>
        </figcaption>
      </figure>
    </div>
  );
}

function Comparison({ guide }: { guide: GlanceAwayGuide }) {
  if (!guide.comparison) return null;
  return (
    <section className="ga-reveal py-14 lg:py-20">
      <div className="lg:grid lg:grid-cols-[minmax(0,19rem)_minmax(0,40rem)] lg:gap-20">
        <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-slate-950 sm:text-4xl">
          {guide.comparisonTitle ? keepTogether(guide.comparisonTitle) : null}
        </h2>
        {guide.comparisonIntro ? (
          <p className="mt-4 text-base leading-7 text-slate-500 lg:mt-2">{guide.comparisonIntro}</p>
        ) : null}
      </div>
      <div className="-mx-4 mt-10 grid gap-1 sm:-mx-6">
        {guide.comparison.map((row) => (
          <div
            key={row.name}
            className={`grid gap-x-10 gap-y-2 rounded-3xl px-4 py-6 transition-colors duration-200 sm:px-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,11rem)] lg:items-baseline ${
              row.ours ? '' : 'hover:bg-slate-50'
            }`}
            style={row.ours ? { backgroundColor: `${ACCENT}1a` } : undefined}
          >
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-slate-950">{row.name}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {row.platforms} · {row.price}
              </p>
            </div>
            <div>
              <p className="text-base font-semibold text-slate-800">{row.bestFor}</p>
              <p className="mt-1 text-base leading-7 text-slate-600">{renderInline(row.note)}</p>
            </div>
            <div className="lg:text-right">
              {row.ours ? (
                <a
                  href={storeHref(guide, 'compare')}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-slate-950 underline underline-offset-4 transition hover:text-slate-600 active:scale-[0.97]"
                >
                  App Store
                  <ExternalLink size={14} />
                </a>
              ) : row.url ? (
                <a
                  href={row.url}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-500 underline underline-offset-4 transition hover:text-slate-950 active:scale-[0.97]"
                >
                  {row.urlLabel ?? 'Official page'}
                  <ExternalLink size={14} />
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Dark horizon closing section with the Mac overlay and the iPhone in front. */
export function GlanceAwayClosingCta({
  app,
  title,
  text,
  href,
}: {
  app: AppEntry;
  title: string;
  text: string;
  href: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#06131c] text-white">
      <GlanceAwayHorizon bright className="-z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#06131c]/90 via-[#06131c]/70 to-[#06131c]/10"
      />
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 sm:py-32 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:px-8 lg:py-40">
        <div className="ga-reveal">
          <div className="flex items-center gap-3">
            <Image src={app.logo} alt="" width={44} height={44} className="h-11 w-11 rounded-xl" />
            <p className="text-lg font-semibold tracking-tight">{app.title}</p>
          </div>
          <h2 className="mt-8 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">{keepTogether(title)}</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/85">{text}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <StoreButton href={href} label="View in the App Store" dark />
            <a
              href={glanceAwayMacPath}
              className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-white/85 transition hover:text-white active:opacity-60"
            >
              GlanceAway for Mac
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
        <div className="ga-reveal relative pb-10 sm:pb-16">
          <Image
            src={ctaShot.src}
            alt={ctaShot.alt}
            width={ctaShot.width}
            height={ctaShot.height}
            loading="lazy"
            sizes="(min-width: 1024px) 700px, calc(100vw - 3rem)"
            className="block h-auto w-full rounded-2xl shadow-[0_50px_120px_rgba(0,0,0,0.5)]"
          />
          <PhoneFrame sizes="10rem" className="absolute -bottom-2 left-[6%] w-[24%] max-w-[10rem] sm:bottom-0" />
        </div>
      </div>
    </section>
  );
}

/** Legal footer shared by the GlanceAway landing page and guides. */
export function GlanceAwayFooter({ app }: { app: AppEntry }) {
  return (
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
  );
}

export default function GlanceAwayGuidePage({ app, guide }: { app: AppEntry; guide: GlanceAwayGuide }) {
  const related = glanceAwayGuides.filter((item) => item.slug !== guide.slug);
  const midIndex = guide.midCta?.afterSection;

  return (
    <main lang="en" className="min-h-screen bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd(app, guide)) }}
      />

      <GlanceAwayGuideHero
        accent={ACCENT}
        appTitle={app.title}
        appLogo={app.logo}
        appHref={`/apps/${app.slug}/`}
        eyebrow={guide.eyebrow}
        headline={keepTogether(guide.headline)}
        intro={renderInline(guide.intro, darkInlineLinkClass)}
        byline={`By George Valandis · Updated ${formatDate(guide.updatedAt)}`}
        hasTimer={guide.hasTimer}
        navHref={storeHref(guide, 'nav')}
        heroHref={storeHref(guide, 'hero')}
        timerHref={storeHref(guide, 'timer')}
        phone={iphoneShot}
      />

      <RuleBand />

      <article className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-8 lg:py-32">
        {guide.sections.map((section, index) => (
          <Fragment key={section.heading}>
            <GuideSectionBlock section={section} />
            {index === midIndex ? <MidArticleCta guide={guide} /> : null}
          </Fragment>
        ))}
        <Comparison guide={guide} />
      </article>

      <GlanceAwayClosingCta app={app} title={guide.cta.title} text={guide.cta.text} href={storeHref(guide, 'cta')} />

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-8 lg:py-32">
        <EditorialRow heading="Frequently asked questions">
          <div className="grid gap-10">
            {guide.faq.map((item) => (
              <div key={item.question}>
                <h3 className="text-xl font-semibold tracking-tight text-slate-950">{keepTogether(item.question)}</h3>
                <p className="mt-3 text-lg leading-8 text-slate-700">{renderInline(item.answer)}</p>
              </div>
            ))}
          </div>
        </EditorialRow>

        <div className="ga-reveal grid gap-12 pt-14 lg:grid-cols-[minmax(0,19rem)_minmax(0,40rem)] lg:gap-20 lg:pt-20">
          <nav aria-label="More GlanceAway guides" className="lg:col-start-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Keep reading</h2>
            <ul className="mt-5 grid gap-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <a
                    href={glanceAwayGuidePath(item.slug)}
                    className="group inline-flex cursor-pointer items-center gap-2 text-lg font-semibold text-slate-950 transition hover:text-slate-600 active:opacity-60"
                  >
                    {item.title}
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`/apps/${app.slug}/`}
                  className="group inline-flex cursor-pointer items-center gap-2 text-lg font-semibold text-slate-950 transition hover:text-slate-600 active:opacity-60"
                >
                  GlanceAway: eye break timer for iPhone and Mac
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </li>
            </ul>
          </nav>
          <div className="lg:col-start-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Sources</h2>
            <ul className="mt-5 grid gap-2">
              {guide.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-base text-slate-600 underline underline-offset-4 transition hover:text-slate-950 active:opacity-60"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <GlanceAwayFooter app={app} />
    </main>
  );
}
