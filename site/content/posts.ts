/**
 * Insights articles, kept as typed content rather than MDX so every figure can be
 * pulled from project.ts. Dated so AI engines and readers can judge freshness.
 */
import { project, configs } from "./project";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  answer: string; // 40–60 word direct answer that opens the article
  sections: { heading: string; paragraphs: string[] }[];
};

const [three, four] = configs;

export const posts: Post[] = [
  {
    slug: "villas-under-2-crore-sarjapur-road",
    title: "Villas under ₹2 crore on Sarjapur Road (2026)",
    description: "What a gated villa under ₹2 Cr on the Sarjapur–Attibele belt gets you in 2026, and what to check before you book.",
    date: "2026-10-20",
    answer: `In 2026 most gated villa projects on Sarjapur Road start above ₹2 Cr. ${project.name} is one of the few under that line: ${three.bhk} BHK villas of ${three.areaSqft.toLocaleString("en-IN")} sq ft from ${three.priceDisplay} and ${four.bhk} BHK villas of ${four.areaSqft.toLocaleString("en-IN")} sq ft from ${four.priceDisplay}, on Sarjapur–Attibele Road.`,
    sections: [
      {
        heading: "Why prices step down south of Sarjapura",
        paragraphs: [
          "Land prices fall the further a project sits from the Outer Ring Road. The stretch between Sarjapura and Attibele is 20 km or more from the IT corridor, so a villa there costs what an apartment costs near Bellandur.",
          "The trade is time. Owners here drive further to the ORR, but they are closer to Bommasandra, Electronic City’s southern edge and the Hosur industrial belt.",
        ],
      },
      {
        heading: "What to check before you book",
        paragraphs: [
          "Check the RERA registration on the Karnataka RERA portal and match the number on the brochure, the agreement and the website.",
          "Ask for the full cost sheet, not the starting price. Registration, GST, deposits and club charges add a meaningful amount on top.",
          "Visit at the hour you would commute. A drive at 9 am tells you more than any distance table.",
        ],
      },
      {
        heading: "Small community or township",
        paragraphs: [
          `Large townships on Sarjapur Road run to 100 acres and several hundred villas. ${project.name} has ${project.homes.total} homes on about ${project.land.display}, so maintenance is shared among fewer owners and the clubhouse is never crowded. The trade-off is fewer facilities than a township.`,
        ],
      },
    ],
  },
  {
    slug: "satellite-town-ring-road-sarjapur-attibele",
    title: "The Satellite Town Ring Road and Sarjapur–Attibele",
    description: "What the planned Satellite Town Ring Road means for homes on the Sarjapur–Attibele belt, and what is still uncertain.",
    date: "2026-09-12",
    answer: "The Satellite Town Ring Road (STRR) is a planned outer ring around Bengaluru that crosses the Sarjapur–Attibele belt. When complete it should shorten trips to Hosur, Hoskote and the airport without entering the city. Timelines are set by the NHAI and have moved before, so buy for today’s roads.",
    sections: [
      {
        heading: "What the road is",
        paragraphs: [
          "The STRR links the satellite towns around Bengaluru, among them Hosur, Anekal, Hoskote and Dobbaspet, in a ring well outside the city’s Outer Ring Road and the Peripheral Ring Road.",
        ],
      },
      {
        heading: "What it could change here",
        paragraphs: [
          "Trips that today go through the city, such as Sarjapur to the airport, could run around it instead. Freight would move off Sarjapur Road onto the ring.",
          "Land near interchanges usually rises in value once construction is visible. We do not publish price forecasts.",
        ],
      },
      {
        heading: "What to keep in mind",
        paragraphs: [
          "Infrastructure dates slip. Judge a home on the roads, schools and hospitals that already exist, and treat the ring road as a bonus.",
        ],
      },
    ],
  },
  {
    slug: "schools-near-sarjapur-attibele-road",
    title: "Schools near Sarjapur–Attibele Road",
    description: "Drive times from Motzkin Park Terrace to the international and CBSE schools along Sarjapur Road.",
    date: "2026-08-28",
    answer: "Indus International School is the nearest large school to Motzkin Park Terrace, about 3.5 km or eight minutes away. Greenwood High, Oakridge International and Inventure Academy are 10 to 14 km north along Sarjapur Road, a 20 to 30 minute school run.",
    sections: [
      {
        heading: "The closest options",
        paragraphs: [
          "Indus International School offers the IB curriculum with day and boarding places and sits on the same road as the project.",
          "Smaller CBSE and state-board schools in Sarjapura town are about three kilometres away.",
        ],
      },
      {
        heading: "Further up Sarjapur Road",
        paragraphs: [
          "Greenwood High, Oakridge International and Inventure Academy run school buses that reach the Sarjapura area. Check the route and pick-up time with each school before you rely on it.",
        ],
      },
    ],
  },
];
