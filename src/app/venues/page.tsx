import type { Metadata } from "next";
import HalftoneOverlay from "@/src/components/HalftoneOverlay";
import { PageHead } from "@/src/components/PageHead";
import { VenueComponent, VenueList } from ".";

export const metadata: Metadata = {
  title: "Kink Venues in Seattle",
  description:
    "A directory of kink and sex-positive venues in Seattle and the greater Seattle area, including Kink Center, SubSpace, and Gallery Erato.",
};

const Venues = () => (
  <main className="flex-1 flex flex-col relative">
    <HalftoneOverlay />
    <div className="relative">
      <PageHead label="Directory" title="Venues">
        <p>
          Venues are physical locations that organizations can use to host
          events within
        </p>
      </PageHead>
      <div>
        {VenueList.map((venue) => (
          <VenueComponent key={venue.name} {...venue} category="Venue" />
        ))}
      </div>
    </div>
  </main>
);

export default Venues;
