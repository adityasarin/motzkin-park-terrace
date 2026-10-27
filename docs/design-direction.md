# Design direction (design-taste-frontend)

**Dealt:** `split-stage` ("The split stage"), seed 843466175, sector real-estate, drawn 27 Oct 2026. Chosen over `borrowed-category` and `place-carries-it`. The latter needs a library of the project's own photographs, which do not exist yet.

**Why this one:** a fixed half can hold the one thing only this project has, its site plan of 47 plots on two acres, while the facts scroll beside it. No 100-acre township competitor can show its whole community on one screen.

## Inventory (what belongs to this client and no competitor)
47 villas · about 2.1 acres · Thyavakanahalli · Sarjapur–Attibele Road · ₹1.48 Cr / ₹1.93 Cr · RERA PRM/KA/RERA/1251/308/PR/180120/001659 · roof terraces ("Park Terrace") · one gate · 3 km from Sarjapura · 3.5 km from Indus International School · the old cart road "to Sarjapur" on the 1878 taluk map · Sarjapura's 1429 CE stone inscription · red Deccan earth.

## The idea
> On this page, **the site plan of 47 plots on two acres** becomes **the fixed stage**.

**Competitor test:** NVT, Evo or Nambiar cannot fill the blank, because their plans run to hundreds of plots. The sentence belongs to this client.

**Live thing:** the plot finder. Choose 3 BHK or 4 BHK and the matching plots light up; tap a plot to see its type, size, facing and price. It works by thumb on a phone (an inline plan), fully from the keyboard (plots are buttons), and falls back to the static plan without script.

## Sheet as dealt, and changes
| Slot | Dealt | Used as |
|---|---|---|
| Type | Young Serif / Source Serif 4 | As dealt |
| Palette | Charcoal and sage | As dealt. The paper was moved from #e6e3da to a neutral stone (#e2e2dd) after the inspector flagged it as yellow cream |
| Hero | Striped card beside the room | Stripe = the terrace railing. The stage changes with the reading block: lake → site plan → 1878 map |
| intro | Narrow column, empty field | The 40–60 word AEO answer plus three short paragraphs |
| stats | Photograph with figure tiles | Agara Lake monsoon loop + "47 villas" (sage) and "2.1 acres" (paper) |
| showcase | Square plate, spare text | Floor-plan drawing with 3/4 BHK tabs and two action cells |
| features | Pinned heading, passing rows | "Inside the gate" on the sage field, three groups on home, five on /amenities |
| list | Printed menu sheet | "From the gate": distances by road, beside a crop of the 1878 map |
| pricing | Two plans, two fields | 3 BHK on paper (7/12), 4 BHK on charcoal (5/12) |
| proof | Plain names in columns | "On the record" under the Sarjapura inscription |
| faq | Questions beside a tall photograph | Rain trees and temple trees |
| contact | Address in display rows | Name, village, road, PIN, hours, phone, then "Come and see it →" |
| footer | Name across the last photograph | "Park Terrace" across a Karnataka paddy field |

No slot was redrawn.

## Pictures
All are real and credited in the footer. None is presented as the project.
- Bangalore Taluk map, 1878, Government of India (public domain), plus a crop showing the two roads "to Sarjapur"
- Bangalore guide map, 1940, Survey of India (public domain)
- Sarjapura 1429 CE inscription, Shashikumara Naik K C (CC BY-SA 4.0)
- Rain tree avenue, Shyamal L. (CC BY-SA 4.0)
- Paddy field in Karnataka, Pramodv1993 (CC BY-SA 4.0)
- Plumeria rubra 2852, Vengolis (CC BY-SA 4.0)
- Bangalore Lake island, Underthesamesky (CC0)
- Aagara Lake, Bangalore (2025) 03, video, Gpkp (CC BY-SA 4.0)

**Drawings standing in for photography:** the site plan (`lib/siteplan.ts`) and the floor plans (`components/FloorPlanDrawing.tsx`). Replace both with the architect's drawings, and add renders and site photographs to the stage, amenity rows and FAQ pair when they exist.
