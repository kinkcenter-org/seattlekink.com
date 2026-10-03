import type { Venue } from "../types";
import image from "./logo.png";

export default {
  name: "Flower and Snake",
  description: [
    "Flower and Snake is a rope arts lounge in Capitol Hill, Seattle.",
    "Flower and Snake is built around a custom designed, hand built rope structure.",
  ],
  comments: [
    "Flower and Snake uses natural materials, earthy colors, and low lighting throughout the venue.",
    "Flower and Snake is located at 1209 E Pike St, Seattle, WA 98122.",
  ],
  image,
  socials: [
    "https://www.instagram.com/flower.and.snake",
    "https://fetlife.com/flower-and-snake",
  ],
  address: "1209 E Pike St, Seattle, WA 98122",
  website: "https://www.flowerandsnake.com/",
  wixEvents: {
    siteUrl: "https://www.flowerandsnake.com",
    compId: "comp-mhfosw33",
  },
  schema: {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: "Flower and Snake",
    url: "https://www.flowerandsnake.com/",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1209 E Pike St",
      addressLocality: "Seattle",
      addressRegion: "WA",
      postalCode: "98122",
      addressCountry: "US",
    },
    sameAs: [
      "https://www.instagram.com/flower.and.snake",
      "https://fetlife.com/flower-and-snake",
    ],
  },
} satisfies Venue;
