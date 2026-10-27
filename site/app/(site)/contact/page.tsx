import { project, telHref, waHref } from "@/content/project";
import { PageShell, JsonLd } from "@/components/Page";
import { LeadForm } from "@/components/lead/LeadForm";
import { graph, organization, breadcrumbs } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact and site visits",
  description: `Visit ${project.name} at ${project.address.street}, ${project.address.city}. Call ${project.contact.phone} or message on WhatsApp. ${project.contact.hours}.`,
  path: "/contact",
});

const crumbs = [{ name: "Contact", path: "/contact" }];

export default function Contact() {
  return (
    <>
      <JsonLd data={graph(organization(), breadcrumbs(crumbs))} />
      <PageShell
        stage={{ kind: "photo", src: "/images/rain-tree-avenue.jpg", alt: "Rain trees arching over a Bengaluru road", caption: "Rain trees on a Bengaluru avenue", position: "70% 50%" }}
        crumbs={crumbs}
        title="Visit the site"
        answer={`The site office at ${project.address.street}, ${project.address.city} ${project.address.postalCode} is open every day from 10 am to 6 pm. Call ${project.contact.phone}, message us on WhatsApp, or book a visit below and we will confirm a time.`}
      >
        <table className="facts wide">
          <tbody>
            <tr>
              <th scope="row">Address</th>
              <td>
                {project.address.street}, {project.address.city} {project.address.postalCode}
                <small>
                  <a href={project.address.mapsUrl} className="textlink">
                    Directions in Google Maps
                  </a>
                </small>
              </td>
            </tr>
            <tr>
              <th scope="row">Phone</th>
              <td className="tnum">
                <a href={telHref} className="textlink">
                  {project.contact.phone}
                </a>
              </td>
            </tr>
            <tr>
              <th scope="row">WhatsApp</th>
              <td>
                <a href={waHref()} className="textlink" target="_blank" rel="noopener">
                  Message us
                </a>
              </td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>
                <a href={`mailto:${project.contact.email}`} className="textlink">
                  {project.contact.email}
                </a>
              </td>
            </tr>
            <tr>
              <th scope="row">Hours</th>
              <td>{project.contact.hours}</td>
            </tr>
          </tbody>
        </table>

        <h2>Book a site visit</h2>
        <div className="lp__form">
          <LeadForm intent="visit" source="contact-page" />
        </div>

        <h2>Channel partners</h2>
        <p>
          Registered real-estate agents are welcome. Ask the site office for partner terms; please quote your RERA agent
          registration number.
        </p>
      </PageShell>
    </>
  );
}
