import { VenueComponent } from "../venues";
import { GroupList } from ".";
import "../venues/venue.css";

const Groups = () => (
  <main className="flex flex-col gap-8 items-center place-items-center text-center">
    <p className="text-xl border-b pb-2 w-full">Groups</p>
    <p className="text-lg mb-4">
      Groups are usually just a set of people who organize and run events
    </p>
    <p className="text-lg mb-4">
      You'll usually see Socials, Munches, and online meetings from them
    </p>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {GroupList.map(VenueComponent)}
    </div>
  </main>
);

export default Groups;
