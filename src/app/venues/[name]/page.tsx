import type { Metadata } from "next";
import Link from "next/link";
import { VenueComponent, VenueList } from "..";

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
  return (
    <main className="flex-1 flex flex-col">
      <Link
        href="/venues"
        className="px-5 pt-5 text-sm tracking-widest text-grey-mid hover:text-riso"
      >
        &larr; ALL VENUES
      </Link>
      <VenueComponent {...venue} category="Venue" />
    </main>
  );
};

export default VenuePage;

export const generateStaticParams = async () =>
  VenueList.map((venue) => ({
    name: venue.name.toLowerCase().replaceAll(" ", "-"),
  }));
