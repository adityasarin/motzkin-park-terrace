import { project } from "@/content/project";
import { specs } from "@/content/floorplans";
import { PageShell, EvidencePanel, CtaBand, JsonLd } from "@/components/Page";
import { LeadButton } from "@/components/lead/LeadModal";
import { graph, breadcrumbs } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Specifications: structure, finishes and fittings",
  description: `Construction specifications for the villas at ${project.name}: structure, flooring, kitchen, bathrooms, doors and windows, electrical and paint.`,
  path: "/specifications",
});

const crumbs = [{ name: "Specifications", path: "/specifications" }];

export default function Specifications() {
  return (
    <>
      <JsonLd data={graph(breadcrumbs(crumbs))} />
      <PageShell
        stage={{
          kind: "photo",
          src: "/images/digital-image-of-the-sarjapura-1429ce-mayileya.jpg",
          alt: "Kannada inscription carved in stone at Sarjapura, 1429 CE",
          caption: "Stone inscription, Sarjapura, 1429 CE",
          position: "30% 40%",
        }}
        crumbs={crumbs}
        title="What the villas are built from"
        answer={`The villas at ${project.name} have an RCC frame with solid block walls, vitrified tile floors, a granite kitchen counter, branded sanitaryware, UPVC windows, three-phase power and points for air-conditioning in every bedroom.`}
      >
        <table className="facts wide">
          <caption>Specifications</caption>
          <tbody>
            {specs.map((s) => (
              <tr key={s.group}>
                <th scope="row">{s.group}</th>
                <td>
                  {s.lines.map((l) => (
                    <span key={l} style={{ display: "block", marginBottom: "0.35rem" }}>
                      {l}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          The signed agreement carries the binding specification.{" "}
          <LeadButton intent="brochure" source="specifications" className="textlink">
            Get the specification sheet
          </LeadButton>
          .
        </p>
        <EvidencePanel />
        <CtaBand title="Touch the finishes" text="The show villa has the floor tiles, fittings and windows that go into every home. Visit to see them." />
      </PageShell>
    </>
  );
}
