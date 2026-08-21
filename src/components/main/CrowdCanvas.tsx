'use client'

import { gsap } from 'gsap'
import { FC, useEffect, useRef } from 'react'

interface CrowdCanvasProps {
  src: string
  rows?: number
  cols?: number
  className?: string
}

type Peep = {
  image: HTMLImageElement
  rect: number[]
  width: number
  height: number
  x: number
  y: number
  anchorY: number
  scaleX: number
  walk: gsap.core.Timeline | null
  setRect: (rect: number[], scale?: number) => void
  render: (ctx: CanvasRenderingContext2D) => void
}

export const CrowdCanvas: FC<CrowdCanvasProps> = ({ src, rows = 15, cols = 7, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const randomRange = (min: number, max: number) => min + Math.random() * (max - min)
    const randomIndex = (array: unknown[]) => randomRange(0, array.length) | 0
    const removeFromArray = <T,>(array: T[], i: number) => array.splice(i, 1)[0]
    const removeItemFromArray = <T,>(array: T[], item: T) =>
      removeFromArray(array, array.indexOf(item))
    const removeRandomFromArray = <T,>(array: T[]) => removeFromArray(array, randomIndex(array))
    const getRandomFromArray = <T,>(array: T[]) => array[randomIndex(array) | 0]

    const stage = { width: 0, height: 0 }

    const resetPeep = ({ peep }: { peep: Peep }) => {
      const direction = Math.random() > 0.5 ? 1 : -1
      const offsetY = 40 - 80 * gsap.parseEase('power2.in')(Math.random())
      const startY = stage.height - peep.height + offsetY
      let startX: number
      let endX: number

      if (direction === 1) {
        startX = -peep.width
        endX = stage.width
        peep.scaleX = 1
      } else {
        startX = stage.width + peep.width
        endX = 0
        peep.scaleX = -1
      }

      peep.x = startX
      peep.y = startY
      peep.anchorY = startY

      return { startX, startY, endX }
    }

    const normalWalk = ({
      peep,
      props,
    }: {
      peep: Peep
      props: { startX: number; startY: number; endX: number }
    }) => {
      const { startY, endX } = props
      const xDuration = 18
      const yDuration = 0.3

      const tl = gsap.timeline()
      tl.timeScale(randomRange(0.7, 1.1))
      tl.to(peep, { duration: xDuration, x: endX, ease: 'none' }, 0)
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: xDuration / yDuration,
          yoyo: true,
          y: startY - 6,
        },
        0,
      )

      return tl
    }

    const createPeep = ({
      image,
      rect,
      scale = 1,
    }: {
      image: HTMLImageElement
      rect: number[]
      scale?: number
    }): Peep => {
      const peep: Peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        setRect: (r: number[], scale = 1) => {
          peep.rect = r
          peep.width = r[2] * scale
          peep.height = r[3] * scale
        },
        render: (renderCtx: CanvasRenderingContext2D) => {
          renderCtx.save()
          renderCtx.translate(peep.x, peep.y)
          renderCtx.scale(peep.scaleX, 1)
          renderCtx.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            0,
            0,
            peep.width,
            peep.height,
          )
          renderCtx.restore()
        },
      }

      peep.setRect(rect, scale)
      return peep
    }

    const img = document.createElement('img')
    const allPeeps: Peep[] = []
    const availablePeeps: Peep[] = []
    const crowd: Peep[] = []

    const createPeeps = () => {
      const { naturalWidth: width, naturalHeight: height } = img
      const total = rows * cols
      const rectWidth = width / rows
      const rectHeight = height / cols
      const scale = canvas.clientHeight > 0 ? (canvas.clientHeight * 0.75) / rectHeight : 1

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [(i % rows) * rectWidth, ((i / rows) | 0) * rectHeight, rectWidth, rectHeight],
            scale,
          }),
        )
      }
    }

    const addPeepToCrowd = () => {
      const peep = removeRandomFromArray(availablePeeps)
      const walk = getRandomFromArray([normalWalk])({
        peep,
        props: resetPeep({ peep }),
      }).eventCallback('onComplete', () => {
        removePeepFromCrowd(peep)
        addPeepToCrowd()
      })

      peep.walk = walk
      crowd.push(peep)
      crowd.sort((a, b) => a.anchorY - b.anchorY)

      return peep
    }

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(crowd, peep)
      availablePeeps.push(peep)
    }

    const initCrowd = () => {
      while (availablePeeps.length) {
        addPeepToCrowd().walk?.progress(Math.random())
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(devicePixelRatio, devicePixelRatio)
      crowd.forEach((peep) => peep.render(ctx))
      ctx.restore()
    }

    const resize = () => {
      stage.width = canvas.clientWidth
      stage.height = canvas.clientHeight
      canvas.width = stage.width * devicePixelRatio
      canvas.height = stage.height * devicePixelRatio

      crowd.forEach((peep) => peep.walk?.kill())
      crowd.length = 0
      availablePeeps.length = 0
      availablePeeps.push(...allPeeps)

      initCrowd()
    }

    const init = () => {
      createPeeps()
      resize()
      if (prefersReducedMotion) {
        crowd.forEach((peep) => peep.walk?.pause())
        render()
      } else {
        gsap.ticker.add(render)
      }
    }

    img.onload = init
    img.src = src

    const handleResize = () => {
      resize()
      if (prefersReducedMotion) {
        crowd.forEach((peep) => peep.walk?.pause())
        render()
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      gsap.ticker.remove(render)
      crowd.forEach((peep) => peep.walk?.kill())
    }
  }, [src, rows, cols])

  return <canvas ref={canvasRef} className={className} />
}

export default CrowdCanvas
