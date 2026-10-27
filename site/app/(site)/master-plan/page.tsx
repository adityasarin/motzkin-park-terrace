import Link from "next/link";
import { project, configs } from "@/content/project";
import { counts } from "@/lib/siteplan";
import { PageShell, EvidencePanel, CtaBand, JsonLd } from "@/components/Page";
import { SitePlanProvider, SitePlanSvg, SitePlanControls } from "@/components/SitePlan";
import { graph, residence, breadcrumbs } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Master plan: 47 villas on two acres",
  description: `Site plan of ${project.name}: ${project.homes.total} villas (${counts[3]} × 3 BHK, ${counts[4]} × 4 BHK) on about ${project.land.display}, two internal roads, clubhouse, pool and courts by the gate.`,
  path: "/master-plan",
});

const crumbs = [{ name: "Master plan", path: "/master-plan" }];

export default function MasterPlan() {
  return (
    <>
      <JsonLd data={graph(residence(), breadcrumbs(crumbs))} />
      <SitePlanProvider>
        <PageShell
          stage={{ kind: "drawing", node: <SitePlanSvg interactive />, caption: "Illustrative site plan · not to scale" }}
          crumbs={crumbs}
          title="47 villas on two acres"
          answer={`${project.name} lays out ${project.homes.total} villas on about ${project.land.display}: ${counts[4]} four-bedroom villas along the east and west edges and ${counts[3]} three-bedroom villas back to back in the middle, served by two internal roads. The clubhouse, pool, lawn and courts sit by the single gate on Sarjapur–Attibele Road.`}
        >
          <h2 style={{ marginTop: 0 }}>Find a plot</h2>
          <SitePlanControls />

          <h2>The two villa types</h2>
          <table className="facts wide">
            <thead>
              <tr>
                <th scope="col">Villa</th>
                <th scope="col" className="num">Homes</th>
                <th scope="col" className="num">Area</th>
                <th scope="col" className="num">From</th>
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
                  <td className="num">{c.units}</td>
                  <td className="num">{c.areaSqft.toLocaleString("en-IN")} sq ft</td>
                  <td className="num">{c.priceDisplay}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>How the site works</h2>
          <ul className="plain">
            <li>One gate on Sarjapur–Attibele Road, with a security cabin.</li>
            <li>Two north–south internal roads lined with trees, joined at both ends.</li>
            <li>Every villa fronts a road and has its own car parking inside the plot.</li>
            <li>Shared facilities sit by the gate, so visitors and deliveries never pass the homes.</li>
            <li>A pocket park at the north-east corner.</li>
          </ul>
          <p style={{ color: "var(--muted)", fontSize: "var(--step-small)" }}>
            The plan shows the layout principle. Plot numbers, sizes and facing are confirmed in the allotment letter.
          </p>
          <EvidencePanel />
          <CtaBand title="Walk the plots" text="Choose your plot on site: the light, the neighbours and the walk to the clubhouse are easier to judge in person." />
        </PageShell>
      </SitePlanProvider>
    </>
  );
}
