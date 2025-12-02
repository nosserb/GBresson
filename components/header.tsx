"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Github, Menu, X } from "lucide-react"

export default function Header({ profile }: { profile: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur border-b border-border" : "bg-background"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Github className="w-6 h-6 text-primary" />
          <span>{profile?.login || "Portfolio"}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/projects" className="text-foreground hover:text-primary transition-colors">
            Projects
          </Link>
          <Link href="/skills" className="text-foreground hover:text-primary transition-colors">
            Skills
          </Link>
          <Link href="/stats" className="text-foreground hover:text-primary transition-colors">
            Stats
          </Link>
          <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
          <a
            href={`https://github.com/${profile?.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            GitHub
          </a>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden">
            <div className="flex flex-col gap-4 p-4">
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/projects" className="text-foreground hover:text-primary transition-colors">
                Projects
              </Link>
              <Link href="/skills" className="text-foreground hover:text-primary transition-colors">
                Skills
              </Link>
              <Link href="/stats" className="text-foreground hover:text-primary transition-colors">
                Stats
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <a
                href={`https://github.com/${profile?.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity inline-block"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
