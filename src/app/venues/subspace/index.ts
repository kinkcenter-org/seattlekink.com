import type { Venue } from "../types";
import image from "./logo.png";

export default {
  name: "SubSpace",
  description: [
    "We are a dungeon/studio play space in South Seattle",
    "We are available for private rentals and event rentals",
    "We are a non-discriminatory, all-inclusive membership organization. Whatever your kink or orientation is, you are welcome at SubSpace. We host about 200 events/year",
  ],
  comments: [
    "SubSpace hosts routine workshops, socials, and play parties at their venue in Tukwila",
  ],
  image,
  socials: [
    "https://fetlife.com/SubSpaceSeattle",
    "https://discord.gg/UGYu5QAQ35",
    "https://x.com/SubSpaceNW",
    "https://www.instagram.com/subspaceseattle/",
  ],
  website: "https://subspaceseattle.com/",
} satisfies Venue;
