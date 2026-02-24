import type { Venue } from "../types";
import image from "./logo.png";

export default {
  name: "SubSpace",
  description: ["We are a dungeon/studio play space in South Seattle"],
  comments: [
    "SubSpace hosts routine workshops, socials, and play parties.",
    "This venue is in an industrial complex in Tukwila and is not easy to get to if you don't drive",
    "SubSpace is mostly rented by entities running events on their own",
  ],
  image,
  website: "https://subspaceseattle.com/",
} satisfies Venue;
