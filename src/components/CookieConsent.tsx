'use client';

import { getSiteCopy } from '@/content/siteCopy';
import { detectLocaleFromPathname, localizedPath } from '@/lib/siteLocale';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type ConsentMethod = 'accept_all' | 'reject_all' | 'save_selection';

type ConsentState = {
  consentId: string;
  version: number;
  scope: string;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  method: ConsentMethod;
  timestamp: string;
};

type ConsentPreferences = Pick<ConsentState, 'analytics' | 'marketing'>;

const CONSENT_VERSION = 1;
const CONSENT_STORAGE_KEY = 'gv_cookie_consent';
const CONSENT_COOKIE_KEY = 'gv_cookie_consent';
const CONSENT_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

const defaultPreferences: ConsentPreferences = {
  analytics: false,
  marketing: false,
};

function sanitizeConsentScope(scope: string): string {
  return scope.replace(/[^a-z0-9_-]/gi, '_');
}

function getScopedStorageKey(scope: string): string {
  return `${CONSENT_STORAGE_KEY}_${sanitizeConsentScope(scope)}`;
}

function getScopedCookieKey(scope: string): string {
  return `${CONSENT_COOKIE_KEY}_${sanitizeConsentScope(scope)}`;
}

function getConsentScope(pathname: string | null): string {
  const appPathMatch = pathname?.match(/^\/apps\/([^/]+)(?:\/|$)/);

  if (appPathMatch) {
    return `app:${appPathMatch[1]}`;
  }

  return 'site';
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function parseStoredConsent(
  rawValue: string | null,
  scope: string
): ConsentState | null {
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<ConsentState>;
    if (
      typeof parsed.consentId !== 'string' ||
      !parsed.consentId ||
      parsed.version !== CONSENT_VERSION ||
      (parsed.scope !== scope && !(scope === 'site' && !parsed.scope)) ||
      parsed.necessary !== true ||
      typeof parsed.analytics !== 'boolean' ||
      typeof parsed.marketing !== 'boolean'
    ) {
      return null;
    }

    return {
      consentId: parsed.consentId,
      version: CONSENT_VERSION,
      scope,
      necessary: true,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      method:
        parsed.method === 'accept_all' ||
          parsed.method === 'reject_all' ||
          parsed.method === 'save_selection'
          ? parsed.method
          : 'save_selection',
      timestamp:
        typeof parsed.timestamp === 'string' && parsed.timestamp
          ? parsed.timestamp
          : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

function generateConsentId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `consent_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function logConsentDecision(consent: ConsentState): void {
  const payload = {
    consentId: consent.consentId,
    consentVersion: consent.version,
    policyVersion: consent.version,
    scope: consent.scope,
    method: consent.method,
    necessary: consent.necessary,
    analytics: consent.analytics,
    marketing: consent.marketing,
    decidedAt: consent.timestamp,
    pageUrl: window.location.href,
    locale: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? null,
  };

  const body = JSON.stringify(payload);

  if (typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon('/consent/log.php', blob);
    return;
  }

  void fetch('/consent/log.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    credentials: 'same-origin',
    keepalive: true,
  });
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookiePrefix = `${name}=`;
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const normalized = cookie.trim();
    if (normalized.startsWith(cookiePrefix)) {
      return decodeURIComponent(normalized.slice(cookiePrefix.length));
    }
  }
  return null;
}

function readStoredConsent(scope: string): ConsentState | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const localConsent = parseStoredConsent(
      window.localStorage.getItem(getScopedStorageKey(scope)),
      scope
    );
    if (localConsent) {
      return localConsent;
    }
  } catch {
    return parseStoredConsent(readCookie(getScopedCookieKey(scope)), scope);
  }

  return parseStoredConsent(readCookie(getScopedCookieKey(scope)), scope);
}

function applyConsentToRuntime(consent: ConsentPreferences): void {
  document.documentElement.dataset.consentAnalytics = consent.analytics
    ? 'granted'
    : 'denied';
  document.documentElement.dataset.consentMarketing = consent.marketing
    ? 'granted'
    : 'denied';

  window.dispatchEvent(
    new CustomEvent('gv-consent-updated', {
      detail: consent,
    })
  );

  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage: consent.marketing ? 'granted' : 'denied',
      ad_user_data: consent.marketing ? 'granted' : 'denied',
      ad_personalization: consent.marketing ? 'granted' : 'denied',
    });
  }
}

function getPrivacyPathForCurrentPage(
  pathname: string | null,
  locale: ReturnType<typeof detectLocaleFromPathname>
): string {
  const appPathMatch = pathname?.match(/^\/apps\/([^/]+)(?:\/|$)/);

  if (appPathMatch) {
    return `/apps/${appPathMatch[1]}/privacy-statement/`;
  }

  return localizedPath(locale, '/privacy-statement');
}

export default function CookieConsent() {
  const pathname = usePathname();
  const locale = detectLocaleFromPathname(pathname);
  const copy = getSiteCopy(locale).consent;
  const consentScope = getConsentScope(pathname);
  const privacyPath = getPrivacyPathForCurrentPage(pathname, locale);

  return (
    <ScopedCookieConsent
      key={consentScope}
      consentScope={consentScope}
      copy={copy}
      locale={locale}
      privacyPath={privacyPath}
    />
  );
}

function ScopedCookieConsent({
  consentScope,
  copy,
  locale,
  privacyPath,
}: {
  consentScope: string;
  copy: ReturnType<typeof getSiteCopy>['consent'];
  locale: ReturnType<typeof detectLocaleFromPathname>;
  privacyPath: string;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [hasDecision, setHasDecision] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>(
    defaultPreferences
  );
  const [storedConsent, setStoredConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const consent = readStoredConsent(consentScope);

      if (consent) {
        setPreferences({
          analytics: consent.analytics,
          marketing: consent.marketing,
        });
        setStoredConsent(consent);
        setHasDecision(true);
        setShowBanner(false);
      } else {
        setPreferences(defaultPreferences);
        setStoredConsent(null);
        setHasDecision(false);
        setShowBanner(true);
      }

      setShowSettings(false);
      setIsMounted(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [consentScope]);

  useEffect(() => {
    if (hasDecision) {
      applyConsentToRuntime(preferences);
    } else {
      applyConsentToRuntime(defaultPreferences);
    }

    const handleOpenSettings = () => {
      setStoredConsent(readStoredConsent(consentScope));
      setShowSettings(true);
      setShowBanner(false);
    };

    window.addEventListener('gv-open-consent-settings', handleOpenSettings);

    return () => {
      window.removeEventListener('gv-open-consent-settings', handleOpenSettings);
    };
  }, [consentScope, hasDecision, preferences]);

  const persistConsent = (method: ConsentMethod, next: ConsentPreferences) => {
    const consent: ConsentState = {
      consentId: generateConsentId(),
      version: CONSENT_VERSION,
      scope: consentScope,
      necessary: true,
      analytics: next.analytics,
      marketing: next.marketing,
      method,
      timestamp: new Date().toISOString(),
    };

    const serialized = JSON.stringify(consent);
    try {
      window.localStorage.setItem(getScopedStorageKey(consentScope), serialized);
    } catch {
      // Cookie fallback below still persists consent when storage is unavailable.
    }
    document.cookie = `${getScopedCookieKey(consentScope)}=${encodeURIComponent(
      serialized
    )}; Max-Age=${CONSENT_COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax; Secure`;

    setPreferences(next);
    setStoredConsent(consent);
    setHasDecision(true);
    setShowBanner(false);
    setShowSettings(false);
    applyConsentToRuntime(next);
    logConsentDecision(consent);
  };

  const saveSelection = () => {
    persistConsent('save_selection', preferences);
  };

  const acceptAll = () => {
    persistConsent('accept_all', {
      analytics: true,
      marketing: true,
    });
  };

  const rejectAll = () => {
    persistConsent('reject_all', {
      analytics: false,
      marketing: false,
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {showBanner && (
        <section className="fixed inset-x-4 bottom-4 z-[1000] mx-auto max-w-3xl rounded-2xl border border-white/15 bg-gray-950/95 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-amber-400">
            {copy.bannerEyebrow}
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {copy.bannerTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-300">
            {copy.bannerDescription}
          </p>
          <p className="mt-3 text-sm text-gray-400">
            {copy.bannerLegalPrefix}{' '}
            <Link
              href={privacyPath}
              className="text-amber-300 hover:text-amber-200"
            >
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
              onClick={rejectAll}
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              {copy.rejectAll}
            </button>
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              {copy.customize}
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-amber-400"
            >
              {copy.acceptAll}
            </button>
          </div>
        </section>
      )}

      {showSettings && (
        <section className="fixed inset-0 z-[1001] flex items-end justify-center bg-black/70 px-4 py-6 sm:items-center">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-gray-950 p-6 shadow-2xl shadow-black/60">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-amber-400">
                  {copy.modalEyebrow}
                </p>
                <h2 className="text-2xl font-semibold text-white">
                  {copy.modalTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowSettings(false);
                  if (!hasDecision) {
                    setShowBanner(true);
                  }
                }}
                className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:bg-white/5"
              >
                {copy.close}
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <label className="flex items-start justify-between gap-4 rounded-xl border border-white/10 p-4">
                <div>
                  <p className="font-medium text-white">{copy.necessaryTitle}</p>
                  <p className="text-sm text-gray-400">
                    {copy.necessaryDescription}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="mt-1 h-5 w-5 accent-amber-500"
                />
              </label>

              <label className="flex items-start justify-between gap-4 rounded-xl border border-white/10 p-4">
                <div>
                  <p className="font-medium text-white">{copy.analyticsTitle}</p>
                  <p className="text-sm text-gray-400">
                    {copy.analyticsDescription}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(event) =>
                    setPreferences((current) => ({
                      ...current,
                      analytics: event.target.checked,
                    }))
                  }
                  className="mt-1 h-5 w-5 accent-amber-500"
                />
              </label>

              <label className="flex items-start justify-between gap-4 rounded-xl border border-white/10 p-4">
                <div>
                  <p className="font-medium text-white">{copy.marketingTitle}</p>
                  <p className="text-sm text-gray-400">
                    {copy.marketingDescription}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(event) =>
                    setPreferences((current) => ({
                      ...current,
                      marketing: event.target.checked,
                    }))
                  }
                  className="mt-1 h-5 w-5 accent-amber-500"
                />
              </label>
            </div>

            <p className="mt-5 text-sm text-gray-400">
              {copy.updateHint}
            </p>

            {storedConsent && (
              <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">
                  {copy.consentRecordTitle}
                </p>
                <p className="mt-2 break-all font-mono text-xs text-gray-300">
                  {copy.consentIdLabel}: {storedConsent.consentId}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {copy.consentRequestHint}
                </p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
              onClick={rejectAll}
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
                {copy.rejectAll}
              </button>
              <button
                type="button"
              onClick={saveSelection}
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
                {copy.saveSelection}
              </button>
              <button
                type="button"
              onClick={acceptAll}
              className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-amber-400"
            >
                {copy.acceptAll}
              </button>
            </div>
          </div>
        </section>
      )}

      {hasDecision && !showSettings && (
        <button
          type="button"
          onClick={() => setShowSettings(true)}
          className="fixed bottom-4 left-4 z-[999] rounded-full border border-white/15 bg-gray-950/90 px-4 py-2 text-xs font-semibold text-gray-200 transition-colors hover:bg-white/10"
        >
          {copy.settingsButton}
        </button>
      )}
    </>
  );
}
