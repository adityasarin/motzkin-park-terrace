"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";

export default function MobileNav({
  open,
  onOpenChange,
  path,
  links,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  path: string;
  links: { href: string; label: string }[];
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="mobile-nav bg-paper p-6 pt-16" style={{ width: "min(24rem, 88vw)" }}>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Pages on this site</SheetDescription>
        <nav aria-label="Mobile" onClick={(e) => (e.target as HTMLElement).closest("a") && onOpenChange(false)}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={path === l.href ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
