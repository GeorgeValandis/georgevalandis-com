'use client';

import { apps } from '@/content/apps';
import { previewCopy } from '@/content/afterWorkPreviewCopy';
import { OPEN_COOKIE_SETTINGS_EVENT } from '@/components/CookieConsent';
import { ArrowUpRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Standalone landing page for profile links (Threads, Instagram, TikTok).
// Same visual language, consent logging and MailerLite form as the homepage newsletter section.

type NewsletterConsentState = 'idle' | 'recording' | 'recorded' | 'error';
type NewsletterSubmissionState = 'idle' | 'submitting' | 'success_pending';

const copy = previewCopy.en.afterWork;
const footerCopy = previewCopy.en.footer;
const mailerLiteAction = 'https://assets.mailerlite.com/jsonp/2630673/forms/198351846006327170/subscribe';
const marqueeApps = apps.filter((app) => app.showInAppsSection !== false);

function getMarqueeLogoPath(logo: string) {
  const filename = logo.split('/').pop();
  return filename ? `/after-work-preview/app-icons/${filename.replace(/\.[^.]+$/, '.webp')}` : logo;
}

function parseMailerLiteSubmissionResponse(rawResponse: string): { success?: boolean } | null {
  const trimmedResponse = rawResponse.trim();
  if (!trimmedResponse) return null;

  try {
    const parsed = JSON.parse(trimmedResponse) as unknown;
    return parsed && typeof parsed === 'object' ? parsed as { success?: boolean } : null;
  } catch {
    const jsonpMatch = trimmedResponse.match(/^[\w$.]+\(([\s\S]*)\);?$/);
    if (!jsonpMatch) return null;

    try {
      const parsed = JSON.parse(jsonpMatch[1]) as unknown;
      return parsed && typeof parsed === 'object' ? parsed as { success?: boolean } : null;
    } catch {
      return null;
    }
  }
}

async function submitMailerLiteForm(form: HTMLFormElement): Promise<void> {
  const formData = new FormData(form);
  formData.set('ml-submit', '1');
  formData.set('anticsrf', 'true');

  const response = await fetch(mailerLiteAction, {
    method: 'POST',
    body: formData,
    credentials: 'omit',
    mode: 'cors',
  });
  const result = parseMailerLiteSubmissionResponse(await response.text());

  if (!response.ok || result?.success !== true) {
    throw new Error('newsletter_provider_submission_failed');
  }
}

function SignupForm({ id }: { id: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [consentState, setConsentState] = useState<NewsletterConsentState>('idle');
  const [submissionState, setSubmissionState] = useState<NewsletterSubmissionState>('idle');

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    let recordedEmail: string | null = null;
    let isActive = true;
    let submissionPending = false;

    const submitHandler = (event: Event) => {
      const emailInput = form.querySelector<HTMLInputElement>('input[type="email"]');
      const email = emailInput?.value.trim() ?? '';

      if (!email || !emailInput?.checkValidity()) return;

      event.preventDefault();
      if (submissionPending || recordedEmail === email) return;

      submissionPending = true;
      setConsentState('recording');
      setSubmissionState('submitting');

      const submissionId = typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

      void fetch('/newsletter/subscribe.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
          email,
          consent: true,
          method: 'subscribe_button',
          submissionId,
          locale: 'en',
        }),
      })
        .then(async (response) => {
          const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;
          if (!response.ok || !result || result.ok !== true) throw new Error('newsletter_consent_failed');
        })
        .then(async () => {
          await submitMailerLiteForm(form);

          submissionPending = false;
          if (!isActive) return;
          recordedEmail = email;
          setConsentState('recorded');
          setSubmissionState('success_pending');
        })
        .catch(() => {
          submissionPending = false;
          if (!isActive) return;
          setConsentState('error');
          setSubmissionState('idle');
        });
    };

    form.addEventListener('submit', submitHandler);

    return () => {
      isActive = false;
      form.removeEventListener('submit', submitHandler);
    };
  }, []);

  if (submissionState === 'success_pending') {
    return (
      <div className="aw-success" role="status" aria-live="polite">
        <span className="aw-success-icon" aria-hidden="true">
          <Check size={18} strokeWidth={2.5} />
        </span>
        <span className="min-w-0">
          <span className="block text-[14px] font-semibold text-white">{copy.submitted}</span>
          <span className="mt-1 block text-[13px] leading-[1.4] text-slate-300/80">{copy.consentRecorded}</span>
        </span>
      </div>
    );
  }

  return (
    <div aria-busy={submissionState === 'submitting'}>
      <form ref={formRef} className="aw-form" action={mailerLiteAction} method="post" target="_blank">
        <label htmlFor={id} className="sr-only">{copy.inputLabel}</label>
        <input
          id={id}
          type="email"
          name="fields[email]"
          required
          autoComplete="email"
          placeholder={copy.inputPlaceholder}
        />
        <input type="hidden" name="ml-submit" value="1" />
        <input type="hidden" name="anticsrf" value="true" />
        <button type="submit" disabled={submissionState === 'submitting'}>
          {submissionState === 'submitting' ? copy.consentSaving : copy.submit}
        </button>
      </form>
      <noscript>
        <a href="https://preview.mailerlite.io/forms/2630673/198351846006327170/share">{copy.submit}</a>
      </noscript>
      <p className="mt-3 text-[11px] leading-[1.5] text-slate-400/80">
        {copy.legalNotice}{' '}
        <Link
          href="/privacy-statement/"
          className="underline decoration-slate-500 underline-offset-2 transition-colors hover:text-slate-200"
        >
          {copy.privacyLink}
        </Link>
      </p>
      <p
        className={`mt-2 text-[13px] leading-[1.4] text-[#ff9b6b] ${consentState === 'error' ? '' : 'sr-only'}`}
        role="status"
        aria-live="polite"
      >
        {consentState === 'error' ? copy.consentError : ''}
      </p>
    </div>
  );
}

