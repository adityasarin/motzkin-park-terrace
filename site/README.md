# Motzkin Park Terrace: official website

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui (Dialog, Sheet) · Sonner. The plan is in `../docs/PLAN.md` and the design contract in `DESIGN.md`.

## Run it locally
```bash
cd site
npm install
cp .env.example .env.local      # optional; everything works without it
npm run build && npm start      # production build on http://localhost:3000
# or: npm run dev               # dev server with hot reload
```
Without `SHEET_WEBHOOK_URL`, leads are appended to `site/.data/leads.ndjson` (git-ignored). `/design-qa` (worst-case data) is served in dev, or in production only with `ENABLE_DESIGN_QA=1`.

## Where things live
| Path | What |
|---|---|
| `content/project.ts` | **Single source of truth:** facts, prices, RERA, contact. Values to confirm are marked `TODO-VERIFY` |
| `content/*.ts` | FAQs, amenities, floor plans and specs, distances, construction log, insights, ad campaigns |
| `lib/schema.ts` | JSON-LD builders (Organization, ApartmentComplex, Offer, RealEstateListing, FAQPage, BreadcrumbList, Article) |
| `lib/tracking.ts` | UTM, gclid and fbclid capture (sessionStorage), dataLayer events, Pixel `event_id` |
| `lib/siteplan.ts` | Geometry of the illustrative 47-plot site plan |
| `app/api/lead/route.ts` | Lead endpoint: zod validation, honeypot, rate limit, Google Sheet webhook (falls back to a local file), Meta CAPI |
| `app/(site)/` | All public pages, with header, footer and mobile CTA bar |
| `app/lp/[campaign]` | No-navigation ad landing pages (noindex) |
| `app/llms.txt`, `robots.ts`, `sitemap.ts`, `opengraph-image.tsx` | SEO and AEO plumbing |
| `../apps-script/lead-sheet.gs` | Google Sheet receiver with email and WhatsApp alerts |

## Events pushed to `dataLayer`
`lead_modal_open`, `lead_submit` (with `event_id`), `brochure_download`, `visit_booked`, `lead_conversion` (thank-you page), `whatsapp_click`, `call_click`. Map them to GA4, Google Ads and Meta tags in GTM. GTM loads after the first interaction or when the browser is idle, behind a Consent Mode v2 banner.

## Before launch
1. Resolve every `TODO-VERIFY` (run `grep -rn TODO-VERIFY content lib components app`).
2. Replace the drawn site and floor plans with the architect's, and add the project's own photographs (slot sizes are in DESIGN.md).
3. Set the env vars, deploy the Apps Script, and run one test lead through to the Sheet, the email alert, GA4 DebugView and Meta Test Events.
