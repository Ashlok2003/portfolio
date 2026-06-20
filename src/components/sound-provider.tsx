'use client'

import React, { createContext, useContext, useEffect, useState, useRef } from 'react'

interface SoundContextType {
  isSoundEnabled: boolean
  toggleSound: () => void
  playKeystroke: (type?: 'standard' | 'spacebar' | 'backspace' | 'enter') => void
  playSwitchClick: (isOn: boolean) => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)
  const audioCtxRef = useRef<AudioContext | null>(null)

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sound_enabled')
    if (saved !== null) {
      setIsSoundEnabled(saved === 'true')
    }
  }, [])

  // Auto-resume and unlock AudioContext on first user interaction gesture (crucial for iOS/mobile)
  useEffect(() => {
    const events = ['click', 'keydown', 'touchstart', 'touchend']
    const handleGesture = () => {
      if (typeof window === 'undefined') return

      let ctx = audioCtxRef.current
      if (!ctx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
        if (AudioContextClass) {
          ctx = new AudioContextClass()
          audioCtxRef.current = ctx
        }
      }

      // Play a silent oscillator to truly unlock audio on iOS Safari
      if (ctx) {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        gain.gain.value = 0
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.001)
      }

      const removeListeners = () => {
        events.forEach((e) => window.removeEventListener(e, handleGesture))
      }

      // resume() is async — wait for it before tearing down listeners
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().then(removeListeners).catch(() => {})
      } else if (ctx && ctx.state === 'running') {
        removeListeners()
      }
    }

    events.forEach((e) => window.addEventListener(e, handleGesture, { passive: true }))
    return () => {
      events.forEach((e) => window.removeEventListener(e, handleGesture))
    }
  }, [])

  const toggleSound = () => {
    setIsSoundEnabled((prev) => {
      const newValue = !prev
      localStorage.setItem('sound_enabled', String(newValue))
      return newValue
    })
  }

  // Initialize or resume AudioContext lazily on user gesture
  const getAudioContext = (): AudioContext | null => {
    if (typeof window === 'undefined') return null

    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass()
      }
    }

    const ctx = audioCtxRef.current
    if (ctx && ctx.state === 'suspended') {
      ctx.resume()
    }
    return ctx
  }

  const playKeystroke = (type: 'standard' | 'spacebar' | 'backspace' | 'enter' = 'standard') => {
    if (!isSoundEnabled) return
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime

    if (type === 'spacebar') {
      // Triangle wave sweep (Thock)
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(170, now)
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.035)

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.04)
    } else if (type === 'backspace') {
      // Standard fast sweep, slightly deeper
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(450, now)
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.02)

      gain.gain.setValueAtTime(0.05, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.025)
    } else if (type === 'enter') {
      // Longer click sweep
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(550, now)
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.03)

      gain.gain.setValueAtTime(0.06, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.035)
    } else {
      // Standard Key Click
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(900, now)
      osc.frequency.exponentialRampToValueAtTime(250, now + 0.012)

      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.012)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.015)
    }
  }

  const playSwitchClick = (isOn: boolean) => {
    if (!isSoundEnabled) return
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime

    // First metal spring transient (high pitch snap)
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()

    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(isOn ? 1800 : 1500, now)
    osc1.frequency.exponentialRampToValueAtTime(700, now + 0.008)

    gain1.gain.setValueAtTime(0.08, now)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.008)

    osc1.connect(gain1)
    gain1.connect(ctx.destination)

    osc1.start(now)
    osc1.stop(now + 0.01)

    // Second mechanical shell snap (resonant lower pop)
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    const t2 = now + 0.012

    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(isOn ? 380 : 280, t2)
    osc2.frequency.exponentialRampToValueAtTime(80, t2 + 0.03)

    gain2.gain.setValueAtTime(0.12, t2)
    gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.03)

    osc2.connect(gain2)
    gain2.connect(ctx.destination)

    osc2.start(t2)
    osc2.stop(t2 + 0.035)
  }

  return (
    <SoundContext.Provider
      value={{
        isSoundEnabled,
        toggleSound,
        playKeystroke,
        playSwitchClick,
      }}
    >
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const context = useContext(SoundContext)
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider')
  }
  return context
}
