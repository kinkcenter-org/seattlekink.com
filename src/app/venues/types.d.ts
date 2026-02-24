import type { StaticImageData } from "next/image";
import type { HTMLAttributes, ImgHTMLAttributes } from "react";

export type Venue = {
  name: string;
  description: string | string[];
  comments?: Venue["description"];
  image?: StaticImageData;
  imageClassName?: HTMLAttributes<ImgHTMLAttributes>["className"];
  website?: string;
  socials?: string[];
};
