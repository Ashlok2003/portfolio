'use client'

import { motion } from 'framer-motion'
import { FC } from 'react'

const SKILLS_LIST =
  'js,ts,python,cpp,go,rust,react,nextjs,nodejs,express,django,spring,graphql,fastapi,postgres,mongodb,redis,mysql,elasticsearch,rabbitmq,kafka,aws,gcp,cloudflare,docker,kubernetes,terraform,git,githubactions,jenkins,ansible,nginx,prometheus,grafana,linux,bash,postman,bun'

// Curated core stack on mobile (24 = 3 rows of 8) so each icon renders larger
const SKILLS_LIST_MOBILE =
  'js,ts,python,go,react,nextjs,nodejs,graphql,postgres,mongodb,redis,kafka,aws,gcp,cloudflare,docker,kubernetes,terraform,git,githubactions,nginx,linux,bash,grafana'

const SKILLICONS_URL_MOBILE = `https://skillicons.dev/icons?i=${SKILLS_LIST_MOBILE}&perline=8`
const SKILLICONS_URL_DESKTOP = `https://skillicons.dev/icons?i=${SKILLS_LIST}&perline=19`

export const Skills: FC = () => {
  return (
    <section id="skills" className="relative w-full bg-background transition-colors">
      <div className="max-w-[880px] mx-auto grid grid-cols-1 min-[880px]:grid-cols-[40px_800px_40px] w-full">
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border" />

        <div className="relative border-x border-border min-[880px]:border-x-0 px-6 py-10">
          {/* Section Header on Border Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-background px-4 whitespace-nowrap">
            <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
              EXPERTISE
            </span>
          </div>

          {/* Skillicons strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SKILLICONS_URL_MOBILE}
              alt="Tech Stack"
              width="100%"
              className="block min-[880px]:hidden w-full h-auto"
              loading="lazy"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SKILLICONS_URL_DESKTOP}
              alt="Tech Stack"
              width="100%"
              className="hidden min-[880px]:block w-full h-auto"
              loading="lazy"
            />
          </motion.div>
        </div>

        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border" />
      </div>
    </section>
  )
}

export default Skills