function SceneSet({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="flex shrink-0 gap-5 pr-5" aria-hidden={duplicate}>
      {copy.gallery.map((scene) => (
        <figure key={`${duplicate ? 'duplicate-' : ''}${scene.image}`} className="w-[270px] shrink-0 sm:w-[320px] xl:w-[360px]">
          <div className="relative aspect-[1.25/1] overflow-hidden rounded-[12px] bg-[#e8ddcf] shadow-[0_16px_30px_rgba(70,48,24,0.12)]">
            <Image
              src={scene.image}
              alt={duplicate ? '' : scene.alt}
              fill
              sizes="(min-width: 1280px) 360px, (min-width: 640px) 320px, 82vw"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="pt-3 font-serif text-[17px] italic leading-[1.25] text-[#514a43]">
            {scene.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function AppSet({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="flex shrink-0 gap-6 pr-6 lg:gap-7 lg:pr-7" aria-hidden={duplicate}>
      {marqueeApps.map((app) => (
        <a
          key={`${duplicate ? 'duplicate-' : ''}${app.slug}`}
          href={app.websitePath || app.appStoreLink || '/apps/'}
          tabIndex={duplicate ? -1 : undefined}
          className="group flex w-[250px] shrink-0 items-center gap-4 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Image
            src={getMarqueeLogoPath(app.logo)}
            alt=""
            width={80}
            height={80}
            loading="lazy"
            className="h-[80px] w-[80px] shrink-0 rounded-[19px] object-cover shadow-[0_14px_30px_rgba(0,0,0,0.22)]"
          />
          <div className="min-w-0">
            <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-white">{app.title}</h3>
            <p className="mt-1 max-w-[150px] text-[13px] leading-[1.35] text-slate-300/75">{app.subtitle}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default function AfterWorkSignupPage() {
  return (
    <main className="min-h-screen overflow-clip bg-[#050a13] text-[#f7f8f9]">
      <style>{`
        @keyframes aw-marquee-right {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        .aw-track {
          width: max-content;
          flex-shrink: 0;
          will-change: transform;
          animation: aw-marquee-right 84s linear infinite;
        }

        .aw-track.is-slow {
          animation-duration: 90s;
        }

        .aw-track:hover {
          animation-play-state: paused;
        }

        .aw-form {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 150px;
          gap: 10px;
          width: 100%;
        }

        .aw-form input {
          min-height: 54px;
          width: 100%;
          border: 1px solid rgb(255 255 255 / 0.14);
          border-radius: 8px;
          background: rgb(255 255 255 / 0.06);
          color: #fff;
          font: inherit;
          font-size: 16px;
          padding: 14px 16px;
          transition: border-color 150ms ease, background-color 150ms ease;
        }

        .aw-form input::placeholder {
          color: rgb(148 163 184 / 0.75);
        }

        .aw-form input:focus {
          border-color: #ff8a3d;
          background: rgb(255 255 255 / 0.09);
          box-shadow: 0 0 0 3px rgb(255 138 61 / 0.18);
          outline: none;
        }

        .aw-form button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 54px;
          width: 100%;
          border: 0;
          border-radius: 8px;
          background: #ff8a3d;
          color: #18120d;
          font: inherit;
          font-size: 15px;
          font-weight: 600;
          padding: 14px 20px;
          transition: background-color 150ms ease, transform 150ms ease;
        }

        .aw-form button::before {
          content: '';
          display: inline-block;
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          background-color: currentColor;
          mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2'%3E%3Crect x='3' y='5' width='18' height='14' rx='2'/%3E%3Cpath d='m3 7 9 6 9-6'/%3E%3C/svg%3E") center / contain no-repeat;
          -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2'%3E%3Crect x='3' y='5' width='18' height='14' rx='2'/%3E%3Cpath d='m3 7 9 6 9-6'/%3E%3C/svg%3E") center / contain no-repeat;
        }

        .aw-form button:hover {
          background: #ff9b59;
          transform: translateY(-1px);
        }

        .aw-form button:disabled {
          opacity: 0.7;
          transform: none;
        }

        .aw-success {
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 54px;
          border: 1px solid rgb(28 157 117 / 0.45);
          border-radius: 8px;
          background: rgb(28 157 117 / 0.12);
          padding: 12px 16px;
          animation: aw-success-in 220ms ease-out both;
        }

        .aw-success-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 30px;
          width: 30px;
          flex-shrink: 0;
          border-radius: 999px;
          background: #1c9d75;
          color: #f7efe3;
        }

        @keyframes aw-success-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .aw-hero-glow {
          background-image:
            radial-gradient(ellipse 90% 70% at 70% 15%, rgba(196, 138, 74, 0.22), rgba(196, 138, 74, 0.08) 40%, transparent 75%);
          mix-blend-mode: soft-light;
        }

        .aw-hero-fade {
          background-image: linear-gradient(to right, #050a13 0%, #050a13 10%, rgba(5, 10, 19, 0.85) 30%, rgba(5, 10, 19, 0.45) 60%, transparent 100%);
        }

        @media (max-width: 480px) {
          .aw-form {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .aw-track {
            animation: none;
          }
        }
      `}</style>

      <nav className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 sm:px-10 lg:h-16 lg:px-[54px]">
          <Link href="/" className="text-xl font-semibold tracking-tight text-white">
            george<span className="text-[#ff9d19]">.</span>valandis
          </Link>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-white">
            Website <ArrowUpRight size={14} />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="relative h-[340px] w-full sm:h-[480px] lg:absolute lg:inset-y-0 lg:left-auto lg:right-0 lg:h-full lg:w-[52%] xl:w-[48%]">
          <Image
            src="/profile/george-valandis.webp"
            alt="George Valandis"
            fill
            priority
            sizes="(min-width: 1280px) 48vw, (min-width: 1024px) 52vw, 100vw"
            className="object-cover object-[center_30%]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[#050a13]/35" />
          <div className="aw-hero-glow pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050a13]/80 via-transparent via-30% to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050a13] via-[#050a13]/80 to-transparent lg:h-40" />
          <div className="pointer-events-none absolute inset-y-0 left-0 aw-hero-fade hidden w-[75%] lg:block" />
          <p className="absolute bottom-10 right-8 hidden max-w-[170px] rotate-[-5deg] font-serif text-[19px] italic leading-[1.2] text-white/85 lg:block">
            {copy.helper}
            <span className="mt-1 block text-[14px]">— George</span>
          </p>
        </div>

        <div className="relative mx-auto flex max-w-[1600px] items-center px-6 pb-20 sm:px-10 lg:min-h-[min(100svh,860px)] lg:px-[54px] lg:py-28">
          <div className="relative z-10 -mt-20 max-w-[560px] lg:mt-0">
            <div className="mb-6 inline-flex h-[30px] items-center gap-3 whitespace-nowrap rounded-full border border-[#ff8a3d]/[0.28] bg-[#111c28]/[0.55] px-3.5 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff8a3d]" />
              <span>Afterwork Newsletter</span>
              <span aria-hidden="true" className="text-[#ff8a3d]/70">/</span>
              <span>Weekly</span>
            </div>
            <h1 className="text-[42px] font-bold leading-[1] tracking-[-0.05em] text-white sm:text-[56px] lg:text-[62px] lg:leading-[0.97]">
              Notes from building apps{' '}
              <span className="text-[#ff8a3d]">after everyone else goes offline.</span>
            </h1>
            <p className="mt-6 max-w-[460px] text-[17px] leading-[1.5] text-slate-200/85">
              {copy.description}
            </p>
            <div className="mt-8 max-w-[480px]">
              <SignupForm id="aw-email-hero" />
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="relative bg-[#f7efe3] py-20 text-[#171717] sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-[54px]">
          <div className="flex items-baseline justify-between border-b border-[#d6c9b8] pb-4">
            <h2 className="font-serif text-[32px] leading-none tracking-[-0.035em] sm:text-[40px]">{copy.galleryTitle}</h2>
            <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-[#514a43]">{copy.issue}</span>
          </div>

          <ol className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {copy.expectations.map((expectation, index) => (
              <li key={expectation} className="flex items-baseline gap-4">
                <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-[#f47734]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[17px] font-medium leading-[1.35] tracking-[-0.01em] text-[#2a241f]">{expectation}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative mt-12 overflow-hidden" role="region" aria-label={copy.galleryLabel}>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#f7efe3] to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#f7efe3] to-transparent sm:w-20" />
          <div className="aw-track flex w-max">
            <SceneSet />
            <SceneSet duplicate />
          </div>
        </div>
      </section>

      {/* Apps */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-[54px]">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-[#ff8a3d]">Built after work</p>
              <h2 className="text-[34px] font-bold tracking-[-0.045em] text-white sm:text-[38px]">
                15+ apps live<span className="text-slate-500">.</span>
              </h2>
            </div>
            <Link href="/apps/" className="inline-flex items-center gap-2 pb-1 text-[13px] text-[#ff8a3d] hover:text-[#ffb27b]">
              View all apps <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden" role="region" aria-label="Apps">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#050a13] to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#050a13] to-transparent sm:w-20" />
          <div className="aw-track is-slow flex w-max">
            <AppSet />
            <AppSet duplicate />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative border-t border-white/[0.05] px-6 py-24 sm:px-10 sm:py-28">
        <div className="mx-auto flex max-w-[560px] flex-col items-center text-center">
          <div className="relative h-[84px] w-[84px] overflow-hidden rounded-full ring-2 ring-[#ff8a3d]/60 ring-offset-4 ring-offset-[#050a13]">
            <Image src="/profile/george-valandis.webp" alt="" fill sizes="84px" className="object-cover object-[center_30%]" />
          </div>
          <h2 className="mt-7 text-[34px] font-bold leading-[1.05] tracking-[-0.045em] text-white sm:text-[40px]">
            Hi, I&apos;m George<span className="text-[#ff8a3d]">.</span>
          </h2>
          <p className="mt-4 max-w-[420px] text-[16px] leading-[1.5] text-slate-300/85">
            Indie iOS developer from Germany. I write this for people who build things after work, too.
          </p>
          <div className="mt-8 w-full max-w-[480px] text-left">
            <SignupForm id="aw-email-footer" />
          </div>
        </div>
      </section>

      <footer className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.05] px-6 py-8 text-[12px] text-slate-500 sm:px-10 lg:px-[54px]">
        <Link href="/" className="hover:text-slate-300">georgevalandis.com</Link>
        <Link href="/privacy-statement/" className="hover:text-slate-300">{footerCopy.privacy}</Link>
        <Link href="/imprint/" className="hover:text-slate-300">{footerCopy.imprint}</Link>
        <button
          type="button"
          className="hover:text-slate-300"
          onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
        >
          {footerCopy.cookieSettings}
        </button>
      </footer>
    </main>
  );
}
