import { project, configs } from "./project";

export type Faq = { q: string; a: string; group: string; source?: string };

const [three, four] = configs;

export const faqs: Faq[] = [
  // The project
  { group: "The project", q: "What is Motzkin Park Terrace?", a: project.summary, source: "/official-facts" },
  { group: "The project", q: "Where exactly is Motzkin Park Terrace?", a: `At ${project.address.street}, ${project.address.city} ${project.address.postalCode}, about 3 km south of Sarjapura town and 7 km north of Attibele.`, source: "/location" },
  { group: "The project", q: "Is Motzkin Park Terrace RERA registered?", a: `Yes. It is registered with the ${project.rera.authority} under number ${project.rera.number}. You can check the registration on the Karnataka RERA website.`, source: "/official-facts" },
  { group: "The project", q: "Who is the developer?", a: `The project is developed by ${project.developer.legalName}. Older listings also use the names Motzkin Group and Motzkin Ventures; this website is the official source.`, source: "/official-facts" },
  { group: "The project", q: "How many villas are there and on how much land?", a: `${project.homes.total} villas on about ${project.land.display}. That is roughly 22 homes to the acre, against hundreds in a typical apartment block.`, source: "/official-facts" },
  { group: "The project", q: "What is the construction status and possession date?", a: `The project is ${project.status.label.toLowerCase()}, with possession expected in ${project.status.possession}. Dated site updates are published on the construction updates page.`, source: "/construction-updates" },
  { group: "The project", q: "Is this the official website?", a: "Yes. Several broker and listing sites use the project name. Prices, dates and facts on this site are the ones the developer stands behind.", source: "/official-facts" },

  // Homes and prices
  { group: "Homes and prices", q: "What is the price of a villa at Motzkin Park Terrace?", a: `${three.name}s of ${three.areaSqft.toLocaleString("en-IN")} sq ft start at ${three.priceDisplay} and ${four.name}s of ${four.areaSqft.toLocaleString("en-IN")} sq ft start at ${four.priceDisplay}, plus registration, GST and other charges.`, source: "/price-list" },
  { group: "Homes and prices", q: "Are there villas under ₹2 crore on Sarjapur–Attibele Road?", a: `Yes. Both villa types here start under ₹2 Cr: ${three.priceDisplay} for 3 BHK and ${four.priceDisplay} for 4 BHK. Most gated villa projects nearby start between ₹2 Cr and ₹5 Cr.`, source: "/price-list" },
  { group: "Homes and prices", q: "What sizes are available?", a: `Two types: a ${three.bhk} BHK of ${three.areaSqft.toLocaleString("en-IN")} sq ft and a ${four.bhk} BHK of ${four.areaSqft.toLocaleString("en-IN")} sq ft, both over ground, first floor and terrace.`, source: "/master-plan" },
  { group: "Homes and prices", q: "Is there a 5 BHK villa?", a: "No. Some older listings mention 5 BHK. The project has 3 BHK and 4 BHK villas only; the 4 BHK has a covered terrace room that some owners use as a fifth room.", source: "/official-facts" },
  { group: "Homes and prices", q: "What does the price include?", a: "The starting price covers the villa and its share of land. Registration, stamp duty, GST, electricity and water deposits, and the club membership are listed separately on the cost sheet.", source: "/price-list" },
  { group: "Homes and prices", q: "How do I get the full cost sheet?", a: "Ask for it from the price list page. We send it on WhatsApp or email, usually within the hour during site office hours.", source: "/price-list" },
  { group: "Homes and prices", q: "Which banks offer home loans for this project?", a: "Most major banks lend on RERA-registered projects. Ask the site office for the current list of approving banks before you apply.", source: "/price-list" },
  { group: "Homes and prices", q: "Is there a payment plan linked to construction?", a: "Yes. Payments are linked to construction stages, as RERA requires. The stage schedule is on the cost sheet.", source: "/price-list" },

  // Location
  { group: "Location", q: "How far is Motzkin Park Terrace from Sarjapura?", a: "About 3 km, or six to seven minutes by car, to Sarjapura town.", source: "/location" },
  { group: "Location", q: "Which schools are near Motzkin Park Terrace?", a: "Indus International School is about 3.5 km away. Greenwood High, Oakridge International and Inventure Academy are 10 to 14 km away along Sarjapur Road.", source: "/location" },
  { group: "Location", q: "How long is the drive to Electronic City and the Outer Ring Road?", a: "Electronic City is about 18 km, roughly 35 to 40 minutes off-peak. The Outer Ring Road at Bellandur is about 22 km, roughly 50 minutes off-peak.", source: "/location" },
  { group: "Location", q: "How far is the airport?", a: "Kempegowda International Airport is about 62 km, roughly an hour and a half by road.", source: "/location" },
  { group: "Location", q: "Which hospitals are nearby?", a: "Motherhood Hospital in Sarjapur is about 3.2 km away, and Narayana Health City at Bommasandra about 11 km.", source: "/location" },
  { group: "Location", q: "Is there a metro line planned near Sarjapur?", a: "A metro corridor along Sarjapur Road has been proposed but is not yet under construction. We publish only confirmed timelines; check the insights page for updates.", source: "/insights" },
  { group: "Location", q: "How will the Satellite Town Ring Road affect the area?", a: "The Satellite Town Ring Road is planned to pass through the Sarjapur–Attibele belt, which would shorten trips to Hosur and Hoskote. Timelines are set by the NHAI.", source: "/insights" },

  // Living here
  { group: "Living here", q: "What amenities are there?", a: "A clubhouse with gym, library, party hall and yoga deck; a swimming pool and children’s pool; badminton, basketball and cricket practice; a jogging and cycling track; and a central lawn.", source: "/amenities" },
  { group: "Living here", q: "Is water supply reliable?", a: "The site has borewells, rainwater harvesting and its own sewage treatment plant, with treated water reused for gardens.", source: "/amenities" },
  { group: "Living here", q: "How many car parks does each villa get?", a: "One covered car park with every 3 BHK and two with every 4 BHK, inside the villa plot.", source: "/master-plan" },
  { group: "Living here", q: "Is the community gated and secure?", a: "Yes. There is a single gated entry with a security cabin, and the boundary is walled.", source: "/amenities" },
  { group: "Living here", q: "Can I change the interiors before possession?", a: "Minor changes to finishes are possible up to a stage of construction. Ask the site office which changes are open for your villa.", source: "/specifications" },

  // Buying
  { group: "Buying", q: "How do I book a site visit?", a: `Use any “Book a site visit” button, call ${project.contact.phone}, or message us on WhatsApp. ${project.contact.hours}.`, source: "/contact" },
  { group: "Buying", q: "Can NRIs buy a villa at Motzkin Park Terrace?", a: "Yes. NRIs and OCI card holders can buy residential property in India, pay from NRE or NRO accounts, and sign through a power of attorney. See the NRI guide for the steps.", source: "/nri" },
  { group: "Buying", q: "Is a virtual tour available?", a: "Yes. We run video-call walkthroughs of the site and the show villa for buyers who cannot visit in person.", source: "/nri" },
  { group: "Buying", q: "Do you work with channel partners?", a: "Yes. Registered real-estate agents can bring buyers; ask the site office for the partner terms.", source: "/contact" },
];

export const faqGroups = Array.from(new Set(faqs.map((f) => f.group)));

/** The six questions shown on the home page. */
export const homeFaqs = [
  "Is Motzkin Park Terrace RERA registered?",
  "What is the price of a villa at Motzkin Park Terrace?",
  "What is the construction status and possession date?",
  "Which schools are near Motzkin Park Terrace?",
  "Can NRIs buy a villa at Motzkin Park Terrace?",
  "Is this the official website?",
].map((q) => faqs.find((f) => f.q === q)!);
