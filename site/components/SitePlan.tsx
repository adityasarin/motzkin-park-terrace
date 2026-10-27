"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { plots, roads, amenities, gate, VIEW, counts, type Plot } from "@/lib/siteplan";
import { configs, project } from "@/content/project";

type Filter = "all" | 3 | 4;
type Ctx = { filter: Filter; setFilter: (f: Filter) => void; selected: number | null; setSelected: (n: number | null) => void };

const SitePlanContext = createContext<Ctx | null>(null);

export function SitePlanProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<number | null>(null);
  return <SitePlanContext.Provider value={{ filter, setFilter, selected, setSelected }}>{children}</SitePlanContext.Provider>;
}

function useSitePlan(): Ctx {
  const ctx = useContext(SitePlanContext);
  // Outside a provider the plan renders static (inner pages).
  return ctx ?? { filter: "all", setFilter: () => {}, selected: null, setSelected: () => {} };
}

const fillVar = { three: "var(--plan-three)", four: "var(--plan-four)", water: "var(--plan-water)", tree: "var(--plan-tree)" } as const;

function plotFill(p: Plot, filter: Filter) {
  if (filter !== "all" && p.type !== filter) return "var(--plan-plot)";
  return p.type === 3 ? "var(--plan-three)" : "var(--plan-four)";
}

function treeDots() {
  const dots: { cx: number; cy: number }[] = [];
  for (let y = 90; y < 930; y += 70) {
    dots.push({ cx: 285, cy: y + 35 }, { cx: 711, cy: y + 35 });
  }
  return dots;
}

export function SitePlanSvg({ interactive = false, title = "Illustrative site plan of Motzkin Park Terrace" }: { interactive?: boolean; title?: string }) {
  const { filter, selected, setSelected } = useSitePlan();
  return (
    <svg className="siteplan" viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} role="img" aria-label={title} preserveAspectRatio="xMidYMid meet">
      <title>{title}</title>
      <rect x="30" y="16" width="940" height="1214" fill="var(--plan-ground)" />
      {roads.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill="var(--plan-road)" />
      ))}
      {treeDots().map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r="11" fill="var(--plan-tree)" />
      ))}
      {amenities.map((a) => (
        <g key={a.label}>
          <rect x={a.x} y={a.y} width={a.w} height={a.h} fill={fillVar[a.fill as keyof typeof fillVar]} />
          <text x={a.x + 14} y={a.y + 36} fontSize="26" fill={a.fill === "three" ? "var(--paper)" : "var(--paper-ink)"}>
            {a.label}
          </text>
        </g>
      ))}
      <rect x={gate.x} y={gate.y} width={gate.w} height={gate.h} fill="var(--paper-ink)" />
      <text x={gate.x - 12} y={1222} fontSize="24" textAnchor="end" fill="var(--paper-ink)">
        Gate · Sarjapur–Attibele Road
      </text>
      <g aria-hidden={!interactive}>
        {plots.map((p) => {
          const fill = plotFill(p, filter);
          const dark = fill !== "var(--plan-plot)";
          const props = interactive
            ? {
                role: "button",
                tabIndex: 0,
                "aria-label": `Plot ${p.n}, ${p.type} BHK, ${p.facing} facing`,
                "aria-pressed": selected === p.n,
                onClick: () => setSelected(selected === p.n ? null : p.n),
                onKeyDown: (e: React.KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(selected === p.n ? null : p.n);
                  }
                },
              }
            : {};
          return (
            <g key={p.n} className="plot" data-selected={selected === p.n} {...props}>
              <rect x={p.x} y={p.y} width={p.w} height={p.h} fill={fill} />
              <text x={p.x + 14} y={p.y + 42} fontSize="26" fill={dark ? "var(--paper)" : "var(--paper-ink)"}>
                {p.n}
              </text>
            </g>
          );
        })}
      </g>
      <g transform="translate(905 1135)" aria-hidden="true">
        <path d="M0 -40 L14 0 L0 -8 L-14 0 Z" fill="var(--paper-ink)" />
        <text x="0" y="28" fontSize="24" textAnchor="middle" fill="var(--paper-ink)">
          N
        </text>
      </g>
    </svg>
  );
}

/** The live thing: choose a villa type, see where those homes sit, tap a plot for its details. */
export function SitePlanControls() {
  const { filter, setFilter, selected, setSelected } = useSitePlan();
  const plot = plots.find((p) => p.n === selected);
  const [three, four] = configs;
  const options: { v: Filter; label: string }[] = [
    { v: "all", label: `All ${project.homes.total}` },
    { v: 3, label: `3 BHK · ${counts[3]}` },
    { v: 4, label: `4 BHK · ${counts[4]}` },
  ];
  const cfg = (t: 3 | 4) => (t === 3 ? three : four);

  let readout: ReactNode;
  if (plot) {
    const c = cfg(plot.type);
    readout = (
      <>
        <span className="plan-big">Plot {plot.n}</span>
        {c.name}, {c.areaSqft.toLocaleString("en-IN")} sq ft, {plot.facing.toLowerCase()} facing, from {c.priceDisplay}.
      </>
    );
  } else if (filter === "all") {
    readout = (
      <>
        <span className="plan-big">{project.homes.total} homes</span>
        {counts[3]} three-bedroom and {counts[4]} four-bedroom villas. Tap a plot to see it.
      </>
    );
  } else {
    const c = cfg(filter);
    readout = (
      <>
        <span className="plan-big">{counts[filter]} villas</span>
        {c.areaSqft.toLocaleString("en-IN")} sq ft each, from {c.priceDisplay}.
      </>
    );
  }

  return (
    <>
      <div className="plan-toggle" role="group" aria-label="Show villas by type">
        {options.map((o) => (
          <button
            key={String(o.v)}
            type="button"
            aria-pressed={filter === o.v}
            onClick={() => {
              setFilter(o.v);
              setSelected(null);
            }}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div className="plan-readout" aria-live="polite">
        {readout}
      </div>
      <div className="plan-inline">
        <SitePlanSvg interactive title="Illustrative site plan, tap a plot" />
      </div>
      <ul className="plan-legend">
        <li>
          <i style={{ background: "var(--plan-three)" }} />3 BHK
        </li>
        <li>
          <i style={{ background: "var(--plan-four)" }} />4 BHK
        </li>
        <li>Illustrative plan, not to scale</li>
      </ul>
    </>
  );
}
