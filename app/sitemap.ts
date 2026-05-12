import type { MetadataRoute } from 'next'
import { getClient } from '@/lib/sanity/client'
import { POST_SLUGS_QUERY, PROJECT_SLUGS_QUERY } from '@/lib/sanity/queries'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postSlugs, projectSlugs] = await Promise.all([
    getClient().fetch<{ slug: string }[]>(POST_SLUGS_QUERY),
    getClient().fetch<{ slug: string }[]>(PROJECT_SLUGS_QUERY),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/projects`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const postPages: MetadataRoute.Sitemap = postSlugs.map(s => ({
    url: `${SITE_URL}/blog/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const projectPages: MetadataRoute.Sitemap = projectSlugs.map(s => ({
    url: `${SITE_URL}/projects/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...postPages, ...projectPages]
}
