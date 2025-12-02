import { Chart } from "@/components/ui/chart"
const GITHUB_USERNAME = "nosserb"
const ZONE01_USERNAME = "gcouvri"
const ZONE01_API = "https://zone01oujda.ma/api"

// Fetch GitHub User Data
async function fetchGitHubUser() {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching GitHub user:", error)
    return null
  }
}

// Fetch GitHub Repositories
async function fetchGitHubRepos() {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=100`)
    const data = await response.json()
    return data.sort((a, b) => b.stargazers_count - a.stargazers_count)
  } catch (error) {
    console.error("Error fetching repos:", error)
    return []
  }
}

// Load Home Page
async function loadHomePage() {
  const user = await fetchGitHubUser()
  const repos = await fetchGitHubRepos()

  if (user) {
    document.getElementById("avatar").src = user.avatar_url
    document.getElementById("name").textContent = user.name || "Développeur"
    document.getElementById("bio").textContent = user.bio || "Passionné par la programmation"
    document.getElementById("repos-count").textContent = user.public_repos
    document.getElementById("followers-count").textContent = user.followers
  }

  // Display top 6 repos
  const reposGrid = document.getElementById("repos-grid")
  if (repos.length > 0) {
    reposGrid.innerHTML = repos
      .slice(0, 6)
      .map((repo) => createRepoCard(repo))
      .join("")
  }
}

// Load About Page
async function loadAboutPage() {
  const user = await fetchGitHubUser()

  if (user) {
    document.getElementById("about-avatar").src = user.avatar_url
    document.getElementById("about-name").textContent = user.name || "Développeur"
    document.getElementById("about-bio").textContent = user.bio || "Passionné par la programmation"
    document.getElementById("location").textContent = user.location || "Non spécifiée"
    document.getElementById("email").textContent = user.email || "Non public"
    document.getElementById("public-repos").textContent = user.public_repos
  }
}

// Load Projects Page
async function loadProjectsPage() {
  const repos = await fetchGitHubRepos()

  if (repos.length > 0) {
    renderAllRepos(repos)
    populateLanguageFilter(repos)
  }
}

// Render all repos with filters
function renderAllRepos(repos) {
  const reposGrid = document.getElementById("all-repos-grid")
  reposGrid.innerHTML = repos.map((repo) => createRepoCard(repo)).join("")
  attachFilterListeners(repos)
}

// Create repo card HTML
function createRepoCard(repo) {
  const language = repo.language || "Unknown"
  const stars = repo.stargazers_count || 0
  const forks = repo.forks_count || 0

  return `
    <div class="repo-card">
      <h3 class="repo-name">${repo.name}</h3>
      <p class="repo-description">${repo.description || "No description"}</p>
      ${language ? `<span class="repo-language">${language}</span>` : ""}
      <div class="repo-stats">
        <div class="repo-stat">⭐ ${stars}</div>
        <div class="repo-stat">🍴 ${forks}</div>
      </div>
      <a href="${repo.html_url}" target="_blank" class="repo-link">Voir le projet →</a>
    </div>
  `
}

// Populate language filter
function populateLanguageFilter(repos) {
  const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))]
  const select = document.getElementById("language-filter")
  languages.forEach((lang) => {
    const option = document.createElement("option")
    option.value = lang
    option.textContent = lang
    select.appendChild(option)
  })
}

// Attach filter listeners
function attachFilterListeners(repos) {
  const searchInput = document.getElementById("search-repos")
  const languageFilter = document.getElementById("language-filter")

  function filterRepos() {
    const searchTerm = searchInput.value.toLowerCase()
    const selectedLanguage = languageFilter.value

    const filtered = repos.filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchTerm) || (repo.description || "").toLowerCase().includes(searchTerm)
      const matchesLanguage = !selectedLanguage || repo.language === selectedLanguage
      return matchesSearch && matchesLanguage
    })

    const reposGrid = document.getElementById("all-repos-grid")
    reposGrid.innerHTML = filtered.map((repo) => createRepoCard(repo)).join("")
  }

  searchInput.addEventListener("input", filterRepos)
  languageFilter.addEventListener("change", filterRepos)
}

// Load Skills Page
async function loadSkillsPage() {
  const repos = await fetchGitHubRepos()
  const languages = {}

  repos.forEach((repo) => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1
    }
  })

  const skillsContainer = document.getElementById("skills-container")
  const categories = {
    Frontend: ["JavaScript", "TypeScript", "React", "Vue", "Angular", "HTML", "CSS"],
    Backend: ["Python", "Node.js", "Java", "Go", "Rust", "C++", "PHP"],
    Databases: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase"],
    Tools: ["Git", "Docker", "Kubernetes", "CI/CD", "Linux"],
  }

  let html = ""
  for (const [category, skills] of Object.entries(categories)) {
    const categoryLanguages = skills.filter((s) => languages[s])
    if (categoryLanguages.length > 0) {
      html += `
        <div class="skill-category">
          <h3>${category}</h3>
          <div class="skills-list">
            ${categoryLanguages.map((skill) => `<div class="skill-badge">${skill}</div>`).join("")}
          </div>
        </div>
      `
    }
  }

  skillsContainer.innerHTML = html || '<p class="loading">Aucune compétence détectée</p>'
}

// Load Zone01 Stats Page
async function loadStatsPage() {
  try {
    const response = await fetch(`${ZONE01_API}/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            user(where: { login: "${ZONE01_USERNAME}" }) {
              id
              firstName
              lastName
              totalUp
              level
              skills {
                id
                skillName
                skillLevel
              }
            }
          }
        `,
      }),
    })

    const result = await response.json()
    const user = result.data?.user

    if (user) {
      document.getElementById("total-xp").textContent = formatXP(user.totalUp)
      document.getElementById("level").textContent = Math.floor(user.level)
      document.getElementById("skills-count").textContent = user.skills.length

      // Render skills
      const skillsList = document.getElementById("zone01-skills")
      skillsList.innerHTML = user.skills
        .map(
          (skill) => `
        <div class="zone01-skill-item">
          <span class="zone01-skill-name">${skill.skillName}</span>
          <span class="zone01-skill-level">${skill.skillLevel}%</span>
        </div>
      `,
        )
        .join("")

      // Create XP chart
      createXPChart()
    }
  } catch (error) {
    console.error("Error fetching Zone01 stats:", error)
    document.getElementById("zone01-skills").innerHTML = '<p class="loading">Erreur lors du chargement des stats</p>'
  }
}

// Format XP number
function formatXP(xp) {
  if (xp >= 1000000) return (xp / 1000000).toFixed(1) + "M"
  if (xp >= 1000) return (xp / 1000).toFixed(1) + "K"
  return xp
}

// Create XP Chart
function createXPChart() {
  const ctx = document.getElementById("xp-chart")
  if (!ctx) return

  const data = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: "XP Gagné",
        data: Array.from({ length: 30 }, () => Math.random() * 5000 + 2000),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "#f1f5f9",
          },
        },
      },
      scales: {
        x: {
          ticks: { color: "#cbd5e1" },
        },
        y: {
          ticks: { color: "#cbd5e1" },
        },
      },
    },
  })
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop()

  if (!currentPage || currentPage === "index.html") {
    loadHomePage()
  }
})
