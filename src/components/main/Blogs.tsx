'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { blogsData, Blog } from '@/constants'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { FileText, ShoppingBag, MessageSquare, Share2, ArrowUpRight, Calendar, Clock } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

export const BlogsSection: FC = () => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const { t, language } = useLanguage()

  const getBlogIcon = (id: number) => {
    switch (id) {
      case 1: return <ShoppingBag className="h-4 w-4" />
      case 2: return <MessageSquare className="h-4 w-4" />
      case 3: return <Share2 className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getBlogTag = (id: number) => {
    switch (id) {
      case 1:
        return {
          en: 'GraphQL · Caching',
          hi: 'GraphQL · कैशिंग',
          ja: 'GraphQL · キャッシュ'
        }[language]
      case 2:
        return 'WebSockets · WebRTC'
      case 3:
        return {
          en: 'Encryption · S3',
          hi: 'एन्क्रिप्शन · S3',
          ja: '暗号化 · S3'
        }[language]
      default:
        return {
          en: 'Engineering',
          hi: 'इंजीनियरिंग',
          ja: 'エンジニアリング'
        }[language]
    }
  }

  const getLocalizedBlog = (blog: Blog) => {
    const keyMap: Record<number, keyof typeof t.extra.blogs> = {
      1: 'scaling',
      2: 'websockets',
      3: 'zerotrust',
    }
    const key = keyMap[blog.id]
    if (key && key in t.extra.blogs) {
      const extraBlog = t.extra.blogs[key] as { title?: string; excerpt?: string; content?: string }
      return {
        ...blog,
        title: extraBlog.title ?? blog.title,
        excerpt: extraBlog.excerpt ?? blog.excerpt,
        content: extraBlog.content ?? blog.content,
      }
    }
    return blog
  }

  const readTime = (content: string) => Math.max(1, Math.round(content.split(/\s+/).length / 200))

  const featured = getLocalizedBlog(blogsData[0])
  const rest = blogsData.slice(1).map(getLocalizedBlog)

  return (
    <section id="blogs" className="relative w-full bg-background transition-colors">
      <div className="max-w-[880px] mx-auto grid grid-cols-1 min-[880px]:grid-cols-[40px_800px_40px] w-full">
        {/* Left Margin */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border" />

        {/* Content Cell */}
        <div className="relative border-x border-border min-[880px]:border-x-0 px-6 py-12">
          {/* Section Header on Border Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-background px-4 whitespace-nowrap">
            <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
              {t.extra.blogs.title}
            </span>
          </div>

          {/* Featured / Latest Post */}
          <button
            onClick={() => setSelectedBlog(featured)}
            className="group w-full text-left border border-border/50 rounded-lg overflow-hidden hover:border-border transition-all duration-300 cursor-pointer mb-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto]">
              <div className="p-6 sm:p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-foreground/5 border border-border text-foreground">
                    {getBlogIcon(featured.id)}
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest">
                    <span className="text-brand-blue/70 font-bold">{t.extra.blogs.latest}</span>
                    <span>·</span>
                    <span>{getBlogTag(featured.id)}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground/90 group-hover:text-foreground mb-2 transition-colors">
                  {featured.title}
                </h3>
                <p className="text-[13px] text-muted-foreground/50 leading-relaxed max-w-lg">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 mt-5 pt-4 border-t border-border/30">
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground/40">
                    <Calendar className="w-3 h-3" />
                    {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground/40">
                    <Clock className="w-3 h-3" />
                    {readTime(featured.content)} {t.extra.blogs.minRead}
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex items-center justify-center px-8 border-l border-border/30">
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground/40 group-hover:text-brand-blue transition-colors">
                  <span>{t.extra.blogs.read}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </button>

          {/* Remaining Posts — 2-column compact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rest.map((blog: Blog) => (
              <button
                key={blog.id}
                onClick={() => setSelectedBlog(blog)}
                className="group w-full text-left border border-border/50 rounded-lg p-5 hover:border-border hover:bg-card/5 transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="flex items-center justify-center w-7 h-7 rounded-md bg-foreground/5 border border-border text-foreground">
                      {getBlogIcon(blog.id)}
                    </div>
                    <span className="font-mono text-[9px] text-muted-foreground/40 uppercase tracking-widest">
                      {getBlogTag(blog.id)}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold tracking-tight text-foreground/85 group-hover:text-foreground leading-snug mb-1.5 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-[12px] text-muted-foreground/45 leading-relaxed line-clamp-2">
                    {blog.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border/25">
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground/35">
                    <Calendar className="w-3 h-3" />
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground/40 group-hover:text-brand-blue transition-colors">
                    {t.extra.blogs.read}
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Margin */}
        <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border" />
      </div>

      {/* Dialog Modal — editorial article view */}
      <Dialog open={!!selectedBlog} onOpenChange={(open) => !open && setSelectedBlog(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[88vh] overflow-hidden p-0 gap-0 rounded-xl border border-border bg-background shadow-2xl font-sans">
          {selectedBlog && (
            <article className="flex flex-col max-h-[88vh]">
              {/* Article header */}
              <header className="shrink-0 px-6 sm:px-10 pt-8 sm:pt-10 pb-6 border-b border-border/50">
                {/* Category badge */}
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-foreground/5 border border-border text-foreground mb-5">
                  <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">{getBlogIcon(selectedBlog.id)}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest font-semibold">
                    {getBlogTag(selectedBlog.id)}
                  </span>
                </div>

                <DialogHeader className="space-y-0 text-left">
                  <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight text-left">
                    {selectedBlog.title}
                  </DialogTitle>
                  <DialogDescription className="mt-3 text-[14px] text-muted-foreground leading-relaxed text-left">
                    {selectedBlog.excerpt}
                  </DialogDescription>
                </DialogHeader>

                {/* Byline */}
                <div className="flex items-center gap-3 mt-6">
                  <Image
                    src="/ashlok.jpg"
                    alt={t.hero.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover border border-border shrink-0"
                  />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-foreground leading-tight">
                      {t.hero.name}
                    </span>
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground/70">
                      <span>{t.hero.title}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {selectedBlog.date}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {readTime(selectedBlog.content)} {t.extra.blogs.minRead}
                      </span>
                    </div>
                  </div>
                </div>
              </header>

              {/* Article body */}
              <div className="overflow-y-auto custom-scrollbar px-6 sm:px-10 pt-9 sm:pt-11 pb-7 sm:pb-8">
                <div className="space-y-5 text-[14px] sm:text-[15px] text-foreground/75 leading-[1.8] max-w-prose">
                  {selectedBlog.content.split('\n\n').map((para, index) => (
                    <p
                      key={index}
                      className="first-of-type:text-base first-of-type:sm:text-lg first-of-type:text-foreground/90 first-of-type:font-medium first-of-type:leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default BlogsSection
