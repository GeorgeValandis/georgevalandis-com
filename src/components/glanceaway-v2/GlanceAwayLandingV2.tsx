import { appJsonLd } from "@/components/AppLandingPage";
import GlanceAwayHorizon from "@/components/GlanceAwayHorizon";
import {
  GlanceAwayFooter,
  keepTogether,
} from "@/components/GlanceAwayGuidePage";
import V2FocusShift from "@/components/glanceaway-v2/V2FocusShift";
import V2Hero from "@/components/glanceaway-v2/V2Hero";
import type { AppLandingPageContent } from "@/content/appLandingPages";
import { AppEntry } from "@/content/apps";
import { glanceAwayMacPath } from "@/content/glanceawayMacPage";
import {
  glanceAwayGuidePath,
  glanceAwayGuides,
} from "@/content/glanceawayGuides";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

const SCREEN_WIDTH = 1206;
const SCREEN_HEIGHT = 2622;

const linkClass =
  "group inline-flex cursor-pointer items-center gap-2 font-semibold text-slate-950 underline decoration-slate-300 underline-offset-[6px] transition hover:decoration-slate-950 active:opacity-60";

function Section({
  heading,
  lead,
  children,
  id,
  tall = false,
}: {
  heading: string;
  lead?: string;
  children: ReactNode;
  id?: string;
  tall?: boolean;
}) {
  return (
    <section
      id={id}
      className={`mx-auto flex max-w-7xl flex-col justify-center px-6 py-24 sm:py-28 lg:px-8 ${tall ? "lg:min-h-[100svh]" : ""}`}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
        <h2 className="max-w-[16ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-slate-950 sm:text-5xl">
          {keepTogether(heading)}
        </h2>
        {lead ? (
          <p className="max-w-xl text-lg leading-8 text-slate-600">{lead}</p>
        ) : null}
      </div>
      <div className="mt-14 lg:mt-20">{children}</div>
    </section>
  );
}

function StoreLink({
  href,
  label = "Download on the App Store",
}: {
  href: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      suppressHydrationWarning
      rel="nofollow noopener noreferrer"
      className="inline-flex h-14 cursor-pointer items-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-slate-950 shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition hover:-translate-y-px hover:bg-white/90 active:translate-y-0 active:scale-[0.97]"
    >
      {label}
      <ExternalLink size={16} />
    </a>
  );
}

