import Link from "next/link";
import { configs, project, priceNote, formatINR } from "@/content/project";
import { plans } from "@/content/floorplans";
import { faqs } from "@/content/faqs";
import { FloorPlanDrawing } from "./FloorPlanDrawing";
import { PageShell, EvidencePanel, CtaBand, FaqList, JsonLd } from "./Page";
import { EmiCalculator } from "./EmiCalculator";
import { LeadButton } from "./lead/LeadModal";
import { graph, listing, breadcrumbs, faqPage } from "@/lib/schema";

export function BhkPage({ slug }: { slug: "3-bhk" | "4-bhk" }) {
  const c = configs.find((x) => x.slug === slug)!;
  const other = configs.find((x) => x.slug !== slug)!;
  const plan = plans.find((p) => p.slug === slug)!;
  const qs = faqs.filter((f) => f.group === "Homes and prices").slice(0, 5);
  const crumbs = [{ name: `${c.bhk} BHK villas`, path: c.route }];
  const perSqft = Math.round(c.priceFrom / c.areaSqft);

  return (
    <>
      <JsonLd data={graph(listing(c), breadcrumbs(crumbs), faqPage(qs))} />
      <PageShell
        stage={{ kind: "drawing", paper: true, node: <FloorPlanDrawing slug={slug} />, caption: `${c.name}: illustrative plan, not to scale` }}
        crumbs={crumbs}
        title={`${c.bhk} BHK villas on Sarjapur–Attibele Road`}
        answer={`The ${c.bhk} BHK villa at ${project.name} is ${c.areaSqft.toLocaleString("en-IN")} sq ft over ground, first floor and terrace, on a private plot inside a gated community of ${project.homes.total} homes. Prices start at ${c.priceDisplay} plus charges. There are ${c.units} of these villas on the site.`}
      >
        <table className="facts wide">
          <caption>The {c.bhk} BHK villa at a glance</caption>
          <tbody>
            <tr>
              <th scope="row">Super built-up area</th>
              <td className="tnum">{c.areaSqft.toLocaleString("en-IN")} sq ft</td>
            </tr>
            <tr>
              <th scope="row">Starting price</th>
              <td className="tnum">
                {c.priceDisplay} <small>{priceNote}</small>
              </td>
            </tr>
            <tr>
              <th scope="row">Per sq ft, at the starting price</th>
              <td className="tnum">{formatINR(perSqft)}</td>
            </tr>
            <tr>
              <th scope="row">Plot</th>
              <td>{plan.plot}</td>
            </tr>
            <tr>
              <th scope="row">Facing</th>
              <td>{plan.facing}</td>
            </tr>
            <tr>
              <th scope="row">Villas of this type</th>
              <td className="tnum">{c.units}</td>
            </tr>
            <tr>
              <th scope="row">RERA</th>
              <td className="tnum">{project.rera.number}</td>
            </tr>
          </tbody>
        </table>
        <p>
          <LeadButton intent="cost-sheet" source={`bhk-${slug}`}>
            Get the {c.bhk} BHK cost sheet
          </LeadButton>
        </p>

        <h2>Who it suits</h2>
        <p>{c.forWhom}</p>

        <h2>Room by room</h2>
        {plan.floors.map((f) => (
          <table className="facts wide" key={f.name}>
            <caption>{f.name}</caption>
            <tbody>
              {f.rooms.map((r, i) => (
                <tr key={r.name + i}>
                  <th scope="row">{r.name}</th>
                  <td className="tnum">{r.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
        <p>
          Room sizes are working dimensions.{" "}
          <LeadButton intent="floor-plans" source={`bhk-${slug}-plans`} className="textlink" >
            Ask for the architect’s plans
          </LeadButton>{" "}
          for exact figures.
        </p>

        <h2>What it costs each month</h2>
        <EmiCalculator defaultSlug={slug} />

        <h2>Questions about price</h2>
        <FaqList items={qs} />

        <p style={{ marginTop: "2.5rem" }}>
          Comparing? See the{" "}
          <Link href={other.route} className="textlink">
            {other.bhk} BHK villa, {other.areaSqft.toLocaleString("en-IN")} sq ft from {other.priceDisplay}
          </Link>
          .
        </p>

        <EvidencePanel />
        <CtaBand />
      </PageShell>
    </>
  );
}
