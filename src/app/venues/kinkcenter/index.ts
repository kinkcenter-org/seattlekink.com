import type { Venue } from "../types";
import image from "./logo.png";

export default {
  name: "Kink Center",
  description: [
    "Kink Center is a configurable, accessibility-first community event space in Capitol Hill, Seattle.",
    "Kink Center focuses on providing space to kink community groups that otherwise have no dedicated venue.",
    "Kink Center accepts rental inquiries and hosts events directly at the Kink Center venue.",
  ],
  comments: [
    "The Kink Center venue is ADA accessible throughout, with modern HVAC, air filtration, and monitored CO2 levels.",
    "Kink Center is located at 814 E Pike St, Seattle, WA 98122.",
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
  address: "814 E Pike St, Seattle, WA 98112",
  website: "https://kinkcenter.org/",
  calendarId: "3cfrm8nsdk41bt09fvkrll5cg4cc6baq@import.calendar.google.com",
} satisfies Venue;
