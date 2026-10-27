"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { configs } from "@/content/project";
import { plans } from "@/content/floorplans";
import { FloorPlanDrawing } from "./FloorPlanDrawing";
import { LeadButton } from "./lead/LeadModal";

/** Showcase: square plate on the left, spare text with plain tabs on the right. */
export function FloorPlanTabs() {
  const [i, setI] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const c = configs[i];
  const plan = plans.find((p) => p.slug === c.slug)!;

  function onKey(e: KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + configs.length) % configs.length;
    setI(next);
    tabs.current[next]?.focus();
  }

  return (
    <section className="showcase" aria-labelledby="plans-h">
      <figure className="showcase__plate" id={`panel-${c.slug}`} role="tabpanel" aria-labelledby={`tab-${c.slug}`}>
        <div key={c.slug} className="fade-swap" style={{ width: "100%", height: "100%" }}>
          <FloorPlanDrawing slug={c.slug} />
        </div>
      </figure>
      <div className="showcase__copy" data-reveal>
        <div className="tabs" role="tablist" aria-label="Villa type" onKeyDown={onKey}>
          {configs.map((x, n) => (
            <button
              key={x.slug}
              ref={(el) => {
                tabs.current[n] = el;
              }}
              id={`tab-${x.slug}`}
              role="tab"
              type="button"
              aria-selected={n === i}
              aria-controls={`panel-${x.slug}`}
              tabIndex={n === i ? 0 : -1}
              onClick={() => setI(n)}
            >
              {x.bhk} BHK villa
            </button>
          ))}
        </div>
        <div key={c.slug} className="fade-swap">
          <h2 id="plans-h" className="showcase__title">
            {c.bhk} BHK, {c.areaSqft.toLocaleString("en-IN")} sq ft
          </h2>
          <p className="showcase__desc">
            {c.forWhom} Three levels: living and a guest room below, bedrooms above, and the terrace on top. From {c.priceDisplay}.
          </p>
          <ul className="showcase__rooms">
            {plan.floors.slice(0, 2).map((f) => (
              <li key={f.name}>
                <span>{f.name}</span>
                <span>{f.rooms.filter((r) => !/car/i.test(r.name)).map((r) => r.name.toLowerCase()).slice(0, 3).join(", ")}</span>
              </li>
            ))}
            <li>
              <span>Plot</span>
              <span>{plan.plot.replace("About ", "about ")}</span>
            </li>
          </ul>
        </div>
        <div className="cells">
          <LeadButton intent="floor-plans" source="showcase" className="cell cell--ink">
            Get the floor plans
          </LeadButton>
          <Link href={c.route} className="cell cell--tone">
            See the {c.bhk} BHK villa
          </Link>
        </div>
      </div>
    </section>
  );
}
