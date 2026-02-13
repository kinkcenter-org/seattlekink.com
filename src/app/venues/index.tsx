import LinkButton from "@/src/components/linkButton";
import galleryErato from "./gallery-erato";
import kinkcenter from "./kinkcenter";
import subspace from "./subspace";
import type { Venue } from "./types";
export const VenueList: Venue[] = [
	galleryErato,
	subspace,
	kinkcenter,
	galleryErato,
	subspace,
	kinkcenter,
];

export const VenueComponent = ({
	name,
	description,
	comments,
	website,
}: Venue) => (
	<div
		key={name}
		className="flex flex-col gap-4 items-start place-items-start text-start border-l-2 pl-5 w-full"
	>
		<p className="text-xl font-bold">{name}</p>
		<div className="relative left-8">
			<blockquote className="italic flex flex-col gap-2">
				{Array.from([description])
					.flat()
					.map((desc, i) => (
						<p key={`${name}-${i}`}>{desc}</p>
					))}
			</blockquote>
		</div>
		{comments
			? Array.from([comments])
					.flat()
					.map((desc, i) => <p key={`${name}-${i}`}>{desc}</p>)
			: null}
		{website ? <LinkButton href={website}>Website</LinkButton> : null}
	</div>
);
