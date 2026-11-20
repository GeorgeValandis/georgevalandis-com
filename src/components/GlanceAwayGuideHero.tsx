'use client';

import type { EyeBreakPhase } from '@/components/EyeBreakTimer';
import GlanceAwayHorizon from '@/components/GlanceAwayHorizon';
import { ExternalLink } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ReactNode, useCallback, useRef, useState } from 'react';

// Separate chunk: pages without the timer do not ship its code.
const EyeBreakTimer = dynamic(() => import('@/components/EyeBreakTimer'));

type GlanceAwayGuideHeroProps = {
  accent: string;
  appTitle: string;
  appLogo: string;
  appHref: string;
  eyebrow: string;
  headline: ReactNode;
  intro: ReactNode;
  byline: string;
  hasTimer?: boolean;
  /** Optional line under the hero store button (no-timer variant only). */
  extra?: ReactNode;
  navHref: string;
  heroHref: string;
  timerHref: string;
  phone: { src: string; alt: string; width: number; height: number };
};

/** Full-bleed dusk horizon with the headline and either the live timer or the iPhone app. */
export default function GlanceAwayGuideHero({
  accent,
  appTitle,
  appLogo,
  appHref,
  eyebrow,
  headline,
  intro,
  byline,
  hasTimer = false,
  extra,
  navHref,
  heroHref,
  timerHref,
  phone,
}: GlanceAwayGuideHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<EyeBreakPhase>('idle');
  const handlePhase = useCallback((next: EyeBreakPhase) => setPhase(next), []);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-[#06131c] text-white">
      <GlanceAwayHorizon bright={phase === 'break'} scrollTarget={sectionRef} className="-z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-3/4 bg-gradient-to-b from-[#06131c]/80 via-[#06131c]/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-full bg-gradient-to-r from-[#06131c]/70 via-[#06131c]/30 to-transparent lg:w-3/5"
      />

      <div className="flex min-h-[100svh] flex-col">
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <a
            href={appHref}
            className="inline-flex cursor-pointer items-center gap-3 text-base font-semibold tracking-tight text-white transition hover:opacity-80 active:scale-[0.97]"
          >
            <Image src={appLogo} alt="" width={36} height={36} className="h-9 w-9 rounded-[0.65rem]" priority />
            {appTitle}
          </a>
          <a
            href={navHref}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 active:scale-[0.96]"
          >
            Get the app
            <ExternalLink size={14} />
          </a>
        </header>

        <div className="mx-auto grid w-full max-w-7xl flex-1 gap-y-10 px-6 pb-40 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:gap-x-20 lg:gap-y-8 lg:px-8 lg:pb-48 lg:pt-12">
          <div className="max-w-2xl lg:col-start-1 lg:row-start-1 lg:self-end">
            <p
              className="ga-rise text-sm font-semibold uppercase tracking-[0.22em]"
              style={{ color: accent }}
            >
              {eyebrow}
            </p>
            <h1
              className="ga-rise mt-5 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl"
              style={{ animationDelay: '80ms' }}
            >
              {headline}
            </h1>
          </div>

          <div
            className="ga-rise lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
            style={{ animationDelay: '240ms' }}
          >
            {hasTimer ? (
              <EyeBreakTimer accent={accent} storeHref={timerHref} onPhaseChange={handlePhase} />
            ) : (
              <div className="ga-drift mx-auto w-[15rem] sm:w-[17rem]">
                <div className="rounded-[2.9rem] bg-[#0b1114] p-[0.55rem] shadow-[0_50px_110px_rgba(0,0,0,0.55)]">
                  <Image
                    src={phone.src}
                    alt={phone.alt}
                    width={phone.width}
                    height={phone.height}
                    priority
                    sizes="17rem"
                    className="block h-auto w-full rounded-[2.4rem]"
                  />
                </div>
              </div>
            )}
          </div>

          <div
            className="ga-rise max-w-xl lg:col-start-1 lg:row-start-2 lg:self-start"
            style={{ animationDelay: '160ms' }}
          >
            <p className="text-lg leading-8 text-white/90 [text-shadow:0_1px_12px_rgba(6,19,28,0.6)] [&_a]:font-semibold [&_a]:text-white [&_a]:underline [&_a]:decoration-white/40 [&_a]:underline-offset-4">
              {intro}
            </p>
            <p className="mt-6 text-sm text-white/75 [text-shadow:0_1px_10px_rgba(6,19,28,0.6)]">{byline}</p>
            {!hasTimer ? (
              <a
                href={heroHref}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="mt-9 inline-flex h-14 cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-slate-950 shadow-lg shadow-black/25 transition hover:bg-white/90 active:scale-[0.97]"
              >
                Get GlanceAway
                <ExternalLink size={16} />
              </a>
            ) : null}
            {!hasTimer && extra ? <div className="mt-5">{extra}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
