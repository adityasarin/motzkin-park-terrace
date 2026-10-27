import { project } from "@/content/project";
import { faqs, faqGroups } from "@/content/faqs";
import { PageShell, EvidencePanel, CtaBand, FaqList, JsonLd } from "@/components/Page";
import { graph, breadcrumbs, faqPage } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Questions and answers",
  description: `${faqs.length} answers about ${project.name}: price, RERA, possession, location, schools, amenities, loans and buying as an NRI.`,
  path: "/faq",
});

const crumbs = [{ name: "Questions", path: "/faq" }];

export default function Faq() {
  return (
    <>
      <JsonLd data={graph(breadcrumbs(crumbs), faqPage(faqs))} />
      <PageShell
        stage={{ kind: "photo", src: "/images/paddy-field-in-karnataka-india-2014.jpg", alt: "Young paddy in a Karnataka field ringed by coconut palms", caption: "Paddy in Karnataka after the rains", position: "50% 70%" }}
        crumbs={crumbs}
        title="Questions buyers ask"
        answer={`Answers to the ${faqs.length} questions buyers ask most about ${project.name}, grouped by topic. Each answer links to the page it comes from, so you can check the detail.`}
      >
        <nav aria-label="Topics">
          <ul className="locmap__list" style={{ marginBottom: "1rem" }}>
            {faqGroups.map((g) => (
              <li key={g}>
                <a href={`#${g.toLowerCase().replace(/\s+/g, "-")}`} className="textlink" style={{ display: "inline-block", padding: "0.5rem 0.75rem 0.5rem 0" }}>
                  {g}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {faqGroups.map((g) => (
          <section key={g} id={g.toLowerCase().replace(/\s+/g, "-")}>
            <h2>{g}</h2>
            <FaqList items={faqs.filter((f) => f.group === g)} />
          </section>
        ))}
        <EvidencePanel />
        <CtaBand title="Still have a question?" text="Leave your number and the site team will call you back within working hours." intent="callback" button="Ask us" />
      </PageShell>
    </>
  );
}
