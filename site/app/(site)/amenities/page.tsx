import Image from "next/image";
import { project } from "@/content/project";
import { amenityGroups } from "@/content/amenities";
import { faqs } from "@/content/faqs";
import { PageShell, EvidencePanel, CtaBand, FaqList, JsonLd } from "@/components/Page";
import { graph, residence, breadcrumbs } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Amenities: clubhouse, pool and courts",
  description: `Amenities at ${project.name}: clubhouse with gym and library, swimming pool, children’s pool, badminton, basketball, cricket net, jogging track, STP and rainwater harvesting.`,
  path: "/amenities",
});

const crumbs = [{ name: "Amenities", path: "/amenities" }];

export default function Amenities() {
  return (
    <>
      <JsonLd data={graph(residence(), breadcrumbs(crumbs))} />
      <PageShell
        stage={{ kind: "photo", src: "/images/plumeria-rubra-2852.jpg", alt: "White temple-tree flowers against green foliage", caption: "Temple tree, a Bengaluru garden staple", position: "40% 50%" }}
        crumbs={crumbs}
        title="Clubhouse, pool and courts"
        answer={`${project.name} has a clubhouse with gym, library, party hall and yoga deck; a swimming pool and children’s pool; badminton, basketball and cricket practice; a jogging and cycling track; and a sewage treatment plant, rainwater harvesting and solar street lighting.`}
      >
        {amenityGroups.map((g) => (
          <section key={g.title} data-reveal>
            <h2>{g.title}</h2>
            <ul className="plain">
              {g.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <figure style={{ margin: "1.5rem 0 0", maxWidth: 420 }}>
              <Image src={g.image.src} alt={g.image.alt} width={840} height={560} sizes="420px" style={{ width: "100%", height: "auto", aspectRatio: "3 / 2", objectFit: "cover" }} />
              <figcaption style={{ fontSize: "var(--step-small)", color: "var(--muted)", marginTop: "0.4rem" }}>{g.image.caption}</figcaption>
            </figure>
          </section>
        ))}
        <h2>Questions</h2>
        <FaqList items={faqs.filter((f) => f.group === "Living here")} />
        <EvidencePanel />
        <CtaBand />
      </PageShell>
    </>
  );
}
