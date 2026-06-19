# App Landing Page Template

This is the implementation note for the reusable app landing page pattern approved from the GlanceAway page on 2026-05-23.

Use this template when building SEO-friendly app landing pages on `georgevalandis.com` or app subdomains. The page should still make the App Store the primary conversion path.

## Canonical Files

- Reusable React component: `src/components/AppLandingPage.tsx`
- Content records: `src/content/appLandingPages.ts`
- Copyable content template: `src/content/appLandingPages.template.ts`
- Dynamic route wiring: `src/app/apps/[slug]/page.tsx`
- Portfolio card detail link: `src/components/Work.tsx`

## Reuse Flow

1. Add or update the app entry in `src/content/apps.ts`.
2. Add `websitePath: '/apps/{slug}/'` so the portfolio can link to the landing page.
3. Add the app icon to `public/apps/{slug}-icon.png`.
4. Add real screenshots under `public/apps/{slug}/screens/`.
5. Copy the shape from `src/content/appLandingPages.template.ts` into `src/content/appLandingPages.ts`.
6. Replace every placeholder with app-specific product truth, search intent, and real screenshot alt text.
7. Run `next build --webpack`, `tsc --noEmit`, and targeted `eslint`.
8. Verify desktop and mobile in browser before deploying.

## Required Content Shape

Each app landing page needs:

- `appStoreName`: App Store title or keyword-led product name.
- `eyebrow`: short keyword phrase shown above the H1.
- `headline`: one strong benefit line, readable in the first viewport.
- `intro`: one concise paragraph with the core value and natural SEO language.
- `highlights`: four short proof points.
- `screenshots`: four real app screenshots, no placeholders.
- `featureTitle` and `featureIntro`: product section framing.
- `features`: three concrete product-value steps.
- `workflowTitle` and `workflow`: three daily-use steps.
- `privacyTitle` and `privacyDescription`: app-specific trust section.
- `finalCtaDescription`: app-specific final CTA support copy.
- `faq`: three to five search-intent questions.

## Design Rules

- Keep the GlanceAway structure: hero, product view, screenshot gallery, dark workflow/trust section, FAQ, final CTA, legal footer.
- The screenshots are the visual hero. Do not replace them with abstract illustrations or generic cards.
- The first screenshot should show a believable active state with real demo data, not empty values such as `0:00`.
- Use the preferred iPhone mockup style: dark realistic frame, Dynamic Island, status bar, real app screen edge-to-edge.
- Keep copy short. Every section should either explain value, show product truth, build trust, answer search intent, or drive the App Store click.
- Avoid badge/pill clutter, card mosaics, fake UI, and generic SaaS language.

## SEO And Legal

- The dynamic route sets title, description, OpenGraph, Twitter card, and canonical metadata from the content record.
- `AppLandingPage.tsx` emits `MobileApplication` JSON-LD.
- Screenshot alt text must include the app name and the real screen purpose.
- Footer must include `Privacy Policy`, `Terms`, and `Imprint`.
- The landing page `Privacy Policy` must describe data processed by the landing page
  itself: hosting/server logs, cookie consent, optional analytics/marketing consent,
  contact links, and outbound store links. Do not use the mobile app privacy text for
  the landing page privacy link.
- Cookie consent logging uses the shared `/consent/log.php`, `/consent/export.php`,
  and `/consent/delete.php` endpoints. Keep the customer's Consent ID visible in the
  cookie settings so records can be searched and deleted without storing plain IPs.
- Consent must be scoped per standalone homepage. Main site scope is `site`; app
  landing page scope is `app:{slug}`. Browser storage keys and consent export filters
  must preserve that separation so one landing page decision does not silently cover
  another app landing page on the same host.
- For subdomain deploys, rewrite canonical/OG/JSON-LD URLs to the subdomain root and verify the live page.

## Deployment Notes

For ALL-INKL static subdomain deploys, the GlanceAway deployment used a static, non-hydrating HTML export because serving the `/apps/{slug}/` Next route at subdomain root caused a client-side exception.

Deploy at least:

- `index.html`
- `/_next`
- `/apps/{slug}/screens`
- `/apps/{slug}-icon.png`
- `/privacy-statement`
- `/terms-and-conditions`
- `/consent/log.php`
- `/consent/export.php`
- `/consent/delete.php`
- `.htaccess`
- `favicon.ico`

After upload, verify:

- Live URL returns `200`.
- CSS, screenshots, app icon, and favicon return `200`.
- Privacy and Terms return `200`.
- Browser console has no errors.
- Canonical URL points to the actual live URL.
