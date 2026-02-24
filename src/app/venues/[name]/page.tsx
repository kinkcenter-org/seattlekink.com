import { VenueList } from "..";

export type Props = {
  params: Promise<{ name: string }>;
};

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
