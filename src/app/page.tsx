import LinkButton from '../components/linkButton'

export default function Home() {
    return (
        <main className="flex flex-col flex-grow place-content-center gap-[32px] row-start-2 items-center place-items-center text-center max-w-[400]">
            <p className="text-4xl">Seattle Kink</p>
            <p>
                Seattle&apos;s kink scene is hard to find and get introduced to.
                This page tries to solve that by giving you the high level
                orientation
            </p>
            <p>
                This website will also provide some history and helpful tips
                that are nuanced wisdom about certain orgs and venues
            </p>
            <p>Get started:</p>

            <div className="flex gap-4 items-center flex-col sm:flex-row">
                <LinkButton href="/organizations">Organizations</LinkButton>
                <LinkButton href="/venues">Venues</LinkButton>
                <LinkButton href="/calendars">Calendars</LinkButton>
            </div>
        </main>
    )
}
