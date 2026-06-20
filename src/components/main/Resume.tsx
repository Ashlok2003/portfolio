'use client'

import dynamic from 'next/dynamic'
import { FC, useEffect, useState } from 'react'
import { FaDownload } from 'react-icons/fa'
import { useLanguage } from '@/components/language-provider'

const Document = dynamic(() => import('react-pdf').then((mod) => mod.Document), { ssr: false })
const Page = dynamic(() => import('react-pdf').then((mod) => mod.Page), { ssr: false })

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import SectionWrapper from '@/components/ui/section-wrapper'

export const ResumeSection: FC = () => {
  const [error, setError] = useState<string | null>(null)
  const [containerWidth, setContainerWidth] = useState<number | null>(null)
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    // PDF worker config
    import('react-pdf').then(({ pdfjs }) => {
      pdfjs.GlobalWorkerOptions.workerSrc =
        `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
    })
  }, [])

  useEffect(() => {
    if (!containerRef) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(Math.floor(entry.contentRect.width))
      }
    })

    resizeObserver.observe(containerRef)
    return () => resizeObserver.disconnect()
  }, [containerRef])

  const onDocumentLoadError = (error: Error) => {
    setError(error.message)
  }

  return (
    <SectionWrapper id="resume" title={t.resume.title} code="0x03">
      <div className="px-6 pb-10 pt-8 flex flex-col items-center">
        {/* Interactive Document Panel */}
        <div className="w-full max-w-[800px] border border-border rounded overflow-hidden shadow-sm flex flex-col items-center">
          {/* Document display */}
          <div
            ref={setContainerRef}
            className="w-full flex justify-center bg-neutral-100 dark:bg-zinc-950/40 min-h-[300px] overflow-hidden"
          >
            {error ? (
              <div className="text-destructive font-mono text-xs p-6 self-center border border-destructive/20 bg-destructive/5 rounded my-8">
                [ERROR] Failed to render PDF document: {error}
              </div>
            ) : (
              containerWidth && (
                <Document
                  file="/resume.pdf"
                  onLoadError={onDocumentLoadError}
                  className="flex justify-center w-full"
                >
                  <Page
                    pageNumber={1}
                    className="shadow-md"
                    renderTextLayer
                    renderAnnotationLayer
                    width={Math.min(containerWidth, 800)}
                    scale={1}
                  />
                </Document>
              )
            )}
          </div>
          {/* Full-width Grid-Stylish Download Button */}
          <a
            href="/resume.pdf"
            download="Ashlok_Chaudhary_SDE.pdf"
            className="w-full border-t border-border flex items-center justify-center gap-2.5 py-4 bg-muted/5 hover:bg-brand-blue/5 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-brand-blue transition-all duration-200"
          >
            <FaDownload className="h-3.5 w-3.5" />
            <span>{t.resume.download}</span>
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default ResumeSection
