(() => {
  const APP_STORE_ID = '6751297230';
  const TOKEN_PATTERN = /^[A-Za-z0-9_-]{1,30}$/;
  const options = document.currentScript?.dataset ?? {};
  const fallbackCampaign = TOKEN_PATTERN.test(options.campaign ?? '') ? options.campaign : 'organic_direct';
  const params = new URLSearchParams(window.location.search);
  const requestedCampaign = params.get('campaign');
  const utmSource = params.get('utm_source');
  const sourcePrefix = options.sourcePrefix;

  // Explicit ?campaign= wins; otherwise tag social traffic as "<prefix>-<utm_source>" (e.g. setup-threads).
  let campaign = fallbackCampaign;
  if (requestedCampaign && TOKEN_PATTERN.test(requestedCampaign)) {
    campaign = requestedCampaign;
  } else if (sourcePrefix && utmSource && /^[A-Za-z0-9_-]+$/.test(utmSource)) {
    campaign = `${sourcePrefix}-${utmSource}`.slice(0, 30);
  }

  const redirectUrl = new URL('/apps/glanceaway/download/', window.location.origin);
  redirectUrl.searchParams.set('campaign', campaign);

  document.querySelectorAll('a[href]').forEach((link) => {
    try {
      const target = new URL(link.href);
      const isGlanceAwayStoreLink =
        target.hostname === 'apps.apple.com' && target.pathname.includes(`id${APP_STORE_ID}`);

      if (isGlanceAwayStoreLink) {
        link.href = redirectUrl.toString();
      }
    } catch {
      // Ignore malformed or non-HTTP links.
    }
  });
})();
