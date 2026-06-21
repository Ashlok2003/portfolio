'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FC, useState } from 'react'
import { projectsData, Project } from '@/constants'
import { FaGithub } from 'react-icons/fa'
import { Plus, Minus, Terminal, ShieldAlert, Cpu, Award, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

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

import SectionWrapper from '@/components/ui/section-wrapper'

export const Projects: FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const { t } = useLanguage()

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const getLocalizedDescription = (title: string, defaultDesc: string) => {
    const key = title.toLowerCase().replace(' pro', '').replace(' ', '')
    if (key in t.projects.taglines) {
      return t.projects.taglines[key as keyof typeof t.projects.taglines]
    }
    return defaultDesc
  }

  const getLocalizedProjectDetails = (title: string) => {
    const key = title.toLowerCase().replace(' pro', '').replace(' ', '')
    if (key in t.extra.projects) {
      return t.extra.projects[key as keyof typeof t.extra.projects]
    }
    return null
  }

  // Only display the 4 high-quality engineering projects (remove simple ones)
  const premiumProjects = projectsData.filter(p =>
    ['deeptab', 'snappy pro', 'shopxindia', 'socialpedia'].includes(p.title.toLowerCase())
  )

  return (
    <SectionWrapper id="projects" title={t.projects.title} code="0x05">
      <div className="px-6 pb-12 pt-8">
        <div className="space-y-0 border-b border-border">
          {premiumProjects.map((project: Project, idx: number) => {
            const isExpanded = expandedIndex === idx
            const localizedDetails = getLocalizedProjectDetails(project.title)
            const problemText = localizedDetails?.problem ?? project.problem
            const approachText = localizedDetails?.approach ?? project.approach
            const outcomeText = localizedDetails?.outcome ?? project.outcome

            return (
              <div
                key={project.title}
                className={`hover:bg-muted/10 transition-colors duration-200 ${idx === 0 ? '' : 'border-t border-border'}`}
              >
                {/* Trigger Header */}
                <button
                  onClick={() => toggleExpand(idx)}
                  className="w-full text-left py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className={`size-10 border rounded-lg shrink-0 mt-0.5 overflow-hidden transition-all duration-300 flex items-center justify-center ${isExpanded
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
                        {getLocalizedDescription(project.title, project.description)}
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
                      <div className="pb-8 pl-0 sm:pl-14 pr-2 space-y-6">

                        {/* Case Study Two-Column Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                          {/* Left Column: Problem & Approach */}
                          <div className="space-y-4">
                            <div className="space-y-1.5">
                              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">
                                <ShieldAlert className="w-3.5 h-3.5 text-muted-foreground/50" />
                                {t.extra.projects.labels.problem}
                              </span>
                              <p className="text-xs text-muted-foreground/80 leading-relaxed pl-5 border-l border-border/50">
                                {problemText}
                              </p>
                            </div>

                            <div className="space-y-1.5">
                              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">
                                <Terminal className="w-3.5 h-3.5 text-muted-foreground/50" />
                                {t.extra.projects.labels.approach}
                              </span>
                              <p className="text-xs text-muted-foreground/80 leading-relaxed pl-5 border-l border-border/50">
                                {approachText}
                              </p>
                            </div>
                          </div>

                          {/* Right Column: Challenge, Outcome, and Infrastructure */}
                          <div className="space-y-4">
                            <div className="space-y-1.5">
                              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">
                                <Cpu className="w-3.5 h-3.5 text-muted-foreground/50" />
                                {t.extra.projects.labels.infra}
                              </span>
                              <p className="text-xs text-foreground/80 font-medium leading-relaxed pl-5 border-l border-border/50">
                                {project.infra}
                              </p>
                            </div>

                            <div className="space-y-1.5">
                              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">
                                <Award className="w-3.5 h-3.5 text-brand-blue/70" />
                                {t.extra.projects.labels.outcome}
                              </span>
                              <p className="text-xs text-brand-blue font-medium leading-relaxed pl-5 border-l border-brand-blue/30">
                                {outcomeText}
                              </p>
                            </div>
                          </div>

                        </div>

                        {/* Tech Tags and Links Row */}
                        <div className="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center sm:justify-between gap-4 pt-4 border-t border-border/20">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => {
                              const iconKey = getIconKey(tag)
                              return (
                                <span
                                  key={tag}
                                  className="group/tag flex items-center gap-1.5 font-mono text-[9px] border border-border/40 rounded-full px-2.5 py-1 text-muted-foreground bg-background/60 backdrop-blur-sm shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:border-brand-blue/40 hover:text-foreground hover:bg-brand-blue/[0.04] hover:shadow-[0_0_12px_rgba(59,130,246,0.08)] transition-all duration-300 cursor-default"
                                >
                                  {iconKey && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                      src={`https://skillicons.dev/icons?i=${iconKey}`}
                                      alt={tag}
                                      className="w-3 h-3 object-contain group-hover/tag:scale-110 transition-transform duration-300"
                                      loading="lazy"
                                    />
                                  )}
                                  <span>{tag}</span>
                                </span>
                              )
                            })}
                          </div>

                          {/* Blueprint-style structural link cells — sharp, hairline-bordered, flat */}
                          <div className="flex w-full sm:w-auto shrink-0 border border-border divide-x divide-border font-mono text-[10px] uppercase tracking-widest font-bold">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn flex flex-1 sm:flex-initial items-center justify-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors duration-200"
                            >
                              <FaGithub className="h-3 w-3" />
                              <span>{t.extra.projects.labels.code}</span>
                            </a>
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn flex flex-1 sm:flex-initial items-center justify-center gap-2 px-4 py-2 text-brand-blue hover:bg-brand-blue/[0.07] transition-colors duration-200"
                            >
                              <span>{t.extra.projects.labels.live}</span>
                              <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
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
    </SectionWrapper>
  )
}

export default Projects
