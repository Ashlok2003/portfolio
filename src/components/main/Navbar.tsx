'use client'

import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { Sun, Moon, Menu, X, Search, Volume2, VolumeX } from 'lucide-react'
import { useSound } from '@/components/sound-provider'

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { isSoundEnabled, toggleSound, playKeystroke } = useSound()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { name: 'about', link: '#about' },
    { name: 'experience', link: '#experience' },
    { name: 'projects', link: '#projects' },
    { name: 'blogs', link: '#blogs' },
    { name: 'contact', link: '#contact' },
  ]

  const handleNavClick = (link: string) => {
    playKeystroke('standard')
    setIsOpen(false)
    const element = document.querySelector(link)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-40">
      {/* 3-Column Grid bounded within max-width container */}
      <div className="max-w-[880px] mx-auto grid grid-cols-1 min-[880px]:grid-cols-[40px_800px_40px] w-full">
        {/* Left Margin Stripe Cell */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border" />

        {/* Content Cell */}
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="#about"
              onClick={() => handleNavClick('#about')}
              className="shrink-0 hover:opacity-80 transition-opacity"
              aria-label="Go to top"
            >
              <Image
                src="/ashlok.jpg"
                alt="Ashlok Chaudhary"
                width={30}
                height={30}
                className="rounded-full border border-border object-cover"
                priority
              />
            </Link>
            
            {/* Desktop Navigation Links */}
            <nav className="hidden min-[880px]:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={`nav-${item.name}`}
                  href={item.link}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.link)
                  }}
                  className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Command Search Shortcut Indicator */}
            <button
              onClick={() => {
                playKeystroke('standard')
                const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true })
                window.dispatchEvent(event)
              }}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 border border-border rounded-md font-mono text-[10px] text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all"
            >
              <Search className="h-3 w-3" />
              <span>Search</span>
              <kbd className="px-1 border border-border rounded bg-muted font-sans text-[9px]">Ctrl K</kbd>
            </button>

            {/* GitHub Repo link */}
            <a
              href="https://github.com/Ashlok2003/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playKeystroke('standard')}
              className="p-2 border border-border rounded-md hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
              aria-label="GitHub Repository"
            >
              <FaGithub className="h-4 w-4" />
            </a>

            {/* Direct click theme switch button */}
            {mounted && (
              <button
                onClick={() => {
                  playKeystroke('standard')
                  setTheme(theme === 'dark' ? 'light' : 'dark')
                }}
                className="p-2 border border-border rounded-md hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            )}

            {/* Direct click sound switch button */}
            {mounted && (
              <button
                onClick={() => {
                  toggleSound()
                }}
                className="p-2 border border-border rounded-md hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Toggle Sound"
              >
                {isSoundEnabled ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </button>
            )}

            {/* Mobile Nav Toggle */}
            <button
              onClick={() => {
                playKeystroke('standard')
                setIsOpen(!isOpen)
              }}
              className="min-[880px]:hidden p-2 border border-border rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Right Margin Stripe Cell */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border" />
      </div>

      {/* Mobile Menu Panel dropdown */}
      {isOpen && (
        <div className="min-[880px]:hidden border-t border-border bg-background/95 px-6 py-4 flex flex-col gap-4 font-mono">
          {navItems.map((item) => (
            <Link
              key={`mobile-nav-${item.name}`}
              href={item.link}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item.link)
              }}
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors py-2 border-b border-border last:border-b-0"
            >
              {item.name}
            </Link>
          ))}
          {/* Mobile Search button */}
          <button
            onClick={() => {
              setIsOpen(false)
              playKeystroke('standard')
              const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true })
              window.dispatchEvent(event)
            }}
            className="flex items-center gap-3 px-3 py-2 border border-border rounded-md text-xs text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all"
          >
            <Search className="h-4 w-4" />
            <span>Open Command Menu (Ctrl+K)</span>
          </button>
        </div>
      )}
    </header>
  )
}

export default Navbar
