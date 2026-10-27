import { project } from "@/content/project";
import { faqs } from "@/content/faqs";
import { PageShell, EvidencePanel, CtaBand, FaqList, JsonLd } from "@/components/Page";
import { graph, breadcrumbs, faqPage } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Buying from abroad: a guide for NRI buyers",
  description: `How NRIs and OCI card holders can buy a villa at ${project.name}, Bengaluru: payments from NRE/NRO accounts, home loans, power of attorney and video walkthroughs.`,
  path: "/nri",
});

const crumbs = [{ name: "For NRI buyers", path: "/nri" }];
const qs = [
  { group: "NRI", q: "Can NRIs and OCI card holders buy a villa in India?", a: "Yes. Under FEMA, NRIs and OCI card holders may buy residential property in India without RBI approval. Agricultural land, plantations and farmhouses are excluded; a villa in a RERA-registered project is not.", source: "/nri" },
  { group: "NRI", q: "How do NRIs pay for the villa?", a: "Through normal banking channels: from an NRE, NRO or FCNR account in India, or by inward remittance. Cash and foreign currency notes are not accepted.", source: "/nri" },
  { group: "NRI", q: "Can NRIs get a home loan?", a: "Yes. Most Indian banks lend to NRIs against salary or business income abroad, typically up to 75–80% of the property value. EMIs are paid from an NRE or NRO account.", source: "/nri" },
  { group: "NRI", q: "Do I need to travel to India to buy?", a: "No. You can sign the booking and the sale agreement through a registered power of attorney given to a family member in India. Registration needs the attorney holder in person.", source: "/nri" },
  ...faqs.filter((f) => f.q.includes("virtual tour")),
];

export default function Nri() {
  return (
    <>
      <JsonLd data={graph(breadcrumbs(crumbs), faqPage(qs))} />
      <PageShell
        stage={{ kind: "photo", src: "/images/bangalore-lake-island.jpg", alt: "A wooded island in a Bengaluru lake under a clear blue sky", caption: "A Bengaluru lake in the dry season", position: "50% 70%" }}
        crumbs={crumbs}
        title="Buying from abroad"
        answer={`NRIs and OCI card holders can buy a villa at ${project.name} without RBI approval, paying from NRE, NRO or FCNR accounts and signing through a power of attorney. We run live video walkthroughs at times that suit the Gulf, Europe, the US and Singapore.`}
      >
        <h2 style={{ marginTop: 0 }}>The steps</h2>
        <ol className="steps">
          <li>
            <h3>See the site on video</h3>
            <p>Book a live walkthrough of the site and the show villa with a site engineer, recorded so your family can watch it too.</p>
          </li>
          <li>
            <h3>Choose a plot and get the cost sheet</h3>
            <p>We send the cost sheet, the RERA documents and the draft agreement for your lawyer to read.</p>
          </li>
          <li>
            <h3>Book from your NRE or NRO account</h3>
            <p>Pay the booking amount by bank transfer. The receipt and allotment letter follow by email.</p>
          </li>
          <li>
            <h3>Sign through power of attorney</h3>
            <p>A family member in India can sign the agreement and attend registration under a power of attorney attested at the Indian embassy or consulate.</p>
          </li>
          <li>
            <h3>Track construction from abroad</h3>
            <p>Dated updates on this site, plus a monthly video from the site, until handover.</p>
          </li>
        </ol>

        <h2>Documents you will need</h2>
        <ul className="plain">
          <li>Passport, and OCI card if you hold one</li>
          <li>PAN card</li>
          <li>Overseas address proof</li>
          <li>Passport-size photographs</li>
          <li>Power of attorney, if someone signs for you</li>
        </ul>
        <p style={{ color: "var(--muted)", fontSize: "var(--step-small)" }}>
          This is general guidance, not legal or tax advice. Rules on repatriation and TDS change; check with your bank and a
          chartered accountant.
        </p>

        <h2>Questions NRI buyers ask</h2>
        <FaqList items={qs} />
        <EvidencePanel />
        <CtaBand title="See it from where you are" text="A site engineer walks you through the site and show villa on a live video call, at a time that suits your time zone." intent="virtual-tour" button="Book a video walkthrough" />
      </PageShell>
    </>
  );
}
