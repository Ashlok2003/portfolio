'use client'

import { FC, useEffect, useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Search, User, Layers, Briefcase, FolderGit2, PenLine, Mail, Github, Linkedin, Twitter, FileDown, Sun, Moon, CornerDownLeft, SearchX } from 'lucide-react'
import { useSound } from '@/components/sound-provider'

type Category = 'navigation' | 'actions' | 'socials'

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  category: Category
  icon: React.ReactNode
  action: () => void
}

const CATEGORY_LABELS: Record<Category, string> = {
  navigation: 'Navigate',
  actions: 'Actions',
  socials: 'Connect',
}

export const CommandPalette: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { theme, setTheme } = useTheme()
  const { playKeystroke } = useSound()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Toggle palette open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setSearch('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  const handleNav = (selector: string) => {
    setIsOpen(false)
    const el = document.querySelector(selector)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // All commands list
  const commands: CommandItem[] = useMemo(() => [
    // Navigation
    {
      id: 'nav-about',
      title: 'About',
      subtitle: 'Profile & introduction',
      category: 'navigation',
      icon: <User className="h-4 w-4" />,
      action: () => handleNav('#about'),
    },
    {
      id: 'nav-skills',
      title: 'Skills',
      subtitle: 'Tech stack & tooling',
      category: 'navigation',
      icon: <Layers className="h-4 w-4" />,
      action: () => handleNav('#skills'),
    },
    {
      id: 'nav-experience',
      title: 'Experience',
      subtitle: 'Work history & timeline',
      category: 'navigation',
      icon: <Briefcase className="h-4 w-4" />,
      action: () => handleNav('#experience'),
    },
    {
      id: 'nav-projects',
      title: 'Projects',
      subtitle: 'Selected case studies',
      category: 'navigation',
      icon: <FolderGit2 className="h-4 w-4" />,
      action: () => handleNav('#projects'),
    },
    {
      id: 'nav-blogs',
      title: 'Writing',
      subtitle: 'Technical articles',
      category: 'navigation',
      icon: <PenLine className="h-4 w-4" />,
      action: () => handleNav('#blogs'),
    },
    {
      id: 'nav-contact',
      title: 'Contact',
      subtitle: 'Get in touch',
      category: 'navigation',
      icon: <Mail className="h-4 w-4" />,
      action: () => handleNav('#contact'),
    },
    // Actions
    {
      id: 'action-theme',
      title: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
      subtitle: 'Toggle appearance',
      category: 'actions',
      icon: theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />,
      action: () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        setIsOpen(false)
      },
    },
    {
      id: 'action-resume',
      title: 'Download résumé',
      subtitle: 'PDF · opens in new tab',
      category: 'actions',
      icon: <FileDown className="h-4 w-4" />,
      action: () => {
        window.open('/resume.pdf', '_blank')
        setIsOpen(false)
      },
    },
    // Social links
    {
      id: 'social-github',
      title: 'GitHub',
      subtitle: 'github.com/Ashlok2003',
      category: 'socials',
      icon: <Github className="h-4 w-4" />,
      action: () => {
        window.open('https://github.com/Ashlok2003', '_blank')
        setIsOpen(false)
      },
    },
    {
      id: 'social-linkedin',
      title: 'LinkedIn',
      subtitle: 'linkedin.com/in/ashlok2003',
      category: 'socials',
      icon: <Linkedin className="h-4 w-4" />,
      action: () => {
        window.open('https://www.linkedin.com/in/ashlok2003/', '_blank')
        setIsOpen(false)
      },
    },
    {
      id: 'social-twitter',
      title: 'X',
      subtitle: 'x.com/ashlok2003',
      category: 'socials',
      icon: <Twitter className="h-4 w-4" />,
      action: () => {
        window.open('https://x.com/ashlok2003', '_blank')
        setIsOpen(false)
      },
    },
  ], [theme, setTheme])

  // Filter commands by search
  const filteredCommands = useMemo(() => {
    if (!search) return commands
    const query = search.toLowerCase()
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(query) ||
        c.subtitle?.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query)
    )
  }, [search, commands])

  // Handle keyboard events when open
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        playKeystroke('standard')
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        playKeystroke('standard')
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          playKeystroke('enter')
          filteredCommands[selectedIndex].action()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filteredCommands, playKeystroke])

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/60 backdrop-blur-md"
          />

          {/* Command Dialog Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="relative w-full max-w-xl mx-4 border border-border rounded-xl bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden z-10"
          >
            {/* Input Search header */}
            <div className="border-b border-border/70 px-4 h-14 flex items-center gap-3">
              <Search className="h-4 w-4 text-muted-foreground/70 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for a section or action…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setSelectedIndex(0)
                }}
                onKeyDown={(e) => {
                  if (e.key === ' ') {
                    playKeystroke('spacebar')
                  } else if (e.key === 'Backspace') {
                    playKeystroke('backspace')
                  } else if (e.key.length === 1) {
                    playKeystroke('standard')
                  }
                }}
                className="w-full bg-transparent text-sm text-foreground placeholder-muted-foreground/60 outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 border border-border rounded-md bg-muted/60 text-[10px] font-medium text-muted-foreground shrink-0">
                Esc
              </kbd>
            </div>

            {/* List Results */}
            <div
              ref={listRef}
              className="max-h-[340px] overflow-y-auto p-2 custom-scrollbar"
            >
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = selectedIndex === idx
                  const showHeader = idx === 0 || filteredCommands[idx - 1].category !== cmd.category

                  return (
                    <div key={cmd.id}>
                      {showHeader && (
                        <div className="px-2 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50 first:pt-1">
                          {CATEGORY_LABELS[cmd.category]}
                        </div>
                      )}
                      <div
                        onClick={() => {
                          playKeystroke('enter')
                          cmd.action()
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`px-2.5 py-2.5 flex items-center justify-between rounded-lg cursor-pointer transition-colors duration-100 ${
                          isSelected
                            ? 'bg-brand-blue/10 text-foreground'
                            : 'text-muted-foreground hover:bg-muted/40'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`flex items-center justify-center h-8 w-8 rounded-md border shrink-0 transition-colors ${
                              isSelected
                                ? 'border-brand-blue/30 bg-brand-blue/10 text-brand-blue'
                                : 'border-border/60 bg-muted/30 text-muted-foreground'
                            }`}
                          >
                            {cmd.icon}
                          </span>
                          <div className="flex flex-col gap-0.5 min-w-0">
                            <span className={`text-sm font-medium truncate ${isSelected ? 'text-foreground' : 'text-foreground/90'}`}>
                              {cmd.title}
                            </span>
                            {cmd.subtitle && (
                              <span className="text-[11px] text-muted-foreground/70 truncate">
                                {cmd.subtitle}
                              </span>
                            )}
                          </div>
                        </div>

                        {isSelected && (
                          <span className="flex items-center gap-1 text-[10px] font-medium text-brand-blue shrink-0">
                            <CornerDownLeft className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="py-12 text-center text-muted-foreground flex flex-col items-center gap-2.5">
                  <SearchX className="h-6 w-6 text-muted-foreground/40" />
                  <span className="text-sm">No results for “{search}”</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border/70 px-4 py-2.5 flex items-center justify-between bg-muted/20 text-[11px] text-muted-foreground/70">
              <div className="flex items-center gap-3.5">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 border border-border rounded bg-muted/50 text-[9px]">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 border border-border rounded bg-muted/50 text-[9px]">↵</kbd>
                  select
                </span>
              </div>
              <span className="font-medium text-muted-foreground/60">ashlok.dev</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
