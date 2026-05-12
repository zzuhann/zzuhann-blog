import { getClient } from '@/lib/sanity/client'
import { FEATURED_POSTS_QUERY, FEATURED_PROJECTS_QUERY } from '@/lib/sanity/queries'
import type { Post, Project } from '@/lib/sanity/types'
import HeroSection from '@/components/home/HeroSection'
import FeaturedPosts from '@/components/home/FeaturedPosts'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import AboutPreview from '@/components/home/AboutPreview'

export default async function HomePage() {
  const [posts, projects] = await Promise.all([
    getClient().fetch<Post[]>(FEATURED_POSTS_QUERY),
    getClient().fetch<Project[]>(FEATURED_PROJECTS_QUERY),
  ])

  return (
    <main id="main-content" tabIndex={-1}>
      <HeroSection />
      <FeaturedPosts posts={posts} />
      <FeaturedProjects projects={projects} />
      <AboutPreview />
    </main>
  )
}
