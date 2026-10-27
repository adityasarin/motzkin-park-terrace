# Motzkin Park Terrace: Official Website, AEO/SEO and Lead-Gen Plan

## Context
The developer of **Motzkin Park Terrace** (Thyavakanahalli, Sarjapur–Attibele Road, Bengaluru 562125) needs an official, luxury-grade website that:
- generates passive leads (SEO and AEO) and active leads (Meta and Google Ads),
- sends every lead into a manual follow-up pipeline,
- ranks above competitors and broker microsites in regional Google search and in AI answers (ChatGPT, Perplexity, Gemini, Google AI Overviews).

The working directory is empty, so this is a greenfield build. Content will use the publicly listed project data as placeholders, and imagery will use designed placeholders until real assets exist.

Note on the `/business-analyzer` skill: its CSV and scrapViewer steps don't apply because there's no gmapsdata. Its gap framework (GBP, directories, NAP, schema, GEO) is adapted below, and its report outputs are produced from the web research instead.

---

## Skills and how each is used
Installed skills are tracked in `docs/SKILLS-INSTALLED.md`. Each has a defined job in the build.

| Phase | Skill(s) | Use in this project |
|---|---|---|
| Art direction | `design-taste-frontend` (primary), `frontend-design`, `ui-ux-pro-max` / `bencium-controlled-ux-designer` as second opinions | Pick a researched direction (composition, type, palette, photo treatment, section blueprints) and enforce its no-slop rules. Replaces the hand-picked palette previously in §2. |
| Design system doc | `create-design-md`, `impeccable` (document mode) | Write `site/DESIGN.md` (tokens, type scale, spacing, motion rules, do/don't) once the direction is chosen. Every later step reads it. |
| Components | `shadcn`, `pick-ui-library`, `ask-sonner` | shadcn primitives themed from DESIGN.md tokens: Dialog → LeadModal, Form, Tabs → FloorPlanTabs, Accordion → FAQ, Sheet → mobile nav, Select, Calendar for visit date. Sonner for form success/error toasts. |
| Framework | `nextjs-developer`, `react-best-practices`, `composition-patterns` | App Router structure, `generateMetadata`, route handler, loading/error boundaries, RSC by default with client islands only where needed, compound components for LeadModal and FloorPlanTabs. |
| Typography | `typography` | Applied to all copy: real quotes, en/em dashes, ₹ and number spacing, tabular figures for prices and distances. |
| Motion | `animate`, `emil-design-eng`, `apple-design`, `animation-vocabulary`, `react-view-transitions` | Motion spec in DESIGN.md: hero entrance, scroll reveals, modal spring, stats count-up, page transitions between BHK pages. The vocabulary skill names effects precisely in briefs. |
| Mobile | `mobile-native` | Fix 100vh, input zoom (16px inputs), tap highlight, safe-area insets for the sticky bottom CTA bar, `tel:` and WhatsApp deep links. Most leads will arrive on phones. |
| Hardening | `break-ui` | Stress-test LeadForm, PriceTable, FactsTable and FAQ with worst-case data (long names, country-code phones, empty fields, 30+ FAQs, Kannada/Devanagari names). |
| Review loop | `impeccable` (critique, polish, harden), `design-audit`, `web-design-guidelines`, `review-animations`, `find-animation-opportunities`, `animation-performance`, `improve-animations` | Run after each milestone; findings are fixed before launch. |
| SEO/AEO and perf | `bencium-aeo`, `vercel-optimize`, `deploy-to-vercel` | Answer blocks, evidence panels, FAQ schema; cost and Core Web Vitals pass; deploy. |
| Marketing | `business-analyzer`, `insurgent-campaign`, `dataviz` | Gap report, low-budget trust-first campaign design against bigger-budget rivals, charts for the report and `/location`. |

**Not used here:** `animate-expo`, `write-swift` (no native app). `prototype` only if a hero-motion spike is needed.

---

## 1. Research Findings

### The project (public listings: verify each item with the developer)
| Fact | Listed value | Conflict seen online |
|---|---|---|
| Units / land | 47 villas on ~2.1 acres | 2.06 vs 2.15 acres; "47–48 units" |
| Configurations | 3 BHK 1,977 sq ft (~₹1.48 Cr), 4 BHK 2,579 sq ft (~₹1.93 Cr); some listings say 5 BHK, up to 3,180 sq ft | Resale 4 BHK ₹1.8–2.75 Cr |
| RERA | PRM/KA/RERA/1251/308/PR/180120/001659 | none |
| Developer name | Motzkin Group / Motzkin Ventures / Motzkin Developers Pvt Ltd | **3 different names** |
| Status | "Ready to move" / Dec 2019 / Aug 2025 / Dec 2025 | **4 different dates** (you said under construction) |
| Amenities | Clubhouse, pool, kids' pool, gym, badminton, basketball, cricket, yoga, jogging/cycle track, library, party hall, STP, RWH, solar lighting | none |
| Nearby | Indus Intl School, Motherhood Hospital (~3.2 km), Sarjapura town (~3 km), Bommasandra industrial area (~9.6 km) | ORR distance given as "6 km" vs "18 km" |

### Competitive set (Sarjapur–Attibele / Dommasandra villa belt)
| Project | Price from | Scale | Positioning / stand-out feature |
|---|---|---|---|
| NVT A Wonderful World | ₹3.15 Cr | ~100 acres, pre-launch | Mega-township, blog-driven SEO (nvtvillassarjapur.com runs commute guides) |
| Evo Aeris (reference) | ₹2.6 Cr | 13 of 60 acres, 166 villas | Miyawaki forest, Tata Capital funded, 45k sq ft club, keyword chips, WhatsApp CTA |
| JRC Palladio | ₹2.09 Cr | Triplex villas | Triplex design |
| MJR Divine Meadows | ₹2.75 Cr | 137 duplex villas | Sarjapur town |
| Nambiar Bellezea / Ellegenza | ₹4.96 Cr+ | 110 / 30 acres | Ultra-luxury, large plots |
| Total Environment Sarjapur | On request | 22–30 acres | Brand-led; **RERA pending** |
| ATCO La Vivant, Mitta Orrin | ₹1.17–3.15 Cr | Mid | Direct price competitors |
| Supreme Villagio (reference, Pune) | ₹2.89 Cr | 16 acres | Landscape-architect story, awards, EMI calc, OTP forms, RERA QR, "beware look-alike sites" banner |
| Daiwik Sayuri (reference) | ₹2.96 Cr | 13.5 acres | Courtyard (Nalukettu) story, gated price ("Unlock Price"), interactive landmark map, detailed spec sheet |

**Patterns all competitors share:** a hero with price and RERA; gated cost sheet / brochure / floor plans; amenities icon grid; connectivity distances; FAQ; RERA and disclaimer footer.
**What they get wrong (our opening):** every reference site has inconsistent facts (price, distance, unit count), and none showed JSON-LD schema. Most are broker microsites competing for the same brand keyword.

### Gaps for Motzkin Park Terrace (business-analyzer framework)
| # | Gap | Severity |
|---|---|---|
| 1 | No official website; brand searches go to 10+ broker and aggregator pages (motzkinparkterrace.com/.in, cityair, 99acres, SquareYards, Dwello, CommonFloor, Quikr) | **Critical** |
| 2 | Entity confusion: 3 developer names, 4 possession dates, 2 land areas. AI engines can't verify the entity, so they won't cite it | **Critical** |
| 3 | GBP address reads "Unnamed Rd"; listing has thin categories, photos and description | High |
| 4 | No Organization / ApartmentComplex / FAQPage schema anywhere | High |
| 5 | No owned content answering "villas under 2 Cr Sarjapur", "STRR impact", or "Sarjapur–Attibele metro" | High |
| 6 | Justdial listing exists but is unclaimed/unoptimised; Bing Places status unknown | High |
| 7 | No ads tracking infrastructure (Pixel/CAPI, Google Ads conversions, UTM capture) | High |

### Positioning: how Motzkin Park Terrace stands out
1. **"The most accessible gated villa on Sarjapur–Attibele Road."** At ₹1.48–1.93 Cr it costs 30–50% less than NVT, Evo, MJR and Nambiar. Own the "villas under ₹2 Cr Sarjapur" query cluster.
2. **Boutique, low-density community:** 47 homes on 2 acres, against 100-acre townships. Pitch it as "know every neighbour" with private villa ownership, not a township.
3. **Certainty over promises:** the project is near completion and RERA-registered, unlike pre-launch or RERA-pending rivals. Use construction-progress transparency as a trust weapon.
4. **Single source of truth:** an "Official Project Facts" page with verified numbers, a RERA QR code and a "Beware of unofficial sites" note (borrowed from Supreme). This fixes the entity conflict for both Google and the AI engines.

Target buyers: IT professionals at ORR, Sarjapur, Electronic City and Wipro (aged 30–45, upgrading from an apartment); NRI investors (US, UAE, UK); Bommasandra / Attibele business owners; families seeking Indus / Inventure-belt schools.

---

## 2. Website Build (Next.js on Vercel)

### Stack
- **Next.js 15 (App Router) with static export where possible**, TypeScript, Tailwind CSS v4, `next/font` (self-hosted fonts), `next/image`.
- **UI layer:** shadcn/ui primitives (`components.json`, themed from `site/DESIGN.md` tokens), Sonner for toasts, and `motion` only if CSS and View Transitions can't cover a case.
- **Build conventions (`nextjs-developer`):** Server Components by default; `generateMetadata` per route fed from `content/project.ts`; `loading.tsx` / `error.tsx` boundaries; `next/image` with placeholders; zod validation in the route handler.
- Content lives in typed `content/*.ts` files: `project.ts` holds the single source of truth (facts, prices, RERA, distances), plus `faqs.ts`, `amenities.ts`, `floorplans.ts` and `posts/` (MDX). Every page and every schema block reads from `project.ts`, so the facts can't drift.
- One serverless route, `app/api/lead/route.ts`. It validates input (zod plus a honeypot), forwards to a Google Apps Script webhook (Sheet), fires the Meta Conversions API event, and returns the Sheet result.
- Env vars: `SHEET_WEBHOOK_URL`, `META_PIXEL_ID`, `META_CAPI_TOKEN`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_PHONE`.

### Project layout (to be created in `RealestateProject/`)
```
site/                      Next.js app
  app/(pages)/…            routes below
  app/api/lead/route.ts
  DESIGN.md                design contract (tokens, type, motion, do/don't), from create-design-md
  components/ui/           shadcn-generated primitives
  components/              Hero, StatsStrip, FactsTable, AmenityGrid, FloorPlanTabs,
                           LocationMap, ConnectivityTimeline, PriceTable (gated),
                           EmiCalculator, FAQ, LeadForm, LeadModal, StickyMobileCTA,
                           WhatsAppFab, RERABadge, Placeholder (art-directed image stand-in),
                           AnswerBlock (40–60-word AEO lead), EvidencePanel (RERA QR, dated sources)
                           LeadModal, FloorPlanTabs, FAQ, LeadForm are built on shadcn primitives
  content/project.ts       ← single source of truth
  lib/schema.ts            JSON-LD builders
  lib/tracking.ts          dataLayer / fbq / UTM capture helpers
  public/llms.txt, robots.txt (via app/robots.ts), sitemap (app/sitemap.ts)
apps-script/lead-sheet.gs  Google Sheet webhook + email/WhatsApp alert
docs/                      marketing-plan.md, competitor-analysis.md, gbp-playbook.md,
                           content-calendar.md, ad-campaigns.md, design-direction.md
                           (taste-skill output, chosen direction, section blueprints)
business-reports/motzkin-park-terrace/
                           gap-analysis.html (+pdf), elevator-pitch.md
```

### Routes
| Route | Purpose / target query |
|---|---|
| `/` | Hero (price + RERA + one primary CTA), facts, story, amenities, plans, location, price (gated), progress, FAQ, CTA |
| `/3-bhk-villas-sarjapur-attibele-road` | 3 BHK detail page with plan, specs, cost-sheet gate |
| `/4-bhk-villas-sarjapur-attibele-road` | 4 BHK detail page |
| `/price-list` | Gated cost sheet; "villas under 2 crore Sarjapur" |
| `/amenities`, `/specifications`, `/master-plan` | Long-tail queries plus AI extraction |
| `/location` | Interactive landmark map with distances and commute times to ORR, Wipro, Electronic City, Bommasandra, airport; commute chart built to the `dataviz` rules |
| `/construction-updates` | Dated progress log (photo placeholders); freshness signal |
| `/official-facts` | Verified fact sheet, RERA QR, developer legal name, "official site only" note; feeds AI entity data |
| `/nri` | NRI buying guide (POA, FEMA, home loans, virtual tour) |
| `/faq` | 30+ Q&As with FAQPage schema |
| `/insights/*` | Area guides (see content plan) |
| `/lp/[campaign]` | No-nav, single-column, mobile-first ad landing pages (noindex) for Meta and Google; tested with `break-ui` and the `mobile-native` checklist |
| `/design-qa` | Dev-only, noindex: worst-case data states for `break-ui` (excluded from sitemap, blocked in production) |
| `/contact`, `/privacy`, `/disclaimer`, `/thank-you` | `/thank-you` fires the conversion event |

### Design direction: "quiet luxury, boutique estate" (process, not a fixed spec)
The brief stays: calm, premium, boutique, trustworthy. The concrete palette, type and layout are decided by the skills below, then locked in `site/DESIGN.md`.
- **Step A, Direction:** run `design-taste-frontend` to deal a direction for a boutique gated-villa site (idea, composition, type, palette, photo treatment, section blueprints) and run its inspector. Record the result in `docs/design-direction.md`. Second opinions from `frontend-design` and `ui-ux-pro-max`.
- **Step B, Lock:** write `site/DESIGN.md` with `create-design-md`: colour tokens (light and dark on `:root`), type scale, spacing, radii, elevation, motion durations and easings, imagery rules, component do/don'ts.
- **Step C, Build:** shadcn primitives plus Tailwind v4 tokens from DESIGN.md; `typography` rules applied to all copy.
- **Step D, Look-and-fix loop:** screenshot at 360 / 768 / 1440 px, run the taste inspector, `impeccable` critique and polish, `web-design-guidelines`; fix and repeat until clean.
- **Fallback only:** the earlier draft (Deep Forest `#1F2A24`, Ivory `#F7F3EC`, Warm Brass `#B08D57`, Stone `#8A8478`, Charcoal `#14140F`; Cormorant Garamond/Fraunces plus Manrope) is the most common "luxury real estate" look. Avoid it or subvert it knowingly; use it only if Step A yields nothing better.
- **Layout ideas kept:** full-bleed cinematic hero (placeholder: slow gradient with an architectural line-drawing SVG), editorial split sections, oversized numerals ("47 homes · 2 acres · ₹1.48 Cr"), hairline dividers, subtle scroll reveals (respect `prefers-reduced-motion`). Per-page section blueprints come from the taste skill's library and are recorded in `docs/design-direction.md`.
- **Placeholders:** a `<Placeholder label="Artistic impression: Villa façade" ratio="16/9">` component renders a tasteful tonal gradient with a line-art motif and a caption, so it can be swapped for real photos without layout change. No stock or fake photography is passed off as the project.
- **Conversion UX:** sticky header CTA ("Book a Site Visit"); a sticky mobile bottom bar (Call · WhatsApp · Enquire); an exit-intent and 45-second brochure modal (desktop only); every gated asset (cost sheet, brochure, floor plans) opens the same `LeadModal` with an `intent` field.
- **Forms:** name, phone (+91 default with a country picker for NRIs), configuration, preferred visit date, and a DPDP-compliant consent checkbox. No OTP at launch, to keep friction low. Add it later if spam appears.
- **Performance budget:** LCP < 2.0 s on 4G, CLS < 0.05, JS < 120 KB on the home page. GTM loads after interaction or idle.

### Motion and interaction spec (`animate`, `emil-design-eng`, `apple-design`)
- **Rules:** animate only with a purpose; transform and opacity only; UI transitions ≤ 250 ms, longer only for hero and scroll storytelling; custom easing curves, not defaults; modal and sheet must be interruptible; no animation on high-frequency actions.
- **Moments:** hero entrance, stats count-up, floor-plan tab crossfade, amenity grid stagger, modal open (spring), sticky bar hide/show on scroll, view transitions between BHK pages and from list to detail (`react-view-transitions`).
- **Guards:** `animation-performance` check on every moment; `find-animation-opportunities` and `review-animations` at each milestone; the JS budget above still applies.

### Mobile behaviour (`mobile-native`)
16px minimum input size (no iOS zoom), `100dvh` instead of `100vh`, safe-area insets on the sticky bottom bar, no sticky hover states, no tap-highlight flash, `tel:` and `wa.me` deep links, and a real-device test on iOS Safari and Android Chrome.

### SEO and AEO implementation
- **Schema (lib/schema.ts, injected per page):** `Organization` (legal name, logo, sameAs → GBP, Justdial, 99acres, Instagram, Facebook, YouTube); `ApartmentComplex` / `Residence` with `numberOfAccommodationUnits`, `geo`, `address`, `amenityFeature`; `Offer` for each configuration (priceSpecification "starting from"); `RealEstateListing` on the BHK pages; `FAQPage`; `BreadcrumbList`; `Article` on insights.
- **AEO content pattern:** every page opens with a 40–60-word direct answer block ("Motzkin Park Terrace is a RERA-registered gated community of 47 villas…"), followed by a facts table, then detail. Q&A H2s phrased the way buyers ask questions.
- **`bencium-aeo` patterns:** each page template carries an `AnswerBlock` and an `EvidencePanel` (dated, sourced facts, RERA QR). FAQ answers cite their source on `/official-facts`. Each template gets an "AEO readiness" checklist (extractable answer, fact table, schema, freshness date).
- **`/llms.txt`** gives a concise canonical project summary and links. `robots.ts` explicitly allows GPTBot, PerplexityBot, ClaudeBot and Google-Extended.
- **Keyword clusters:** brand ("motzkin park terrace", "price", "review", "floor plan"); category ("villas in Sarjapur Attibele Road", "3 BHK villa Sarjapur", "villas under 2 crore Sarjapur", "gated villas near Dommasandra", "villas near Indus International School"); intent ("ready to move villas Sarjapur", "NRI villas Bangalore").
- **Off-site entity work** (in `docs/gbp-playbook.md`):
  - GBP: fix "Unnamed Rd", set the category "Real estate developer" and add the "Housing complex" property, write a 750-character description, upload 30+ photos as they become available, pre-seed 10+ Q&As, post weekly, respond to every review.
  - Directories: Bing Places plus Bing Webmaster (IndexNow), Google Search Console, then claim or correct Justdial, 99acres, MagicBricks, Housing.com, SquareYards, NoBroker, CommonFloor and Dwello so they carry identical NAP and facts.
  - Ask brokers running the look-alike microsites to link to the official site or take the sites down.

---

## 3. Lead Pipeline (manual follow-up for now)
1. **Capture:** website forms and WhatsApp click-to-chat (prefilled message with source), plus Meta Lead Ads and Google Lead Form extensions.
2. **Attribution:** `lib/tracking.ts` stores UTM, gclid, fbclid and landing page in sessionStorage and sends them with every lead.
3. **Storage:** Google Sheet "Leads" via Apps Script `doPost`. Columns: timestamp, name, phone, email, config, intent, visit date, source, medium, campaign, gclid, fbclid, page, status, owner, next follow-up, notes.
4. **Alerts:** Apps Script emails the sales inbox instantly and, optionally, sends a CallMeBot or WhatsApp Cloud API ping.
5. **Ad-platform leads:** Meta Lead Ads go to the same Sheet (Meta native CRM integration, or Make.com free tier). Google lead-form webhook goes to the same Apps Script URL.
6. **Follow-up SOP** (`docs/marketing-plan.md`):
   - Call within 5 minutes; 3 attempts on days 0, 1 and 3; send a WhatsApp brochure.
   - Statuses: New → Contacted → Site Visit Booked → Visited → Negotiation → Booked / Lost (with reason).
   - Weekly offline-conversion upload of "Visited" and "Booked" leads to Google Ads and Meta, so the bidding algorithms optimise for quality leads.

### Tracking stack
GTM container carrying GA4 (events: `lead_submit`, `brochure_download`, `whatsapp_click`, `call_click`, `visit_booked`), Google Ads conversion and enhanced conversions, and Meta Pixel. Meta CAPI runs server-side from `/api/lead` with an event_id for deduplication. A consent banner is configured for Consent Mode v2.

---

## 4. Marketing Plan (written to `docs/marketing-plan.md`)
- **Phase 0, weeks 0–2 (foundation):** site live, GSC/Bing verified, GBP fixed, directories cleaned, tracking QA'd, WhatsApp Business catalogue built, Instagram and Facebook profiles branded with highlights (Facts, Plans, Location, Progress, FAQ).
- **Phase 1, weeks 2–8 (demand capture).** Shape the campaign with `insurgent-campaign`: this is a small-budget project against 100-acre rivals, so lead with trust (official facts, site visits, owner referrals, construction transparency) and let paid channels amplify what already converts.
  - Google Search: brand plus competitor-adjacent and "villas under 2 Cr Sarjapur" ad groups, landing on `/lp/*`.
  - Performance Max with a lead-form asset.
  - Meta: lead-ad and website-conversion campaigns targeting 28–50-year-olds within 20 km of Sarjapur, ORR, Whitefield and Electronic City (IT-employer interests). A separate NRI campaign targets the UAE, US, UK and Singapore Indian diaspora.
  - Retargeting of site visitors and video viewers.
- **Phase 2, months 2–6 (demand creation and authority):**
  - Two insights posts per month, e.g. "Villas under ₹2 Cr on Sarjapur Road (2026)", "STRR and Sarjapur–Attibele: what it means for buyers", "Dommasandra metro: status", "Schools near Sarjapur–Attibele Road", "Apartment vs villa at ₹1.5 Cr".
  - Monthly construction-progress reel.
  - Weekend site-visit events with a "Villa Open House" format.
  - Channel-partner programme with a referral bonus, plus an existing-owner referral programme.
  - PR placements in Deccan Herald property, Moneycontrol and Housing News to build editorial citations for AEO.
- **Indicative budget (to tune):** ₹1.5–2.5 L/month, split 50% Google, 40% Meta, 10% retargeting and testing. Targets: CPL ₹600–1,500 (Meta) and ₹1,200–2,500 (Search); lead-to-visit 10–15%.
- **Content calendar and ad copy bank:** headlines, primary texts and creative briefs using placeholders, in `docs/ad-campaigns.md` and `docs/content-calendar.md`.
- **Compliance:** the RERA number appears on every ad and page; "artistic impression" labels on all imagery; DPDP consent; TRAI DND respected for calls; price shown as "starting from, plus charges".

---

## 5. Placeholders to Replace Later
These are centralised in `content/project.ts` and marked `// TODO-VERIFY`:
- exact prices and the cost-sheet PDF
- possession date and construction status
- legal entity name and logo
- phone, WhatsApp, email and site-office hours
- brochure PDF, floor plan images and photography/renders
- agent RERA numbers for any partners
- social handles

---

## Verification
1. `npm run build` passes with zero type errors. `next build` output shows static pages.
2. Run Lighthouse (mobile) on `/`, a BHK page and `/lp/*`: Performance ≥ 90, SEO 100, Accessibility ≥ 95.
3. Rich Results Test and Schema.org validator pass for Organization, ApartmentComplex, FAQPage and Breadcrumb.
4. Submit a test lead from each form and from WhatsApp:
   - the row appears in the Sheet with UTM and gclid,
   - the email alert arrives,
   - GA4 DebugView shows `lead_submit`,
   - Meta Events Manager test-events shows both Pixel and CAPI events, deduplicated.
5. Check at 360 px, 768 px and 1440 px: no horizontal scroll, sticky mobile CTA works, `prefers-reduced-motion` respected.
6. Run `npm run dev` and screenshot key sections. Confirm no placeholder reads as a real photo.
7. Generate `business-reports/motzkin-park-terrace/gap-analysis.html` and a PDF via headless Chrome, then review.
8. **Design gates:**
   - `site/DESIGN.md` exists and tokens in code match it (no stray hex values).
   - Taste inspector is clean; `impeccable` critique and polish done; `web-design-guidelines` and `design-audit` findings closed.
   - `break-ui` worst-case toggle passes on LeadForm, PriceTable, FAQ.
   - `review-animations` and `animation-performance`: no layout-property animation, smooth on a mid-range Android phone, reduced-motion honoured.
   - `mobile-native` checklist passes on real iOS and Android devices.
   - `/design-qa` is noindex and absent from the sitemap and production build.

---

## Build Order
1. Restart the session so newly installed skills load (see `SKILLS-INSTALLED.md`).
2. Design direction (`design-taste-frontend`) → `docs/design-direction.md` → `site/DESIGN.md` (`create-design-md`).
3. Scaffold Next.js, Tailwind v4 tokens and shadcn.
4. `content/project.ts`, schema builders and routes.
5. Components, motion and mobile pass.
6. Lead API and tracking.
7. Review loop: `impeccable`, `break-ui`, `design-audit`, `web-design-guidelines`, animation reviews.
8. Deploy with `deploy-to-vercel`, then `vercel-optimize`.
