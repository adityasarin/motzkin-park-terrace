# Ad campaigns and copy bank

All ads land on `/lp/<campaign>` with UTMs. Every creative carries "RERA PRM/KA/RERA/1251/308/PR/180120/001659" and "Artistic impression" where it shows a render. Prices are always "from … plus charges".

## Landing pages (built)
| URL | Use | Form intent |
|---|---|---|
| `/lp/villas-under-2-crore` | Search "villas under 2 Cr", Meta prospecting | Cost sheet |
| `/lp/nri-villas-bangalore` | NRI Search and Meta | Video walkthrough |
| `/lp/site-visit` | Retargeting, brand Search | Site visit |

UTM pattern: `?utm_source=google|meta&utm_medium=cpc|paid_social&utm_campaign=<campaign>&utm_content=<ad-id>`. gclid and fbclid are captured automatically.

## Google Search
**Ad group: Brand** (exact and phrase: motzkin park terrace, motzkin park terrace price, motzkin park terrace floor plan, motzkin park terrace review)
- H1: Motzkin Park Terrace, Official Site · H2: 3 & 4 BHK Villas from ₹1.48 Cr · H3: RERA Registered · 47 Homes
- D1: The developer's official facts, prices and floor plans. Book a site visit any day, 10 am–6 pm.
- D2: 47 gated villas on 2 acres, Sarjapur–Attibele Road. Get the full cost sheet on WhatsApp.

**Ad group: Under 2 Cr** (villas under 2 crore sarjapur, villas below 2 cr bangalore, 3 bhk villa sarjapur road price)
- H1: Gated Villas Under ₹2 Cr · H2: Sarjapur–Attibele Road · H3: 3 BHK from ₹1.48 Cr
- D1: A private plot, roof terrace and clubhouse, inside one gate of 47 homes. RERA registered.
- D2: Compare the cost sheet. 3 BHK 1,977 sq ft, 4 BHK 2,579 sq ft. Visit any day.

**Ad group: Schools** (villas near indus international school, gated community near indus school sarjapur)
- H1: 8 Minutes to Indus School · H2: Gated Villas from ₹1.48 Cr · H3: Book a Site Visit
- D1: 3.5 km from Indus International School on Sarjapur–Attibele Road. 47 villas, one gate.

**Negatives:** rent, rental, PG, plot only, resale, job, careers, 1 bhk, 2 bhk, apartment for rent.

## Meta (Facebook and Instagram)
**Prospecting, IT upgraders** (28–50, 20 km around Sarjapur, ORR, Whitefield and Electronic City)
- Primary: "You've outgrown the apartment. A 3 BHK villa with its own plot and roof terrace on Sarjapur–Attibele Road starts at ₹1.48 Cr. 47 homes, one gate, RERA registered."
- Headline: Villas under ₹2 Cr, Sarjapur · CTA: Get quote
- Creative: the site-plan animation (47 plots lighting up), with the rain-tree avenue as a b-roll mood shot. Label it "Bengaluru", not the project.

**NRI** (UAE, US, UK, Singapore; Indian diaspora; ages 30–55)
- Primary: "Buying a home in Bengaluru from abroad? Take a live video walkthrough of Motzkin Park Terrace, pay from your NRE account, and sign by power of attorney. 3 & 4 BHK villas from ₹1.48 Cr."
- Headline: Walk the site from Dubai · CTA: Book now

**Retargeting** (site visitors over 30 days, video viewers at 50%+)
- Primary: "Still thinking about Park Terrace? See it this weekend: Villa Open House, Saturday and Sunday, 10 am–6 pm."
- Headline: Come and see it · CTA: Book now

## Creative briefs (placeholders until real photography exists)
1. **Plot finder (15 s, 9:16):** the site plan; 3 BHK plots light up, then 4 BHK; end card with price and RERA.
2. **The stone and the record (15 s):** the 1429 CE Sarjapura inscription cut to the RERA certificate. "Sarjapura has kept records for 600 years. Ours are on Karnataka RERA." End card: `/official-facts`.
3. **Morning school run (30 s):** a real dashcam drive, gate to Indus International School, with a timer.
4. **Construction progress (monthly, 20 s):** a site engineer to camera. One fact, one date.

## Measurement
Primary conversion: `lead_submit`. Optimisation conversion from week 4: offline "Visited" (Google Ads by gclid; Meta by hashed phone). Secondary: `whatsapp_click` and `call_click`, for observation only.
