import LinkButton from '@/src/components/linkButton'
import { VenueList } from '.'
import { Venue } from './types'

import './venue.css'

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
)
const Venues = () => (
    <main className="flex flex-col gap-[32px] max-w-[800] items-center place-items-center text-center">
        <p className="text-2xl">Venues</p>
        <p className="text-lg">
            Venues are physical locations that organizations can use to host
            events within
        </p>
        {VenueList.map(VenueComponent)}
    </main>
)

export default Venues
