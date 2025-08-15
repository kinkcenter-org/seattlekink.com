import { VenueComponent, VenueList } from '.'

import './venue.css'

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
