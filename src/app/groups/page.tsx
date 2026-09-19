import type { Metadata } from "next";
import HalftoneOverlay from "@/src/components/HalftoneOverlay";
import { PageHead } from "@/src/components/PageHead";
import { VenueComponent } from "../venues";
import { GroupList } from ".";

export const metadata: Metadata = {
  title: "Kink Groups in Seattle",
  description:
    "Seattle kink groups that organize socials, munches, and community events.",
};

const Groups = () => (
  <main className="flex-1 flex flex-col relative">
    <HalftoneOverlay />
    <div className="relative">
      <PageHead label="Directory" title="Groups">
        <p>Groups are usually a set of people who organize and run events</p>
        <p>
          You'll usually see Socials, Munches, and online meetings from them
        </p>
        <p>Some groups are purely online communities</p>
      </PageHead>
      <div>
        {GroupList.map((group) => (
          <VenueComponent key={group.name} {...group} category="Group" />
        ))}
      </div>
    </div>
  </main>
);

export default Groups;
