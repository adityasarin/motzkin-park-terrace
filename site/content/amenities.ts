/** Amenities from the public listings. TODO-VERIFY sizes once the clubhouse drawings are final. */

export type AmenityGroup = {
  title: string;
  items: string[];
  image: { src: string; alt: string; caption: string };
};

export const amenityGroups: AmenityGroup[] = [
  {
    title: "The clubhouse",
    items: ["Party hall for family events", "Library and reading room", "Gym with cardio and weights", "Yoga and meditation deck", "Indoor games room"],
    image: {
      src: "/images/plumeria-rubra-2852.jpg",
      alt: "White temple-tree flowers against green foliage near Bengaluru",
      caption: "Temple tree, a Bengaluru garden staple",
    },
  },
  {
    title: "Water",
    items: ["Swimming pool", "Shallow pool for children", "Pool deck and changing rooms", "Rainwater harvesting across the site"],
    image: {
      src: "/images/bangalore-lake-island.jpg",
      alt: "A wooded island in a Bengaluru lake under a clear blue sky",
      caption: "A Bengaluru lake in the dry season",
    },
  },
  {
    title: "Courts and play",
    items: ["Badminton court", "Basketball half court", "Cricket practice net", "Children’s play area", "Open lawn for weekend games"],
    image: {
      src: "/images/rain-tree-avenue.jpg",
      alt: "Rain trees arching over a Bengaluru road with an autorickshaw",
      caption: "Rain trees on a Bengaluru avenue",
    },
  },
  {
    title: "Paths and green",
    items: ["Jogging and cycling track around the site", "Tree-lined internal roads", "Landscaped central green", "Solar street lighting"],
    image: {
      src: "/images/paddy-field-in-karnataka-india-2014.jpg",
      alt: "Young paddy in a Karnataka field ringed by coconut palms",
      caption: "Paddy in Karnataka after the rains",
    },
  },
  {
    title: "Behind the scenes",
    items: ["Sewage treatment plant", "Rainwater harvesting", "Gated entry with security cabin", "Power back-up for common areas", "Covered car parking at every villa"],
    image: {
      src: "/images/bangalore-1940.jpg",
      alt: "Survey of India guide map of Bangalore from 1940",
      caption: "Bangalore guide map, Survey of India, 1940",
    },
  },
];
