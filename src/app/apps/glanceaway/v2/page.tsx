import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GlanceAwayLandingV2 from "@/components/glanceaway-v2/GlanceAwayLandingV2";
import { getAppLandingPage } from "@/content/appLandingPages";
import { getAppBySlug } from "@/content/apps";
import { canonicalPath } from "@/lib/seo";

// Design preview only: kept out of the index, canonical points at the live product page.
export const metadata: Metadata = {
  title: "GlanceAway: 20-20-20 Eye Break Reminder for iPhone & Mac (preview)",
  description:
    "Preview of a second design for the GlanceAway product page: a 20-20-20 eye break reminder for iPhone and Mac.",
  robots: { index: false, follow: false },
  alternates: { canonical: canonicalPath("/apps/glanceaway/") },
};

export default function GlanceAwayV2Page() {
  const app = getAppBySlug("glanceaway");
  const content = app ? getAppLandingPage(app.slug) : undefined;
  if (!app || !content) notFound();
  return <GlanceAwayLandingV2 app={app} content={content} />;
}
