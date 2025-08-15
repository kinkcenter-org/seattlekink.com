import { Organization } from '../types'
import CSPCLogo from './logo.webp'

export default {
    name: 'CSPC',
    description: [
        'The Center for Sex Positive Culture creates spaces to celebrate, develop, and explore sexuality and sensuality among a diverse, supportive community.',
        'The CSPC holds events exclusively at Gallery Erato, which is operated by Pan Eros',
    ],
    comments: [
        'CSPC operates as a 501(c)(7) nonprofit, which means they only serve their members. This means you need an active membership to gain access to the CSPC',
        'Most/some of their parties have a New Member Orientation (NMO) before them. These make you a member for one month by default',
        'Buy a NMO ticket, show up for orientation at that time, and you can attend the party right afterwards (confirm on their site)',
    ],
    image: CSPCLogo,
    website: 'https://thecspc.org/',
} satisfies Organization