/** Second design of the GlanceAway product page, built along impeccable and taste-skill rules. */
export default function GlanceAwayLandingV2({
  app,
  content,
}: {
  app: AppEntry;
  content: AppLandingPageContent;
}) {
  const storeLink = app.appStoreLink ?? "/apps/glanceaway/download/";

  return (
    <main lang="en" className="ga2 min-h-screen bg-[#f6f4ef] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(appJsonLd(app, content)),
        }}
      />

      <V2Hero
        appTitle={app.title}
        appLogo={app.logo}
        headline={content.headline}
        intro="Every 20 minutes, GlanceAway asks you to look 20 feet away for 20 seconds. A calm full-screen break, then back to work."
        fact="Free with 3 breaks a day · iPhone and Mac · No account"
        storeHref={storeLink}
      />

      <V2FocusShift />

      <Section
        id="screens"
        tall
        heading="Timer, break, streak, settings."
        lead="A countdown to the next break, a full-screen pause, your streak and your rhythm. No feed, no sign-up."
      >
        <div className="grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4 lg:gap-8">
          {content.screenshots.map((screenshot) => (
            <div
              key={screenshot.src}
              className="rounded-[1.6rem] bg-[#0b1114] p-1 shadow-[0_30px_60px_rgba(2,12,18,0.22)] sm:rounded-[2rem] sm:p-[0.35rem]"
            >
              <div className="overflow-hidden rounded-[1.35rem] sm:rounded-[1.7rem]">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={SCREEN_WIDTH}
                  height={SCREEN_HEIGHT}
                  loading="lazy"
                  sizes="(min-width: 1280px) 17rem, (min-width: 640px) 22vw, 45vw"
                  className="block h-auto w-full transition-transform duration-500 ease-out hover:scale-[1.03]"
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 sm:py-28 lg:min-h-[100svh] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-8">
          <div>
            <h2 className="max-w-[14ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              On your Mac, from the menu bar.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
              Start, pause or check the next break from the menu bar. A heads-up
              comes 30 seconds before each break, and breaks wait while you are
              in a video call.
            </p>
            <a
              href={glanceAwayMacPath}
              className={`${linkClass} mt-8 text-base`}
            >
              GlanceAway for Mac
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-[0_40px_100px_rgba(2,12,18,0.25)]">
              <Image
                src="/apps/glanceaway/mac/overlay.webp"
                alt="GlanceAway full-screen break on Mac asking you to look at the farthest thing you can see."
                width={1600}
                height={1002}
                loading="lazy"
                sizes="(min-width: 1024px) 720px, calc(100vw - 3rem)"
                className="block h-auto w-full transition-transform duration-500 ease-out hover:scale-[1.02]"
              />
            </div>
            <div className="absolute -bottom-10 right-[4%] w-[34%] max-w-[15rem] overflow-hidden rounded-xl shadow-[0_30px_70px_rgba(2,12,18,0.3)]">
              <Image
                src="/apps/glanceaway/mac/menubar.webp"
                alt="GlanceAway menu bar panel on Mac with the running timer and today's breaks."
                width={1600}
                height={2080}
                loading="lazy"
                sizes="15rem"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <Section heading="How a break fits your day.">
        <ol className="grid gap-12 lg:grid-cols-3 lg:gap-10">
          {content.workflow.map((step, index) => (
            <li key={step.title}>
              <p
                className="text-sm font-bold tabular-nums"
                style={{ color: "#008f85" }}
              >
                Step {index + 1}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 max-w-sm text-lg leading-8 text-slate-600">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20 lg:px-8">
          <h2 className="max-w-[12ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            Free to start, yours to keep.
          </h2>
          <dl className="grid gap-10">
            <div>
              <dt className="text-2xl font-semibold tracking-tight">Free</dt>
              <dd className="mt-2 text-lg leading-8 text-slate-600">
                Three breaks a day.
              </dd>
            </div>
            <div>
              <dt className="text-2xl font-semibold tracking-tight">Premium</dt>
              <dd className="mt-2 text-lg leading-8 text-slate-600">
                Unlimited breaks for{" "}
                <span className="font-semibold text-slate-950">
                  $9.99 a year
                </span>{" "}
                or{" "}
                <span className="font-semibold text-slate-950">
                  $24.99 once
                </span>
                .
              </dd>
            </div>
            <div>
              <dt className="text-2xl font-semibold tracking-tight">Private</dt>
              <dd className="mt-2 text-lg leading-8 text-slate-600">
                No account. Settings, history and statistics stay on your
                device.{" "}
                <a href={`/apps/${app.slug}/privacy/`} className={linkClass}>
                  App Privacy
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20 lg:px-8">
          <h2 className="max-w-[12ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:sticky lg:top-16 lg:self-start">
            Questions before you install.
          </h2>
          <div className="grid gap-10">
            {content.faq.map((item) => (
              <div key={item.question}>
                <h3 className="text-xl font-semibold tracking-tight">
                  {keepTogether(item.question)}
                </h3>
                <p className="mt-3 text-lg leading-8 text-slate-600">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ga2-dark relative isolate overflow-hidden bg-[#06131c] text-white">
        <GlanceAwayHorizon bright className="-z-10" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#06131c] via-[#06131c]/60 to-transparent"
        />
        <div className="mx-auto flex min-h-[80svh] max-w-7xl flex-col items-center justify-center px-6 py-28 text-center lg:px-8">
          <Image
            src={app.logo}
            alt=""
            width={88}
            height={88}
            className="h-[5.5rem] w-[5.5rem] rounded-[1.4rem] shadow-2xl"
          />
          <h2 className="mt-10 max-w-[18ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
            {keepTogether("Your next eye break is 20 minutes away.")}
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-8 text-white/80">
            GlanceAway for iPhone and Mac. Free with 3 breaks a day.
          </p>
          <div className="mt-10">
            <StoreLink href={storeLink} />
          </div>
        </div>
      </section>

      <nav
        aria-label="GlanceAway guides"
        className="mx-auto max-w-7xl px-6 pt-16 lg:px-8"
      >
        <h2 className="text-sm font-semibold text-slate-500">Guides</h2>
        <ul className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
          {glanceAwayGuides.map((guide) => (
            <li key={guide.slug}>
              <a
                href={glanceAwayGuidePath(guide.slug)}
                className={`${linkClass} text-base`}
              >
                {guide.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <GlanceAwayFooter app={app} />
      <script
        src="/apps/glanceaway/campaign.js"
        data-source-prefix="landing"
        data-campaign="landing_v2"
        defer
      />
    </main>
  );
}
