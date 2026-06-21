'use client'

import React, { useState } from 'react'
import { GitHubCalendar, Activity } from 'react-github-calendar'
import type { ThemeInput } from 'react-activity-calendar'
import { useTheme } from 'next-themes'
import { useLanguage } from '@/components/language-provider'

import SectionWrapper from '@/components/ui/section-wrapper'

// GitHub-green contribution ramp (5 levels: empty -> densest).
const RAMP: ThemeInput = {
  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
}

export const GithubActivity: React.FC = () => {
  const { theme } = useTheme()
  const [total, setTotal] = useState<number | null>(null)
  const { t } = useLanguage()
  const scheme = theme === 'dark' ? 'dark' : 'light'
  const swatches = (scheme === 'dark' ? RAMP.dark : RAMP.light) ?? RAMP.light!

  // Show the full year. Just capture the accurate total; pass data through
  // unchanged so all 12 months render.
  const captureTotal = (contributions: Activity[]) => {
    const currentTotal = contributions.reduce((sum: number, day: Activity) => sum + day.count, 0)
    if (total !== currentTotal) {
      setTimeout(() => setTotal(currentTotal), 0)
    }
    return contributions
  }

  return (
    <SectionWrapper id="github-activity" title={t.contributions.title} code="0x02">
      <div className="px-6 pb-10 pt-8">
        <div className="w-full">
          {/* Grid: natural-size + hidden-scrollbar scroll on mobile; scales to fit on desktop */}
          <div className="w-full overflow-x-auto scrollbar-hide">
            <GitHubCalendar
              username="Ashlok2003"
              colorScheme={scheme}
              theme={RAMP}
              blockSize={12}
              blockMargin={4}
              blockRadius={0}
              fontSize={13}
              transformData={captureTotal}
              showColorLegend={false}
              showTotalCount={false}
              className="min-[880px]:w-full min-[880px]:[&_svg]:!h-auto min-[880px]:[&_svg]:!w-full min-[880px]:[&_svg]:!max-w-none"
              style={{ color: 'var(--muted-foreground)' }}
              tooltips={{
                activity: {
                  withArrow: true,
                  text: (activity) =>
                    `${activity.count === 0 ? 'No' : activity.count} ${
                      activity.count === 1 ? 'contribution' : 'contributions'
                    } · ${new Date(activity.date).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}`,
                },
              }}
            />
          </div>

          {/* Footer: total count (left) + Less -> More legend (right) */}
          <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:flex-nowrap sm:items-center sm:justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold tabular-nums truncate">
              {total !== null ? (
                `${total.toLocaleString()} ${t.contributions.totalCount}`
              ) : (
                <span className="animate-pulse">{t.contributions.loading}</span>
              )}
            </span>
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">
                Less
              </span>
              <div className="flex items-center gap-1">
                {swatches.map((color, i) => (
                  <span
                    key={i}
                    className="h-[11px] w-[11px] border border-border/40"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">
                More
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default GithubActivity
