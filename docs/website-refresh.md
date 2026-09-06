# GoCloudEx public-site refresh — 7 September 2026

## Delivered

- Redesigned home, services, portfolio, case studies, about, shared navigation and footer.
- Eight distinct service pages with deliverables, suitable project types, process, related work and native expandable FAQs.
- Seven verified project entries with actual screenshots, repository links, public URLs, clear project classifications, practical walkthroughs and demo limitations.
- Shareable portfolio category/search state, empty-state recovery and working legacy-route redirects.
- Source-controlled service and portfolio content, while retaining the existing CMS records and eligible published-project merge.
- Removed the mandatory one-second loading screen and its half-second fade on every navigation.
- Added responsive WebP previews, static service pages and case studies, canonical URLs, a sitemap, robots rules and a generated social preview.
- One accessible appearance dialog with focus handling supplied by the native modal dialog, Escape dismissal and light/dark/color/font preferences.

## Verification

- Production build and TypeScript completed successfully with Next.js 16.3.4.
- `npm run lint:marketing` passed with no errors or warnings.
- Three meaningful regression tests passed: public URL handling, combined portfolio filters/search and valid service-to-project links.
- HTTP checks: 24 expected page/metadata URLs returned 200; unknown project returned 404; all three legacy portfolio routes returned 308 with the intended destination.
- Browser checks: desktop home and portfolio layout, actual project images, category + text search, no-results and reset, service FAQ expansion, mobile navigation opening/closing, appearance dialog and Escape, light/dark mode.
- At a 390px browser viewport (375px content area after the scrollbar), home, portfolio, a case study and a service detail had no overflowing main-content elements.
- Contact remained reachable with HTTP 200. No messages, emails, bookings, database writes or admin changes were made as part of this update.

## Payload comparison

Measured uncompressed HTML and directly referenced JavaScript, comparing the previous live deployment with the final local production build. These are payload sizes, not Lighthouse scores, compressed transfer sizes or real-user timing results.

| Route | Previous HTML bytes | Updated HTML bytes | HTML reduction |
| --- | ---: | ---: | ---: |
| Home | 274,615 | 74,187 | 73.0% |
| Services | 152,114 | 62,567 | 58.9% |
| Portfolio | 53,352 | 32,805 | 38.5% |
| Website design service | 125,475 | 56,016 | 55.4% |

Directly referenced JavaScript remains approximately 631–654 KB uncompressed after the framework update. No broad JavaScript speedup is claimed. All seven WebP previews together are about 263 KB; offscreen previews are lazy-loaded and responsive sizes are supplied.

## Existing issues and scope

The original repository-wide lint baseline contained 88 errors and 81 warnings in older code. The refreshed public-site scope passes its own strict lint command. Remaining admin/chat/contact work was explicitly deferred.

The full dependency audit was reduced to one high-severity finding in the existing Nodemailer major version. Upgrading it to the required new major and verifying email behavior is deferred with the contact/email work. No paid services were enabled and no hosting or domain settings were changed.

The original production commit was `1cd9433fb44e54d4d8d98ce3d0f6e69e29c497a0`, deployed by Vercel as `5UGoP4kk2B9d3djdtAXbyvnAUCqT`. This identifies the previous release for rollback if needed.

Local verification evidence is saved outside the repository at `D:/MERN/All New/gocloudex-audit/`.
