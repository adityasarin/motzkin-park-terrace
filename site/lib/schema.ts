/** JSON-LD builders. Every value comes from content/, so the schema can't drift from the page. */
import { project, configs, SITE_URL, type Config } from "@/content/project";
import { amenityGroups } from "@/content/amenities";
import type { Faq } from "@/content/faqs";
import type { Post } from "@/content/posts";

type Json = Record<string, unknown>;

const orgId = `${SITE_URL}/#organization`;
const complexId = `${SITE_URL}/#residence`;

const sameAs = Object.values(project.social).filter(Boolean);

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: project.address.street,
  addressLocality: project.address.locality,
  addressRegion: project.address.region,
  postalCode: project.address.postalCode,
  addressCountry: project.address.country,
};

export function organization(): Json {
  return {
    "@type": "Organization",
    "@id": orgId,
    name: project.developer.brand,
    legalName: project.developer.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}${project.developer.logo}`,
    telephone: project.contact.phone,
    email: project.contact.email,
    address: postalAddress,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function residence(): Json {
  return {
    "@type": ["ApartmentComplex", "Residence"],
    "@id": complexId,
    name: project.name,
    description: project.summary,
    url: SITE_URL,
    address: postalAddress,
    geo: { "@type": "GeoCoordinates", latitude: project.address.geo.lat, longitude: project.address.geo.lng },
    numberOfAccommodationUnits: project.homes.total,
    petsAllowed: true,
    amenityFeature: amenityGroups.flatMap((g) =>
      g.items.map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    ),
    identifier: { "@type": "PropertyValue", propertyID: "Karnataka RERA", value: project.rera.number },
    containsPlace: configs.map((c) => ({
      "@type": "SingleFamilyResidence",
      name: `${c.name}, ${project.name}`,
      numberOfRooms: c.bhk,
      floorSize: { "@type": "QuantitativeValue", value: c.areaSqft, unitCode: "FTK" },
    })),
    makesOffer: configs.map(offer),
    provider: { "@id": orgId },
  };
}

export function offer(c: Config): Json {
  return {
    "@type": "Offer",
    name: `${c.name} at ${project.name}`,
    url: `${SITE_URL}${c.route}`,
    priceCurrency: "INR",
    price: c.priceFrom,
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "INR",
      minPrice: c.priceFrom,
      valueAddedTaxIncluded: false,
    },
    availability: "https://schema.org/PreOrder",
    seller: { "@id": orgId },
  };
}

export function listing(c: Config): Json {
  return {
    "@type": "RealEstateListing",
    name: `${c.bhk} BHK villas at ${project.name}, Sarjapur–Attibele Road`,
    url: `${SITE_URL}${c.route}`,
    datePosted: project.status.asOf,
    about: { "@id": complexId },
    offers: offer(c),
  };
}

export function faqPage(items: Faq[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbs(trail: { name: string; path: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}

export function article(p: Post): Json {
  return {
    "@type": "Article",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.date,
    url: `${SITE_URL}/insights/${p.slug}`,
    author: { "@id": orgId },
    publisher: { "@id": orgId },
    about: { "@id": complexId },
  };
}

export function graph(...nodes: Json[]): Json {
  return { "@context": "https://schema.org", "@graph": nodes };
}
