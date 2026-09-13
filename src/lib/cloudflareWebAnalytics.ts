export const CLOUDFLARE_ANALYTICS_OPTOUT_COOKIE = 'gv_analytics_optout';
export const CLOUDFLARE_ANALYTICS_OPTOUT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

export function hasCloudflareAnalyticsOptOut(): boolean {
  if (typeof document === 'undefined') {
    return false;
  }

  const prefix = `${CLOUDFLARE_ANALYTICS_OPTOUT_COOKIE}=`;
  return document.cookie
    .split(';')
    .some((cookie) => cookie.trim() === `${prefix}1`);
}

export function setCloudflareAnalyticsOptOut(optedOut: boolean): void {
  if (typeof document === 'undefined') {
    return;
  }

  if (optedOut) {
    document.cookie = `${CLOUDFLARE_ANALYTICS_OPTOUT_COOKIE}=1; Max-Age=${CLOUDFLARE_ANALYTICS_OPTOUT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax; Secure`;
    return;
  }

  document.cookie = `${CLOUDFLARE_ANALYTICS_OPTOUT_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax; Secure`;
}
