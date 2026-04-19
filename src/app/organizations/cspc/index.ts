import type { Organization } from "../types";
import image from "./logo.webp";

export default {
  name: "CSPC",
  description: [
    "The Center for Sex Positive Culture creates spaces to celebrate, develop, and explore sexuality and sensuality among a diverse, supportive community.",
    "CSPC holds events exclusively at Gallery Erato, operated by Pan Eros Foundation.",
  ],
  comments: [
    "CSPC operates as a 501(c)(7) nonprofit and requires an active membership for event access.",
    "Most CSPC parties include a New Member Orientation (NMO) beforehand, which grants a one-month membership.",
    "Attendees can purchase an NMO ticket, complete the orientation, and attend the party immediately after — confirm the current schedule on the CSPC website.",
  ],
  image,
  imageClassName: "dark:filter-[grayscale(1)_invert(1)]",
  socials: [
    "https://www.instagram.com/the.cspc/",
    "https://www.reddit.com/r/CSPC_Seattle/",
  ],
  website: "https://thecspc.org/",
  calendarId: "gn3dgg37318fhu7o2llldofefk@group.calendar.google.com",
} satisfies Organization;
