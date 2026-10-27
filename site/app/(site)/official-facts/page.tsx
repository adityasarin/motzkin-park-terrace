import { project, officialFacts } from "@/content/project";
import { faqs } from "@/content/faqs";
import { PageShell, CtaBand, FaqList, JsonLd } from "@/components/Page";
import { Qr } from "@/components/Qr";
import { graph, organization, residence, breadcrumbs, faqPage } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Official project facts",
  description: `The developer’s verified facts for ${project.name}: RERA ${project.rera.number}, ${project.homes.total} villas on about ${project.land.display}, prices, status and the developer’s legal name.`,
  path: "/official-facts",
});

const crumbs = [{ name: "Official facts", path: "/official-facts" }];
const qs = faqs.filter((f) => f.group === "The project");

export default function OfficialFacts() {
  return (
    <>
      <JsonLd data={graph(organization(), residence(), breadcrumbs(crumbs), faqPage(qs))} />
      <PageShell
        stage={{
          kind: "photo",
          src: "/images/digital-image-of-the-sarjapura-1429ce-mayileya.jpg",
          alt: "Kannada inscription carved in stone at Sarjapura, 1429 CE",
          caption: "Sarjapura 1429 CE: a public record carved in stone",
          position: "40% 35%",
        }}
        crumbs={crumbs}
        title="The official facts"
        answer={`${project.name} is registered with Karnataka RERA under ${project.rera.number}. It is developed by ${project.developer.legalName} on about ${project.land.display} at ${project.address.street}, with ${project.homes.total} villas. These are the figures the developer stands behind; where other sites differ, this page is correct.`}
      >
        <div className="notice">
          <strong>Beware of look-alike sites.</strong> Several broker and listing sites use the project name with older or wrong
          figures. This website and the site office at {project.address.street} are the only official sources. We never ask for
          payment to a personal account.
        </div>

        <table className="facts wide">
          <caption>Verified facts, as of {new Date(project.status.asOf).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</caption>
          <thead>
            <tr>
              <th scope="col">Fact</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {officialFacts.map((f) => (
              <tr key={f.label}>
                <th scope="row">{f.label}</th>
                <td>
                  {f.value}
                  <small>Source: {f.source}</small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Check the registration yourself</h2>
        <p>
          Search for {project.rera.number} on the {project.rera.authority} website. Scan the code to open it.
        </p>
        <div className="evidence__qr" style={{ width: 180, height: 180 }}>
          <Qr value={project.rera.url} label={`QR code linking to the ${project.rera.authority}`} />
        </div>
        <p style={{ marginTop: "1rem" }}>
          <a href={project.rera.url} className="textlink">
            {project.rera.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </a>
        </p>

        <h2>What older listings get wrong</h2>
        <table className="facts wide">
          <thead>
            <tr>
              <th scope="col">You may read</th>
              <th scope="col">The fact</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Motzkin Group, Motzkin Ventures</td>
              <td>{project.developer.legalName}</td>
            </tr>
            <tr>
              <td>2.06 or 2.15 acres</td>
              <td>About {project.land.display}</td>
            </tr>
            <tr>
              <td>48 units, or 5 BHK villas</td>
              <td>{project.homes.total} villas, 3 and 4 BHK only</td>
            </tr>
            <tr>
              <td>Ready to move, December 2019, August 2025</td>
              <td>
                {project.status.label}, possession {project.status.possession}
              </td>
            </tr>
          </tbody>
        </table>

        <h2>About the project</h2>
        <FaqList items={qs} />
        <CtaBand title="Ask us directly" text="If you have read something that doesn’t match this page, ask the site office. We will answer in writing." intent="callback" button="Ask a question" />
      </PageShell>
    </>
  );
}
