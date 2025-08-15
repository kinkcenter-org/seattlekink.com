import { Organization } from './types'

import kinkcenter from '../venues/kinkcenter'
import subspace from '../venues/subspace'
import cspc from './cspc'
export const OrganizationList: Organization[] = [cspc, subspace, kinkcenter]

export const makeOrganizationPage = ({ name }: Organization) => {
    return <p>{name}</p>
}
