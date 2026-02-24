import type { Organization } from "../types";
import image from "./logo.avif";

export default {
  name: "Sanctum Seattle",
  description: [
    "Sanctum, founded with the vision of creating inclusive social, and educational events, aims to provide opportunities for personal growth and community building in a risk-aware and consent-forward environment",
    "We are dedicated to establishing consistent social gatherings in the Greater Seattle Area, offering a variety of themed events to promote inclusivity and community engagement.",
  ],
  comments: [
    "Sanctum runs play parties almoste very weekend, and multiple socials throughout every week",
  ],
  image,
  socials: [
    "https://www.instagram.com/sanctumseattle/",
    "https://discord.gg/pVWajc7fy",
  ],
  website: "https://www.sanctumseattle.com/",
} satisfies Organization;
