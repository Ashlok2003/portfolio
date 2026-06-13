import { BlogsSection } from '@/components/main/Blogs'
import ContactUs from '@/components/main/ContactUs'
import Hero from '@/components/main/Hero'
import Projects from '@/components/main/Projects'
import ResumeSection from '@/components/main/Resume'
import Skills from '@/components/main/Skills'
import Timeline from '@/components/main/Timeline'
import GithubActivity from '@/components/main/GithubActivity'
import { Toaster } from 'react-hot-toast'

const SectionDivider = () => (
  <div className="w-full border-b border-border bg-muted/5 h-4">
    <div className="max-w-[880px] mx-auto grid grid-cols-1 min-[880px]:grid-cols-[40px_800px_40px] w-full h-full">
      <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border h-full" />
      <div className="border-x border-border min-[880px]:border-x-0 h-full" />
      <div className="hidden min-[880px]:block bg-diagonal-stripes border-x border-border h-full" />
    </div>
  </div>
)

export default function Home() {
  return (
    <main className="w-full pt-14 bg-background">
      <Hero />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <GithubActivity />
      <SectionDivider />
      <ResumeSection />
      <SectionDivider />
      <Timeline />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <BlogsSection />
      <SectionDivider />
      <ContactUs />
      <SectionDivider />
      <Toaster position="bottom-right" />
    </main>
  )
}
