"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface SkillData {
  skillName: string
  level: number
}

interface XPData {
  date: string
  xp: number
}

export default function Zone01Stats({ username }: { username: string }) {
  const [skills, setSkills] = useState<SkillData[]>([])
  const [xpData, setXpData] = useState<XPData[]>([])
  const [userStats, setUserStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchZone01Data = async () => {
      try {
        // Fetch from Zone01 GraphQL API
        const query = `
          query {
            user(where: {login: "${username}"}) {
              id
              login
              transactions(order_by: {createdAt: asc}, limit: 100) {
                amount
                createdAt
                type
              }
              progresses(where: {completedAt: {_is_null: false}}) {
                skill {
                  name
                }
                level
              }
            }
          }
        `

        const response = await fetch("https://zone01oujda.ma/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        })

        const data = await response.json()

        if (data.data?.user) {
          const user = data.data.user

          // Process skills
          const skillsMap = new Map<string, number>()
          user.progresses?.forEach((p: any) => {
            const skillName = p.skill?.name || "Unknown"
            const maxLevel = Math.max(skillsMap.get(skillName) || 0, p.level || 0)
            skillsMap.set(skillName, maxLevel)
          })
          setSkills(
            Array.from(skillsMap, ([name, level]) => ({ skillName: name, level })).sort((a, b) => b.level - a.level),
          )

          // Process XP data
          const xpMap = new Map<string, number>()
          user.transactions?.forEach((t: any) => {
            if (t.type === "xp") {
              const date = new Date(t.createdAt).toLocaleDateString()
              xpMap.set(date, (xpMap.get(date) || 0) + t.amount)
            }
          })

          const xpArray = Array.from(xpMap, ([date, xp]) => ({ date, xp }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(-30) // Last 30 days

          setXpData(xpArray)

          // Calculate total stats
          const totalXP =
            user.transactions?.reduce((sum: number, t: any) => {
              return t.type === "xp" ? sum + (t.amount || 0) : sum
            }, 0) || 0

          setUserStats({
            login: user.login,
            totalXP,
            skillsCount: skillsMap.size,
            projectsCompleted: user.progresses?.length || 0,
          })
        }
      } catch (err) {
        console.error("Error fetching Zone01 data:", err)
        setError("Failed to load Zone01 stats")
      } finally {
        setLoading(false)
      }
    }

    fetchZone01Data()
  }, [username])

  if (loading)
    return (
      <Card>
        <CardContent className="py-12 text-center text-foreground/60">Loading Zone01 stats...</CardContent>
      </Card>
    )

  if (error)
    return (
      <Card>
        <CardContent className="py-12 text-center text-destructive">{error}</CardContent>
      </Card>
    )

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground/60">Total XP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{(userStats?.totalXP / 1000).toFixed(1)}K</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground/60">Skills Mastered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{userStats?.skillsCount || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground/60">Projects Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{userStats?.projectsCompleted || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* XP Progress Chart */}
      {xpData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>XP Progress (Last 30 Days)</CardTitle>
            <CardDescription>Daily XP earned</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={xpData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--foreground) / 0.5)" />
                <YAxis stroke="hsl(var(--foreground) / 0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="xp" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Skills Progress */}
      {skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Skills Breakdown</CardTitle>
            <CardDescription>Mastery level by skill</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skills}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="skillName"
                  stroke="hsl(var(--foreground) / 0.5)"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis stroke="hsl(var(--foreground) / 0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="level" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
