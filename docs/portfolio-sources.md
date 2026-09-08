# Portfolio sources and maintenance

Verified on 7 September 2026 against the owner's repositories, the companion project audit and the public home pages. Project previews are actual browser screenshots, compressed to WebP; no third-party design is presented as GoCloudEx work.

| Case study | Public experience | Source | Classification |
| --- | --- | --- | --- |
| ThemeFoundry | https://themefoundry-marketplace.vercel.app | https://github.com/hasan1470/themefoundry-marketplace | Portfolio demo; browser-local catalog, customizer and free source exports |
| Vettedly | https://vettedly.vercel.app | https://github.com/hasan1470/vettedly | Portfolio demo; illustrative products and browser-local publishing |
| StoreMind | https://storemind-ai-chatbot.vercel.app | https://github.com/hasan1470/storemind-ai-chatbot | Portfolio demo; deterministic retrieval, optional connected integrations require configuration |
| CraftLab | https://product-designer-plugin.vercel.app | https://github.com/hasan1470/product-designer-plugin | Portfolio demo; browser-local designs and simulated orders |
| Toolstack | https://toolstack-lovat.vercel.app | https://github.com/hasan1470/Toolstack | Independent product |
| PocketWise | https://pocketwise-personal-finance-app.vercel.app | https://github.com/hasan1470/pocketwise-personal-finance-app | Independent product, public web demo |
| Shopcart | https://shopcart-neon.vercel.app | https://github.com/hasan1470/shopcart | Portfolio demo; commerce starter customization |
| Prescripto | https://prescripto-doctorbooking.vercel.app | https://github.com/hasan1470/prescripto | Portfolio demo; original GreatStack starter credit retained |
| Recast AI | https://ai-content-repurposer-orcin.vercel.app | https://github.com/hasan1470/ai-content-repurposer | Independent product; public mode uses local source-based templates |
| Blogger Studio | https://blog-app24.vercel.app | https://github.com/hasan1470/blog-app | Portfolio demo; blog starter customization |
| Jeniffer Urbáez | https://jeniffer-urbaez-world.andreas-stahl632934.chatgpt.site | https://github.com/hasan1470/jenifurro-realstate-deco-collection-website | Client website implementation, public project preview |

## Editorial rules

### Preview update — 8 September 2026

The three recent repositories above were checked against their public GitHub descriptions and READMEs. ThemeFoundry and Vettedly public pages were inspected. StoreMind's public URL timed out during this check; its preview was captured from a local production build of the clean repository at commit `3c4104b944361a9bd7933ee67396d0868294d09a`, matching GitHub HEAD. Its live URL remains the repository's published homepage, not a newly verified availability claim.

All 11 case studies now have separate lossless WebP assets in `public/portfolio/detail`, encoded from the original browser captures at their native dimensions (1265–1425 pixels wide). ThemeFoundry and StoreMind use fresh PNG captures; the remaining captures include original JPEG browser output. Lossless encoding preserves those source pixels; it does not invent higher resolution. Detail pages bypass a second lossy optimization pass, use accurate intrinsic dimensions, avoid cropping, and link to the full-size file. Cards retain smaller compressed assets. Future captures should use PNG directly, without resizing or JPEG intermediates.

- Describe the implementation and the work performed. Do not invent client counts, awards, revenue, conversion uplifts or testimonials.
- Keep prototype/demo limitations visible next to each case study. Simulated orders, payments and appointments are not real transactions or bookings.
- Retain starter and third-party credits. A public repository is evidence of the implementation, not a claim that every underlying component was authored from scratch.
- Curated case studies live in `src/data/showcase.ts`; screenshots live in `public/portfolio`. Update the entry and screenshot when the public experience changes.
- Services and their relevant-project links live in `src/data/services.ts`. The tests check that these links resolve to real entries.
- Published CMS projects are still read and merged into the collection. Curated slugs/repositories take precedence to avoid duplicates. A CMS record whose only external links are local/admin placeholders is omitted from the public collection without deleting or changing the database record.
- CMS rich-text overviews are sanitized before display. Add real public links to publish the existing localhost placeholder. New CMS entries currently receive the neutral Portfolio demo label; add a curated entry to supply a verified project classification and full case study.
- The old award/client-story/open-source example routes redirect to the relevant portfolio view. They no longer show hardcoded recognition or testimonial claims.

## Reference shelf

https://linear.app, https://stripe.com and https://www.gov.uk are explicitly labeled independent references created by their respective teams. Only links and original short commentary are included. These are not client work, endorsements or claimed affiliations.

## Verification boundaries

Public project home pages were inspected and captured for this update. The companion task's `D:/MERN/All New/portfolio-audit/PORTFOLIO_STATUS.md` records functional and deployment checks for the six app demos. The GoCloudEx task tested its own routes, filters, case studies and responsive presentation; it did not repeat every external application's integration tests.

Chat, contact forms, email delivery and administrative workflows were outside this redesign. No database content was written or deleted.
