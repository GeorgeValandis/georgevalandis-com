'use client';

import { getSiteCopy } from '@/content/siteCopy';
import { detectLocaleFromPathname, localizedPath } from '@/lib/siteLocale';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NOTICE_VERSION = '2';
const POLICY_VERSION = 1;
const NOTICE_COOKIE_KEY = 'gv_cookie_notice';
const NOTICE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;
export const OPEN_COOKIE_SETTINGS_EVENT = 'gv:open-cookie-settings';

function sanitizeScope(scope: string): string {
  return scope.replace(/[^a-z0-9_-]/gi, '_');
}

function getNoticeScope(pathname: string | null): string {
  const appPathMatch = pathname?.match(/^\/apps\/([^/]+)(?:\/|$)/);

  if (appPathMatch) {
    return `app:${appPathMatch[1]}`;
  }

  if (
    typeof window !== 'undefined' &&
    window.location.hostname.toLowerCase() === 'glanceaway.georgevalandis.com'
  ) {
    return 'app:glanceaway';
  }

  return 'site';
}

function getCookieName(scope: string): string {
  return `${NOTICE_COOKIE_KEY}_${sanitizeScope(scope)}`;
}

function hasAcknowledgedNotice(scope: string): boolean {
  if (typeof document === 'undefined') {
    return false;
  }

  const prefix = `${getCookieName(scope)}=`;
  return document.cookie
    .split(';')
    .some((cookie) => cookie.trim() === `${prefix}${NOTICE_VERSION}`);
}

