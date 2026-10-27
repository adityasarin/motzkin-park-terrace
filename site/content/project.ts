/**
 * Single source of truth for every fact on the site and in every schema block.
 * Values marked TODO-VERIFY come from public listings and must be confirmed by
 * the developer before launch (see docs/PLAN.md §5).
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const project = {
  name: "Motzkin Park Terrace",
  shortName: "Park Terrace",
  tagline: "47 villas on two acres, Sarjapur–Attibele Road",
  summary:
    "Motzkin Park Terrace is a RERA-registered gated community of 47 villas on about 2.1 acres at Thyavakanahalli, on Sarjapur–Attibele Road in south-east Bengaluru. It offers 3 BHK villas of 1,977 sq ft from ₹1.48 Cr and 4 BHK villas of 2,579 sq ft from ₹1.93 Cr, with a clubhouse, pool and courts inside the gate.",

  developer: {
    legalName: "Motzkin Developers Pvt Ltd", // TODO-VERIFY: listings also say "Motzkin Group" and "Motzkin Ventures"
    brand: "Motzkin Group",
    logo: "/logo.svg", // TODO-VERIFY: replace with the real logo
  },

  rera: {
    number: "PRM/KA/RERA/1251/308/PR/180120/001659",
    authority: "Karnataka Real Estate Regulatory Authority",
    url: "https://rera.karnataka.gov.in/",
  },

  land: {
    acres: 2.1, // TODO-VERIFY: listings say 2.06 and 2.15
    display: "2.1 acres",
  },

  homes: {
    total: 47, // TODO-VERIFY: some listings say 48
    threeBhk: 27, // TODO-VERIFY: split is a working assumption for the site plan
    fourBhk: 20, // TODO-VERIFY
  },

  status: {
    label: "Under construction", // TODO-VERIFY: listings show four different dates
    possession: "December 2026", // TODO-VERIFY
    asOf: "2026-10-27",
  },

  address: {
    street: "Thyavakanahalli, Sarjapur–Attibele Road",
    locality: "Sarjapura",
    city: "Bengaluru",
    region: "Karnataka",
    postalCode: "562125",
    country: "IN",
    // TODO-VERIFY: approximate coordinates; confirm the gate location on Google Maps
    geo: { lat: 12.8335, lng: 77.7752 },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Motzkin+Park+Terrace+Thyavakanahalli",
  },

  contact: {
    phone: process.env.NEXT_PUBLIC_PHONE ?? "+91 80000 00000", // TODO-VERIFY
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "918000000000", // TODO-VERIFY: digits only, with country code
    email: "sales@motzkinparkterrace.in", // TODO-VERIFY
    hours: "Site office open every day, 10 am to 6 pm", // TODO-VERIFY
    hoursShort: "Daily, 10 am – 6 pm",
  },

  social: {
    // TODO-VERIFY: fill once the profiles exist; empty strings are left out of schema
    googleBusiness: "",
    instagram: "",
    facebook: "",
    youtube: "",
    justdial: "",
    acres99: "",
  },
} as const;

export type Config = {
  slug: "3-bhk" | "4-bhk";
  name: string;
  bhk: 3 | 4;
  areaSqft: number;
  priceFrom: number; // rupees
  priceDisplay: string;
  route: string;
  forWhom: string;
  units: number;
};

export const configs: Config[] = [
  {
    slug: "3-bhk",
    name: "3 BHK villa",
    bhk: 3,
    areaSqft: 1977,
    priceFrom: 14_800_000, // TODO-VERIFY
    priceDisplay: "₹1.48 Cr",
    route: "/3-bhk-villas-sarjapur-attibele-road",
    forWhom: "For a family moving out of an apartment who wants a garden, a terrace and a door of its own.",
    units: project.homes.threeBhk,
  },
  {
    slug: "4-bhk",
    name: "4 BHK villa",
    bhk: 4,
    areaSqft: 2579,
    priceFrom: 19_300_000, // TODO-VERIFY
    priceDisplay: "₹1.93 Cr",
    route: "/4-bhk-villas-sarjapur-attibele-road",
    forWhom: "For a larger family, parents who live in, or a home office that needs its own room.",
    units: project.homes.fourBhk,
  },
];

export const priceNote = "Starting price, plus registration, GST and other charges. Cost sheet on request.";

export function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export function crore(n: number) {
  return `₹${(n / 10_000_000).toFixed(2).replace(/0$/, "")} Cr`;
}

export const telHref = `tel:${project.contact.phone.replace(/[^+\d]/g, "")}`;

export function waHref(message = "Hello, I would like to know more about Motzkin Park Terrace.") {
  return `https://wa.me/${project.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Facts shown on /official-facts and in FactsTable; each row cites where it came from. */
export const officialFacts: { label: string; value: string; source: string }[] = [
  { label: "Project name", value: project.name, source: "Karnataka RERA registration" },
  { label: "RERA registration", value: project.rera.number, source: "Karnataka RERA" },
  { label: "Developer (legal name)", value: project.developer.legalName, source: "Developer, to be confirmed" },
  { label: "Location", value: `${project.address.street}, ${project.address.city} ${project.address.postalCode}`, source: "RERA registration" },
  { label: "Land area", value: `About ${project.land.display}`, source: "RERA registration" },
  { label: "Number of homes", value: `${project.homes.total} villas`, source: "RERA registration" },
  { label: "3 BHK villa", value: "1,977 sq ft, from ₹1.48 Cr", source: "Developer price list" },
  { label: "4 BHK villa", value: "2,579 sq ft, from ₹1.93 Cr", source: "Developer price list" },
  { label: "Construction status", value: project.status.label, source: "Developer site report" },
  { label: "Expected possession", value: project.status.possession, source: "RERA registration" },
];
