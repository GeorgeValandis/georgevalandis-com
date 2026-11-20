import { glanceAwayGuidePath, glanceAwayGuides } from '@/content/glanceawayGuides';

/** Internal links from the GlanceAway product pages to the search-intent guides.
 * Plain <a> on purpose: a full page load lets campaign.js tag the store links. */
export default function GlanceAwayGuideLinks({ stacked = false }: { stacked?: boolean }) {
  return (
    <nav
      aria-label="GlanceAway guides"
      className={
        stacked
          ? 'mt-10 flex flex-col items-start gap-3 text-base'
          : 'flex flex-wrap items-baseline gap-x-5 gap-y-2 pt-8 text-sm'
      }
    >
      <span className="font-bold text-slate-950">Guides</span>
      {glanceAwayGuides.map((guide) => (
        <a
          key={guide.slug}
          href={glanceAwayGuidePath(guide.slug)}
          className="font-semibold text-slate-600 transition hover:text-slate-950 active:opacity-60"
        >
          {guide.title}
        </a>
      ))}
    </nav>
  );
}
