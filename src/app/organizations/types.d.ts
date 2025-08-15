export type Organization = {
    name: string
    description: string | string[]
    comments?: Venue['description']
    image?: StaticImageData
    website?: string
    socials?: string[]
}
