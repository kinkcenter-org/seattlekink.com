import { GroupList } from "../groups";
import { OrganizationList } from "../organizations";
import { VenueList } from "../venues";
import CalendarEvents from "./CalendarEvents";

const allOrganizations = [...OrganizationList, ...VenueList, ...GroupList].filter(
  (s, i, arr) => arr.findIndex((x) => x.name === s.name) === i,
);

const Calendars = () => (
  <main className="flex flex-col gap-8 items-center place-items-center text-center">
    <p className="text-xl border-b pb-2 w-full">Calendars</p>
    <CalendarEvents organizations={allOrganizations} />
  </main>
);

export default Calendars;
