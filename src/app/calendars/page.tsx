import type { Metadata } from "next";
import HalftoneOverlay from "@/src/components/HalftoneOverlay";
import { PageHead } from "@/src/components/PageHead";
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
  <main className="flex-1 flex flex-col relative">
    <HalftoneOverlay />
    <div className="relative">
      <PageHead label="Live feed" title="Calendars" />
      <div className="px-5 py-5">
        <CalendarEvents organizations={allOrganizations} />
      </div>
    </div>
  </main>
);

export default Calendars;
