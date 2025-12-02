"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ExternalLink, Star, GitFork, Eye } from "lucide-react"

export default function ProjectsPage() {
  const [repos, setRepos] = useState<any[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await fetch(`https://api.github.com/users/nosserb`)
        const profileData = await profileRes.json()
        setProfile(profileData)

        const reposRes = await fetch(`https://api.github.com/users/nosserb/repos?sort=stars&order=desc&per_page=100`)
        const reposData = await reposRes.json()
        setRepos(reposData)
      } catch (err) {
        console.error("Error fetching data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const languages = ["all", ...new Set(repos.map((r) => r.language).filter(Boolean))]

  const filteredRepos = filter === "all" ? repos : repos.filter((r) => r.language === filter)

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      TypeScript: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Python: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Rust: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      Go: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
      Java: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      "C++": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    }
    return colors[language] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">All Projects</h1>
          <p className="text-foreground/70 mb-8">Explore all repositories and filter by programming language.</p>

          <div className="flex flex-wrap gap-3">
            {languages.slice(0, 8).map((lang) => (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === lang
                    ? "bg-primary text-primary-foreground"
                    : "bg-border text-foreground hover:bg-border/80"
                }`}
              >
                {lang === "all" ? "All Languages" : lang}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredRepos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {repo.name}
                  </h3>
                  {repo.fork && <p className="text-xs text-muted-foreground mt-1">Forked repository</p>}
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </div>

              <p className="text-foreground/70 text-sm mb-4 line-clamp-3 min-h-14">
                {repo.description || "No description provided"}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {repo.language && (
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getLanguageColor(repo.language)}`}>
                    {repo.language}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-border text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-4 h-4" />
                  <span>{repo.forks_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{repo.watchers_count}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {filteredRepos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No repositories found for this filter.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
