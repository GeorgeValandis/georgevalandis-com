import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const landingPagesPath = path.join(repoRoot, 'src/content/appLandingPages.ts');
const source = fs.readFileSync(landingPagesPath, 'utf8');

const legacyPosterVariantAllowlist = new Set([
  '/apps/frokus/screens/timer.jpg',
  '/apps/frokus/screens/settings.jpg',
  '/apps/frokus/screens/notifications.jpg',
]);

const knownStorePosterBasenames = new Set([
  'score-darts-fast.png',
  'see-checkout-hints.png',
  'enter-scores-quickly.png',
  'tap-common-scores.png',
  'play-301-or-501.png',
  'checkout-hints.png',
  'common-scores.png',
  'enter-scores.png',
]);

const suspiciousAssetNamePattern = /(^|[-_])(app-?store|asc|mockup|poster|storefront)([-_.]|$)/i;
const screenshotObjectPattern = /{\s*src:\s*'([^']+)'([\s\S]*?)}/g;
const failures = [];
const checked = [];

for (const match of source.matchAll(screenshotObjectPattern)) {
  const [, src, objectBody] = match;

  if (!src.startsWith('/apps/') || !src.includes('/screens/')) {
    continue;
  }

  const variantMatch = objectBody.match(/variant:\s*'([^']+)'/);
  const variant = variantMatch?.[1] ?? 'phone';
  const basename = path.basename(src);
  const diskPath = path.join(repoRoot, 'public', src.replace(/^\//, ''));
  checked.push(src);

  if (!fs.existsSync(diskPath)) {
    failures.push(`${src}: referenced screenshot file does not exist.`);
  }

  if (variant === 'poster' && !legacyPosterVariantAllowlist.has(src)) {
    failures.push(
      `${src}: uses variant 'poster'. Website landing pages must use raw app screenshots in the site's own phone frame.`
    );
  }

  if (knownStorePosterBasenames.has(basename) || suspiciousAssetNamePattern.test(basename)) {
    failures.push(
      `${src}: filename looks like a Store/ASC poster asset, not a raw app screenshot.`
    );
  }
}

if (failures.length > 0) {
  console.error('Landing screenshot validation failed:\n');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  console.error(
    '\nRule: public/apps/{slug}/screens/ must contain raw app screenshots from the app or simulator, not App Store Connect posters or mockup-poster assets.'
  );
  process.exit(1);
}

console.log(`Landing screenshot validation passed (${checked.length} screenshots checked).`);
