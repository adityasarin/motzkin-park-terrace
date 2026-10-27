import Link from "next/link";
import { configs, project, priceNote, formatINR } from "@/content/project";
import { faqs } from "@/content/faqs";
import { PageShell, EvidencePanel, CtaBand, FaqList, JsonLd } from "@/components/Page";
import { EmiCalculator } from "@/components/EmiCalculator";
import { LeadButton } from "@/components/lead/LeadModal";
import { graph, offer, breadcrumbs, faqPage } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Price list: villas under ₹2 crore on Sarjapur Road",
  description: `${project.name} price list: 3 BHK villas from ${configs[0].priceDisplay} and 4 BHK villas from ${configs[1].priceDisplay} on Sarjapur–Attibele Road. Get the full cost sheet.`,
  path: "/price-list",
});

const qs = faqs.filter((f) => f.group === "Homes and prices");
const crumbs = [{ name: "Price list", path: "/price-list" }];

export default function PriceList() {
  return (
    <>
      <JsonLd data={graph(...configs.map(offer), breadcrumbs(crumbs), faqPage(qs))} />
      <PageShell
        stage={{
          kind: "photo",
          src: "/images/bangalore-1940.jpg",
          alt: "Survey of India guide map of Bangalore from 1940",
          caption: "Bangalore guide map, Survey of India, 1940",
          position: "70% 60%",
        }}
        crumbs={crumbs}
        title="Villas under ₹2 crore on Sarjapur Road"
        answer={`Both villa types at ${project.name} start under ₹2 Cr: the 3 BHK of 1,977 sq ft from ${configs[0].priceDisplay} and the 4 BHK of 2,579 sq ft from ${configs[1].priceDisplay}. Prices are starting prices; registration, GST and other charges are extra and listed on the cost sheet.`}
      >
        <table className="facts wide">
          <caption>Starting prices, {new Date(project.status.asOf).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</caption>
          <thead>
            <tr>
              <th scope="col">Villa</th>
              <th scope="col" className="num">
                Area
              </th>
              <th scope="col" className="num">
                From
              </th>
              <th scope="col" className="num">
                Per sq ft
              </th>
            </tr>
          </thead>
          <tbody>
            {configs.map((c) => (
              <tr key={c.slug}>
                <td>
                  <Link href={c.route} className="textlink">
                    {c.name}
                  </Link>
                </td>
                <td className="num">{c.areaSqft.toLocaleString("en-IN")} sq ft</td>
                <td className="num">{c.priceDisplay}</td>
                <td className="num">{formatINR(Math.round(c.priceFrom / c.areaSqft))}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="facts-note" style={{ color: "var(--muted)", fontSize: "var(--step-small)" }}>
          {priceNote}
        </p>

        <h2>The full cost sheet</h2>
        <p>
          The cost sheet lists the villa price, car parking, club membership, deposits, registration, stamp duty and GST, and the
          payment stages linked to construction. We send it on WhatsApp or email.
        </p>
        <p>
          <LeadButton intent="cost-sheet" source="price-list">
            Get the cost sheet
          </LeadButton>
        </p>

        <h2>Monthly EMI</h2>
        <EmiCalculator />

        <h2>How it compares</h2>
        <p>
          Most gated villa projects on Sarjapur Road start between ₹2 Cr and ₹5 Cr. The difference is scale: large townships spread
          their cost over a hundred acres of roads, clubs and parks, while {project.name} keeps to {project.homes.total} homes and
          the facilities those homes use.
        </p>

        <h2>Questions about price</h2>
        <FaqList items={qs} />

        <EvidencePanel />
        <CtaBand title="Ask for today’s price" text="Prices move with each construction stage. Ask the site office for the current price and any offer on your preferred plot." intent="cost-sheet" button="Get the cost sheet" />
      </PageShell>
    </>
  );
}
