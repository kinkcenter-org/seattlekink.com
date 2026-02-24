import type { Venue } from "../types";
import image from "./logo.png";

export default {
  name: "Kink Center",
  description: [
    "Kink Center is a new Venue for the Kink community to come together and be who they are.",
    "We are focused on Accessibility and Inclusivity whenever possible.",
    "We accept help with humility and love, while maintaining our ideals and purpose",
  ],
  comments: [
    "Kink Center focuses on providing space to groups who otherwise have no space",
    "The venue is ADA Accessible through-and-through with modern HVAC, Air Filters, and monitored CO2 levels",
    "Kink Center sometimes runs their own events in their own venue",
  ],
  image,
  imageClassName: "dark:invert",
  socials: [
    "https://instagram.com/kinkcenter",
    "https://www.threads.com/@kinkcenter",
    "https://bsky.app/profile/kinkcenter.org",
    "https://discord.gg/5HYYjYVNBF",
  ],
  website: "https://kinkcenter.org/",
} satisfies Venue;
