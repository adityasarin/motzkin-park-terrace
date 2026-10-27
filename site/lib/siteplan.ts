/**
 * Geometry for the illustrative site plan (not to scale). TODO-VERIFY: replace with the
 * approved layout once the architect shares it; the unit split follows content/project.ts.
 * North is up; the gate opens south onto Sarjapur–Attibele Road.
 */

export type PlotType = 3 | 4;
export type Plot = { n: number; x: number; y: number; w: number; h: number; type: PlotType; facing: "East" | "West" };

export const VIEW = { w: 1000, h: 1250 };

const ROW_TOP = 70;
const ROW_H = 70;
const GAP = 6;

const columns = [
  { x: 70, w: 170, count: 12, facing: "East" as const }, // A: west edge, faces the first road
  { x: 330, w: 165, count: 12, facing: "West" as const }, // B
  { x: 501, w: 165, count: 12, facing: "East" as const }, // C
  { x: 756, w: 174, count: 11, facing: "West" as const }, // D: east edge
];

export const plots: Plot[] = (() => {
  const out: Plot[] = [];
  let n = 1;
  columns.forEach((c, ci) => {
    for (let i = 0; i < c.count; i++) {
      // Column D leaves its northern slot for the pocket park.
      const row = ci === 3 ? i + 1 : i;
      const type: PlotType = ci === 0 || (ci === 3 && i < 8) ? 4 : 3;
      out.push({ n: n++, x: c.x, y: ROW_TOP + row * ROW_H, w: c.w, h: ROW_H - GAP, type, facing: c.facing });
    }
  });
  return out;
})();

export const roads = [
  { x: 246, y: 40, w: 78, h: 1000 }, // first spine
  { x: 672, y: 40, w: 78, h: 1170 }, // second spine, runs down to the gate
  { x: 246, y: 920 + 40, w: 504, h: 70 }, // southern cross road
  { x: 246, y: 30, w: 504, h: 34 }, // northern loop
];

export const amenities = [
  { label: "Clubhouse", x: 70, y: 1062, w: 250, h: 128, fill: "three" },
  { label: "Pool", x: 336, y: 1062, w: 180, h: 128, fill: "water" },
  { label: "Lawn", x: 524, y: 1062, w: 140, h: 128, fill: "tree" },
  { label: "Courts", x: 756, y: 1062, w: 174, h: 128, fill: "four" },
  { label: "Park", x: 756, y: 70, w: 174, h: 64, fill: "tree" },
];

export const gate = { x: 672, y: 1196, w: 78, h: 24 };

export const counts = {
  3: plots.filter((p) => p.type === 3).length,
  4: plots.filter((p) => p.type === 4).length,
};
