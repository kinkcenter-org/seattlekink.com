import LinkButton from '../components/linkButton'

export default function Home() {
    return (
        <main className="flex flex-col gap-[32px] row-start-2 items-center place-items-center text-center">
            <p className="text-4xl">Seattle Kink</p>
            <p>
                Seattle&apos;s kink scene is hard to find and get introduced to.
            </p>
            <p>
                This page tries to solve that by giving you the high level
                orientation
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
