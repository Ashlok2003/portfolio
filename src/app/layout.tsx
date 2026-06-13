import Footer from '@/components/main/Footer'
import { Navbar } from '@/components/main/Navbar'
import { ThemeProvider } from '@/components/theme-provider'
import ScrollProgress from '@/components/ui/scroll-progress'
import { CommandPalette } from '@/components/ui/command-palette'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Ashlok Chaudhary - SDE',
  description:
    'Personal portfolio of Ashlok Chaudhary, a Software Development Engineer building scalable, reliable, production-grade systems and applications.',
  keywords: [
    'Ashlok Chaudhary',
    'Software Development Engineer',
    'Software Engineer',
    'Full Stack Developer',
    'Backend Developer',
    'Systems Developer',
    'Go developer',
    'Rust developer',
    'Next.js portfolio',
    'Software Engineer India',
  ],
  authors: [{ name: 'Ashlok Chaudhary', url: 'https://github.com/Ashlok2003' }],
  creator: 'Ashlok Chaudhary',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ashlok.dev',
    title: 'Ashlok Chaudhary — Software Development Engineer',
    description:
      'Software Development Engineer building scalable systems, robust applications, and the tooling that keeps them running.',
    siteName: 'Ashlok Chaudhary Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ashlok Chaudhary Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashlok Chaudhary — Software Development Engineer',
    description:
      'Software Development Engineer building scalable systems, robust applications, and the tooling that keeps them running.',
    creator: '@ashlok2003',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground custom-scrollbar overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          <CommandPalette />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
