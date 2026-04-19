import type { Metadata } from "next";
import { VenueList } from "..";

export type Props = {
  params: Promise<{ name: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { name } = await props.params;
  const venue = VenueList.find(
    (v) => v.name.toLowerCase().replaceAll(" ", "-") === name,
  );
  if (!venue) return {};
  return {
    title: venue.name,
    description: Array.isArray(venue.description)
      ? venue.description[0]
      : venue.description,
  };
}

const VenuePage = async (props: Props) => {
  const params = await props.params;
  const venue = VenueList.find(
    (venue) => venue.name.toLowerCase().replaceAll(" ", "-") === params.name,
  );
  if (!venue) return null;
  return <p>{venue.name}</p>;
};

export default VenuePage;

export const generateStaticParams = async () =>
  VenueList.map((venue) => ({
    name: venue.name.toLowerCase().replaceAll(" ", "-"),
  }));
