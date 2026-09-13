'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { hasCloudflareAnalyticsOptOut } from '@/lib/cloudflareWebAnalytics';

const cloudflareWebAnalyticsToken = process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN?.trim();

export default function CloudflareWebAnalytics() {
  const [shouldLoad, setShouldLoad] = useState<boolean | null>(null);

  useEffect(() => {
    const updateAnalyticsState = () => {
      setShouldLoad(Boolean(cloudflareWebAnalyticsToken) && !hasCloudflareAnalyticsOptOut());
    };

    updateAnalyticsState();

    const handleOptOutChange = () => updateAnalyticsState();
    window.addEventListener('gv:cloudflare-analytics-preference', handleOptOutChange);

    return () => {
      window.removeEventListener('gv:cloudflare-analytics-preference', handleOptOutChange);
    };
  }, []);

  if (!cloudflareWebAnalyticsToken || shouldLoad !== true) {
    return null;
  }

  return (
    <Script
      type="module"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: cloudflareWebAnalyticsToken })}
      strategy="afterInteractive"
    />
  );
}
