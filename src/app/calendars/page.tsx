import { GroupList } from "../groups";
import { OrganizationList } from "../organizations";
import { VenueList } from "../venues";
import CalendarEvents from "./CalendarEvents";

const organizations = [...OrganizationList, ...VenueList, ...GroupList]
  .filter((entry) => entry.calendarId || entry.ticketTailorFeedUrl)
  .filter(
    (s, i, arr) =>
      arr.findIndex(
        (x) =>
          (s.calendarId && x.calendarId === s.calendarId) ||
          (s.ticketTailorFeedUrl &&
            x.ticketTailorFeedUrl === s.ticketTailorFeedUrl),
      ) === i,
  );

const Calendars = () => (
  <main className="flex flex-col gap-8 items-center place-items-center text-center">
    <p className="text-xl border-b pb-2 w-full">Calendars</p>
    <CalendarEvents organizations={organizations} />
  </main>
);

export default Calendars;
