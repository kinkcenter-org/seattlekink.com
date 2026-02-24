import { VenueComponent } from "../venues";
import { OrganizationList } from ".";
import "../venues/venue.css";

const Organizations = () => (
  <main className="flex flex-col gap-8 items-center place-items-center text-center">
    <p className="text-2xl">Organizations</p>
    <p className="text-lg">
      Organizations are businesses that operate within a venue. They can host
      events all over Seattle, or they can stay in one place
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {OrganizationList.map(VenueComponent)}
    </div>
  </main>
);

export default Organizations;
