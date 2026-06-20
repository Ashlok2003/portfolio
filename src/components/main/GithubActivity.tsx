'use client'

import React, { useState } from 'react'
import { GitHubCalendar, Activity } from 'react-github-calendar'
import { useTheme } from 'next-themes'
import { useLanguage } from '@/components/language-provider'

import SectionWrapper from '@/components/ui/section-wrapper'

export const GithubActivity: React.FC = () => {
  const { theme } = useTheme()
  const [total, setTotal] = useState<number | null>(null)
  const { t } = useLanguage()

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
    <SectionWrapper id="github-activity" title={t.contributions.title} code="0x02">
      <div className="px-6 pb-10 pt-8 flex flex-col items-center">
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
                totalCount: total !== null ? `${total} ${t.contributions.totalCount}` : t.contributions.loading
              }}
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default GithubActivity
