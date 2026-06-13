'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FC, useState } from 'react'
import { projectsData, Project } from '@/constants'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { Plus, Minus, FolderOpen, Terminal, ShieldAlert, Cpu, Award } from 'lucide-react'

const getIconKey = (tag: string): string => {
  const t = tag.toLowerCase().trim()
  if (t === 'go' || t === 'golang') return 'go'
  if (t === 'rust') return 'rust'
  if (t === 'nodejs' || t === 'node.js') return 'nodejs'
  if (t === 'python') return 'py'
  if (t === 'django') return 'django'
  if (t === 'postgres' || t === 'postgresql') return 'postgres'
  if (t === 'redis') return 'redis'
  if (t === 'kubernetes') return 'kubernetes'
  if (t === 'docker') return 'docker'
  if (t === 'aws') return 'aws'
  if (t === 'terraform') return 'terraform'
  if (t === 'graphql') return 'graphql'
  if (t === 'react') return 'react'
  if (t === 'nextjs' || t === 'next.js') return 'nextjs'
  if (t === 'typescript' || t === 'ts') return 'ts'
  if (t === 'javascript' || t === 'js') return 'js'
  if (t === 'express') return 'express'
  if (t === 'spring' || t === 'spring boot') return 'spring'
  if (t === 'mongodb') return 'mongodb'
  if (t === 'mysql') return 'mysql'
  if (t === 'prisma') return 'prisma'
  if (t === 'redux') return 'redux'
  if (t === 'tailwind' || t === 'tailwindcss') return 'tailwind'
  if (t === 'git') return 'git'
  if (t === 'githubactions' || t === 'github actions') return 'githubactions'
  if (t === 'prometheus') return 'prometheus'
  if (t === 'grafana') return 'grafana'
  if (t === 'linux') return 'linux'
  if (t === 'bash') return 'bash'
  if (t === 'postman') return 'postman'
  if (t === 'bun') return 'bun'
  if (t === 'gcp') return 'gcp'
  if (t === 'cloudflare') return 'cloudflare'
  if (t === 'elasticsearch') return 'elasticsearch'
  if (t === 'rabbitmq') return 'rabbitmq'
  if (t === 'kafka') return 'kafka'
  if (t === 'jenkins') return 'jenkins'
  if (t === 'ansible') return 'ansible'
  if (t === 'nginx') return 'nginx'
  if (t === 'cpp' || t === 'c++') return 'cpp'
  if (t === 'fastapi') return 'fastapi'
  return ''
}

