import { Venue } from './types'

import galleryErato from './gallery-erato'
import kinkcenter from './kinkcenter'
import subspace from './subspace'
export const VenueList: Venue[] = [
    galleryErato,
    subspace,
    kinkcenter,
    galleryErato,
    subspace,
    kinkcenter,
]

export const makeVenuePage = ({ name }: Venue) => {
    return <p>{name}</p>
}
