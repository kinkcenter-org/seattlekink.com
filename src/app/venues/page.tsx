import { VenueComponent, VenueList } from ".";

import "./venue.css";

const Venues = () => (
  <main className="flex flex-col gap-8 items-center place-items-center text-center">
    <p className="text-2xl">Venues</p>
    <p className="text-lg">
      Venues are physical locations that organizations can use to host events
      within
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {VenueList.map(VenueComponent)}
    </div>
  </main>
);

export default Venues;
