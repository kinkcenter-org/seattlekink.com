import type { Metadata } from "next";
import { VenueComponent, VenueList } from ".";

import "./venue.css";

export const metadata: Metadata = {
  title: "Kink Venues in Seattle",
  description:
    "A directory of kink and sex-positive venues in Seattle and the greater Seattle area, including Kink Center, SubSpace, and Gallery Erato.",
};

const Venues = () => (
  <main className="flex flex-col gap-8 items-center place-items-center text-center">
    <p className="text-xl border-b pb-2 w-full">Venues</p>
    <p className="text-lg mb-4">
      Venues are physical locations that organizations can use to host events
      within
    </p>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {VenueList.map(VenueComponent)}
    </div>
  </main>
);

export default Venues;
