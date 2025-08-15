import { OrganizationList } from '.'
import { VenueComponent } from '../venues'
import '../venues/venue.css'

const Organizations = () => (
    <main className="flex flex-col gap-[32px] max-w-[800] items-center place-items-center text-center">
        <p className="text-2xl">Organizations</p>
        <p className="text-lg">
            Organizations are businesses that operate within a venue. They can
            host events all over Seattle, or they can stay in one place
        </p>
        {OrganizationList.map(VenueComponent)}
    </main>
)

export default Organizations
