import { VenueComponent } from "../venues";
import { GroupList } from ".";
import "../venues/venue.css";

const Groups = () => (
  <main className="flex flex-col gap-8 items-center place-items-center text-center">
    <p className="text-2xl">Groups</p>
    <p className="text-lg">
      Groups are usually just a set of people who organize and run events
    </p>
    <p className="text-lg">
      You'll usually see Socials, Munches, and online meetings from them
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {GroupList.map(VenueComponent)}
    </div>
  </main>
);

export default Groups;
