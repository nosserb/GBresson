"use client"

import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Let's Connect</h3>
            <p className="text-foreground/70 mb-6">
              I'm always interested in collaborating on interesting projects and exploring new opportunities in tech.
            </p>
          </div>

          <div className="flex items-center justify-end gap-6">
            <a
              href="https://github.com/nosserb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-3 bg-background border border-border rounded-lg hover:border-primary hover:text-primary transition-all"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="p-3 bg-background border border-border rounded-lg hover:border-primary hover:text-primary transition-all"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-3 bg-background border border-border rounded-lg hover:border-primary hover:text-primary transition-all"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:hello@example.com"
              aria-label="Email"
              className="p-3 bg-background border border-border rounded-lg hover:border-primary hover:text-primary transition-all"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Portfolio. Built with Next.js & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  )
}
