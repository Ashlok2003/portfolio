import { BlogsSection } from '@/components/main/Blogs'
import ContactUs from '@/components/main/ContactUs'
import Hero from '@/components/main/Hero'
import Projects from '@/components/main/Projects'
import ResumeSection from '@/components/main/Resume'
import Skills from '@/components/main/Skills'
import Timeline from '@/components/main/Timeline'
import GithubActivity from '@/components/main/GithubActivity'
import { Toaster } from 'react-hot-toast'
import SectionDivider from '@/components/main/SectionDivider'

export default function Home() {
  return (
    <main className="w-full pt-14 bg-background">
      <Hero />
      <SectionDivider code="0x01" />
      <Skills />
      <SectionDivider code="0x02" />
      <GithubActivity />
      <SectionDivider code="0x03" />
      <ResumeSection />
      <SectionDivider code="0x04" />
      <Timeline />
      <SectionDivider code="0x05" />
      <Projects />
      <SectionDivider code="0x06" />
      <BlogsSection />
      <SectionDivider code="0x07" />
      <ContactUs />
      <SectionDivider code="0x08" />
      <Toaster position="bottom-right" />
    </main>
  )
}
