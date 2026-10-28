# melza.eu

Static rebuild of the Melza website (previously WordPress), hosted on Netlify.

- `npm install` and `npm run dev` to work locally, `npm run build` to build into `dist/`.
- Pages keep the WordPress URLs (trailing slash) so search rankings carry over. Old URLs that no longer exist redirect with a 301 from `netlify.toml`.
- Images live in `public/wp-content/uploads/` at their original paths.
- Job offers are read from the public Manatal careers page at build time (`src/lib/jobs.ts`). A GitHub Action rebuilds every morning; it needs the repository secret `NETLIFY_BUILD_HOOK`.
- Forms (contact, CV, newsletter) use Netlify Forms. Set the notification email in Netlify → Forms → Form notifications.
- Analytics: GA4 `G-FB2C7TS4Z1` with Consent Mode; nothing is stored until the visitor accepts the cookie banner.
