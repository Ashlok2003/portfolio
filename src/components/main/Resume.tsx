'use client'

import dynamic from 'next/dynamic'
import { FC, useEffect, useState } from 'react'
import { FaDownload } from 'react-icons/fa'

const Document = dynamic(() => import('react-pdf').then((mod) => mod.Document), { ssr: false })
const Page = dynamic(() => import('react-pdf').then((mod) => mod.Page), { ssr: false })

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

export const ResumeSection: FC = () => {
  const [error, setError] = useState<string | null>(null)
  const [windowWidth, setWindowWidth] = useState<number>(800)

  useEffect(() => {
    // PDF worker config
    import('react-pdf').then(({ pdfjs }) => {
      pdfjs.GlobalWorkerOptions.workerSrc =
        `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
    })

    // Responsive width helper
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const onDocumentLoadError = (error: Error) => {
    setError(error.message)
  }

  // Calculate PDF page width based on viewport
  const getPdfWidth = () => {
    if (windowWidth >= 880) {
      return 800
    }
    return windowWidth - 48
  }

  return (
    <section id="resume" className="relative w-full bg-background transition-colors">
      <div className="max-w-[880px] mx-auto grid grid-cols-1 min-[880px]:grid-cols-[40px_800px_40px] w-full">
        {/* Left Margin */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border" />

        {/* Content Cell */}
        <div className="relative border-x border-border min-[880px]:border-x-0 px-6 py-10 flex flex-col items-center">
          {/* Section Header on Border Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-background px-4 whitespace-nowrap">
            <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
              CURRICULUM VITAE
            </span>
          </div>

          {/* Interactive Document Panel - Edge to Edge */}
          <div className="w-full min-[880px]:w-[800px] min-[880px]:-mx-6 border border-border min-[880px]:border-x-0 rounded min-[880px]:rounded-none overflow-hidden shadow-sm flex flex-col items-center">
            {/* Document display */}
            <div className="w-full flex justify-center overflow-x-auto bg-neutral-100 dark:bg-zinc-950/40 min-h-[300px]">
              {error ? (
                <div className="text-destructive font-mono text-xs p-6 self-center border border-destructive/20 bg-destructive/5 rounded my-8">
                  [ERROR] Failed to render PDF document: {error}
                </div>
              ) : (
                <Document
                  file="/resume.pdf"
                  onLoadError={onDocumentLoadError}
                  className="flex justify-center w-full"
                >
                  <Page
                    pageNumber={1}
                    className="flex justify-center w-full shadow-md"
                    renderTextLayer
                    renderAnnotationLayer
                    width={getPdfWidth()}
                    scale={1}
                  />
                </Document>
              )}
            </div>
            {/* Full-width Grid-Stylish Download Button */}
            <a
              href="/resume.pdf"
              download="Ashlok_Chaudhary_SDE.pdf"
              className="w-full border-t border-border flex items-center justify-center gap-2.5 py-4 bg-muted/5 hover:bg-brand-blue/5 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-brand-blue transition-all duration-200"
            >
              <FaDownload className="h-3.5 w-3.5" />
              <span>Download CV File</span>
            </a>
          </div>
        </div>

        {/* Right Margin */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border" />
      </div>
    </section>
  )
}

export default ResumeSection
