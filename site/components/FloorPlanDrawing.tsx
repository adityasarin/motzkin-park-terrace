/**
 * Flat, illustrative floor plans drawn from the room schedule (content/floorplans.ts).
 * Rooms are filled shapes separated by wall-width gaps, in the site-plan palette.
 * TODO-VERIFY: replace with the architect's plans.
 */

type R = { name: string; x: number; y: number; w: number; h: number; tone?: "dark" | "sage" | "light" | "water" };

const layouts: Record<"3-bhk" | "4-bhk", { ground: R[]; first: R[] }> = {
  "3-bhk": {
    ground: [
      { name: "Living", x: 0, y: 0, w: 250, h: 290, tone: "sage" },
      { name: "Dining", x: 256, y: 0, w: 194, h: 200 },
      { name: "Kitchen", x: 256, y: 206, w: 194, h: 170 },
      { name: "Guest bed", x: 0, y: 296, w: 250, h: 220, tone: "dark" },
      { name: "Bath", x: 256, y: 382, w: 90, h: 134, tone: "water" },
      { name: "Stair", x: 352, y: 382, w: 98, h: 134, tone: "light" },
      { name: "Car park", x: 0, y: 522, w: 450, h: 158, tone: "light" },
    ],
    first: [
      { name: "Main bed", x: 0, y: 0, w: 250, h: 260, tone: "dark" },
      { name: "Bath", x: 256, y: 0, w: 194, h: 110, tone: "water" },
      { name: "Bedroom", x: 256, y: 116, w: 194, h: 240, tone: "dark" },
      { name: "Lounge", x: 0, y: 266, w: 250, h: 200, tone: "sage" },
      { name: "Stair", x: 256, y: 362, w: 98, h: 104, tone: "light" },
      { name: "Bath", x: 360, y: 362, w: 90, h: 104, tone: "water" },
      { name: "Balcony", x: 0, y: 472, w: 450, h: 90 },
    ],
  },
  "4-bhk": {
    ground: [
      { name: "Living", x: 0, y: 0, w: 270, h: 300, tone: "sage" },
      { name: "Dining", x: 276, y: 0, w: 194, h: 210 },
      { name: "Kitchen", x: 276, y: 216, w: 194, h: 170 },
      { name: "Guest bed", x: 0, y: 306, w: 270, h: 220, tone: "dark" },
      { name: "Bath", x: 276, y: 392, w: 90, h: 134, tone: "water" },
      { name: "Stair", x: 372, y: 392, w: 98, h: 134, tone: "light" },
      { name: "Two car parks", x: 0, y: 532, w: 470, h: 160, tone: "light" },
    ],
    first: [
      { name: "Main bed", x: 0, y: 0, w: 270, h: 250, tone: "dark" },
      { name: "Bath", x: 276, y: 0, w: 194, h: 100, tone: "water" },
      { name: "Bedroom", x: 276, y: 106, w: 194, h: 210, tone: "dark" },
      { name: "Bedroom", x: 0, y: 256, w: 270, h: 210, tone: "dark" },
      { name: "Stair", x: 276, y: 322, w: 98, h: 104, tone: "light" },
      { name: "Bath", x: 380, y: 322, w: 90, h: 104, tone: "water" },
      { name: "Lounge", x: 276, y: 432, w: 194, h: 160, tone: "sage" },
      { name: "Balcony", x: 0, y: 472, w: 270, h: 120 },
    ],
  },
};

const fills = {
  dark: ["var(--plan-three)", "var(--paper)"],
  sage: ["var(--plan-four)", "var(--paper)"],
  light: ["var(--plan-road)", "var(--paper-ink)"],
  water: ["var(--plan-water)", "var(--paper-ink)"],
  base: ["var(--field-1)", "var(--paper-ink)"],
} as const;

function Floor({ rooms, x, label }: { rooms: R[]; x: number; label: string }) {
  return (
    <g transform={`translate(${x} 150)`}>
      <text x="0" y="-40" fontSize="34" fill="var(--paper-ink)" fontFamily="var(--font-display)">
        {label}
      </text>
      {rooms.map((r, i) => {
        const [bg, fg] = fills[r.tone ?? "base"];
        return (
          <g key={i}>
            <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={bg} />
            {r.w > 85 && r.h > 70 && (
              <text x={r.x + 14} y={r.y + 38} fontSize={r.w < 110 ? 22 : 26} fill={fg}>
                {r.name}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

export function FloorPlanDrawing({ slug, title }: { slug: "3-bhk" | "4-bhk"; title?: string }) {
  const l = layouts[slug];
  const label = slug === "3-bhk" ? "3 BHK villa" : "4 BHK villa";
  return (
    <svg viewBox="0 0 1000 1000" role="img" aria-label={title ?? `Illustrative floor plan of the ${label}, ground and first floor`}>
      <title>{title ?? `Illustrative floor plan of the ${label}`}</title>
      <Floor rooms={l.ground} x={20} label="Ground floor" />
      <Floor rooms={l.first} x={510} label="First floor" />
      <text x="20" y="960" fontSize="24" fill="var(--paper-muted)">
        {label} · illustrative, not to scale
      </text>
    </svg>
  );
}
