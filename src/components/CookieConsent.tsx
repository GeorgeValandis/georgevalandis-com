'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type ConsentMethod = 'accept_all' | 'reject_all' | 'save_selection';

type ConsentState = {
  version: number;
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

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function parseStoredConsent(rawValue: string | null): ConsentState | null {
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<ConsentState>;
    if (
      parsed.version !== CONSENT_VERSION ||
      parsed.necessary !== true ||
      typeof parsed.analytics !== 'boolean' ||
      typeof parsed.marketing !== 'boolean'
    ) {
      return null;
    }

    return {
      version: CONSENT_VERSION,
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

function readStoredConsent(): ConsentState | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const localConsent = parseStoredConsent(
    window.localStorage.getItem(CONSENT_STORAGE_KEY)
  );
  if (localConsent) {
    return localConsent;
  }

  return parseStoredConsent(readCookie(CONSENT_COOKIE_KEY));
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

const initialConsent = readStoredConsent();

export default function CookieConsent() {
  const [hasDecision, setHasDecision] = useState<boolean>(Boolean(initialConsent));
  const [showBanner, setShowBanner] = useState<boolean>(() => !initialConsent);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>(() =>
    initialConsent
      ? {
        analytics: initialConsent.analytics,
        marketing: initialConsent.marketing,
      }
      : defaultPreferences
  );

  useEffect(() => {
    if (hasDecision) {
      applyConsentToRuntime(preferences);
    } else {
      applyConsentToRuntime(defaultPreferences);
    }

    const handleOpenSettings = () => {
      setShowSettings(true);
      setShowBanner(false);
    };

    window.addEventListener('gv-open-consent-settings', handleOpenSettings);

    return () => {
      window.removeEventListener('gv-open-consent-settings', handleOpenSettings);
    };
  }, [hasDecision, preferences]);

  const persistConsent = (method: ConsentMethod, next: ConsentPreferences) => {
    const consent: ConsentState = {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: next.analytics,
      marketing: next.marketing,
      method,
      timestamp: new Date().toISOString(),
    };

    const serialized = JSON.stringify(consent);
    window.localStorage.setItem(CONSENT_STORAGE_KEY, serialized);
    document.cookie = `${CONSENT_COOKIE_KEY}=${encodeURIComponent(
      serialized
    )}; Max-Age=${CONSENT_COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax; Secure`;

    setPreferences(next);
    setHasDecision(true);
    setShowBanner(false);
    setShowSettings(false);
    applyConsentToRuntime(next);
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

  return (
    <>
      {showBanner && (
        <section className="fixed inset-x-4 bottom-4 z-[1000] mx-auto max-w-3xl rounded-2xl border border-white/15 bg-gray-950/95 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-amber-400">
            Privacy Settings
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            We use cookies.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-300">
            We only use optional analytics or marketing cookies with your consent.
            Necessary cookies for basic site functionality are always active.
            You can change your choice at any time.
          </p>
          <p className="mt-3 text-sm text-gray-400">
            See{' '}
            <Link
              href="/privacy-statement"
              className="text-amber-300 hover:text-amber-200"
            >
              Privacy Statement
            </Link>{' '}
            and{' '}
            <Link href="/imprint" className="text-amber-300 hover:text-amber-200">
              Imprint
            </Link>
            .
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={rejectAll}
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              Reject all
            </button>
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              Customize
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-amber-400"
            >
              Accept all
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
                  Cookie Preferences
                </p>
                <h2 className="text-2xl font-semibold text-white">
                  Manage your consent
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
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <label className="flex items-start justify-between gap-4 rounded-xl border border-white/10 p-4">
                <div>
                  <p className="font-medium text-white">Necessary</p>
                  <p className="text-sm text-gray-400">
                    Required for core site functions and security.
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
                  <p className="font-medium text-white">Analytics</p>
                  <p className="text-sm text-gray-400">
                    Helps us understand usage and improve content.
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
                  <p className="font-medium text-white">Marketing</p>
                  <p className="text-sm text-gray-400">
                    Allows personalized marketing and ad measurement.
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
              You can update this selection anytime from the Cookie Settings
              button.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
              >
                Reject all
              </button>
              <button
                type="button"
                onClick={saveSelection}
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
              >
                Save selection
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-amber-400"
              >
                Accept all
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
          Cookie Settings
        </button>
      )}
    </>
  );
}
