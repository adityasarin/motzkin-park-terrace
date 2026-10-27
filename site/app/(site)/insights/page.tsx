import Link from "next/link";
import { project } from "@/content/project";
import { posts } from "@/content/posts";
import { PageShell, CtaBand, JsonLd } from "@/components/Page";
import { graph, breadcrumbs } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Insights: buying a villa on Sarjapur Road",
  description: "Guides to prices, roads and schools on the Sarjapur–Attibele belt, written for people choosing a home there.",
  path: "/insights",
});

const crumbs = [{ name: "Insights", path: "/insights" }];
const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default function Insights() {
  return (
    <>
      <JsonLd data={graph(breadcrumbs(crumbs))} />
      <PageShell
        stage={{ kind: "photo", src: "/images/bangalore-1940.jpg", alt: "Survey of India guide map of Bangalore from 1940", caption: "Bangalore guide map, Survey of India, 1940", position: "60% 50%" }}
        crumbs={crumbs}
        title="Notes on the Sarjapur belt"
        answer={`Short, dated guides to prices, roads and schools around Sarjapur–Attibele Road, written by the team at ${project.name} for people choosing a home here. Each one says what is confirmed and what is still a plan.`}
      >
        <ul className="post-list">
          {posts.map((p) => (
            <li key={p.slug} data-reveal>
              <Link href={`/insights/${p.slug}`}>{p.title}</Link>
              <p>
                <time dateTime={p.date}>{fmt(p.date)}</time> · {p.description}
              </p>
            </li>
          ))}
        </ul>
        <CtaBand />
      </PageShell>
    </>
  );
}
