'use client'

import React, { useState } from 'react'
import { GitHubCalendar, Activity } from 'react-github-calendar'
import { useTheme } from 'next-themes'

export const GithubActivity: React.FC = () => {
  const { theme } = useTheme()
  const [total, setTotal] = useState<number | null>(null)

  // Filter contributions to only show the last 9 months to keep it compact and prevent horizontal scrolling
  const selectLastHalfYear = (contributions: Activity[]) => {
    // Calculate the accurate total count for the full year before filtering
    const currentTotal = contributions.reduce((sum: number, day: Activity) => sum + day.count, 0)
    if (total !== currentTotal) {
      setTimeout(() => setTotal(currentTotal), 0)
    }

    const today = new Date()
    const monthsAgo = new Date()
    monthsAgo.setMonth(today.getMonth() - 9)

    return contributions.filter((day: Activity) => {
      const date = new Date(day.date)
      return date >= monthsAgo
    })
  }

  return (
    <section id="github-activity" className="relative w-full bg-background transition-colors">
      <div className="max-w-[880px] mx-auto grid grid-cols-1 min-[880px]:grid-cols-[40px_800px_40px] w-full">
        {/* Left Margin */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border" />

        {/* Content Cell */}
        <div className="relative border-x border-border min-[880px]:border-x-0 px-4 py-8 md:py-10 flex flex-col items-center">
          {/* Header */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-background px-4 whitespace-nowrap">
            <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
              CONTRIBUTIONS
            </span>
          </div>

          <div className="w-full overflow-x-hidden flex justify-center">
            <div className="p-4 md:p-6 w-full flex justify-center rounded-xl border border-border bg-card/10 hover:bg-card/30 transition-colors duration-300 overflow-hidden">
              <GitHubCalendar
                username="Ashlok2003"
                colorScheme={theme === 'dark' ? 'dark' : 'light'}
                blockSize={13}
                blockMargin={5}
                fontSize={12}
                transformData={selectLastHalfYear}
                labels={{
                  totalCount: total !== null ? `${total} contributions in the last year` : 'Loading...'
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Margin */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border" />
      </div>
    </section>
  )
}

export default GithubActivity
