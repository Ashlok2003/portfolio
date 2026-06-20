import React from 'react'

interface SectionWrapperProps {
  id: string
  title?: string
  code?: string
  children: React.ReactNode
  className?: string
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  title,
  code,
  children,
  className = '',
}) => {
  return (
    <section id={id} className={`relative w-full bg-background transition-colors ${className}`}>
      <div className="max-w-[880px] mx-auto grid grid-cols-1 min-[880px]:grid-cols-[40px_800px_40px] w-full relative">

        {/* Left Margin Grid */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border relative h-full min-h-[inherit] select-none">
          {/* Vertical center indicator line */}
          <div className="absolute inset-y-0 left-1/2 w-px bg-border/40 -translate-x-1/2" />

          {/* Top intersection indicator */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] text-muted-foreground/35 font-semibold">
            {code ? `+${code}` : '+'}
          </div>

          {/* Bottom intersection indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9px] text-muted-foreground/35 font-semibold">
            {code ? `-${code}` : '-'}
          </div>
        </div>

        {/* Center Content Area */}
        <div className="relative border-x border-border min-[880px]:border-x-0">
          {title && (
            <div className="px-6 py-0 relative before:absolute before:bottom-0 before:left-[-100vw] before:right-[-100vw] before:h-px before:bg-border">
              <h2 className="text-3xl font-bold tracking-tight text-foreground font-sans">
                {title}
              </h2>
            </div>
          )}
          {children}
        </div>

        {/* Right Margin Grid */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border relative h-full min-h-[inherit] select-none">
          {/* Vertical center indicator line */}
          <div className="absolute inset-y-0 left-1/2 w-px bg-border/40 -translate-x-1/2" />

          {/* Top intersection indicator */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] text-muted-foreground/35 font-semibold">
            {code ? `+${code}` : '+'}
          </div>

          {/* Bottom intersection indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9px] text-muted-foreground/35 font-semibold">
            {code ? `-${code}` : '-'}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionWrapper
