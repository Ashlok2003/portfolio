import React from 'react'

interface SectionDividerProps {
  code?: string
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ code }) => {
  return (
    <div className="w-full border-y border-border bg-diagonal-stripes h-8 relative select-none overflow-hidden">
      {/* Horizontal center guide line */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-border/40 -translate-y-1/2" />

      <div className="max-w-[880px] mx-auto grid grid-cols-1 min-[880px]:grid-cols-[40px_800px_40px] w-full h-full relative">
        {/* Left Side Margin */}
        <div className="hidden min-[880px]:block border-x border-border h-full relative">
          <div className="absolute inset-y-0 left-1/2 w-px bg-border/40 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] text-muted-foreground/35 font-semibold z-10">
            {code ? `+${code}` : '+'}
          </div>
        </div>

        {/* Center content column */}
        <div className="relative border-x border-border min-[880px]:border-x-0 h-full" />

        {/* Right Side Margin */}
        <div className="hidden min-[880px]:block border-x border-border h-full relative">
          <div className="absolute inset-y-0 left-1/2 w-px bg-border/40 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] text-muted-foreground/35 font-semibold z-10">
            {code ? `+${code}` : '+'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionDivider
