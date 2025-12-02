import type { Metadata } from "next"
import Header from "@/components/header"
import Zone01Stats from "@/components/zone01-stats"

export const metadata: Metadata = {
  title: "Zone01 Stats - nosserb Portfolio",
  description: "Zone01 learning statistics and progress",
}

export default async function StatsPage() {
  // Fetch GitHub profile data
  const profileRes = await fetch("https://api.github.com/users/nosserb", {
    next: { revalidate: 3600 },
  })
  const profile = await profileRes.json()

  return (
    <>
      <Header profile={profile} />
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Zone01 Statistics</h1>
            <p className="text-foreground/60">Real-time learning progress and skill mastery</p>
          </div>

          <Zone01Stats username="gcouvri" />
        </div>
      </main>
    </>
  )
}
