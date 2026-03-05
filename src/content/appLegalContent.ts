import appLegalContentJson from '@/content/appLegalContent.json';

type LegacyLegalDocument = {
  sourceUrl: string;
  sourceTitle: string;
  html: string;
  note?: string;
};

type LegacyAppLegalContent = {
  terms: LegacyLegalDocument;
  privacy: LegacyLegalDocument;
};

const appLegalContent = appLegalContentJson as Record<string, LegacyAppLegalContent>;

export function getAppLegalContentBySlug(slug: string) {
  return appLegalContent[slug];
}
