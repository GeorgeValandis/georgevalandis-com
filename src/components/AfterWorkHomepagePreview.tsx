'use client';

import { apps } from '@/content/apps';
import { germanAppSubtitles, previewCopy } from '@/content/afterWorkPreviewCopy';
import { blogPosts } from '@/content/blogPosts';
import { getSiteCopy } from '@/content/siteCopy';
import { localizedAnchor, localizedPath, type SiteLocale } from '@/lib/siteLocale';
import { OPEN_COOKIE_SETTINGS_EVENT } from '@/components/CookieConsent';
import { ArrowUp, ArrowUpRight, Menu, Send, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import LanguageSwitch from './LanguageSwitch';

const marqueeApps = apps.filter((app) => app.showInAppsSection !== false);
type ContactSubmissionState = 'idle' | 'sending' | 'success' | 'error';
type NewsletterConsentState = 'idle' | 'recording' | 'recorded' | 'error';

function getMarqueeLogoPath(logo: string) {
  const filename = logo.split('/').pop();
  return filename ? `/after-work-preview/app-icons/${filename.replace(/\.[^.]+$/, '.webp')}` : logo;
}

function AppMarqueeSet({ duplicate = false, locale }: { duplicate?: boolean; locale: SiteLocale }) {
  return (
    <div className="flex shrink-0 gap-6 pr-6 lg:gap-7 lg:pr-7" aria-hidden={duplicate}>
      {marqueeApps.map((app) => (
        <a
          key={`${duplicate ? 'duplicate-' : ''}${app.slug}`}
          href={app.websitePath || app.appStoreLink || '#preview-apps'}
          tabIndex={duplicate ? -1 : undefined}
          className="group flex w-[285px] shrink-0 items-center gap-5 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Image
            src={getMarqueeLogoPath(app.logo)}
            alt=""
            width={104}
            height={104}
            loading={duplicate ? 'lazy' : 'eager'}
            className="h-[104px] w-[104px] shrink-0 rounded-[25px] object-cover shadow-[0_14px_30px_rgba(0,0,0,0.22)]"
          />
          <div className="min-w-0">
            <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-white">{app.title}</h3>
            <p className="mt-1.5 max-w-[165px] text-[14px] leading-[1.35] text-slate-300/80">
              {locale === 'de' ? germanAppSubtitles[app.slug] ?? app.subtitle : app.subtitle}
            </p>
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.22em] text-slate-400/80">
              {app.platforms.join(' · ')}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

type NewsletterScene = { image: string; alt: string; caption: string };

function NewsletterSceneSet({ scenes, duplicate = false }: { scenes: NewsletterScene[]; duplicate?: boolean }) {
  return (
    <div className="flex shrink-0 gap-5 pr-5" aria-hidden={duplicate}>
      {scenes.map((scene) => (
        <figure key={`${duplicate ? 'duplicate-' : ''}${scene.image}`} className="w-[270px] shrink-0 sm:w-[300px] xl:w-[320px]">
          <div className="relative aspect-[1.25/1] overflow-hidden rounded-[12px] bg-[#e8ddcf] shadow-[0_16px_30px_rgba(70,48,24,0.12)]">
            <Image
              src={scene.image}
              alt={duplicate ? '' : scene.alt}
              fill
              sizes="(min-width: 1280px) 320px, (min-width: 640px) 300px, 82vw"
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

export default function AfterWorkHomepagePreview({ locale }: { locale: SiteLocale }) {
  const copy = previewCopy[locale];
  const contactCopy = getSiteCopy(locale).contact;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSubmissionState, setContactSubmissionState] = useState<ContactSubmissionState>('idle');
  const [contactFeedback, setContactFeedback] = useState('');
  const [newsletterConsentState, setNewsletterConsentState] = useState<NewsletterConsentState>('idle');
  const marqueeRef = useRef<HTMLDivElement>(null);
  const newsletterReelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const appsSection = document.getElementById('preview-apps');
    if (!marquee || !appsSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        marquee.classList.toggle('is-paused', !entry.isIntersecting);
      },
      { rootMargin: '0px' },
    );

    observer.observe(appsSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reel = newsletterReelRef.current;
    const afterWorkSection = document.getElementById('preview-after-work');
    if (!reel || !afterWorkSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        reel.classList.toggle('is-paused', !entry.isIntersecting);
      },
      { rootMargin: '0px' },
    );

    observer.observe(afterWorkSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const formRoot = document.querySelector<HTMLElement>('.preview-newsletter-form');
    if (!formRoot) return;

    let currentForm: HTMLFormElement | null = null;
    let submitHandler: ((event: Event) => void) | null = null;
    let recordedEmail: string | null = null;
    let isActive = true;

    const applyNewsletterInputCopy = () => {
      const input = formRoot.querySelector<HTMLInputElement>('input[type="email"], input.form-control');

      if (input) {
        if (input.placeholder !== copy.afterWork.inputPlaceholder) {
          input.placeholder = copy.afterWork.inputPlaceholder;
        }
        input.setAttribute('aria-label', copy.afterWork.inputLabel);
      }

      const checkboxRow = formRoot.querySelector<HTMLElement>('.ml-form-checkboxRow');
      if (checkboxRow) {
        checkboxRow.classList.remove('ml-validate-required');
        checkboxRow.hidden = true;
      }

      const form = formRoot.querySelector<HTMLFormElement>('form');
      if (!form || form === currentForm) return;

      if (currentForm && submitHandler) {
        currentForm.removeEventListener('submit', submitHandler, true);
      }

      currentForm = form;
      submitHandler = (event: Event) => {
        const emailInput = form.querySelector<HTMLInputElement>('input[type="email"], input.form-control');
        const email = emailInput?.value.trim() ?? '';

        if (!email || !emailInput?.checkValidity()) return;

        if (form.dataset.newsletterConsentPending === 'true') {
          event.preventDefault();
          event.stopImmediatePropagation();
          return;
        }

        if (recordedEmail === email) return;

        event.preventDefault();
        event.stopImmediatePropagation();
        form.dataset.newsletterConsentPending = 'true';
        setNewsletterConsentState('recording');

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
            locale,
          }),
        })
          .then(async (response) => {
            const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;
            if (!response.ok || !result?.ok) throw new Error('newsletter_consent_failed');
          })
          .then(() => {
            if (!isActive) return;
            recordedEmail = email;
            delete form.dataset.newsletterConsentPending;
            setNewsletterConsentState('recorded');
            HTMLFormElement.prototype.submit.call(form);
          })
          .catch(() => {
            if (!isActive) return;
            delete form.dataset.newsletterConsentPending;
            setNewsletterConsentState('error');
          });
      };

      form.addEventListener('submit', submitHandler, true);
    };

    applyNewsletterInputCopy();
    const observer = new MutationObserver(applyNewsletterInputCopy);
    observer.observe(formRoot, { attributes: true, childList: true, subtree: true, attributeFilter: ['placeholder'] });

    return () => {
      isActive = false;
      observer.disconnect();
      if (currentForm && submitHandler) {
        currentForm.removeEventListener('submit', submitHandler, true);
      }
    };
  }, [copy.afterWork.inputLabel, copy.afterWork.inputPlaceholder, locale]);

  const getContactErrorMessage = (errorCode?: string) => {
    switch (errorCode) {
      case 'missing_fields':
        return contactCopy.form.validation.missingFields;
      case 'invalid_email':
        return contactCopy.form.validation.invalidEmail;
      case 'message_too_short':
        return contactCopy.form.validation.messageTooShort;
      default:
        return contactCopy.form.error;
    }
  };

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactSubmissionState('sending');
    setContactFeedback('');

    try {
      const response = await fetch('/contact/send.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contactForm, website: '' }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'send_failed');
      }

      setContactSubmissionState('success');
      setContactFeedback(contactCopy.form.submitted);
      setContactForm({ name: '', email: '', message: '' });
      window.setTimeout(() => {
        setContactSubmissionState('idle');
        setContactFeedback('');
      }, 4000);
    } catch (error) {
      setContactSubmissionState('error');
      setContactFeedback(
        getContactErrorMessage(error instanceof Error ? error.message : undefined),
      );
    }
  };

  return (
    <main className="min-h-screen overflow-clip bg-[#050a13] text-[#f7f8f9]">
      <Script id="mailerlite-universal" strategy="lazyOnload">
        {`(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
    .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
    n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
    (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
    ml('account', '2630673');`}
      </Script>
      <style>{`
        @keyframes preview-app-marquee-right {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        .preview-app-marquee {
          width: max-content;
          flex-shrink: 0;
          will-change: transform;
          animation: preview-app-marquee-right 90s linear infinite;
        }

        .preview-app-marquee.is-paused {
          animation-play-state: paused;
        }

        #preview-home .preview-home-image-overlay {
          background-image:
            radial-gradient(ellipse 90% 65% at 78% 12%, rgba(196, 138, 74, 0.10), rgba(196, 138, 74, 0.045) 38%, transparent 72%),
            radial-gradient(ellipse 120% 80% at 65% 0%, rgba(120, 84, 52, 0.06), transparent 65%),
            linear-gradient(to right, #050a13 0%, rgba(5, 10, 19, 0.9) 35%, rgba(5, 10, 19, 0.1) 100%);
          background-repeat: no-repeat;
        }

        #preview-contact {
          background-image: radial-gradient(ellipse 100% 70% at 15% 100%, rgba(196, 138, 74, 0.07), rgba(196, 138, 74, 0.03) 40%, transparent 70%);
          background-repeat: no-repeat;
        }

        @media (prefers-contrast: more) {
          #preview-home .preview-home-image-overlay {
            background-image: linear-gradient(to right, #050a13 0%, rgba(5, 10, 19, 0.9) 35%, rgba(5, 10, 19, 0.1) 100%);
          }

          #preview-contact {
            background-image: none;
          }
        }

        @keyframes preview-newsletter-reel-right {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        .preview-newsletter-track {
          width: max-content;
          flex-shrink: 0;
          will-change: transform;
          animation: preview-newsletter-reel-right 84s linear infinite;
        }

        .preview-newsletter-reel.is-paused .preview-newsletter-track {
          animation-play-state: paused;
        }

        .preview-newsletter-form .ml-embedded,
        .preview-newsletter-form .ml-embedded [id^="mlb2-"] {
          width: 100% !important;
          max-width: none !important;
        }

        .preview-newsletter-form {
          --preview-newsletter-control-radius: 8px;
        }

        .preview-newsletter-form .ml-form-embedWrapper,
        .preview-newsletter-form .ml-form-embedBody,
        .preview-newsletter-form .ml-form-embedContent,
        .preview-newsletter-form .ml-form-align-center,
        .preview-newsletter-form .ml-form-embedBody form {
          width: 100% !important;
        }

        .preview-newsletter-form .ml-form-align-center {
          text-align: left !important;
        }

        .preview-newsletter-form .ml-form-embedWrapper,
        .preview-newsletter-form .ml-form-embedBody,
        .preview-newsletter-form .ml-form-embedContent {
          background: transparent !important;
          border: 0 !important;
          box-shadow: none !important;
          padding: 0 !important;
        }

        #preview-after-work,
        #preview-about,
        #preview-blog,
        #preview-contact {
          content-visibility: visible;
          contain-intrinsic-size: none;
        }

        @media (max-width: 639px) {
          #preview-after-work,
          #preview-about {
            contain-intrinsic-size: none;
          }
        }

        .preview-newsletter-form .ml-form-embedContent h4,
        .preview-newsletter-form .ml-form-embedContent > p {
          display: none !important;
        }

        .preview-newsletter-form .ml-form-embedBody form {
          display: grid !important;
          grid-template-columns: minmax(0, 1fr) 160px !important;
          column-gap: 10px !important;
          row-gap: 10px !important;
          align-items: flex-start !important;
        }

        .preview-newsletter-form .ml-form-formContent {
          grid-column: 1 !important;
          grid-row: 1 !important;
          flex: none !important;
          min-width: 0 !important;
          order: 1 !important;
          width: auto !important;
          margin-bottom: 0 !important;
        }

        .preview-newsletter-form .ml-form-fieldRow,
        .preview-newsletter-form .ml-field-group {
          margin: 0 !important;
        }

        .preview-newsletter-form input.form-control {
          min-height: 52px !important;
          border: 1px solid #d9d0c3 !important;
          border-radius: var(--preview-newsletter-control-radius) !important;
          background: rgb(255 255 255 / 0.8) !important;
          color: #171717 !important;
          font: inherit !important;
          font-size: 13px !important;
          padding: 14px 16px !important;
        }

        .preview-newsletter-form #mlb2-45845332.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input.form-control {
          border-radius: var(--preview-newsletter-control-radius) !important;
        }

        .preview-newsletter-form input.form-control::placeholder {
          color: #8e867e !important;
        }

        .preview-newsletter-form input.form-control:focus {
          border-color: #f47734 !important;
          box-shadow: 0 0 0 2px rgb(244 119 52 / 0.2) !important;
          outline: none !important;
        }

        .preview-newsletter-form .ml-form-embedSubmit {
          grid-column: 2 !important;
          grid-row: 1 !important;
          flex: none !important;
          width: 100% !important;
          margin: 0 !important;
          order: 2 !important;
        }

        .preview-newsletter-form .ml-form-embedSubmit button.primary {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          min-height: 52px !important;
          width: 100% !important;
          border: 0 !important;
          border-radius: var(--preview-newsletter-control-radius) !important;
          background: #ff7b39 !important;
          color: #24170b !important;
          font: inherit !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          padding: 14px 24px !important;
        }

        .preview-newsletter-form .ml-form-embedSubmit button.primary::before {
          content: '';
          display: inline-block;
          width: 14px;
          height: 14px;
          background-color: currentColor;
          mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2'%3E%3Crect x='3' y='5' width='18' height='14' rx='2'/%3E%3Cpath d='m3 7 9 6 9-6'/%3E%3C/svg%3E") center / contain no-repeat;
          -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2'%3E%3Crect x='3' y='5' width='18' height='14' rx='2'/%3E%3Cpath d='m3 7 9 6 9-6'/%3E%3C/svg%3E") center / contain no-repeat;
        }

        .preview-newsletter-form #mlb2-45845332.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button.primary {
          min-height: 52px !important;
          width: 100% !important;
          border: 0 !important;
          border-radius: var(--preview-newsletter-control-radius) !important;
          background: #ff7b39 !important;
          color: #24170b !important;
          font-family: inherit !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          line-height: inherit !important;
          padding: 14px 24px !important;
        }

        .preview-newsletter-form .ml-form-embedPermissions {
          display: none !important;
          grid-column: 2 !important;
          grid-row: 2 !important;
          flex: none !important;
          width: 100% !important;
          margin: 0 !important;
          order: 4 !important;
          color: #8c8176 !important;
          font: inherit !important;
          font-size: 11px !important;
        }

        .preview-newsletter-form .ml-form-embedPermissionsContent.default.privacy-policy p {
          font-size: 0 !important;
          line-height: 1.2 !important;
        }

        .preview-newsletter-form .ml-form-embedPermissionsContent.default.privacy-policy p a {
          font-size: 11px !important;
          line-height: 1.4 !important;
        }

        .preview-newsletter-form .ml-form-embedPermissionsContent.default.privacy-policy p a + a::before {
          content: '';
        }

        .preview-newsletter-form .ml-form-embedPermissionsContent.default.privacy-policy p a + a {
          margin-left: 10px;
          text-decoration: none;
        }

        .preview-newsletter-form .ml-form-checkboxRow {
          display: none !important;
        }

        @media (max-width: 520px) {
          .preview-newsletter-form .ml-form-embedBody form {
            display: flex !important;
            flex-direction: column !important;
            gap: 10px !important;
          }

          .preview-newsletter-form .ml-form-formContent,
          .preview-newsletter-form .ml-form-embedSubmit,
          .preview-newsletter-form .ml-form-embedPermissions {
            flex-basis: auto !important;
            width: 100% !important;
            grid-column: auto !important;
            grid-row: auto !important;
          }
        }

      `}</style>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.04] bg-[#050a13]">
        <div className="relative mx-auto flex h-20 max-w-[1600px] items-center justify-start px-6 lg:h-16 lg:px-[52px]">
          <a href="#preview-home" className="mr-auto text-xl font-semibold tracking-tight text-white">
            george<span className="text-[#ff9d19]">.</span>valandis
          </a>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {copy.nav.links.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative px-3 py-2 text-xs text-slate-400 transition-colors hover:text-white"
              >
                {item.label}
                <span className={`absolute inset-x-3 bottom-0 h-px origin-left bg-[#ff8a3d] transition-transform duration-300 ${index === 0 ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </a>
            ))}
            <LanguageSwitch locale={locale} />
          </div>

          <a
            href="#preview-contact"
            className="ml-auto hidden rounded-full bg-[#ff9d19] px-4 py-2 text-xs font-semibold text-[#17120b] transition-transform hover:-translate-y-0.5 hover:bg-[#ffad3b] lg:inline-flex"
          >
              {copy.nav.cta}
          </a>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-full border border-white/10 p-2 text-slate-300 lg:hidden"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-white/5 bg-[#050a13] px-6 py-5 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {copy.nav.links.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 pt-2">
                <LanguageSwitch locale={locale} />
              </div>
            </div>
          </div>
        )}
      </nav>

      <section id="preview-home" className="relative isolate overflow-hidden bg-[#050a13] pt-20 lg:pt-16">
        <div className="absolute inset-0 -z-20 bg-[#050a13]" />
        <div className="absolute inset-0 -z-10 w-full">
          <Image
            src="/after-work-preview/hero-desk.webp"
            alt={copy.hero.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 67vw, 100vw"
            className="object-cover object-center"
          />
          <div className="preview-home-image-overlay absolute inset-0 bg-gradient-to-r from-[#050a13] via-[#050a13]/90 via-35% to-[#050a13]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050a13]/65 via-transparent to-[#050a13]/10" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-b from-transparent via-[#050a13]/85 to-[#050a13] sm:h-28" />

        <div className="relative mx-auto flex min-h-[590px] max-w-[1600px] items-center px-6 py-20 sm:px-10 lg:min-h-[640px] lg:px-[54px] lg:py-20 xl:min-h-[calc(100svh-64px)]">
          <div className="relative z-10 max-w-[635px]">
            <div className="mb-5 inline-flex h-7 items-center gap-2.5 whitespace-nowrap rounded-full border border-[#ff8a3d]/[0.28] bg-[#111c28]/[0.55] px-3 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-300 backdrop-blur-md sm:h-[30px] sm:gap-3 sm:px-3.5 sm:tracking-[0.18em]">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff8a3d]" />
              <span>{copy.hero.badge[0]}</span>
              <span aria-hidden="true" className="text-[#ff8a3d]/70">/</span>
              <span>{copy.hero.badge[1]}</span>
            </div>
            <h1 className="max-w-[640px] text-[50px] font-bold leading-[0.98] tracking-[-0.055em] text-white sm:text-[58px] lg:text-[64px] lg:leading-[0.95]">
              {copy.hero.prefix}{' '}
              <span className="text-[#ff8a3d]">{copy.hero.highlight}</span>
              <br />
              {copy.hero.suffix}
            </h1>
            <p className="mt-5 max-w-[430px] text-[16px] leading-[1.5] text-slate-200/90 sm:text-[17px]">
              {copy.hero.description}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href="#preview-apps"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#ff8a3d] px-4 text-[14px] font-semibold text-[#18120d] transition-transform hover:-translate-y-0.5 hover:bg-[#ff9b59]"
              >
                {copy.hero.primaryCta} <ArrowUpRight size={16} />
              </a>
              <a
                href="#preview-contact"
                className="inline-flex h-11 items-center justify-center rounded-[8px] border border-white/60 px-5 text-[14px] font-medium text-white transition-colors hover:border-white hover:bg-white/10"
              >
                {copy.hero.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="preview-apps" className="flex min-h-[430px] items-center py-20 sm:min-h-[480px] sm:py-24 lg:min-h-[520px] lg:py-28">
        <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-[54px]">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-1 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-[#ff8a3d]">{copy.apps.eyebrow}</p>
              <h2 className="text-[36px] font-bold tracking-[-0.045em] text-white sm:text-[38px]">
                {copy.apps.title}<span className="text-slate-500">.</span>
              </h2>
            </div>
            <div className="self-start sm:self-auto">
              <Link href="/apps/" className="inline-flex items-center gap-2 pb-1 text-[13px] text-[#ff8a3d] hover:text-[#ffb27b]">
                {copy.apps.viewAll} <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden" role="region" aria-label={copy.apps.ariaLabel}>
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#050a13] to-transparent sm:w-16" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#050a13] to-transparent sm:w-16" />
            <div ref={marqueeRef} className="preview-app-marquee flex w-max">
              <AppMarqueeSet locale={locale} />
              <AppMarqueeSet duplicate locale={locale} />
            </div>
          </div>
        </div>
      </section>

      <section id="preview-after-work" className="relative flex min-h-[620px] items-center scroll-mt-20 bg-[#f7efe3] py-20 text-[#171717] sm:min-h-[700px] sm:scroll-mt-16 sm:py-24 lg:min-h-[720px] lg:py-28">
        <div className="mx-auto grid w-full max-w-[1600px] items-center gap-10 px-6 sm:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8 lg:pl-[54px] lg:pr-[44px] xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-10">
          <div className="max-w-[535px]">
            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.27em] text-[#f47734]">
              {copy.afterWork.eyebrow}
            </p>
            <h2 className="max-w-[520px] text-[38px] font-bold leading-[1.06] tracking-[-0.045em] sm:text-[42px]">
              {copy.afterWork.title}
            </h2>
            {copy.afterWork.description ? (
              <p className="mt-6 max-w-[470px] text-[17px] leading-[1.45] text-[#514a43]">
                {copy.afterWork.description}
              </p>
            ) : null}

            <ul className="mt-6 max-w-[445px] space-y-2 text-[14px] leading-[1.45] text-[#514a43]">
              {copy.afterWork.expectations.map((expectation) => (
                <li key={expectation} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#f47734]" />
                  <span>{expectation}</span>
                </li>
              ))}
            </ul>

            <div className="preview-newsletter-form mt-7 max-w-[445px]">
              <div className="ml-embedded" data-form="Em4Az7" />
              <noscript>
                <a href="https://preview.mailerlite.io/forms/2630673/198351846006327170/share">
                  {copy.afterWork.submit}
                </a>
              </noscript>
            </div>
            <p
              className={`mt-3 min-h-[1.25rem] text-[12px] leading-[1.4] text-[#8c8176] ${newsletterConsentState === 'idle' ? 'sr-only' : ''}`}
              role="status"
              aria-live="polite"
            >
              {newsletterConsentState === 'recording'
                ? copy.afterWork.consentSaving
                : newsletterConsentState === 'recorded'
                  ? copy.afterWork.consentRecorded
                  : newsletterConsentState === 'error'
                    ? copy.afterWork.consentError
                    : ''}
            </p>
          </div>

          <div
            ref={newsletterReelRef}
            className="preview-newsletter-reel relative w-full max-w-[820px] justify-self-end overflow-hidden"
            role="region"
            aria-label={copy.afterWork.galleryLabel}
          >
            <div className="mb-4 flex items-baseline justify-between border-b border-[#d6c9b8] pb-3">
              <h3 className="font-serif text-[32px] leading-none tracking-[-0.035em] text-[#171717]">After Work</h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#514a43]">{copy.afterWork.issue}</span>
            </div>
            <div className="relative -mx-1 overflow-hidden px-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r from-[#f7efe3] to-transparent sm:w-7" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-5 bg-gradient-to-l from-[#f7efe3] to-transparent sm:w-7" />
              <div className="preview-newsletter-track flex w-max">
                <NewsletterSceneSet scenes={copy.afterWork.gallery} />
                <NewsletterSceneSet duplicate scenes={copy.afterWork.gallery} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="preview-about" className="relative isolate scroll-mt-20 overflow-hidden bg-[#050a13] py-0 lg:scroll-mt-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-8 z-20 h-8 bg-gradient-to-b from-[#f7efe3] to-[#050a13] sm:-top-11 sm:h-11" />
        <div className="absolute inset-0 -z-20 bg-[#050a13]" />
        <div className="preview-about-frame absolute inset-x-0 bottom-0 top-[440px] -z-10 sm:top-[420px] lg:inset-y-0 lg:right-0 lg:left-auto lg:aspect-[1009/1024] lg:h-full lg:w-auto">
          <Image
            src="/profile/george-valandis.webp"
            alt={copy.about.imageAlt}
            fill
            sizes="(min-width: 1024px) 63vh, 100vw"
            className="object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050a13] via-[#050a13]/[0.2] via-18% to-transparent to-40%" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050a13] via-[#050a13]/[0.72] to-transparent sm:h-40 lg:h-36" />
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[52%] bg-gradient-to-r from-[#050a13] via-[#050a13]/[0.72] via-22% to-transparent lg:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#050a13]/[0.28] to-transparent" />
        </div>
        <div className="relative mx-auto flex min-h-[820px] max-w-[1600px] items-start px-6 pb-16 pt-20 sm:min-h-[860px] sm:px-10 sm:pb-20 sm:pt-24 lg:min-h-[640px] lg:items-center lg:px-[54px] lg:py-0">
          <div className="relative z-10 max-w-[480px]">
            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-[#ff8a3d]">{copy.about.eyebrow}</p>
            <h2 className="max-w-[440px] text-[38px] font-bold leading-[1.03] tracking-[-0.045em] text-white sm:text-[42px]">
              {copy.about.title}
            </h2>
            <p className="mt-6 max-w-[430px] text-[16px] leading-[1.5] text-slate-200/80">
              {copy.about.description}
            </p>
            <a
              href="#preview-contact"
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-[8px] border border-white/65 px-5 text-[13px] font-medium text-white transition-colors hover:border-white hover:bg-white/10"
            >
              {copy.about.cta} <ArrowUpRight size={15} />
            </a>
          </div>
          <p className="absolute bottom-2 right-8 hidden max-w-[130px] rotate-[-5deg] font-serif text-[17px] italic leading-[1.15] text-white/80 lg:block">
            {copy.about.quote.slice(0, 3).map((line) => <span key={line} className="block">{line}</span>)}
            <span className="text-[13px]">{copy.about.quote[3]}</span>
          </p>
        </div>
      </section>

      <section id="preview-blog" className="min-h-[560px] bg-[#050a13] px-6 pb-36 lg:px-8">
        <div className="mx-auto max-w-[1600px] px-0 pt-28 sm:px-4 lg:px-[46px]">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-[#ff9d19]">{copy.blog.eyebrow}</p>
          <div className="grid gap-4 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((post, index) => (
              <Link key={post.slug} href={`${locale === 'de' ? '/de' : ''}/blog/${post.slug}/`} className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors hover:border-[#ff9d19]/40">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">{post.date}</p>
                <h3 className="mt-5 text-lg font-semibold leading-snug text-white group-hover:text-[#ffbd65]">{copy.blog.posts[index].title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{copy.blog.posts[index].excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="preview-contact" className="relative bg-[#050a13] px-6 py-28 lg:px-8">
        <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-0 sm:px-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-start lg:gap-20 lg:px-[46px]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#ff9d19]">{copy.contact.eyebrow}</p>
            <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">{copy.contact.title}</h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-400">{contactCopy.description}</p>
            <a href="mailto:info@georgevalandis.com" className="mt-8 inline-flex items-center gap-2 text-lg text-slate-300 transition-colors hover:text-white">
              info@georgevalandis.com <ArrowUpRight size={18} />
            </a>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-5">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="sr-only">{contactCopy.form.name}</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={contactForm.name}
                  onChange={(event) => setContactForm({ ...contactForm, name: event.target.value })}
                  required
                  autoComplete="name"
                  placeholder={contactCopy.form.namePlaceholder}
                  className="w-full rounded-[8px] border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-[#ff9d19]/70"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">{contactCopy.form.email}</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={contactForm.email}
                  onChange={(event) => setContactForm({ ...contactForm, email: event.target.value })}
                  required
                  autoComplete="email"
                  placeholder={contactCopy.form.emailPlaceholder}
                  className="w-full rounded-[8px] border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-[#ff9d19]/70"
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="sr-only">{contactCopy.form.message}</label>
              <textarea
                id="contact-message"
                name="message"
                value={contactForm.message}
                onChange={(event) => setContactForm({ ...contactForm, message: event.target.value })}
                required
                rows={5}
                placeholder={contactCopy.form.messagePlaceholder}
                className="w-full resize-none rounded-[8px] border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-[#ff9d19]/70"
              />
            </div>
            <button
              type="submit"
              disabled={contactSubmissionState === 'sending' || contactSubmissionState === 'success'}
              className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-[#ff8a3d] px-5 text-sm font-semibold text-[#18120d] transition-colors hover:bg-[#ff9b59] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {contactSubmissionState === 'success' ? contactCopy.form.submitted : contactSubmissionState === 'sending' ? contactCopy.form.sending : contactCopy.form.submit}
              <Send size={15} />
            </button>
            {contactFeedback ? (
              <p className={`text-sm ${contactSubmissionState === 'error' ? 'text-rose-300' : 'text-emerald-300'}`}>
                {contactFeedback}
              </p>
            ) : null}
          </form>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] bg-[#050a13] px-6 py-8 text-xs text-slate-500 lg:px-8">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-5 sm:flex-row">
          <span>{copy.footer.copyright}</span>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3" aria-label="Footer">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
              className="transition-colors hover:text-white"
            >
              {copy.footer.cookieSettings}
            </button>
            <Link href={localizedPath(locale, '/privacy-statement')} className="transition-colors hover:text-white">
              {copy.footer.privacy}
            </Link>
            <Link href={localizedPath(locale, '/imprint')} className="transition-colors hover:text-white">
              {copy.footer.imprint}
            </Link>
            <LanguageSwitch locale={locale} variant="footer" />
            <a href={localizedAnchor(locale, '#preview-home')} className="group inline-flex items-center gap-1.5 transition-colors hover:text-white">
              {copy.footer.backToTop}
              <ArrowUp size={13} className="transition-transform group-hover:-translate-y-0.5" />
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
