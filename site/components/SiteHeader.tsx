"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { LeadButton } from "@/components/lead/LeadModal";
import { project } from "@/content/project";

const MobileNav = dynamic(() => import("./MobileNav"), { ssr: false });

export const navLinks = [
  { href: "/master-plan", label: "Homes" },
  { href: "/price-list", label: "Prices" },
  { href: "/location", label: "Location" },
  { href: "/amenities", label: "Amenities" },
  { href: "/official-facts", label: "Official facts" },
];

const moreLinks = [
  { href: "/3-bhk-villas-sarjapur-attibele-road", label: "3 BHK villas" },
  { href: "/4-bhk-villas-sarjapur-attibele-road", label: "4 BHK villas" },
  { href: "/specifications", label: "Specifications" },
  { href: "/construction-updates", label: "Construction updates" },
  { href: "/nri", label: "For NRI buyers" },
  { href: "/faq", label: "Questions" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);
  // Below 1024px the bar steps out of the way while reading down and returns on the way up.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const onScroll = () => {
      const y = window.scrollY;
      if (!mq.matches || y < 200) setHidden(false);
      else if (y > last.current + 6) setHidden(true);
      else if (y < last.current - 6) setHidden(false);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="site-header" data-hidden={hidden}>
      <Link href="/" className="site-header__mark" aria-label={`${project.name}, home`}>
        {project.name}
      </Link>
      <nav className="site-header__nav" aria-label="Main">
        {navLinks.map((l) => (
          <Link key={l.href} href={l.href} aria-current={path === l.href ? "page" : undefined}>
            {l.label}
          </Link>
        ))}
      </nav>
      <LeadButton intent="visit" source="header" className="btn site-header__cta">
        Book a site visit
      </LeadButton>
      <button type="button" className="site-header__menu" aria-expanded={open} onClick={() => setOpen(true)}>
        Menu
      </button>
      {open && <MobileNav open={open} onOpenChange={setOpen} path={path} links={[{ href: "/", label: "Home" }, ...navLinks, ...moreLinks]} />}
    </header>
  );
}

export { moreLinks };
