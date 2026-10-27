/**
 * Dated construction log. TODO-VERIFY: these entries are a template written from the
 * listed status; replace each with the site engineer's monthly note and photographs.
 */

export type Update = { date: string; title: string; body: string; progress: number };

export const updates: Update[] = [
  {
    date: "2026-10-15",
    title: "Finishing works on the first villa rows",
    body: "Plastering and tiling under way on the villas nearest the gate. Clubhouse slab cast; pool excavation complete.",
    progress: 72,
  },
  {
    date: "2026-07-10",
    title: "Structures complete across the site",
    body: "Roof slabs cast on all villa blocks. Internal roads graded and the storm-water drain laid along the main spine.",
    progress: 60,
  },
  {
    date: "2026-03-20",
    title: "Sewage treatment plant and sumps",
    body: "Foundation for the sewage treatment plant poured; underground sumps for each villa row waterproofed.",
    progress: 45,
  },
];
