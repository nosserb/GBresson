"use client"

import { Github, FileText } from "lucide-react"

export default function HeroSection({ profile, repos }: { profile: any; repos: any[] }) {
  const followers = profile?.followers || 0
  const publicRepos = profile?.public_repos || 0
  const bio = profile?.bio || "Developer & Open Source Enthusiast"

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Profile Info */}
          <div>
            <div className="mb-6">
              <img
                src={profile?.avatar_url || "/placeholder.svg"}
                alt={profile?.login}
                className="w-24 h-24 rounded-full border-4 border-primary"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">
              {profile?.name || profile?.login}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">{profile?.login}</p>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">{bio}</p>

            {profile?.location && <p className="text-foreground/60 mb-6">📍 {profile.location}</p>}

            <div className="flex flex-wrap gap-4">
              <a
                href={`https://github.com/${profile?.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
              {profile?.blog && (
                <a
                  href={profile.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors font-medium"
                >
                  <FileText className="w-5 h-5" />
                  Blog
                </a>
              )}
            </div>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-4xl font-bold text-primary mb-2">{publicRepos}</div>
              <p className="text-muted-foreground">Public Repositories</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-4xl font-bold text-primary mb-2">{followers}</div>
              <p className="text-muted-foreground">Followers</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-4xl font-bold text-primary mb-2">{repos.length}</div>
              <p className="text-muted-foreground">Top Repositories</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-4xl font-bold text-primary mb-2">
                {repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)}
              </div>
              <p className="text-muted-foreground">Total Stars</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