function createConsentId(): string {
  const cryptoApi = typeof window !== 'undefined' ? window.crypto : undefined;
  const randomUUID = cryptoApi?.randomUUID;

  if (typeof randomUUID === 'function') {
    return randomUUID.call(cryptoApi);
  }

  if (cryptoApi) {
    const bytes = new Uint8Array(16);
    cryptoApi.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function storeAcknowledgement(scope: string): string {
  document.cookie = `${getCookieName(scope)}=${NOTICE_VERSION}; Max-Age=${NOTICE_COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax; Secure`;
  return createConsentId();
}

function logAcknowledgement(consentId: string, scope: string, locale: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || null;
  const payload = {
    consentId,
    consentVersion: Number(NOTICE_VERSION),
    policyVersion: POLICY_VERSION,
    scope,
    method: 'acknowledge_notice',
    necessary: true,
    analytics: false,
    marketing: false,
    decidedAt: new Date().toISOString(),
    pageUrl: window.location.href,
    locale,
    timezone,
  };

  void fetch('/consent/log.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Cookie notice functionality remains fail-safe if the optional log is unavailable.
  });
}

function getPrivacyPath(
  pathname: string | null,
  locale: ReturnType<typeof detectLocaleFromPathname>
): string {
  const appPathMatch = pathname?.match(/^\/apps\/([^/]+)(?:\/|$)/);

  if (appPathMatch) {
    if (appPathMatch[1] === 'one-sentence') {
      return localizedPath(locale, '/privacy-statement');
    }

    return `/apps/${appPathMatch[1]}/privacy-statement/`;
  }

  if (
    typeof window !== 'undefined' &&
    window.location.hostname.toLowerCase() === 'glanceaway.georgevalandis.com'
  ) {
    return 'https://georgevalandis.com/apps/glanceaway/privacy-statement/';
  }

  return localizedPath(locale, '/privacy-statement');
}

export default function CookieConsent() {
  const pathname = usePathname();
  const locale = detectLocaleFromPathname(pathname);
  const copy = getSiteCopy(locale).consent;
  const scope = getNoticeScope(pathname);
  const privacyPath = getPrivacyPath(pathname, locale);
  const isAfterWorkPreview = /^\/(?:de\/)?after-work-preview\/?$/.test(pathname ?? '');
  const [isMounted, setIsMounted] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const hasAcknowledged = hasAcknowledgedNotice(scope);
      setAcknowledged(hasAcknowledged);
      setShowBanner(!hasAcknowledged);
      setShowDetails(false);
      setIsMounted(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [scope]);

  useEffect(() => {
    const openCookieSettings = () => {
      setShowBanner(false);
      setShowDetails(true);
    };

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openCookieSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openCookieSettings);
  }, []);

  const acknowledge = () => {
    const consentId = storeAcknowledgement(scope);
    logAcknowledgement(consentId, scope, locale);
    setAcknowledged(true);
    setShowBanner(false);
    setShowDetails(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {showBanner && !showDetails ? (
        <section
          aria-labelledby="cookie-notice-title"
          className="fixed inset-x-4 bottom-4 z-[1000] mx-auto max-w-3xl rounded-2xl border border-white/15 bg-gray-950/95 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl motion-safe:animate-[fadeIn_180ms_ease-out]"
        >
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-amber-400">
            {copy.bannerEyebrow}
          </p>
          <h2 id="cookie-notice-title" className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {copy.bannerTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-300">
            {copy.bannerDescription}
          </p>
          <p className="mt-2 text-sm font-medium text-emerald-300">
            {copy.storageNotice}
          </p>
          <p className="mt-3 text-sm text-gray-400">
            {copy.bannerLegalPrefix}{' '}
            <Link href={privacyPath} className="text-amber-300 hover:text-amber-200">
              {copy.privacyLink}
            </Link>{' '}
            {locale === 'de' ? 'und ' : 'and '}
            <Link
              href={localizedPath(locale, '/imprint')}
              className="text-amber-300 hover:text-amber-200"
            >
              {copy.imprintLink}
            </Link>
            .
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setShowBanner(false);
                setShowDetails(true);
              }}
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              {copy.detailsButton}
            </button>
            <button
              type="button"
              onClick={acknowledge}
              className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-amber-400"
            >
              {copy.continueButton}
            </button>
          </div>
        </section>
      ) : null}

      {showDetails ? (
        <section className="fixed inset-0 z-[1001] flex items-end justify-center bg-black/70 px-4 py-6 sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-details-title"
            className="w-full max-w-2xl rounded-2xl border border-white/10 bg-gray-950 p-6 shadow-2xl shadow-black/60 motion-safe:animate-[fadeIn_180ms_ease-out]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-amber-400">
                  {copy.modalEyebrow}
                </p>
                <h2 id="cookie-details-title" className="text-2xl font-semibold text-white">
                  {copy.modalTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowDetails(false);
                  if (!acknowledged) {
                    setShowBanner(true);
                  }
                }}
                className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:bg-white/5"
              >
                {copy.close}
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 p-4">
                <div>
                  <p className="font-medium text-white">{copy.necessaryTitle}</p>
                  <p className="mt-1 text-sm text-gray-400">{copy.necessaryDescription}</p>
                </div>
                <span className="shrink-0 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  {copy.activeLabel}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 p-4">
                <div>
                  <p className="font-medium text-white">{copy.analyticsTitle}</p>
                  <p className="mt-1 text-sm text-gray-400">{copy.analyticsDescription}</p>
                </div>
                <span className="shrink-0 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300">
                  {copy.notUsedLabel}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 p-4">
                <div>
                  <p className="font-medium text-white">{copy.marketingTitle}</p>
                  <p className="mt-1 text-sm text-gray-400">{copy.marketingDescription}</p>
                </div>
                <span className="shrink-0 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300">
                  {copy.notUsedLabel}
                </span>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-gray-400">{copy.updateHint}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href={privacyPath} className="text-sm font-semibold text-amber-300 hover:text-amber-200">
                {copy.privacyLink}
              </Link>
              <button
                type="button"
                onClick={acknowledge}
                className="ml-auto rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-amber-400"
              >
                {copy.continueButton}
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {acknowledged && !showDetails && !isAfterWorkPreview ? (
        <button
          type="button"
          onClick={() => setShowDetails(true)}
          className="fixed bottom-4 left-4 z-[999] rounded-full border border-white/15 bg-gray-950/90 px-4 py-2 text-xs font-semibold text-gray-200 transition-colors hover:bg-white/10"
        >
          {copy.settingsButton}
        </button>
      ) : null}
    </>
  );
}
