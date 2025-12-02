"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const SKILLS = {
  Frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js", "JavaScript", "HTML/CSS"],
  Backend: ["Node.js", "Python", "Express.js", "REST APIs", "GraphQL", "Django", "FastAPI"],
  Databases: ["PostgreSQL", "MongoDB", "Firebase", "MySQL", "Redis", "Supabase"],
  "Tools & Platforms": ["Git/GitHub", "Docker", "Vercel", "AWS", "Linux", "VS Code", "CI/CD"],
}

export default function SkillsPage() {
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Skills & Technologies</h1>
          <p className="text-foreground/70 max-w-2xl">
            Here's a comprehensive overview of the technologies and tools I work with to build modern applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {Object.entries(SKILLS).map(([category, skills]) => (
            <div key={category} className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">{category}</h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg text-foreground font-medium hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Learning Path</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-3xl font-bold text-primary mb-2">Proficient</div>
              <p className="text-foreground/70">
                I have several years of professional experience and can build complete applications independently.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-3xl font-bold text-primary mb-2">Intermediate</div>
              <p className="text-foreground/70">
                I have solid knowledge and can work on projects with some guidance or reference material.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-3xl font-bold text-primary mb-2">Learning</div>
              <p className="text-foreground/70">
                I'm actively learning these technologies and enjoy exploring new tools and frameworks.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
