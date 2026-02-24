import type { Venue } from "../types";
import image from "./logo.png";

export default {
  name: "SubSpace",
  description: ["We are a dungeon/studio play space in South Seattle"],
  comments: [
    "SubSpace hosts routine workshops, socials, and play parties.",
    "This venue is in an industrial complex in Tukwila",
    "SubSpace is mostly an event venue, hosting a fair amount of events and classes",
  ],
  image,
  socials: [
    "https://x.com/SubSpaceNW",
    "https://www.instagram.com/subspaceseattle/",
  ],
  website: "https://subspaceseattle.com/",
} satisfies Venue;
