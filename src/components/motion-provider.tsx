'use client'

import { FC, ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'

/**
 * Respects the user's OS "reduce motion" preference for all framer-motion
 * animations. Transform/layout animations are skipped while opacity fades
 * are preserved, per framer's `reducedMotion="user"` behavior.
 */
export const MotionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

export default MotionProvider
