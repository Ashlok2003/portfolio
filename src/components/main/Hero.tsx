'use client'

import { motion } from 'framer-motion'
import { FC, useState } from 'react'
import Image from 'next/image'
import { FaFileDownload } from 'react-icons/fa'
import { ArrowDown, BadgeCheck } from 'lucide-react'
import { useSound } from '@/components/sound-provider'

const tickerItems = [
  { name: 'go', icon: 'go' },
  { name: 'rust', icon: 'rust' },
  { name: 'kubernetes', icon: 'kubernetes' },
  { name: 'aws', icon: 'aws' },
  { name: 'postgresql', icon: 'postgres' },
  { name: 'django', icon: 'django' },
  { name: 'docker', icon: 'docker' },
  { name: 'terraform', icon: 'terraform' },
  { name: 'graphql', icon: 'graphql' },
]

export const Hero: FC = () => {
  const [lightsOn, setLightsOn] = useState(true)
  const { playSwitchClick } = useSound()

  const handlePowerToggle = () => {
    const nextState = !lightsOn
    setLightsOn(nextState)
    playSwitchClick(nextState)
  }

  const handleConnectClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  } as const

  return (
    <section id="about" className="relative w-full bg-background transition-colors overflow-hidden">
      
      {/* Blueprint column grid — bounded, not edge-to-edge */}
      <div className="max-w-[880px] mx-auto grid grid-cols-1 min-[880px]:grid-cols-[40px_800px_40px] w-full min-h-[calc(100vh-64px)]">
        {/* Left Side Margin */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border" />

        {/* Content Container Area */}
        <div className="relative border-x border-border min-[880px]:border-x-0 px-6 py-16 md:py-24 flex flex-col justify-between min-h-full">
          {/* Isometric Blueprint Vector Background Schematic */}
          <div className="absolute inset-0 pointer-events-none select-none opacity-[0.04] dark:opacity-[0.07] z-0 flex items-center justify-center">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full object-cover"
            >
              <motion.line
                x1="50" y1="100" x2="750" y2="100"
                stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
              />
              <motion.line
                x1="50" y1="500" x2="750" y2="500"
                stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
              />
              <motion.line
                x1="100" y1="50" x2="100" y2="550"
                stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              />
              <motion.line
                x1="700" y1="50" x2="700" y2="550"
                stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
              />
              
              {/* Isometric Cube representation */}
              <motion.path
                d="M400,200 L550,275 L400,350 L250,275 Z"
                stroke="currentColor" strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.path
                d="M250,275 L250,400 L400,475 L400,350"
                stroke="currentColor" strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, ease: "easeInOut", delay: 0.7 }}
              />
              <motion.path
                d="M550,275 L550,400 L400,475"
                stroke="currentColor" strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, ease: "easeInOut", delay: 0.9 }}
              />
              
              {/* Projections & circles */}
              <motion.circle
                cx="400" cy="275" r="40"
                stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 1.1 }}
              />
              <motion.circle
                cx="400" cy="275" r="80"
                stroke="currentColor" strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 1.3 }}
              />
              
              {/* Labels */}
              <text x="415" y="190" fill="currentColor" fontFamily="monospace" fontSize="10" letterSpacing="0.1em">FIG. 01</text>
              <text x="260" y="390" fill="currentColor" fontFamily="monospace" fontSize="9">SYS.V_15</text>
              <text x="510" y="390" fill="currentColor" fontFamily="monospace" fontSize="9">GRID.REF_89</text>
            </svg>
          </div>


          {/* Main Content Row */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 my-auto py-10"
          >
            {/* Left Column: Identity & Bio */}
            <motion.div variants={childVariants} className="space-y-6">
              {/* Avatar Lights Grid Toggle area */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  {/* Backend System connection node background */}
                  {lightsOn && (
                    <div className="absolute inset-[-24px] pointer-events-none z-0 animate-pulse">
                      <svg viewBox="0 0 120 120" className="w-full h-full text-brand-blue opacity-45 dark:opacity-75" fill="none">
                        {/* Server/DB schematic lines radiating from center */}
                        <line x1="60" y1="60" x2="60" y2="12" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="60" y1="60" x2="108" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="60" y1="60" x2="26" y2="94" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                        
                        {/* Nodes with pulsing/glow look */}
                        <circle cx="60" cy="12" r="3" fill="currentColor" />
                        <circle cx="108" cy="60" r="3" fill="currentColor" />
                        <circle cx="26" cy="94" r="3" fill="currentColor" />
                        
                        {/* Outer server circle grid */}
                        <circle cx="60" cy="60" r="48" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
                      </svg>
                    </div>
                  )}
                  <div className={`relative size-20 rounded-full overflow-hidden border-2 z-10 transition-all duration-300 ${lightsOn ? 'border-brand-blue shadow-[0_0_15px_rgba(59,130,246,0.3)] scale-105' : 'border-border'}`}>
                    <Image
                      src="/ashlok.jpg"
                      alt="Ashlok Chaudhary Profile Photo"
                      width={80}
                      height={80}
                      className="object-cover size-full scale-105"
                      priority
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handlePowerToggle}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${lightsOn ? 'bg-brand-blue' : 'bg-muted border-border'}`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-background shadow ring-0 transition duration-200 ease-in-out ${lightsOn ? 'translate-x-4' : 'translate-x-0'}`}
                    />
                  </button>
                  <span className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase">
                    Power: {lightsOn ? 'ON' : 'OFF'}
                  </span>
                </div>
              </div>

              {/* Title & verified tick */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                    Ashlok Chaudhary
                  </h1>
                  <span title="Verified" className="shrink-0 inline-flex">
                    <BadgeCheck className="h-5 w-5 sm:h-6 sm:w-6 fill-brand-blue text-background" strokeWidth={2.5} />
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-mono text-muted-foreground tracking-wide">
                  Software Development Engineer
                </h2>
              </div>

              {/* Description bio */}
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed w-full text-justify">
                I design and build high-performance, secure backend architectures and cloud-native solutions using Node.js, Go, and Python. Experienced in distributed services, API design, Kubernetes, and automated infrastructure pipelines.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={handleConnectClick}
                  className="px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 shadow-md shadow-black/10 hover:shadow-lg hover:shadow-black/20 transition-all duration-300 flex items-center gap-2 font-semibold cursor-pointer"
                >
                  <span>Connect</span>
                  <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
                </button>
                <a
                  href="/resume.pdf"
                  download="Ashlok_Chaudhary_Resume.pdf"
                  className="px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-widest border border-border hover:border-foreground/45 text-foreground hover:bg-muted/20 transition-all duration-300 flex items-center gap-2 font-semibold"
                >
                  <FaFileDownload />
                  <span>Resume</span>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Monospace Technology Ticker Row */}
          <div className="relative z-10 pt-6 mt-8 sm:mt-0">
            {/* Stylesheet for marquee animation */}
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                animation: marquee 25s linear infinite;
              }
            `}</style>
            
            {/* Box with Grid Outline & Gradient Fades */}
            <div className="relative border-y border-border bg-card/25 h-[42px] flex items-stretch overflow-hidden">
              {/* Fade gradients */}
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
              
              <div className="flex w-full overflow-hidden">
                <div className="flex items-stretch gap-10 whitespace-nowrap shrink-0 animate-marquee">
                  {/* Render the list multiple times to ensure coverage */}
                  {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://skillicons.dev/icons?i=${item.icon}`}
                        alt={item.name}
                        className="w-4 h-4 object-contain"
                        loading="lazy"
                      />
                      <span>{item.name}</span>
                      <div className="w-px h-full bg-border/50 ml-6" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Margin */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border" />
      </div>
    </section>
  )
}

export default Hero
