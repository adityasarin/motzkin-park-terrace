import { project } from "@/content/project";
import { placeGroups, commutes } from "@/content/connectivity";
import { faqs } from "@/content/faqs";
import { PageShell, EvidencePanel, CtaBand, FaqList, JsonLd } from "@/components/Page";
import { LocationMap } from "@/components/LocationMap";
import { graph, residence, breadcrumbs, faqPage } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Location: Thyavakanahalli, Sarjapur–Attibele Road",
  description: `Where ${project.name} is: 3 km from Sarjapura, 3.5 km from Indus International School, 9.6 km from Bommasandra. Distances and drive times to schools, hospitals and work.`,
  path: "/location",
});

const crumbs = [{ name: "Location", path: "/location" }];
const qs = faqs.filter((f) => f.group === "Location");
const maxMin = Math.max(...commutes.map((c) => c.minutes));

export default function Location() {
  return (
    <>
      <JsonLd data={graph(residence(), breadcrumbs(crumbs), faqPage(qs))} />
      <PageShell
        stage={{
          kind: "photo",
          src: "/images/bangalore-map-1878-sarjapur-road.jpg",
          alt: "Detail of the 1878 Bangalore Taluk map with two roads marked to Sarjapur",
          caption: "Bangalore Taluk, 1878: two roads run “to Sarjapur”",
          position: "60% 30%",
        }}
        crumbs={crumbs}
        title="On Sarjapur–Attibele Road"
        answer={`${project.name} is at ${project.address.street}, ${project.address.city} ${project.address.postalCode}: about 3 km south of Sarjapura town and 7 km north of Attibele and NH 44. Indus International School is 3.5 km away, Bommasandra industrial area 9.6 km and Electronic City about 18 km.`}
      >
        <h2 style={{ marginTop: 0 }}>Around the gate</h2>
        <LocationMap />
        <p>
          <a href={project.address.mapsUrl} className="textlink">
            Open in Google Maps
          </a>
        </p>

        <h2>The daily drive</h2>
        <figure className="chart" data-reveal>
          <figcaption>Typical off-peak drive time from the gate, in minutes</figcaption>
          <div>
            {[...commutes]
              .sort((a, b) => a.minutes - b.minutes)
              .map((c) => (
                <div className="chart__row" key={c.name}>
                  <span>{c.name}</span>
                  <span className="chart__bar" style={{ width: `${(c.minutes / maxMin) * 82}%` }}>
                    <span data-reveal-bar />
                    <b style={{ left: "100%" }}>{c.minutes} min</b>
                  </span>
                </div>
              ))}
          </div>
        </figure>

        {placeGroups.map((g) => (
          <table className="facts wide" key={g.name}>
            <caption>{g.name}</caption>
            <thead>
              <tr>
                <th scope="col">Place</th>
                <th scope="col" className="num">By road</th>
                <th scope="col" className="num">Drive</th>
              </tr>
            </thead>
            <tbody>
              {g.places.map((p) => (
                <tr key={p.name}>
                  <td>{p.name}</td>
                  <td className="num">{p.km} km</td>
                  <td className="num">{p.minutes} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
        <p style={{ color: "var(--muted)", fontSize: "var(--step-small)" }}>
          Distances by road from the gate; drive times off-peak. Peak-hour trips toward the Outer Ring Road can take twice as long.
        </p>

        <h2>Questions about the area</h2>
        <FaqList items={qs} />
        <EvidencePanel />
        <CtaBand title="Drive it yourself" text="Do the school run or the office commute from the gate, then come in for tea. We can plan the visit around your route." />
      </PageShell>
    </>
  );
}
