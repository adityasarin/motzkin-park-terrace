import { project } from "@/content/project";
import { PageShell } from "@/components/Page";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Disclaimer",
  description: `Terms that apply to the information on the ${project.name} website.`,
  path: "/disclaimer",
});

export default function Disclaimer() {
  return (
    <PageShell
      stage={{ kind: "photo", src: "/images/bangalore-1940.jpg", alt: "Survey of India guide map of Bangalore, 1940", caption: "Bangalore guide map, Survey of India, 1940" }}
      crumbs={[{ name: "Disclaimer", path: "/disclaimer" }]}
      title="Disclaimer"
      answer={`This website gives general information about ${project.name}, registered with Karnataka RERA under ${project.rera.number}. It is not an offer or a contract; the sale agreement governs every sale.`}
    >
      <h2>Plans and pictures</h2>
      <p>
        Site plans, floor plans and drawings on this website are artistic impressions and are not to scale. Photographs show
        Bengaluru and Karnataka, not the project, and are credited at the foot of every page.
      </p>
      <h2>Prices</h2>
      <p>
        Prices are starting prices and exclude registration, stamp duty, GST, deposits and other charges. They may change without
        notice until an allotment letter is issued.
      </p>
      <h2>Distances and times</h2>
      <p>Distances are by road from the project gate; drive times are off-peak estimates and will vary.</p>
      <h2>Infrastructure</h2>
      <p>References to planned roads, metro lines and other public projects describe plans by public authorities. We do not control their timing.</p>
    </PageShell>
  );
}
