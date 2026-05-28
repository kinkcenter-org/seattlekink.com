import type { StaticImageData } from "next/image";
import type { HTMLAttributes, ImgHTMLAttributes } from "react";
import type { GoogleCalendarEvent } from "../calendars/getEvents";

export type Organization = {
  name: string;
  description: string | string[];
  comments?: Venue["description"];
  image?: StaticImageData;
  imageClassName?: HTMLAttributes<ImgHTMLAttributes>["className"];
  website?: string;
  socials?: string[];
  address?: string;
  calendarId?: string;
  calendarEventToUrl?: Partial<Record<keyof GoogleCalendarEvent, string>>;
  ticketTailorFeedUrl?: string;
  schema?: Record<string, unknown>;
};
