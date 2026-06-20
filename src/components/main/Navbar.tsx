'use client'

import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { Sun, Moon, Menu, X, Search, Volume2, VolumeX } from 'lucide-react'
import { useSound } from '@/components/sound-provider'
import { useLanguage, Language } from '@/components/language-provider'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const { isSoundEnabled, toggleSound, playKeystroke } = useSound()
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { name: t.nav.about, link: '#about' },
    { name: t.nav.experience, link: '#experience' },
    { name: t.nav.projects, link: '#projects' },
    { name: t.nav.blogs, link: '#blogs' },
    { name: t.nav.contact, link: '#contact' },
  ]

  const handleNavClick = (link: string) => {
    playKeystroke('standard')
    setIsOpen(false)
    const element = document.querySelector(link)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleLang = (lang: Language) => {
    playKeystroke('standard')
    setLanguage(lang)
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-background/70 backdrop-blur-xl border-b border-border/60 z-40 transition-colors">
      {/* 3-Column Grid bounded within max-width container */}
      <div className="max-w-[880px] mx-auto grid grid-cols-1 min-[880px]:grid-cols-[40px_800px_40px] w-full relative">
        {/* Left Margin Stripe Cell */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border/80 relative h-full select-none">
          <div className="absolute inset-y-0 left-1/2 w-px bg-border/40 -translate-x-1/2" />
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-mono text-[9px] text-muted-foreground/35 font-bold z-10">+</div>
        </div>

        {/* Content Cell */}
        <div className="relative border-x border-border min-[880px]:border-x-0 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-7">
            {/* Logo Avatar with glow */}
            <Link
              href="#about"
              onClick={() => handleNavClick('#about')}
              className="shrink-0 relative group flex items-center"
              aria-label="Go to top"
            >
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-blue/30 to-violet-600/30 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative size-8 rounded-full border border-border/80 overflow-hidden flex items-center justify-center bg-muted">
                <Image
                  src="/ashlok.jpg"
                  alt="Ashlok Chaudhary"
                  width={32}
                  height={32}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation Links with sliding backdrop pill */}
            <nav
              className="hidden min-[880px]:flex items-center gap-1.5"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {navItems.map((item, idx) => (
                <Link
                  key={`nav-${item.name}`}
                  href={item.link}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.link)
                  }}
                  className={`relative px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-200 ${hoveredIndex === idx ? 'text-foreground' : 'text-muted-foreground/80 hover:text-foreground'
                    }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {hoveredIndex === idx && (
                    <motion.span
                      layoutId="navHoverBackdrop"
                      className="absolute inset-0 bg-muted/40 rounded-full -z-0 border border-border/20 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {/* Command Search Shortcut Indicator - Desktop Only */}
            <button
              onClick={() => {
                playKeystroke('standard')
                const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true })
                window.dispatchEvent(event)
              }}
              className="hidden min-[880px]:flex items-center gap-2 px-3 py-1.5 border border-border/60 rounded-full bg-background/20 backdrop-blur-sm font-mono text-[10px] text-muted-foreground hover:bg-muted/40 hover:border-brand-blue/30 hover:text-foreground transition-all duration-300 shadow-sm active:scale-[0.97]"
            >
              <Search className="h-3.5 w-3.5" />
              <span>{language === 'hi' ? 'खोजें' : language === 'ja' ? '検索' : 'Search'}</span>
              <kbd className="px-1.5 py-0.5 border border-border/60 rounded bg-muted/50 font-sans text-[8px] opacity-75">Ctrl K</kbd>
            </button>

            {/* GitHub Repo link - Desktop Only */}
            <a
              href="https://github.com/Ashlok2003/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playKeystroke('standard')}
              className="hidden min-[880px]:flex p-2 border border-border/60 rounded-full bg-background/20 backdrop-blur-sm hover:bg-muted/40 transition-all hover:scale-[1.05] active:scale-[0.95] text-muted-foreground hover:text-foreground shadow-sm items-center justify-center"
              aria-label="GitHub Repository"
            >
              <FaGithub className="h-4 w-4" />
            </a>

            {/* Theme toggle switch - Desktop Only */}
            {mounted && (
              <button
                onClick={() => {
                  playKeystroke('standard')
                  setTheme(theme === 'dark' ? 'light' : 'dark')
                }}
                className="hidden min-[880px]:flex p-2 border border-border/60 rounded-full bg-background/20 backdrop-blur-sm hover:bg-muted/40 transition-all hover:scale-[1.05] active:scale-[0.95] text-muted-foreground hover:text-foreground shadow-sm items-center justify-center"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            )}

            {/* Sound toggle switch - Desktop Only */}
            {mounted && (
              <button
                onClick={() => {
                  toggleSound()
                }}
                className="hidden min-[880px]:flex p-2 border border-border/60 rounded-full bg-background/20 backdrop-blur-sm hover:bg-muted/40 transition-all hover:scale-[1.05] active:scale-[0.95] text-muted-foreground hover:text-foreground shadow-sm items-center justify-center"
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
              className="min-[880px]:hidden p-2 border border-border/60 rounded-full bg-background/20 backdrop-blur-sm hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-all flex items-center justify-center active:scale-[0.95]"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Right Margin Stripe Cell */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border/80 relative h-full select-none">
          <div className="absolute inset-y-0 left-1/2 w-px bg-border/40 -translate-x-1/2" />
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-mono text-[9px] text-muted-foreground/35 font-bold z-10">+</div>
        </div>
      </div>

      {/* Mobile Menu Panel dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="min-[880px]:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl px-6 py-5 flex flex-col gap-4 font-mono shadow-inner overflow-hidden"
          >
            {/* Nav Links */}
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={`mobile-nav-${item.name}`}
                  href={item.link}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.link)
                  }}
                  className="text-[12px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors py-2.5 border-b border-border/40 last:border-b-0"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => {
                setIsOpen(false)
                playKeystroke('standard')
                const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true })
                window.dispatchEvent(event)
              }}
              className="flex items-center gap-3 px-4 py-2.5 border border-border/65 rounded-full text-[11px] text-muted-foreground bg-background/30 hover:bg-muted/40 hover:text-foreground transition-all w-full"
            >
              <Search className="h-4 w-4" />
              <span>{language === 'hi' ? 'खोजें (Ctrl+K)' : language === 'ja' ? '検索 (Ctrl+K)' : 'Search (Ctrl+K)'}</span>
            </button>

            {/* Mobile Language Selector */}
            {mounted && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60 font-bold font-mono">Language</span>
                <div className="grid grid-cols-3 gap-1 p-1 border border-border/60 rounded-full bg-background/20 backdrop-blur-sm">
                  {(['en', 'hi', 'ja'] as Language[]).map((lang) => (
                    <button
                      key={`mobile-lang-${lang}`}
                      onClick={() => toggleLang(lang)}
                      className={`py-1.5 rounded-full font-mono text-[10px] font-bold transition-all ${language === lang
                          ? 'bg-black dark:bg-brand-blue text-white shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                        }`}
                    >
                      {lang === 'en' ? 'English' : lang === 'hi' ? 'हिन्दी' : '日本語'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile Preferences (Theme, Sound, GitHub) */}
            {mounted && (
              <div className="flex items-center justify-between pt-3 border-t border-border/40">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60 font-bold font-mono">Preferences</span>
                <div className="flex items-center gap-2">
                  {/* Theme */}
                  <button
                    onClick={() => {
                      playKeystroke('standard')
                      setTheme(theme === 'dark' ? 'light' : 'dark')
                    }}
                    className="p-2 border border-border/60 rounded-full bg-background/20 backdrop-blur-sm text-muted-foreground hover:text-foreground transition-all active:scale-[0.95]"
                    aria-label="Toggle Theme"
                  >
                    {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                  </button>

                  {/* Sound */}
                  <button
                    onClick={() => toggleSound()}
                    className="p-2 border border-border/60 rounded-full bg-background/20 backdrop-blur-sm text-muted-foreground hover:text-foreground transition-all active:scale-[0.95]"
                    aria-label="Toggle Sound"
                  >
                    {isSoundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
                  </button>

                  {/* GitHub Link */}
                  <a
                    href="https://github.com/Ashlok2003/portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playKeystroke('standard')}
                    className="p-2 border border-border/60 rounded-full bg-background/20 backdrop-blur-sm text-muted-foreground hover:text-foreground transition-all active:scale-[0.95] flex items-center justify-center"
                    aria-label="GitHub Repository"
                  >
                    <FaGithub className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
export default Navbar
