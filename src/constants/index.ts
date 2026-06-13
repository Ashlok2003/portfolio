export interface Skill {
  skill_name: string
  Image: string
  width: number
  height: number
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'other'
}

export const skills: Skill[] = [
  // Frontend
  { skill_name: 'HTML5', Image: '/html.png', width: 80, height: 80, category: 'frontend' },
  { skill_name: 'CSS', Image: '/css.png', width: 80, height: 80, category: 'frontend' },
  { skill_name: 'JavaScript', Image: '/js.png', width: 65, height: 65, category: 'frontend' },
  { skill_name: 'TypeScript', Image: '/ts.png', width: 80, height: 80, category: 'frontend' },
  { skill_name: 'React', Image: '/react.png', width: 80, height: 80, category: 'frontend' },
  { skill_name: 'Next.js', Image: '/next.png', width: 80, height: 80, category: 'frontend' },
  { skill_name: 'Redux', Image: '/redux.png', width: 80, height: 80, category: 'frontend' },
  { skill_name: 'Tailwind CSS', Image: '/tailwind.png', width: 80, height: 80, category: 'frontend' },

  // Backend
  { skill_name: 'Node.js', Image: '/node-js.png', width: 80, height: 80, category: 'backend' },
  { skill_name: 'Express.js', Image: '/express.png', width: 80, height: 80, category: 'backend' },
  { skill_name: 'Spring Boot', Image: '/spring-boot.png', width: 55, height: 55, category: 'backend' },
  { skill_name: 'Rust', Image: '/rust.png', width: 70, height: 70, category: 'backend' },
  { skill_name: 'Go', Image: '/go.png', width: 60, height: 60, category: 'backend' },

  // Database
  { skill_name: 'PostgreSQL', Image: '/postger.png', width: 70, height: 70, category: 'database' },
  { skill_name: 'MySQL', Image: '/mysql.png', width: 70, height: 70, category: 'database' },
  { skill_name: 'Prisma', Image: '/prisma.webp', width: 70, height: 70, category: 'database' },
  { skill_name: 'GraphQL', Image: '/graphql.png', width: 80, height: 80, category: 'database' },

  // DevOps / Cloud
  { skill_name: 'Terraform', Image: '/terraform.png', width: 80, height: 80, category: 'devops' },
  { skill_name: 'Docker', Image: '/docker.webp', width: 70, height: 70, category: 'devops' },
  { skill_name: 'Kubernetes', Image: '/kubernetes.png', width: 50, height: 50, category: 'devops' },
  { skill_name: 'AWS', Image: '/aws.png', width: 70, height: 70, category: 'devops' },
  { skill_name: 'CloudFlare', Image: '/cloudflare.png', width: 80, height: 80, category: 'devops' },
]

export interface SocialLink {
  name: string
  href: string
  label: string
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/Ashlok2003',
    label: 'GitHub',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ashlok2003/',
    label: 'LinkedIn',
  },
  {
    name: 'Twitter',
    href: 'https://x.com/ashlok2003',
    label: 'Twitter',
  },
]

export interface Experience {
  id: number
  role: string
  company: string
  location: string
  date: string
  description: string
  achievements: string[]
  tags: string[]
}

