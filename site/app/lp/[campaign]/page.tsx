import Image from "next/image";
import { notFound } from "next/navigation";
import { campaigns } from "@/content/campaigns";
import { configs, project, telHref, waHref, priceNote } from "@/content/project";
import { LeadForm } from "@/components/lead/LeadForm";
import { MobileBar } from "@/components/Chrome";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return campaigns.map((c) => ({ campaign: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ campaign: string }> }) {
  const { campaign } = await params;
  const c = campaigns.find((x) => x.slug === campaign);
  if (!c) return {};
  return pageMeta({ title: c.title, description: c.lede, path: `/lp/${c.slug}`, noindex: true });
}

export default async function Landing({ params }: { params: Promise<{ campaign: string }> }) {
  const { campaign } = await params;
  const c = campaigns.find((x) => x.slug === campaign);
  if (!c) notFound();
  const [three, four] = configs;
  return (
    <main id="main" className="lp">
      <p className="lp__mark">{project.name}</p>
      <h1>{c.title}</h1>
      <p style={{ fontSize: "var(--step-lead)", lineHeight: 1.4, margin: 0 }}>{c.lede}</p>
      <figure className="lp__photo">
        <Image src={c.image.src} alt={c.image.alt} width={1200} height={900} priority sizes="(min-width: 640px) 40rem, 100vw" />
        <figcaption>{c.image.caption}</figcaption>
      </figure>
      <ul className="lp__facts">
        <li>
          <strong>{project.homes.total}</strong>villas, one gate
        </li>
        <li>
          <strong>{project.land.acres}</strong>acres
        </li>
        <li>
          <strong>{three.priceDisplay}</strong>3 BHK, {three.areaSqft.toLocaleString("en-IN")} sq ft
        </li>
        <li>
          <strong>{four.priceDisplay}</strong>4 BHK, {four.areaSqft.toLocaleString("en-IN")} sq ft
        </li>
      </ul>
      <section className="lp__form" aria-labelledby="lp-form-h">
        <h2 id="lp-form-h">{c.formTitle}</h2>
        <LeadForm intent={c.intent} source={`lp-${c.slug}`} />
      </section>
      <p style={{ marginTop: "1.5rem" }}>
        Or call{" "}
        <a href={telHref} className="textlink tnum">
          {project.contact.phone}
        </a>{" "}
        ·{" "}
        <a href={waHref(`Hello, I saw your ad: ${c.title}`)} className="textlink" target="_blank" rel="noopener">
          WhatsApp
        </a>
      </p>
      <p className="lp__legal">
        Karnataka RERA {project.rera.number}. {priceNote} Pictures show Bengaluru, not the project. {project.address.street},{" "}
        {project.address.city} {project.address.postalCode}.
      </p>
      <MobileBar />
    </main>
  );
}
