"use client";

import GlanceAwayHorizon from "@/components/GlanceAwayHorizon";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BREAK_SECONDS = 20;
const ACCENT = "#00cfc0";
const PRODUCT_PATH = "/apps/glanceaway/";

type V2HeroProps = {
  appTitle: string;
  appLogo: string;
  headline: string;
  intro: string;
  fact: string;
  storeHref: string;
};

/**
 * Hero that proves the product in place: "Try a break" runs a real 20-second break
 * on the page, and the horizon lights up while it runs.
 */
export default function V2Hero({
  appTitle,
  appLogo,
  headline,
  intro,
  fact,
  storeHref,
}: V2HeroProps) {
  const [running, setRunning] = useState(false);
  // Kept after the break ends, so the number fades out instead of vanishing.
  const [secondsLeft, setSecondsLeft] = useState(BREAK_SECONDS);
  const [breaksTaken, setBreaksTaken] = useState(0);
  const endsAtRef = useRef(0);
  const tryButtonRef = useRef<HTMLButtonElement>(null);
  const endButtonRef = useRef<HTMLButtonElement>(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      const left = Math.ceil((endsAtRef.current - Date.now()) / 1000);
      if (left <= 0) {
        setSecondsLeft(0);
        setRunning(false);
        setBreaksTaken((count) => count + 1);
      } else {
        setSecondsLeft(left);
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, [running]);

  // Move focus into the break and back to the trigger, never on first load.
  useEffect(() => {
    if (running) {
      hasRunRef.current = true;
      endButtonRef.current?.focus({ preventScroll: true });
    } else if (hasRunRef.current) {
      tryButtonRef.current?.focus({ preventScroll: true });
    }
  }, [running]);

  const startBreak = () => {
    endsAtRef.current = Date.now() + BREAK_SECONDS * 1000;
    setSecondsLeft(BREAK_SECONDS);
    setRunning(true);
  };

  return (
    <section className="ga2-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#06131c] text-white">
      <GlanceAwayHorizon bright={running} className="-z-10" />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#06131c]/85 via-[#06131c]/40 to-transparent transition-opacity duration-[1600ms] ${
          running ? "opacity-0" : "opacity-100"
        }`}
      />

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        {/* Plain link on purpose: a full page load lets campaign.js tag the store links. */}
        <a
          href={PRODUCT_PATH}
          className="inline-flex cursor-pointer items-center gap-3 transition active:opacity-60"
        >
          <Image
            src={appLogo}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-[0.6rem]"
          />
          <span className="text-base font-semibold tracking-tight">
            {appTitle}
          </span>
        </a>
        <a
          href={storeHref}
          target="_blank"
          suppressHydrationWarning
          rel="nofollow noopener noreferrer"
          className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-white/10 px-5 text-sm font-semibold backdrop-blur transition hover:bg-white/20 active:scale-[0.97]"
        >
          Download
          <ExternalLink size={15} />
        </a>
      </header>

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-6 pb-16 pt-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16 lg:px-8 lg:pb-24">
        <div
          inert={running}
          className={`transition-[opacity,filter] duration-700 ease-out ${
            running ? "pointer-events-none opacity-0 blur-sm" : "opacity-100"
          }`}
        >
          <h1 className="ga-rise max-w-[13ch] text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.5rem]">
            {headline}
          </h1>
          <p className="ga-rise mt-7 max-w-[34rem] text-lg leading-8 text-white/80 [animation-delay:120ms]">
            {intro}
          </p>
          <p
            className="ga-rise mt-4 text-sm font-semibold [animation-delay:200ms]"
            style={{ color: ACCENT }}
          >
            {fact}
          </p>
          <div className="ga-rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 [animation-delay:280ms]">
            <a
              href={storeHref}
              target="_blank"
              suppressHydrationWarning
              rel="nofollow noopener noreferrer"
              className="inline-flex h-14 cursor-pointer items-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-slate-950 shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition hover:-translate-y-px hover:bg-white/90 active:translate-y-0 active:scale-[0.97]"
            >
              Download on the App Store
              <ExternalLink size={16} />
            </a>
            <button
              ref={tryButtonRef}
              type="button"
              onClick={startBreak}
              className="group inline-flex h-14 cursor-pointer items-center gap-3 rounded-full px-2 text-sm font-semibold text-white/90 transition hover:text-white active:scale-[0.97]"
            >
              <span
                aria-hidden="true"
                className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-white/30 transition group-hover:ring-white/60"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                />
              </span>
              {breaksTaken > 0 ? "Take another break" : "Try a 20-second break"}
            </button>
          </div>
          {/* Reserved space (two lines on phones), so the layout does not move when it appears. */}
          <p
            aria-live="polite"
            className="mt-4 h-10 text-sm leading-5 text-white/70 sm:h-5"
          >
            {breaksTaken > 0
              ? "That was one break. GlanceAway reminds you every 20 minutes."
              : ""}
          </p>
        </div>

        <div
          inert={running}
          className={`relative pb-10 transition-[opacity,filter,scale] duration-700 ease-out sm:pb-14 ${
            running
              ? "pointer-events-none scale-[0.97] opacity-0 blur-sm"
              : "opacity-100"
          }`}
        >
          {/* Entrance animation on an inner layer: its fill would override the break fade. */}
          <div className="ga-rise relative [animation-delay:160ms]">
            {/* The Mac break floats on the sky: the black screen fades out at the edges. */}
            <div className="[mask-image:radial-gradient(ellipse_50%_46%_at_50%_50%,#000_50%,transparent_100%)]">
              <Image
                src="/apps/glanceaway/mac/overlay.webp"
                alt="GlanceAway full-screen break on Mac asking you to look at the farthest thing you can see."
                width={1600}
                height={1002}
                priority
                sizes="(min-width: 1024px) 680px, calc(100vw - 3rem)"
                className="block h-auto w-full"
              />
            </div>
            <div className="absolute -bottom-11 left-[5%] w-[25%] max-w-[10.5rem] rounded-[1.4rem] bg-[#0b1114] p-1 shadow-[0_36px_80px_rgba(2,12,18,0.45)] sm:-bottom-15 sm:rounded-[2rem] sm:p-[0.35rem]">
              <Image
                src="/apps/glanceaway/screens/ios-home.webp"
                alt="GlanceAway on iPhone with the next 20-minute eye break ready to start."
                width={720}
                height={1564}
                priority
                sizes="10.5rem"
                className="block h-auto w-full rounded-[1.15rem] sm:rounded-[1.7rem]"
              />
            </div>
          </div>
        </div>

        {/* The live break: same place as the hero content, so nothing jumps. */}
        <div
          inert={!running}
          className={`absolute inset-0 grid place-items-center px-6 text-center transition-opacity duration-700 ${
            running ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div>
            <p
              aria-hidden="true"
              className="text-[7rem] font-semibold leading-none tracking-[-0.05em] tabular-nums sm:text-[10rem]"
            >
              {secondsLeft}
            </p>
            <p className="mt-6 text-balance text-xl font-semibold tracking-tight sm:text-2xl">
              Look at the farthest thing you can see.
            </p>
            <p className="mt-2 text-balance text-base text-white/75">
              Out of a window, down a hallway. Blink a few times.
            </p>
            <button
              ref={endButtonRef}
              type="button"
              onClick={() => setRunning(false)}
              className="mt-10 inline-flex h-11 cursor-pointer items-center rounded-full bg-white/10 px-5 text-sm font-semibold backdrop-blur transition hover:bg-white/20 active:scale-[0.97]"
            >
              End break
            </button>
          </div>
        </div>
        <p aria-live="polite" className="sr-only">
          {running ? "20-second break started." : ""}
        </p>
      </div>
    </section>
  );
}