export const experienceData: Experience[] = [
  {
    id: 0,
    role: 'Backend Developer Intern',
    company: 'OpenLeaf',
    location: 'Onsite - Mumbai, Maharashtra',
    date: 'Mar 2026 - Present',
    description:
      'Building high-performance backend services for a B2B/B2C logistics management platform that delivers end-to-end purchase order automation and supply chain orchestration across enterprise retail channels.',
    achievements: [
      'Developed distributed PO automation pipelines in Go handling multi-channel order ingestion from platforms like Blinkit, Swiggy Instamart, and Zepto.',
      'Engineered PostgreSQL-backed inventory sync services with Redis caching to handle real-time warehouse stock updates at low latency.',
      'Built RESTful and event-driven Node.js microservices for B2B appointment scheduling, NDR tracking, and carrier webhook processing.',
      'Implemented role-based access control (Admin, Warehouse, Seller) with JWT auth middleware across the multi-tenant dashboard API.',
      'Optimized SQL query plans on large order tables (10M+ rows), reducing reporting query time by over 60% via composite indexing and materialized views.',
    ],
    tags: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'REST APIs', 'Microservices', 'B2B Logistics'],
  },
  {
    id: 1,
    role: 'Backend Developer Intern',
    company: 'WhatBytes',
    location: 'Remote',
    date: 'Sep 2025 - Mar 2026',
    description: 'Designed and implemented scalable backend systems, LLM integrations, and automated analytics pipelines.',
    achievements: [
      'Engineered a comprehensive ad analytics flow and LinkedIn ads scraper, enabling automated data extraction and deep performance insights.',
      'Built robust media processing pipelines integrated with OpenAI Whisper for automated audio/video transcription and analysis.',
      'Integrated LLMs and OpenSearch to power advanced semantic search and AI-driven data processing capabilities.',
      'Architected and deployed end-to-end CI/CD pipelines to automate testing and deployments, ensuring high reliability.',
    ],
    tags: ['Django', 'Python', 'LLMs', 'OpenSearch', 'OpenAI Whisper', 'CI/CD', 'Web Scraping'],
  },
  {
    id: 2,
    role: 'Full Stack Developer Intern',
    company: 'Talent Corner HR Services',
    location: 'Onsite - Mumbai, Maharashtra',
    date: 'Apr 2025 - Jul 2025',
    description: 'Engineered high-performance lead management and data scraping pipelines.',
    achievements: [
      'Engineered a scalable lead management and verification platform using Node.js and MySQL, streamlining data enrichment pipelines.',
      'Developed intuitive, reusable dashboard modules in React, delivering real-time business metrics and actionable analytics.',
      'Implemented a clean, modular architecture using controller-service-repository patterns to ensure high maintainability.',
      'Set up CI/CD pipelines to automate the build, test, and deployment processes, accelerating feature delivery.',
    ],
    tags: ['Node.js', 'MySQL', 'React', 'Data Scraping', 'Clean Architecture', 'CI/CD'],
  },
]

export interface Project {
  title: string
  description: string
  date: string
  problem: string
  approach: string
  infra: string
  challenge: string
  outcome: string
  github: string
  live: string
  tags: string[]
}

