# Cloudflare Web Analytics

The homepage includes the Cloudflare Web Analytics beacon when the build variable
`NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` is present. When the variable is missing,
the beacon is not emitted.

## Activate it

1. In Cloudflare, open **Web Analytics** and add the relevant hostname.
2. Use the manual JavaScript setup so the existing hosting and DNS configuration remain unchanged.
3. Set the site token in the environment used for the static build:

   ```text
   NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN=your-site-token
   ```

4. Run `npm run build` and deploy the resulting `out/` directory.

Do not commit the token or a local `.env` file. Only one Web Analytics beacon should be active:
do not enable Cloudflare's automatic injection in addition to the beacon included by this app.

The Cloudflare beacon itself does not use cookies or Local Storage. The Cookie Information dialog
offers an analytics opt-out. When a visitor disables analytics, the site stores only the necessary
first-party cookie `gv_analytics_optout` for up to 180 days to remember that preference; no
analytics data is stored in that cookie. The separate `gv_cookie_notice_*` cookie remembers that
the visitor acknowledged the cookie notice.

## Verify the deployment

After deployment, open the site with browser developer tools and confirm that the beacon loads
from `https://static.cloudflareinsights.com/beacon.min.js`. Cloudflare's dashboard should start
showing data after the first real page views.

The main English and German privacy statements, as well as the app landing-page privacy text,
describe this integration and link to Cloudflare's current Privacy Policy and Data Processing
Addendum.
