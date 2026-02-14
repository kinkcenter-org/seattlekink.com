import LinkButton from "@/src/components/linkButton";
import galleryErato from "./gallery-erato";
import kinkcenter from "./kinkcenter";
import subspace from "./subspace";
import type { Venue } from "./types";
import { useEffect, useState } from "react";
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
}: Venue) => {
	const [events, setEvents] = useState([])

	useEffect(() => {
		const CALENDAR_ID = 'YOUR_PUBLIC_CALENDAR_ID'; // e.g., milan.kacurak@gmail.com
		const API_KEY = 'YOUR_PUBLIC_API_KEY';
		const API_URL = `https://www.googleapis.com{CALENDAR_ID}/events?key=${API_KEY}`;

		fetch(API_URL)
		.then(response => response.json())
		.then(data => {
			console.log('Public events:', data.items);
			// Process and display the events in your UI
		})
		.catch(error => console.error('Error fetching public events:', error));

	})

	return (
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
	)
}
