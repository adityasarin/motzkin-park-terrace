import { project } from "@/content/project";
import { updates } from "@/content/updates";
import { PageShell, EvidencePanel, CtaBand, JsonLd } from "@/components/Page";
import { LeadButton } from "@/components/lead/LeadModal";
import { graph, breadcrumbs } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Construction updates",
  description: `Dated construction progress at ${project.name}, Sarjapur–Attibele Road. Possession expected ${project.status.possession}.`,
  path: "/construction-updates",
});

const crumbs = [{ name: "Construction updates", path: "/construction-updates" }];
const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default function Updates() {
  const latest = updates[0];
  return (
    <>
      <JsonLd data={graph(breadcrumbs(crumbs))} />
      <PageShell
        stage={{ kind: "photo", src: "/images/rain-tree-avenue.jpg", alt: "Rain trees arching over a Bengaluru road", caption: "Rain trees on a Bengaluru avenue", position: "30% 50%" }}
        crumbs={crumbs}
        title="How the site is coming along"
        answer={`${project.name} is ${project.status.label.toLowerCase()}, about ${latest.progress}% complete as of ${fmt(latest.date)}, with possession expected in ${project.status.possession}. Every month we post a dated note from the site engineer here.`}
      >
        <ol className="log" reversed>
          {updates.map((u) => (
            <li key={u.date} data-reveal>
              <time dateTime={u.date}>{fmt(u.date)}</time>
              <h3>{u.title}</h3>
              <p>{u.body}</p>
              <div className="meter" role="img" aria-label={`About ${u.progress}% complete overall`}>
                <span data-reveal-bar style={{ width: `${u.progress}%` }} />
              </div>
              <p style={{ color: "var(--muted)", fontSize: "var(--step-small)", marginTop: "0.5rem" }}>About {u.progress}% complete overall</p>
            </li>
          ))}
        </ol>
        <p>
          Site photographs are added with each update.{" "}
          <LeadButton intent="virtual-tour" source="updates" className="textlink">
            Book a live video walkthrough
          </LeadButton>{" "}
          to see the site today.
        </p>
        <EvidencePanel />
        <CtaBand />
      </PageShell>
    </>
  );
}