export const Projects: FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  // Only display the 4 high-quality engineering projects (remove simple ones)
  const premiumProjects = projectsData.filter(p => 
    ['deeptab', 'snappy pro', 'shopxindia', 'socialpedia'].includes(p.title.toLowerCase())
  )

  return (
    <section id="projects" className="relative w-full bg-background transition-colors">
      <div className="max-w-[880px] mx-auto grid grid-cols-1 min-[880px]:grid-cols-[40px_800px_40px] w-full">
        {/* Left Margin */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border" />

        {/* Content Cell */}
        <div className="relative border-x border-border min-[880px]:border-x-0 px-6 py-12">
          {/* Section Header on Border Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-background px-4 whitespace-nowrap">
            <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
              PROJECTS
            </span>
          </div>

          <div className="space-y-3">
            {premiumProjects.map((project: Project, idx: number) => {
              const isExpanded = expandedIndex === idx

              return (
                <div
                  key={project.title}
                  className={`border border-border/50 rounded-lg transition-all duration-300 overflow-hidden ${
                    isExpanded 
                      ? 'bg-card/10 border-border shadow-sm' 
                      : 'hover:border-border hover:bg-card/5'
                  }`}
                >
                  {/* Trigger Header */}
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="w-full text-left p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`size-10 border rounded-lg shrink-0 mt-0.5 overflow-hidden transition-all duration-300 flex items-center justify-center ${
                        isExpanded 
                          ? 'border-brand-blue/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                          : 'border-border'
                      }`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.title.toLowerCase() === 'snappy pro' ? '/snappy-logo.png' : `/${project.title.toLowerCase().replace(' ', '-')}-logo.png`}
                          alt={`${project.title} logo`}
                          className={`size-full object-cover scale-[1.35] transition-all duration-300 ${isExpanded ? 'scale-[1.45]' : 'opacity-95 group-hover:opacity-100 group-hover:scale-[1.45]'}`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
                            {project.title}
                          </h3>
                          {project.title.toLowerCase() === 'deeptab' && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-medium uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/25">
                              <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
                              Building
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground/80 mt-1 max-w-[520px]">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0">
                      <span className="font-mono text-[11px] text-muted-foreground/50">
                        {project.date}
                      </span>
                      <div className="text-muted-foreground border border-border/60 p-1 rounded hover:text-foreground transition-colors bg-background">
                        {isExpanded ? (
                          <Minus className="h-3.5 w-3.5" />
                        ) : (
                          <Plus className="h-3.5 w-3.5" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Case Study Details Accordion Panel */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 pt-5 border-t border-border/30 space-y-6">
                          
                          {/* Case Study Two-Column Layout */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Left Column: Problem & Approach */}
                            <div className="space-y-4">
                              <div className="space-y-1.5">
                                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">
                                  <ShieldAlert className="w-3.5 h-3.5 text-muted-foreground/50" />
                                  The Problem
                                </span>
                                <p className="text-xs text-muted-foreground/80 leading-relaxed pl-5 border-l border-border/50">
                                  {project.problem}
                                </p>
                              </div>

                              <div className="space-y-1.5">
                                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">
                                  <Terminal className="w-3.5 h-3.5 text-muted-foreground/50" />
                                  The Approach
                                </span>
                                <p className="text-xs text-muted-foreground/80 leading-relaxed pl-5 border-l border-border/50">
                                  {project.approach}
                                </p>
                              </div>
                            </div>

                            {/* Right Column: Challenge, Outcome, and Infrastructure */}
                            <div className="space-y-4">
                              <div className="space-y-1.5">
                                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">
                                  <Cpu className="w-3.5 h-3.5 text-muted-foreground/50" />
                                  Infrastructure & Stack
                                </span>
                                <p className="text-xs text-foreground/80 font-medium leading-relaxed pl-5 border-l border-border/50">
                                  {project.infra}
                                </p>
                              </div>

                              <div className="space-y-1.5">
                                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">
                                  <Award className="w-3.5 h-3.5 text-brand-blue/70" />
                                  Outcome
                                </span>
                                <p className="text-xs text-brand-blue font-medium leading-relaxed pl-5 border-l border-brand-blue/30">
                                  {project.outcome}
                                </p>
                              </div>
                            </div>

                          </div>

                          {/* Tech Tags and Links Row */}
                          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 pt-4 border-t border-border/20">
                            <div className="flex flex-wrap gap-1.5">
                              {project.tags.map((tag) => {
                                const iconKey = getIconKey(tag)
                                return (
                                  <span
                                    key={tag}
                                    className="flex items-center gap-1.5 font-mono text-[9px] border border-border/50 rounded-md px-2 py-1 text-muted-foreground bg-muted/5 hover:border-brand-blue/30 hover:text-foreground transition-colors"
                                  >
                                    {iconKey && (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img
                                        src={`https://skillicons.dev/icons?i=${iconKey}`}
                                        alt={tag}
                                        className="w-3 h-3 object-contain"
                                        loading="lazy"
                                      />
                                    )}
                                    <span>{tag}</span>
                                  </span>
                                )
                              })}
                            </div>

                            <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-widest shrink-0">
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-2 border border-border/60 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all"
                              >
                                <FaGithub className="h-3.5 w-3.5" />
                                <span>Code</span>
                              </a>
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-2 border border-border/60 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all"
                              >
                                <FaExternalLinkAlt className="h-3 w-3" />
                                <span>Live</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Margin */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border" />
      </div>
    </section>
  )
}

export default Projects
