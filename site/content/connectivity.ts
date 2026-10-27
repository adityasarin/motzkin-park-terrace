/**
 * Distances by road from the project gate and typical off-peak drive times.
 * Sources: public listings (Sarjapura town, Motherhood Hospital, Bommasandra) and
 * Google Maps estimates for the rest. TODO-VERIFY every row against Google Maps
 * from the real gate pin before launch.
 * bearing: degrees clockwise from north, used to place the point on the location map.
 */

export type Place = {
  name: string;
  km: number;
  minutes: number;
  bearing: number;
  note?: string;
};

export type PlaceGroup = { name: string; places: Place[] };

export const placeGroups: PlaceGroup[] = [
  {
    name: "Schools",
    places: [
      { name: "Indus International School", km: 3.5, minutes: 8, bearing: 290, note: "IB, day and boarding" },
      { name: "Greenwood High, Sarjapur", km: 10, minutes: 22, bearing: 330 },
      { name: "Inventure Academy", km: 14, minutes: 30, bearing: 320 },
      { name: "Oakridge International, Sarjapur", km: 11, minutes: 24, bearing: 335 },
    ],
  },
  {
    name: "Hospitals",
    places: [
      { name: "Motherhood Hospital, Sarjapur", km: 3.2, minutes: 7, bearing: 15 },
      { name: "Sarjapura Primary Health Centre", km: 3, minutes: 7, bearing: 20 },
      { name: "Narayana Health City, Bommasandra", km: 11, minutes: 25, bearing: 265 },
    ],
  },
  {
    name: "Work",
    places: [
      { name: "Bommasandra Industrial Area", km: 9.6, minutes: 20, bearing: 270 },
      { name: "Wipro, Sarjapur Road campus", km: 18, minutes: 40, bearing: 320 },
      { name: "Electronic City", km: 18, minutes: 38, bearing: 280 },
      { name: "Outer Ring Road, Bellandur", km: 22, minutes: 50, bearing: 325 },
      { name: "Hosur industrial belt", km: 17, minutes: 30, bearing: 160 },
    ],
  },
  {
    name: "Getting about",
    places: [
      { name: "Sarjapura town", km: 3, minutes: 6, bearing: 20 },
      { name: "Attibele and NH 44", km: 7, minutes: 14, bearing: 185 },
      { name: "Dommasandra Circle", km: 8, minutes: 18, bearing: 345 },
      { name: "Kempegowda International Airport", km: 62, minutes: 95, bearing: 350 },
    ],
  },
];

export const allPlaces = placeGroups.flatMap((g) => g.places.map((p) => ({ ...p, group: g.name })));

/** Commute chart on /location: the daily trips buyers ask about. */
export const commutes = [
  "Indus International School",
  "Bommasandra Industrial Area",
  "Electronic City",
  "Wipro, Sarjapur Road campus",
  "Outer Ring Road, Bellandur",
  "Kempegowda International Airport",
].map((n) => allPlaces.find((p) => p.name === n)!);