export const projectsData: Project[] = [
  {
    title: 'Deeptab',
    description: 'Context-aware, low-latency AI tab completion engine for VS Code streaming code suggestions.',
    date: '01.2026',
    problem: 'Commercial tools are closed-source and lock users into specific models, pricing, and context collection pipelines.',
    approach: 'Designed a provider-agnostic completion loop with SSE streaming, local state replay, and continuation prediction.',
    infra: 'TypeScript · VS Code Extension API · SSE Streaming · OpenRouter / Groq / Fireworks APIs',
    challenge: 'Achieving sub-200ms keystroke-to-response latency while managing asynchronous cancellation states in the editor.',
    outcome: 'Built a lightweight, extensible extension supporting pluggable models, keys, and local config reactive states.',
    github: 'https://github.com/Ashlok2003/deeptab',
    live: 'https://github.com/Ashlok2003/deeptab',
    tags: ['TypeScript', 'VS Code API', 'SSE', 'LLMs', 'OpenRouter'],
  },
  {
    title: 'Snappy Pro',
    description: 'High-fidelity developer-grade Chrome Extension for screen capture, recording, and interactive canvas annotations.',
    date: '02.2026',
    problem: 'Standard browser capture tools lack developer utilities like annotation overlays, filters, and light/color curve adjustments.',
    approach: 'Leveraged Chrome Extension messaging architecture and HTML5 Canvas API for real-time rendering and recording.',
    infra: 'JavaScript · Chrome Extension APIs · Canvas API · WebRTC (Tab Capture)',
    challenge: 'Maintaining high capture frame rates and synchronization while applying interactive filters and animations.',
    outcome: 'Delivered an intuitive extension with full-page screenshot capture, annotations, real-time filters, and image exports.',
    github: 'https://github.com/Ashlok2003/Snappy',
    live: 'https://github.com/Ashlok2003/Snappy',
    tags: ['JavaScript', 'Chrome Extension API', 'Canvas API', 'WebRTC'],
  },
  {
    title: 'ShopXIndia',
    description: 'A microservices-based e-commerce platform built on AWS Fargate with full container observability.',
    date: '02.2024',
    problem: 'Monolithic commerce systems couple deployment boundaries and complicate backend scaling.',
    approach: 'Designed domain-bounded microservices unified behind a federated GraphQL gateway.',
    infra: 'AWS ECS Fargate · RDS · ElastiCache · CloudFront · Cognito · S3 · CodePipeline',
    challenge: 'Resolving service discovery and securing token propagation across the federated service mesh.',
    outcome: 'Decoupled services into isolated, auto-scaling deploy units sharing a single typed API schema.',
    github: 'https://github.com/Ashlok2003/ShopxIndia',
    live: 'https://github.com/Ashlok2003/ShopxIndia',
    tags: ['Go', 'GraphQL', 'AWS ECS', 'Fargate', 'Docker', 'PostgreSQL'],
  },
  {
    title: 'SocialPedia',
    description: 'MERN stack social connection platform incorporating real-time messaging and media calls.',
    date: '04.2025',
    problem: 'Syncing live user presence status and chat history with low frontend layout jitter.',
    approach: 'Integrated WebSockets for persistent user messaging and WebRTC for direct audio/video streams.',
    infra: 'React · Node.js · Express · MongoDB · Socket.io · WebRTC · Redux Toolkit',
    challenge: 'Handling websocket connection drops gracefully and managing signaling servers.',
    outcome: 'Supports concurrent message broadcasts under 80ms latency and high-fidelity media connection.',
    github: 'https://github.com/Ashlok2003/Socialpedia',
    live: 'https://socialpedia-tau.vercel.app/',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'WebRTC', 'Redux'],
  },
  {
    title: 'FileShareX',
    description: 'Direct secure file sharing app providing instant download codes and QR generators.',
    date: '03.2025',
    problem: 'Sharing large files securely without forcing users to register or pay storage fees.',
    approach: 'Created automatic expiring uploads mapped to one-time token access codes.',
    infra: 'React · Node.js · MongoDB · Express · Nodemailer (SMTP) · QR-code API',
    challenge: 'Preventing disk space exhaustion on local servers while handling concurrent uploads.',
    outcome: 'Fully automated cleanups of expired files with direct file encryption.',
    github: 'https://github.com/Ashlok2003/File-Sharer',
    live: 'https://file-sharer-sepia.vercel.app/',
    tags: ['React', 'Node.js', 'MongoDB', 'SMTP', 'File APIs'],
  },
  {
    title: 'Scheduly.AI',
    description: 'Conversational scheduler client using AI agents to manage calendars.',
    date: '12.2024',
    problem: 'Traditional booking forms require multi-step calendars, leading to high abandonment rates.',
    approach: 'Leveraged natural language processing to extract availability choices and confirm bookings.',
    infra: 'React · Node.js · OpenRouter API · Google Calendar API · TailwindCSS',
    challenge: 'Converting ambiguous text (e.g. "next Monday afternoon") into accurate ISO dates.',
    outcome: 'Booking completes inside a single conversational window synced instantly to Google Calendar.',
    github: 'https://github.com/Ashlok2003/Scheduly.AI',
    live: 'https://scheduly-ai-client.onrender.com/',
    tags: ['React', 'Node.js', 'OpenAI API', 'Google Calendar API'],
  },
]

export interface Blog {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
}

