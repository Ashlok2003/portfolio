'use client'

import { motion } from 'framer-motion'
import { FC } from 'react'

const SKILLICONS_URL =
  'https://skillicons.dev/icons?i=js,ts,python,cpp,go,rust,react,nextjs,nodejs,express,django,spring,graphql,fastapi,postgres,mongodb,redis,mysql,elasticsearch,rabbitmq,kafka,aws,gcp,cloudflare,docker,kubernetes,terraform,git,githubactions,jenkins,ansible,nginx,prometheus,grafana,linux,bash,postman,bun&perline=19'

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
              src={SKILLICONS_URL}
              alt="Tech Stack"
              width="100%"
              className="w-full h-auto"
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
