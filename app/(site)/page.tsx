import type { Metadata } from 'next'
import { getClient } from '@/lib/sanity/client'
import { FEATURED_POSTS_QUERY, FEATURED_PROJECTS_QUERY } from '@/lib/sanity/queries'
import type { Post, Project } from '@/lib/sanity/types'
import HeroSection from '@/components/home/HeroSection'
import FeaturedPosts from '@/components/home/FeaturedPosts'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import AboutPreview from '@/components/home/AboutPreview'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    type: 'website',
  },
}

export default async function HomePage() {
  const [posts, projects] = await Promise.all([
    getClient().fetch<Post[]>(FEATURED_POSTS_QUERY),
    getClient().fetch<Project[]>(FEATURED_PROJECTS_QUERY),
  ])

  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: "zzuhann's space",
              url: SITE_URL,
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'zzuhann',
              url: SITE_URL,
              sameAs: [
                'https://github.com/zzuhann',
                'https://linkedin.com/in/zzuhann',
              ],
            },
          ]),
        }}
      />
      <HeroSection />
      <FeaturedPosts posts={posts} />
      <FeaturedProjects projects={projects} />
      <AboutPreview />
    </main>
  )
}
