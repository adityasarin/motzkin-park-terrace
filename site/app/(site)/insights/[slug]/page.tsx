import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/content/posts";
import { PageShell, EvidencePanel, CtaBand, JsonLd } from "@/components/Page";
import { graph, article, breadcrumbs } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMeta({ title: p.title, description: p.description, path: `/insights/${p.slug}` });
}

const stages = [
  { src: "/images/rain-tree-avenue.jpg", alt: "Rain trees arching over a Bengaluru road", caption: "Rain trees on a Bengaluru avenue" },
  { src: "/images/bangalore-map-1878.jpg", alt: "Map of the Bangalore Taluk, 1878", caption: "Bangalore Taluk, 1878" },
  { src: "/images/plumeria-rubra-2852.jpg", alt: "White temple-tree flowers", caption: "Temple tree, a Bengaluru garden staple" },
];

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = posts.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = posts[i];
  const crumbs = [
    { name: "Insights", path: "/insights" },
    { name: p.title, path: `/insights/${p.slug}` },
  ];
  const s = stages[i % stages.length];
  return (
    <>
      <JsonLd data={graph(article(p), breadcrumbs(crumbs))} />
      <PageShell stage={{ kind: "photo", ...s }} crumbs={crumbs} title={p.title} answer={p.answer}>
        <p style={{ color: "var(--muted)", fontSize: "var(--step-small)" }}>
          Published <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</time>
        </p>
        {p.sections.map((sec) => (
          <section key={sec.heading}>
            <h2>{sec.heading}</h2>
            {sec.paragraphs.map((t) => (
              <p key={t.slice(0, 24)}>{t}</p>
            ))}
          </section>
        ))}
        <p style={{ marginTop: "2.5rem" }}>
          <Link href="/insights" className="textlink">
            More notes on the Sarjapur belt
          </Link>
        </p>
        <EvidencePanel />
        <CtaBand />
      </PageShell>
    </>
  );
}
