"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import RepositoriesGrid from "@/components/repositories-grid"
import Footer from "@/components/footer"

export default function Home() {
  const [repos, setRepos] = useState<any[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const username = "nosserb"

        // Fetch user profile
        const profileRes = await fetch(`https://api.github.com/users/${username}`)
        const profileData = await profileRes.json()
        setProfile(profileData)

        // Fetch repositories
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&order=desc&per_page=20`)
        const reposData = await reposRes.json()
        setRepos(reposData)
      } catch (err) {
        console.error("Error fetching GitHub data:", err)
        setError("Failed to load GitHub data")
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Chargement de vos repos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header profile={profile} />
      <HeroSection profile={profile} repos={repos} />
      <RepositoriesGrid repos={repos} />
      <Footer />
    </div>
  )
}
