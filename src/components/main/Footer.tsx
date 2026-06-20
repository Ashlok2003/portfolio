'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa'
import { Heart, ChevronUp, Globe } from 'lucide-react'
import Script from 'next/script'

import { useLanguage, Language } from '@/components/language-provider'
import { useSound } from '@/components/sound-provider'

// DMCA badge ID from dmca.com dashboard
const DMCA_ID = '6dfe1037-1892-42c0-8901-2a29faa4ee9e'

export const Footer: FC = () => {
  const { language, setLanguage, t } = useLanguage()
  const { playKeystroke } = useSound()

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
      <div className="max-w-[880px] mx-auto grid grid-cols-1 min-[880px]:grid-cols-[40px_800px_40px] w-full relative">
        {/* Left Margin */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border relative h-full select-none">
          <div className="absolute inset-y-0 left-1/2 w-px bg-border/40 -translate-x-1/2" />
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-mono text-[9px] text-muted-foreground/35 font-bold z-10">+</div>
        </div>

        {/* Content Cell */}
        <div className="border-x border-border min-[880px]:border-x-0">

          {/* Top Row: Social links + Language selector + Back to top */}
          <div className="px-6 py-5 flex flex-wrap gap-4 items-center justify-between border-b border-border/40">
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
                  aria-label={`Visit my ${link.label} profile`}
                >
                  <span className="flex items-center justify-center w-8 h-8 border border-border/60 rounded-md group-hover:border-brand-blue/40 group-hover:bg-brand-blue/5 transition-all duration-200">
                    {link.icon}
                  </span>
                </a>
              ))}
            </div>

            {/* Language Selector Capsule (Flat, Segmented, Animated) */}
            <div className="flex items-center gap-1 p-1 border border-border/60 rounded-full bg-muted/10 backdrop-blur-sm shadow-sm hover:border-border transition-all duration-300">
              <div className="pl-2 pr-1 text-muted-foreground/40">
                <Globe className="w-3.5 h-3.5" />
              </div>
              {(['en', 'hi', 'ja'] as Language[]).map((lang) => {
                const isActive = language === lang
                return (
                  <button
                    key={lang}
                    onClick={() => {
                      playKeystroke('standard')
                      setLanguage(lang)
                    }}
                    className={`relative px-3 py-1 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider transition-colors duration-300 select-none ${isActive
                        ? 'text-white dark:text-white'
                        : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="footerLangActive"
                        className="absolute inset-0 bg-black dark:bg-brand-blue rounded-full -z-10 shadow-sm"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {lang === 'en' ? 'EN' : lang === 'hi' ? 'हि' : '日'}
                  </button>
                )
              })}
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground font-medium transition-colors duration-200 cursor-pointer"
            >
              <span className="hidden sm:block">
                {{
                  en: 'Back to Top',
                  hi: 'ऊपर जाएं',
                  ja: 'トップに戻る'
                }[language]}
              </span>
              <span className="flex items-center justify-center w-8 h-8 border border-border/60 rounded-md group-hover:border-brand-blue/40 group-hover:bg-brand-blue/5 transition-all duration-200">
                <ChevronUp className="w-4 h-4" />
              </span>
            </button>
          </div>

          {/* Bottom Row */}
          <div className="px-6 py-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 text-[11px] text-muted-foreground/50 font-mono tracking-wide">
            {/* Left: copyright + credit */}
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <span>© {new Date().getFullYear()} {t.hero.name}</span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1">
                {{
                  en: 'Built with',
                  hi: 'निर्मित:',
                  ja: '開発ツール:'
                }[language]}
                <Heart className="w-2.5 h-2.5 text-rose-500/60 fill-rose-500/60" /> Next.js
              </span>
            </div>

            {/* Right: DMCA badge */}
            <a
              href={`//www.dmca.com/Protection/Status.aspx?ID=${DMCA_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              title="DMCA.com Protection Status"
              className="dmca-badge inline-flex items-center opacity-80 hover:opacity-100 transition-opacity duration-200 shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://images.dmca.com/Badges/dmca-badge-w200-5x1-08.png?ID=${DMCA_ID}`}
                alt="DMCA.com Protection Status"
                width={150}
                height={30}
                className="h-[26px] w-auto"
              />
            </a>
          </div>
        </div>

        {/* Right Margin */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border relative h-full select-none">
          <div className="absolute inset-y-0 left-1/2 w-px bg-border/40 -translate-x-1/2" />
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-mono text-[9px] text-muted-foreground/35 font-bold z-10">+</div>
        </div>
      </div>
      <Script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js" strategy="lazyOnload" />
    </footer>
  )
}

export default Footer
