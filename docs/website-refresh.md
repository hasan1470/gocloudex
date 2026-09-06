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

## Hero and color refinement

- Replaced the homepage project preview with an original layered cloud illustration, rendered as inline SVG and animated with CSS. The hero now links to services and about; portfolio entries remain in the dedicated work section.
- Added navy navigation and page introductions, mint accents, warmer content surfaces and a dark process section to connect the design with the footer.
- Renamed the shared navigation links to “Our services” and “About us.”
- The animation has a keyboard-accessible pause/play control, pauses automatically outside the viewport and becomes static when reduced motion is requested. It adds no video, image request or animation dependency. The previous forced loading screen remains removed.
- Re-ran the production build, marketing lint, three regression tests and 24 route/metadata checks plus the missing-project and three redirect checks; all passed.
- Browser verification covered desktop and 390px phone layouts, mobile navigation, light/dark appearance, service and portfolio introductions, pause/play, offscreen pause and emulated reduced motion. No horizontal overflow was found on the checked phone layouts and no browser errors were reported.

## Readability and appearance refinement

- Raised small public labels to at least 14px at the standard reading size, with larger body copy, navigation, tags, controls and footer links. Converted marketing type to relative units so the new Larger reading option scales it consistently.
- Reduced the public wordmark to 19–20px at standard size and simplified the admin logo. Adjusted navigation breakpoints and mobile admin header spacing to accommodate readable text.
- Rebuilt appearance around six coordinated palettes, including a default Teal palette. The hero artwork, buttons, footer, navigation, settings dialog and admin surfaces now use the same color tokens. Light and dark surfaces have their own text and border colors.
- Added labeled color choices, Standard/Larger text settings, validated preference restoration, cross-tab synchronization and a fix for incorrect Light/Dark selection after a saved dark-mode reload.
- Added the missing `/admin/settings` page for appearance and reading preferences. Admin labels, form inputs and table text use the shared reading scale; the sidebar scrolls on short screens and supports Escape dismissal on mobile.
- Verification includes all six palettes in both modes, reading preferences after reload, cross-tab synchronization, 320px larger-monospace and 390px phone layouts, and the admin header/sidebar/settings with representative form and table content. The temporary admin presentation fixture was removed before the production build. Authenticated dashboard verification is pending a signed-in session; no admin data was edited during these checks.
- Six regression tests cover portfolio behavior, palette contrast, preference restoration and rejection of invalid stored preferences. `lint:appearance` provides a strict check for the shared appearance and modified admin components alongside `lint:marketing`.

## Typography, motion and CraftLab follow-up

- Balanced the logo at 22px on desktop and 21px on phones (standard reading size), with a 32px/30px cloud. Reduced introductory page headings to a maximum of 50px, and the home headline to 52px. Smaller screens use a separate fluid scale; reading-size preferences remain effective.
- Changed the closing "Have something worth building?" section to the normal website background and text colors in both modes. Its button follows the selected accent, while the main footer retains its dark brand surface.
- Added a brief page-arrival line, finite heading entrances and once-per-visit section-heading reveals. Text remains in server-rendered HTML. Reduced-motion preferences disable the entrance effects and cancel active scroll reveals.
- Public navigation uses Next.js `useLinkStatus` for an accessible loading line during actual pending transitions. Verified the indicator on a throttled navigation and its removal after arrival; existing prefetching remains enabled and no artificial loading delay is added.
- Added CraftLab, the owner's product-designer repository, as the eighth case study and linked it from the e-commerce service. The 44 KB WebP preview is a real desktop capture. Features and demo boundaries were checked against the repository README and public editor; no live payment/store integration is claimed.
- Verified the production layout on desktop and at 320px with Larger/Mono preferences, including all public introduction types. This exposed an About-page grid minimum-width issue; its children now shrink to fit the narrow column.
- Final verification passed: production build/TypeScript, both scoped lint commands, six regression tests, 25 public page/metadata routes, the unknown-project 404 and three legacy redirects. The rebuilt About page has no horizontal overflow at 320px with Larger/Mono enabled; its mobile menu opens and closes correctly.
