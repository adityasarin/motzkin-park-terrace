import Image from "next/image";
import Link from "next/link";
import { project, telHref } from "@/content/project";
import { Credits } from "./Credits";
import { Stripe } from "./Stripe";

const links = [
  { href: "/master-plan", label: "Site plan" },
  { href: "/3-bhk-villas-sarjapur-attibele-road", label: "3 BHK villas" },
  { href: "/4-bhk-villas-sarjapur-attibele-road", label: "4 BHK villas" },
  { href: "/price-list", label: "Price list" },
  { href: "/amenities", label: "Amenities" },
  { href: "/specifications", label: "Specifications" },
  { href: "/location", label: "Location" },
  { href: "/construction-updates", label: "Construction updates" },
  { href: "/official-facts", label: "Official facts" },
  { href: "/nri", label: "For NRI buyers" },
  { href: "/faq", label: "Questions" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <>
      <Stripe thin />
      <footer className="site-footer">
        <Image
          className="site-footer__photo"
          src="/images/paddy-field-in-karnataka-india-2014.jpg"
          alt=""
          fill
          sizes="100vw"
        />
        <div className="site-footer__top">
          <nav aria-label="Footer">
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <address className="site-footer__contact">
            <p>{project.address.street}</p>
            <p>
              {project.address.city} {project.address.postalCode}
            </p>
            <p>
              <a href={telHref}>{project.contact.phone}</a>
            </p>
            <p>
              <a href={`mailto:${project.contact.email}`}>{project.contact.email}</a>
            </p>
            <p>{project.contact.hours}</p>
          </address>
        </div>
        <div className="site-footer__bottom">
          <p className="site-footer__mark" aria-hidden="true">
            {project.shortName}
          </p>
          <p className="site-footer__legal">
            {project.name} · Karnataka RERA {project.rera.number} · Developed by {project.developer.legalName}. Prices are starting
            prices plus charges. All plans and pictures of the project are artistic impressions.{" "}
            <Link href="/disclaimer">Disclaimer</Link> · <Link href="/privacy">Privacy</Link>
          </p>
          <Credits />
        </div>
      </footer>
    </>
  );
}
