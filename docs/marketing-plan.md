# Marketing plan: Motzkin Park Terrace

**Position:** the most accessible gated villa on Sarjapur–Attibele Road. 47 homes on two acres, RERA registered, from ₹1.48 Cr.
**Situation:** we are outspent by 100-acre townships (NVT, Evo, Nambiar, MJR). We will not win by spending more. We win on trust, certainty and price, and let paid channels amplify what already converts.

## Who we sell to
| Segment | What they need to hear | Where they are |
|---|---|---|
| IT professionals, 30–45, upgrading from an apartment (ORR, Sarjapur, Electronic City, Wipro) | "A villa for an apartment budget"; the commute; schools | Google Search, Instagram, LinkedIn, community WhatsApp groups |
| NRI investors (UAE, US, UK, Singapore) | RERA, the official facts, video walkthroughs, POA process | Meta (diaspora targeting), YouTube, Google Search from abroad |
| Bommasandra and Attibele business owners | Proximity, a gated home, ready soon | Local Facebook, Justdial, word of mouth, channel partners |
| Families seeking Indus / Sarjapur-belt schools | Distance to school, safety, space | Google Search ("villas near Indus International School"), parent groups |

## Phases
### Phase 0, weeks 0–2: foundation
- [ ] Site live on the official domain; Search Console and Bing Webmaster verified; sitemap submitted; IndexNow on.
- [ ] Google Business Profile fixed (see `gbp-playbook.md`).
- [ ] Directory clean-up: Justdial, 99acres, MagicBricks, Housing.com, SquareYards, NoBroker, CommonFloor and Dwello carry identical NAP, facts and a link to `/official-facts`.
- [ ] Tracking QA: GTM → GA4, Google Ads conversions with enhanced conversions, Meta Pixel and CAPI (deduplicated by `event_id`). One test lead end to end.
- [ ] WhatsApp Business catalogue built (3 BHK, 4 BHK, site plan, location, cost-sheet request).
- [ ] Instagram and Facebook branded, with highlights: Facts · Plans · Location · Progress · FAQ.

### Phase 1, weeks 2–8: capture demand that already exists
- **Google Search:** a brand ad group (defend against broker microsites), "villas under 2 Cr Sarjapur", "3 BHK villa Sarjapur", "gated villas near Indus School", and competitor-adjacent terms. All land on `/lp/*`. Copy: `ad-campaigns.md`.
- **Performance Max** with a lead-form asset, fed only by offline conversions of "Visited" leads after week 4.
- **Meta:** instant-form and website-conversion campaigns for ages 28–50 within 20 km of Sarjapur, ORR, Whitefield and Electronic City; a separate NRI campaign (UAE, US, UK, Singapore Indian diaspora).
- **Retargeting:** site visitors (30 days), video viewers (50%+), and lead-form openers who did not submit.

### Phase 2, months 2–6: create demand and authority
- Two insights posts a month (calendar in `content-calendar.md`).
- A monthly construction-progress reel, also posted to `/construction-updates`.
- A "Villa Open House" every second weekend: tea, a walkthrough of the show villa, a 10-minute talk by the site engineer.
- **Channel partners:** a referral bonus per booking for RERA-registered agents, with a partner kit (facts sheet, plan, approved copy).
- **Owner referrals:** a bonus or club credit for each referred booking.
- **PR for AI citations:** pitch "the boutique alternative to Sarjapur townships" to Deccan Herald Property, Moneycontrol and Housing News. Editorial mentions are what AI engines cite.

## Budget (indicative, tune monthly)
₹1.5–2.5 L a month: 50% Google, 40% Meta, 10% retargeting and tests.
| Metric | Target |
|---|---|
| CPL, Meta | ₹600–1,500 |
| CPL, Search | ₹1,200–2,500 |
| Lead → site visit | 10–15% |
| Visit → booking | 8–12% |
| Cost per booking | Review monthly. Pause any channel above 2× the blended average for 2 months |

## Lead handling SOP (manual, for now)
1. **Within 5 minutes:** call. If there's no answer, WhatsApp the brochure and a "when can I call?" message.
2. **Attempts:** day 0, day 1 and day 3, at different times of day. After three misses, the status is "Lost – unreachable".
3. **Statuses** in the Sheet: New → Contacted → Site Visit Booked → Visited → Negotiation → Booked / Lost (reason required: price, location, possession, competitor, unreachable, not a buyer).
4. **The day before a visit:** WhatsApp the location pin and the site contact's name.
5. **Within 24 hours of a visit:** follow-up call. The cost sheet goes out the same day.
6. **Weekly (Monday):** upload "Visited" and "Booked" leads as offline conversions to Google Ads (by gclid) and Meta (by phone hash), so bidding learns which leads are real.
7. **Weekly review:** leads by source, contact rate, visits, bookings and lost reasons.

## Compliance
- The RERA number appears on every ad, landing page, brochure and post.
- Every render and plan is labelled "artistic impression". Photographs of the area are never shown as the project.
- Prices are always "starting from, plus charges".
- DPDP: consent checkbox on every form; data deleted on request; privacy notice at `/privacy`.
- TRAI DND: no promotional calls to DND numbers without the lead's own enquiry; calls only 9 am to 9 pm.
