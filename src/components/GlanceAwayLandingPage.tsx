import { appJsonLd } from '@/components/AppLandingPage';
import GlanceAwayGuideHero from '@/components/GlanceAwayGuideHero';
import {
  EditorialRow,
  GlanceAwayClosingCta,
  GlanceAwayFooter,
  RuleBand,
  keepTogether,
} from '@/components/GlanceAwayGuidePage';
import type { AppLandingPageContent } from '@/content/appLandingPages';
import { AppEntry } from '@/content/apps';
import { glanceAwayMacPath } from '@/content/glanceawayMacPage';
import { glanceAwayGuidePath, glanceAwayGuides } from '@/content/glanceawayGuides';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const ACCENT = '#00cfc0';

const heroPhone = {
  src: '/apps/glanceaway/screens/timer.webp',
  alt: 'GlanceAway on iPhone counting down to the next eye break, with a reminder to look 20 feet away for 20 seconds.',
  width: 720,
  height: 1565,
};

const SCREEN_WIDTH = 1206;
const SCREEN_HEIGHT = 2622;

function NumberedList({ items }: { items: readonly { title: string; description: string }[] }) {
  return (
    <ol className="mt-10 grid gap-10 first:mt-0">
      {items.map((item, index) => (
        <li key={item.title} className="grid grid-cols-[3.75rem_1fr] gap-4 sm:grid-cols-[4.5rem_1fr]">
          <span
            aria-hidden="true"
            className="text-4xl font-semibold leading-none tracking-[-0.04em] tabular-nums sm:text-5xl"
            style={{ color: ACCENT }}
          >
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <div>
            <h3 className="text-xl font-semibold leading-7 tracking-tight text-slate-950">{item.title}</h3>
            <p className="mt-2 text-lg leading-8 text-slate-700">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** GlanceAway product page in the same dusk-horizon design as the guides. */
export default function GlanceAwayLandingPage({ app, content }: { app: AppEntry; content: AppLandingPageContent }) {
  // campaign.js rewrites these App Store links to the counting download redirect.
  const storeLink = app.appStoreLink ?? '/apps/glanceaway/download/';

  return (
    <main lang="en" className="min-h-screen bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd(app, content)) }}
      />

      <GlanceAwayGuideHero
        accent={ACCENT}
        appTitle={app.title}
        appLogo={app.logo}
        appHref={`/apps/${app.slug}/`}
        eyebrow={content.eyebrow}
        headline={keepTogether(content.headline)}
        intro={content.intro}
        byline={content.availability}
        extra={
          content.heroLink ? (
            <a
              href={content.heroLink.href}
              className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-white/85 transition hover:text-white active:opacity-60"
            >
              {content.heroLink.label}
              <ArrowRight size={15} />
            </a>
          ) : null
        }
        navHref={storeLink}
        heroHref={storeLink}
        timerHref={storeLink}
        phone={heroPhone}
      />

      <RuleBand />

      <article className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-8 lg:py-32">
        <EditorialRow heading={content.featureTitle}>
          <p className="text-lg leading-8 text-slate-700">{content.featureIntro}</p>
          <NumberedList items={content.features} />
        </EditorialRow>

        <EditorialRow heading="See the app" id="screens">
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4">
            {content.screenshots.map((screenshot) => (
              <figure key={screenshot.src} className="min-w-0">
                <div className="rounded-[1.4rem] bg-[#0b1114] p-1 shadow-[0_28px_60px_rgba(2,12,18,0.28)] sm:rounded-[1.6rem]">
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={SCREEN_WIDTH}
                    height={SCREEN_HEIGHT}
                    loading="lazy"
                    sizes="(min-width: 1024px) 9rem, 45vw"
                    className="block h-auto w-full rounded-[1.2rem] sm:rounded-[1.35rem]"
                  />
                </div>
                <figcaption className="mt-3 text-center text-sm font-semibold text-slate-500">{screenshot.label}</figcaption>
              </figure>
            ))}
          </div>
        </EditorialRow>

        <EditorialRow heading={content.workflowTitle}>
          <NumberedList items={content.workflow} />
        </EditorialRow>

        <EditorialRow heading={content.privacyTitle}>
          <p className="text-lg leading-8 text-slate-700">{content.privacyDescription}</p>
          <a
            href={`/apps/${app.slug}/privacy/`}
            className="mt-5 inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-slate-950 underline underline-offset-4 transition hover:text-slate-600 active:opacity-60"
          >
            App Privacy
          </a>
        </EditorialRow>
      </article>

      <GlanceAwayClosingCta
        app={app}
        title={`Ready for ${app.title}?`}
        text={content.finalCtaDescription}
        href={storeLink}
      />

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-8 lg:py-32">
        <EditorialRow heading="Frequently asked questions">
          <div className="grid gap-10">
            {content.faq.map((item) => (
              <div key={item.question}>
                <h3 className="text-xl font-semibold tracking-tight text-slate-950">{keepTogether(item.question)}</h3>
                <p className="mt-3 text-lg leading-8 text-slate-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </EditorialRow>

        <div className="ga-reveal grid pt-14 lg:grid-cols-[minmax(0,19rem)_minmax(0,40rem)] lg:gap-20 lg:pt-20">
          <nav aria-label="GlanceAway guides" className="lg:col-start-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Guides</h2>
            <ul className="mt-5 grid gap-3">
              {glanceAwayGuides.map((guide) => (
                <li key={guide.slug}>
                  <a
                    href={glanceAwayGuidePath(guide.slug)}
                    className="group inline-flex cursor-pointer items-center gap-2 text-lg font-semibold text-slate-950 transition hover:text-slate-600 active:opacity-60"
                  >
                    {guide.title}
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={glanceAwayMacPath}
                  className="group inline-flex cursor-pointer items-center gap-2 text-lg font-semibold text-slate-950 transition hover:text-slate-600 active:opacity-60"
                >
                  GlanceAway: break reminder for Mac
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <GlanceAwayFooter app={app} />
      <script src="/apps/glanceaway/campaign.js" data-source-prefix="landing" defer />
    </main>
  );
}
