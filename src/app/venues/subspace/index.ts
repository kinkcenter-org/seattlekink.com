import type { Venue } from "../types";
import image from "./logo.png";

export default {
  name: "SubSpace",
  description: [
    "We are a dungeon/studio play space in South Seattle",
    "We are open for private rentals for small groups of kinksters, feel free to message us for details on how to book the play space for your event or private play time",
    "We are available for private rentals and event rentals",
  ],
  comments: [
    "SubSpace hosts routine workshops, socials, and play parties at their venue in Tukwila",
    "SubSpace is a non-discriminatory, all-inclusive membership organization. Whatever your kink or orientation is, you are welcome at SubSpace. We host about 200 events/year",
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
