import type { Metadata } from "next";
import HalftoneOverlay from "@/src/components/HalftoneOverlay";
import { PageHead } from "@/src/components/PageHead";
import { VenueComponent } from "../venues";
import { OrganizationList } from ".";

export const metadata: Metadata = {
  title: "Kink Organizations in Seattle",
  description:
    "A directory of kink and sex-positive organizations in Seattle, including CSPC, Sanctum Seattle, Kink Center, Magpie Kink, and SubSpace.",
};

const Organizations = () => (
  <main className="flex-1 flex flex-col relative">
    <HalftoneOverlay />
    <div className="relative">
      <PageHead label="Directory" title="Organizations">
        <p>Organizations are businesses that operate within a venue</p>
        <p>
          They might host events all over Seattle, or they might stay in one
          preferred venue
        </p>
      </PageHead>
      <div>
        {OrganizationList.map((org) => (
          <VenueComponent key={org.name} {...org} category="Organization" />
        ))}
      </div>
    </div>
  </main>
);

export default Organizations;
