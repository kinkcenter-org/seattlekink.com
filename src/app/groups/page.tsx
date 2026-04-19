import type { Metadata } from "next";
import { VenueComponent } from "../venues";
import { GroupList } from ".";
import "../venues/venue.css";

export const metadata: Metadata = {
  title: "Kink Groups in Seattle",
  description:
    "Seattle kink groups that organize socials, munches, and community events.",
};

const Groups = () => (
  <main className="flex flex-col gap-8 items-center place-items-center text-center">
    <p className="text-xl border-b pb-2 w-full">Groups</p>
    <p className="text-lg mb-2">
      Groups are usually a set of people who organize and run events
    </p>
    <p className="text-lg mb-2">
      You'll usually see Socials, Munches, and online meetings from them
    </p>
    <p className="text-lg mb-2">Some groups are purely online communities</p>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {GroupList.map(VenueComponent)}
    </div>
  </main>
);

export default Groups;
