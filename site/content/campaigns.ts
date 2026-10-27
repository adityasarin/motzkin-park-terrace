import { configs, project } from "./project";
import type { Intent } from "@/components/lead/intents";

/** Ad landing pages (/lp/[campaign]): one message, one form, no navigation. */
export type Campaign = {
  slug: string;
  title: string;
  lede: string;
  intent: Intent;
  formTitle: string;
  image: { src: string; alt: string; caption: string };
};

export const campaigns: Campaign[] = [
  {
    slug: "villas-under-2-crore",
    title: "Gated villas under ₹2 Cr",
    lede: `3 BHK from ${configs[0].priceDisplay} and 4 BHK from ${configs[1].priceDisplay} on Sarjapur–Attibele Road. ${project.homes.total} homes, one gate, RERA registered.`,
    intent: "cost-sheet",
    formTitle: "Get the cost sheet",
    image: { src: "/images/rain-tree-avenue.jpg", alt: "Rain trees arching over a Bengaluru road", caption: "Rain trees on a Bengaluru avenue" },
  },
  {
    slug: "nri-villas-bangalore",
    title: "A Bengaluru villa, bought from abroad",
    lede: `Live video walkthroughs, NRE and NRO payments and signing by power of attorney. Villas from ${configs[0].priceDisplay} on Sarjapur–Attibele Road.`,
    intent: "virtual-tour",
    formTitle: "Book a video walkthrough",
    image: { src: "/images/bangalore-lake-island.jpg", alt: "A wooded island in a Bengaluru lake", caption: "A Bengaluru lake in the dry season" },
  },
  {
    slug: "site-visit",
    title: "See 47 villas on two acres",
    lede: `Visit ${project.name} any day, 10 am to 6 pm. 3 km from Sarjapura, 8 minutes from Indus International School.`,
    intent: "visit",
    formTitle: "Book a site visit",
    image: { src: "/images/plumeria-rubra-2852.jpg", alt: "White temple-tree flowers", caption: "Temple tree, a Bengaluru garden staple" },
  },
];
