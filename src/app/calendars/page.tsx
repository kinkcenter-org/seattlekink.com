import type { Metadata } from "next";
import cspc from "../organizations/cspc";
import kinkcenter from "../venues/kinkcenter";
import CalendarEvents from "./CalendarEvents";
import { hasCalendarFeed } from "./getEvents";

export const metadata: Metadata = {
  title: "Seattle Kink Event Calendars",
  description:
    "Event calendars for Seattle kink organizations and venues, including Kink Center, Gallery Erato, and CSPC.",
};

const allOrganizations = [cspc, kinkcenter].filter(
  (s, i, arr) =>
    hasCalendarFeed(s) && arr.findIndex((x) => x.name === s.name) === i,
);

const Calendars = () => (
  <main className="flex flex-col gap-8 items-center place-items-center text-center">
    <p className="text-xl border-b pb-2 w-full">Calendars</p>
    <CalendarEvents organizations={allOrganizations} />
  </main>
);

export default Calendars;
