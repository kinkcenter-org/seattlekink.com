import type { Venue } from "../types";
import image from "./logo.png";

export default {
  name: "Gallery Erato",
  description: [
    "Gallery Erato is an art and education venue operated by Pan Eros Foundation in SoDo, Seattle.",
    "Pan Eros Foundation promotes consent education and celebrates sexuality across race, ethnicity, nationality, gender, orientation, identity, ability, class, and religion.",
  ],
  comments: [
    "Gallery Erato is the formal venue name for the gallery operated by Pan Eros Foundation.",
    "Pan Eros Foundation was previously known as Foundation for Sex Positive Culture (FSPC), which split into Pan Eros Foundation and CSPC.",
  ],
  image,
  socials: ["https://www.instagram.com/paneros_events"],
  address: "309 1st Ave S, Seattle, WA 98104",
  website: "https://www.pan-eros.org/",
  calendarId: "ads3vlnusqol5v5gcj72pattug@group.calendar.google.com",
} satisfies Venue;
