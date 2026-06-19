import {
  appSeoGroupOrder,
  appSeoGroups,
  getAppSeoMetadata,
} from '@/content/appSeo';
import { getAppLandingPage } from '@/content/appLandingPages';
import { apps } from '@/content/apps';

export const appsWithSeo = apps
  .map((app) => ({
    app,
    landingPage: getAppLandingPage(app.slug),
    seo: getAppSeoMetadata(app.slug),
  }))
  .filter((item) => item.app.showInAppsSection !== false && item.landingPage && item.seo);

export function getAppHubGroups() {
  return appSeoGroupOrder
    .map((group) => ({
      group,
      ...appSeoGroups[group],
      items: appsWithSeo.filter((item) => item.seo?.group === group),
    }))
    .filter((group) => group.items.length > 0);
}

export function platformLabel(platform: string) {
  return platform === 'macOS' ? 'macOS App' : `${platform} App`;
}
