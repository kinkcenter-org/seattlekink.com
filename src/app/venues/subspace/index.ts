import type { Venue } from "../types";
import image from "./logo.png";

export default {
  name: "SubSpace",
  description: [
    "SubSpace is a dungeon and studio play space in South Seattle available for private and event rentals.",
    "SubSpace is a non-discriminatory, all-inclusive membership organization open to all kinks and orientations.",
    "SubSpace hosts approximately 200 events per year.",
  ],
  comments: [
    "SubSpace hosts routine workshops, socials, and play parties at the SubSpace venue in Tukwila.",
  ],
  image,
  socials: [
    "https://fetlife.com/SubSpaceSeattle",
    "https://discord.gg/UGYu5QAQ35",
    "https://x.com/SubSpaceNW",
    "https://www.instagram.com/subspaceseattle/",
  ],
  website: "https://subspaceseattle.com/",
  schema: {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: "SubSpace",
    url: "https://subspaceseattle.com/",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tukwila",
      addressRegion: "WA",
      addressCountry: "US",
    },
    sameAs: [
      "https://fetlife.com/SubSpaceSeattle",
      "https://x.com/SubSpaceNW",
      "https://www.instagram.com/subspaceseattle/",
    ],
  },
} satisfies Venue;
