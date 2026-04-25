import type { Organization } from "../types";
import image from "./magpie.png";

export default {
  name: "Magpie Kink",
  description: [
    "Magpie Kink Education is a kink education organization based in Seattle, Washington.",
  ],
  comments: [
    "Mz. Magpie teaches bondage, negotiation, sex toys, open relationships, rough body play, and trampling.",
    "Magpie Kink Education includes additional educators — see the Magpie Kink website for the full roster.",
  ],
  image,
  website: "https://magpiekink.com/",
  schema: {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Magpie Kink Education",
    url: "https://magpiekink.com/",
  },
} satisfies Organization;
