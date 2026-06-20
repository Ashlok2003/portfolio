'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FC, useState } from 'react'
import Image from 'next/image'
import { experienceData, Experience } from '@/constants'
import { Plus, Minus, Briefcase } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

const getCompanyLogo = (company: string): string => {
  const c = company.toLowerCase().trim()
  if (c.includes('openleaf')) return '/openleaf_logo.png'
  if (c.includes('whatbytes')) return '/whatbytes_logo.jpeg'
  if (c.includes('talent corner')) return '/talent-corner-logo.png'
  return ''
}

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

export const Timeline: FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(0) // Expand first (current) by default
  const { t } = useLanguage()

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const getLocalizedExperience = (company: string) => {
    const key = company.toLowerCase().replace(' hr services', '').replace(' ', '')
    if (key in t.extra.experience) {
      return t.extra.experience[key as keyof typeof t.extra.experience]
    }
    return null
  }

  return (
    <SectionWrapper id="experience" title={t.experience.title} code="0x04">
      <div className="px-6 pb-10 pt-8">
        <div className="space-y-0 border-b border-border">
          {experienceData.map((exp: Experience, idx: number) => {
            const isExpanded = expandedId === exp.id
            const localized = getLocalizedExperience(exp.company)
            const roleText = localized?.role ?? exp.role
            const locationText = localized?.location ?? exp.location
            const dateText = localized?.date ?? exp.date
            const descriptionText = localized?.description ?? exp.description
            const achievementsList = localized?.achievements ?? exp.achievements

            return (
              <div
                key={exp.id}
                className={`hover:bg-muted/10 transition-colors duration-200 ${idx === 0 ? '' : 'border-t border-border'}`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleExpand(exp.id)}
                  className="w-full text-left py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    {(() => {
                      const companyLogo = getCompanyLogo(exp.company)
                      return (
                        <div className="size-10 border border-border rounded-md bg-white flex items-center justify-center shrink-0 mt-0.5 overflow-hidden">
                          {companyLogo ? (
                            <Image
                              src={companyLogo}
                              alt={exp.company}
                              width={40}
                              height={40}
                              className="size-full object-contain p-1"
                            />
                          ) : (
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      )
                    })()}
                    <div>
                      <h3 className="text-base font-semibold tracking-tight text-foreground">
                        {roleText}
                      </h3>
                      <p className="text-xs font-mono text-muted-foreground mt-0.5">
                        {exp.company} • {locationText}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0">
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {dateText}
                    </span>
                    <div className="text-muted-foreground border border-border p-1 rounded hover:text-foreground transition-colors">
                      {isExpanded ? (
                        <Minus className="h-3 w-3" />
                      ) : (
                        <Plus className="h-3 w-3" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Accordion Expandable Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-0 sm:pl-14 pr-2 space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {descriptionText}
                        </p>

                        {/* Achievements Bullets */}
                        <ul className="space-y-2.5">
                          {achievementsList.map((bullet, idx) => (
                            <li key={idx} className="text-xs text-foreground/85 flex items-start gap-2.5 leading-relaxed">
                              <span className="text-brand-blue font-mono mt-0.5">&gt;</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {exp.tags.map((tag) => {
                            const iconKey = getIconKey(tag)
                            return (
                              <span
                                key={tag}
                                className="flex items-center gap-1.5 font-mono text-[10px] border border-border rounded px-2 py-0.5 text-muted-foreground hover:border-brand-blue/30 hover:text-foreground transition-colors bg-muted/5"
                              >
                                {iconKey && (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={`https://skillicons.dev/icons?i=${iconKey}`}
                                    alt={tag}
                                    className="w-3.5 h-3.5 object-contain"
                                    loading="lazy"
                                  />
                                )}
                                <span>{tag}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Timeline
