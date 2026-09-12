(() => {
  const APP_STORE_ID = '6751297230';
  const requestedCampaign = new URLSearchParams(window.location.search).get('campaign');
  const campaign =
    requestedCampaign && /^[A-Za-z0-9_-]{1,30}$/.test(requestedCampaign)
      ? requestedCampaign
      : 'organic_direct';

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
