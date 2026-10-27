/**
 * Room schedules for the floor-plan drawings. TODO-VERIFY: room sizes are working
 * values drawn to fit the listed super built-up areas; replace with the architect's plans.
 */

export type Room = { name: string; size: string };
export type Floor = { name: string; rooms: Room[] };
export type Plan = { slug: "3-bhk" | "4-bhk"; floors: Floor[]; plot: string; facing: string };

export const plans: Plan[] = [
  {
    slug: "3-bhk",
    plot: "About 1,200 sq ft plot", // TODO-VERIFY
    facing: "East and west facing",
    floors: [
      {
        name: "Ground floor",
        rooms: [
          { name: "Living", size: "14′ × 16′" },
          { name: "Dining", size: "11′ × 12′" },
          { name: "Kitchen and utility", size: "10′ × 11′" },
          { name: "Guest bedroom", size: "11′ × 12′" },
          { name: "Car park", size: "One covered" },
        ],
      },
      {
        name: "First floor",
        rooms: [
          { name: "Main bedroom", size: "13′ × 14′" },
          { name: "Bedroom", size: "11′ × 12′" },
          { name: "Family lounge", size: "10′ × 12′" },
          { name: "Balcony", size: "5′ × 12′" },
        ],
      },
      { name: "Terrace", rooms: [{ name: "Open terrace", size: "Full roof" }] },
    ],
  },
  {
    slug: "4-bhk",
    plot: "About 1,500 sq ft plot", // TODO-VERIFY
    facing: "East and west facing",
    floors: [
      {
        name: "Ground floor",
        rooms: [
          { name: "Living", size: "15′ × 18′" },
          { name: "Dining", size: "12′ × 13′" },
          { name: "Kitchen and utility", size: "10′ × 13′" },
          { name: "Guest bedroom", size: "12′ × 12′" },
          { name: "Car park", size: "Two covered" },
        ],
      },
      {
        name: "First floor",
        rooms: [
          { name: "Main bedroom", size: "14′ × 15′" },
          { name: "Bedroom", size: "12′ × 12′" },
          { name: "Bedroom", size: "11′ × 12′" },
          { name: "Family lounge", size: "12′ × 13′" },
        ],
      },
      { name: "Terrace", rooms: [{ name: "Covered terrace room", size: "10′ × 12′" }, { name: "Open terrace", size: "Rest of roof" }] },
    ],
  },
];

export const specs: { group: string; lines: string[] }[] = [
  { group: "Structure", lines: ["RCC framed structure designed for seismic zone II", "Solid concrete block masonry", "Anti-termite treatment before foundation"] },
  { group: "Floors", lines: ["Vitrified tiles in living, dining and bedrooms", "Anti-skid tiles in bathrooms, balconies and utility", "Granite on the staircase"] },
  { group: "Kitchen", lines: ["Granite counter with stainless-steel sink", "Points for chimney, water purifier and dishwasher", "Dado tiles to 2 ft above the counter"] },
  { group: "Bathrooms", lines: ["Branded sanitaryware and CP fittings", "Hot and cold mixer in showers", "Solar water-heater provision"] },
  { group: "Doors and windows", lines: ["Teak frame and shutter for the main door", "Hardwood frames with flush shutters inside", "UPVC windows with mosquito mesh"] },
  { group: "Electrical", lines: ["Concealed copper wiring with modular switches", "Three-phase supply to every villa", "Points for air-conditioning in all bedrooms"] },
  { group: "Paint", lines: ["Weatherproof emulsion outside", "Acrylic emulsion inside over putty"] },
];
// TODO-VERIFY: specifications are typical for the segment; replace with the developer's spec sheet.
