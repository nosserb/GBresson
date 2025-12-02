"use client"

import { ExternalLink, Star, GitFork, Eye } from "lucide-react"
import { useState } from "react"

export default function RepositoriesGrid({ repos }: { repos: any[] }) {
  const [filter, setFilter] = useState<"all" | "starred">("all")

  const filteredRepos = filter === "starred" ? repos.filter((r) => r.stargazers_count > 0) : repos

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      TypeScript: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Python: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Rust: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      Go: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
      Java: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      "C++": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      React: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    }
    return colors[language] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

  return (
    <section id="repos" className="py-16 md:py-24 bg-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 text-balance">Featured Projects</h2>

          <div className="flex gap-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "all" ? "bg-primary text-primary-foreground" : "bg-border text-foreground hover:bg-border/80"
              }`}
            >
              All Repositories
            </button>
            <button
              onClick={() => setFilter("starred")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "starred"
                  ? "bg-primary text-primary-foreground"
                  : "bg-border text-foreground hover:bg-border/80"
              }`}
            >
              Most Starred
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-background border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors max-w-xs">
                  {repo.name}
                </h3>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </div>

              <p className="text-foreground/70 text-sm mb-4 line-clamp-2 min-h-10">
                {repo.description || "No description provided"}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {repo.language && (
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getLanguageColor(repo.language)}`}>
                    {repo.language}
                  </span>
                )}
                {repo.topics?.slice(0, 2).map((topic: string) => (
                  <span key={topic} className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {topic}
                  </span>
                ))}
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
      </div>
    </section>
  )
}
