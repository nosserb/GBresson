"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Github, Mail, Twitter } from "lucide-react"

export default function AboutPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/nosserb`)
        const data = await res.json()
        setProfile(data)
      } catch (err) {
        console.error("Error fetching profile:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header profile={profile} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Sidebar with Avatar */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start gap-6">
            <img
              src={profile?.avatar_url || "/placeholder.svg"}
              alt={profile?.name || "Profile"}
              className="w-32 h-32 rounded-full border-4 border-primary"
            />
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-foreground mb-2">{profile?.name || profile?.login}</h1>
              <p className="text-muted-foreground mb-4">{profile?.bio}</p>
              <div className="flex gap-3 flex-wrap justify-center md:justify-start">
                {profile?.twitter_username && (
                  <a
                    href={`https://twitter.com/${profile.twitter_username}`}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                <a
                  href={`https://github.com/${profile?.login}`}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                {profile?.email && (
                  <a href={`mailto:${profile.email}`} className="text-primary hover:text-primary/80 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">About Me</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                I'm a passionate developer focused on creating innovative solutions and contributing to open-source
                projects. With a strong foundation in various programming languages and technologies, I enjoy tackling
                complex problems and continuously learning new skills.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                My repositories showcase my work across different domains and technologies. I'm always open to
                collaboration and interesting projects.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-primary">{profile?.public_repos}</p>
                  <p className="text-sm text-muted-foreground">Public Repos</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-primary">{profile?.followers}</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-primary">{profile?.following}</p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-primary">{profile?.public_gists}</p>
                  <p className="text-sm text-muted-foreground">Public Gists</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Location & Other Info</h2>
              <div className="space-y-3 text-foreground/80">
                {profile?.location && <p>Location: {profile.location}</p>}
                {profile?.company && <p>Company: {profile.company}</p>}
                {profile?.blog && (
                  <p>
                    Website:{" "}
                    <a
                      href={profile.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {profile.blog}
                    </a>
                  </p>
                )}
                <p>Member Since: {new Date(profile?.created_at).toLocaleDateString()}</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
