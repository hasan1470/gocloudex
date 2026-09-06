# GoCloudEx

The official GoCloudEx website: **https://gocloudex.com**.

Business website, service pages and a portfolio of client work, independent products and functional demos. Built with Next.js App Router, React, TypeScript and Tailwind CSS. The existing MongoDB CMS, admin, chat and contact integrations are retained.

## Run locally

Use Node.js 22 or later. Keep the existing private `.env.local` outside Git.

```bash
npm ci
npm run dev
```

The existing server integrations use `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` and the server email configuration. Do not put passwords or API secrets in variables prefixed with `NEXT_PUBLIC_`.

## Checks

```bash
npm run test
npm run lint:marketing
npm run build
npm run start
```

`lint:marketing` checks the redesigned public pages and their shared components with zero warnings allowed. The broad `npm run lint` also checks the older admin/chat/contact code, which has pre-existing issues outside this update. See `docs/website-refresh.md` for the verification boundaries.

## Edit content

- `src/data/services.ts`: eight services, deliverables, FAQs, technologies and related projects.
- `src/data/showcase.ts`: verified project entries, case studies, live links, source links and independent design references.
- `public/portfolio/`: optimized screenshots of the actual project websites.
- `src/lib/portfolio.ts`: merge curated entries with eligible published CMS records.
- `src/components/marketing/`: shared project, service and section components.
- `src/app/marketing.css`: responsive public-site design, with light/dark appearance support.

Read `docs/portfolio-sources.md` before adding work. Preserve demo labels and original starter credits. External reference sites are never represented as GoCloudEx clients or projects.

## Rendering and deployment

The home and service pages are prerendered. Curated case studies are statically generated; the CMS-backed collection and sitemap use the existing one-hour revalidation interval. The mandatory timed loading overlay has been removed.

The Vercel project is connected to this GitHub repository. Verify the production build before publishing to the production branch. Keep the existing domain and private environment settings. No database migration is required for the website refresh.

## Deferred work

Chat, contact/email and admin workflow changes are outside this public-site refresh. No production database records were changed or deleted. The dependency audit still flags the existing Nodemailer major version; its upgrade and email regression testing belong to the deferred contact/email work.