export const blogsData: Blog[] = [
  {
    id: 1,
    title: 'Scaling E-Commerce to 10K RPS with GraphQL Federation',
    excerpt: 'How I decomposed a monolithic storefront into federated subgraphs, implemented distributed caching, and achieved sub-100ms P99 latency at scale.',
    date: '10.2025',
    content: `When ShopXIndia outgrew its monolithic REST API, I led the migration to a federated GraphQL architecture using Apollo Federation v2. The system was decomposed into five domain-aligned subgraphs — catalog, inventory, orders, users, and payments — each independently deployable and owned by separate teams.\n\nThe critical challenge was query performance. A single storefront page could resolve data across three subgraphs. I implemented a multi-tier caching strategy: Redis for entity-level caching with 30s TTL, DataLoader for request-scoped batching to eliminate N+1 queries, and Cloudflare edge caching for anonymous catalog requests.\n\nAuthentication was handled via a custom gateway plugin that validates JWTs at the router level and propagates user context to subgraphs through headers, avoiding redundant token verification. For observability, I instrumented every resolver with OpenTelemetry spans, feeding into Grafana dashboards that track per-subgraph latency, error rates, and cache hit ratios.\n\nThe result: P99 latency dropped from 1.2s to 87ms, the system comfortably handles 10K requests per second during flash sales, and deployment frequency increased from weekly to multiple times per day per service.`,
  },
  {
    id: 2,
    title: 'Building Real-Time Infrastructure: WebSockets at Scale',
    excerpt: 'Architecture decisions behind a real-time messaging system supporting 50K concurrent connections with presence, typing indicators, and WebRTC signaling.',
    date: '04.2025',
    content: `SocialPedia required real-time capabilities that went far beyond basic chat — presence tracking, typing indicators, read receipts, live notifications, and peer-to-peer video calling via WebRTC signaling.\n\nI architected the real-time layer using a horizontally scaled WebSocket cluster backed by Redis Pub/Sub for cross-instance message fanout. Each Socket.IO server instance maintains local connection state, while Redis handles room-level broadcasting. This allows us to add WebSocket nodes behind a load balancer without sticky sessions — connections are stateless at the infrastructure level.\n\nFor presence, I implemented a heartbeat-based system where clients send a ping every 15 seconds. Absence of two consecutive pings triggers an offline event propagated to all friends via Redis. Typing indicators use a debounced emit pattern — the client sends a "typing" event, and the server auto-expires it after 3 seconds if no follow-up arrives.\n\nWebRTC signaling was the most complex piece. I built a custom signaling server that handles offer/answer exchange and ICE candidate trickling through the existing WebSocket channel, eliminating the need for a separate signaling infrastructure. TURN server fallback is configured for users behind symmetric NATs.\n\nAt peak, the system sustains 50K concurrent WebSocket connections across 4 nodes with a median message delivery latency of 12ms.`,
  },
  {
    id: 3,
    title: 'Zero-Trust File Sharing: End-to-End Encryption in the Browser',
    excerpt: 'Implementing client-side AES-256-GCM encryption, pre-signed S3 URLs, and ephemeral access links for a file sharing platform with zero server-side trust.',
    date: '03.2025',
    content: `FileShareX was designed around a zero-trust principle: the server should never have access to plaintext file contents. Every file is encrypted client-side using the Web Crypto API with AES-256-GCM before upload.\n\nThe encryption flow works as follows: the browser generates a random 256-bit key and a 96-bit IV per file. The file is encrypted in streaming chunks (64KB buffers) to handle large files without memory pressure. The encrypted blob is uploaded directly to S3 via a pre-signed PUT URL — the server never touches the file bytes. The decryption key is embedded in the URL fragment (after the #), which browsers never send to servers.\n\nFor sharing, I implemented three mechanisms: direct links with the key fragment, QR codes encoding the full URL, and email-based sharing where the recipient gets a link that prompts for a PIN (the PIN derives the decryption key via PBKDF2 with 100K iterations). Ephemeral links auto-expire after a configurable TTL or download count using S3 object lifecycle policies and a Lambda function that revokes pre-signed URLs.\n\nThe architecture uses pre-signed URLs for both upload and download, meaning S3 bandwidth costs are the only storage expense — no application-layer proxy needed. File metadata (name, size, expiry, share method) is stored in MongoDB, but never the encryption key.`,
  },
]
