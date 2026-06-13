'use client'

import { FC, useEffect, useState } from 'react'
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa'
import { ArrowUpRight, Heart, ChevronUp } from 'lucide-react'

export const Footer: FC = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0)

  useEffect(() => {
    const savedCount = localStorage.getItem('visitorCount')
    const lastVisit = localStorage.getItem('lastVisit')
    const today = new Date().toDateString()

    let count = savedCount ? parseInt(savedCount, 10) : 1000

    if (!savedCount) {
      // Seed baseline at 1K on first visit
      localStorage.setItem('visitorCount', count.toString())
      localStorage.setItem('lastVisit', today)
    } else if (!lastVisit || lastVisit !== today) {
      count += 1
      localStorage.setItem('visitorCount', count.toString())
      localStorage.setItem('lastVisit', today)
    }

    setVisitorCount(count)
  }, [])

  const socialLinks = [
    {
      href: 'https://github.com/Ashlok2003',
      icon: <FaGithub className="w-3.5 h-3.5" />,
      label: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/ashlok2003/',
      icon: <FaLinkedin className="w-3.5 h-3.5" />,
      label: 'LinkedIn',
    },
    {
      href: 'https://x.com/ashlok2003',
      icon: <FaTwitter className="w-3.5 h-3.5" />,
      label: 'Twitter',
    },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative w-full bg-background text-foreground transition-colors">
      <div className="max-w-[880px] mx-auto grid grid-cols-1 min-[880px]:grid-cols-[40px_800px_40px] w-full">
        {/* Left Margin */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border" />

        {/* Content Cell */}
        <div className="border-x border-border min-[880px]:border-x-0">

          {/* Top Row: Social links + Back to top */}
          <div className="px-6 py-5 flex items-center justify-between border-b border-border/40">
            {/* Social Links */}
            <div className="flex items-center gap-5">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  aria-label={`Visit my ${link.label} profile`}
                >
                  <span className="flex items-center justify-center w-8 h-8 border border-border/60 rounded-md group-hover:border-brand-blue/40 group-hover:bg-brand-blue/5 transition-all duration-200">
                    {link.icon}
                  </span>
                  <span className="hidden sm:block text-xs font-medium">{link.label}</span>
                  <ArrowUpRight className="hidden sm:block w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-200" />
                </a>
              ))}
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground font-medium transition-colors duration-200 cursor-pointer"
            >
              <span className="hidden sm:block">Back to Top</span>
              <span className="flex items-center justify-center w-8 h-8 border border-border/60 rounded-md group-hover:border-brand-blue/40 group-hover:bg-brand-blue/5 transition-all duration-200">
                <ChevronUp className="w-4 h-4" />
              </span>
            </button>
          </div>

          {/* Bottom Row */}
          <div className="px-6 py-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[11px] text-muted-foreground/50 font-mono tracking-wide">
            <span>© {new Date().getFullYear()} Ashlok Chaudhary</span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1">Built with <Heart className="w-2.5 h-2.5 text-rose-500/60 fill-rose-500/60" /> Next.js</span>
            <span className="text-border">·</span>
            <span className="tabular-nums">{visitorCount.toLocaleString()} visits</span>
          </div>
        </div>

        {/* Right Margin */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border" />
      </div>
    </footer>
  )
}

export default Footer
