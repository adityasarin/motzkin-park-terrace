import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { project, officialFacts } from "@/content/project";
import { LeadButton } from "./lead/LeadModal";
import type { Intent } from "./lead/intents";
import { Qr } from "./Qr";

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

type Stage =
  | { kind: "photo"; src: string; alt: string; caption: string; position?: string; grayscale?: boolean; zoom?: number }
  | { kind: "drawing"; node: ReactNode; caption: string; paper?: boolean };

/** Inner-page frame: the stage holds still on the left, the reading column scrolls on the right. */
export function PageShell({
  stage,
  crumbs,
  title,
  answer,
  children,
}: {
  stage: Stage;
  crumbs: { name: string; path: string }[];
  title: string;
  answer: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="page">
      {stage.kind === "photo" ? (
        <figure className="page__stage">
          <Image
            src={stage.src}
            alt={stage.alt}
            fill
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            style={{
              objectPosition: stage.position,
              filter: stage.grayscale ? "grayscale(1) contrast(1.1)" : undefined,
              transform: stage.zoom ? `scale(${stage.zoom})` : undefined,
              transformOrigin: stage.position,
            }}
          />
          <figcaption className="stage-caption">{stage.caption}</figcaption>
        </figure>
      ) : (
        <figure className={`page__stage ${stage.paper ? "page__stage--paper" : "page__stage--drawing"}`}>
          {stage.node}
          <figcaption className="stage-caption">{stage.caption}</figcaption>
        </figure>
      )}
      <article className="page__read">
        <nav aria-label="Breadcrumb">
          <ol className="crumbs">
            <li>
              <Link href="/">Home</Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={c.path}>{i === crumbs.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.path}>{c.name}</Link>}</li>
            ))}
          </ol>
        </nav>
        <div data-reveal>
          <h1>{title}</h1>
          <p className="answer">{answer}</p>
        </div>
        {children}
      </article>
    </div>
  );
}

/** Dated, sourced facts with the RERA QR code: the evidence an AI engine or a buyer can check. */
export function EvidencePanel({ rows = 4 }: { rows?: number }) {
  return (
    <section className="evidence" aria-labelledby="evidence-h">
      <h2 id="evidence-h">Check these facts</h2>
      <div className="evidence__row">
        <div>
          {officialFacts.slice(0, rows).map((f) => (
            <p key={f.label}>
              {f.label}: <strong>{f.value}</strong> <span className="muted">({f.source})</span>
            </p>
          ))}
          <p className="muted">
            Last checked {new Date(project.status.asOf).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.{" "}
            <Link href="/official-facts" className="textlink">
              All official facts
            </Link>
          </p>
        </div>
        <div className="evidence__qr" title="Scan to open Karnataka RERA">
          <Qr value={project.rera.url} label={`QR code linking to ${project.rera.authority}`} />
        </div>
      </div>
    </section>
  );
}

export function CtaBand({
  title = "See it before you decide",
  text = `Walk the site, stand on a terrace and see the clubhouse taking shape. ${project.contact.hours}.`,
  intent = "visit",
  button = "Book a site visit",
}: {
  title?: string;
  text?: string;
  intent?: Intent;
  button?: string;
}) {
  return (
    <section className="cta-band" data-reveal>
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="row">
        <LeadButton intent={intent} source="cta-band">
          {button}
        </LeadButton>
        <Link href="/contact" className="textlink">
          Other ways to reach us
        </Link>
      </div>
    </section>
  );
}

export { FaqList } from "./FaqList";
