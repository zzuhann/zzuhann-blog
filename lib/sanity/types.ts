import type { PortableTextBlock } from '@portabletext/react'

export type Post = {
  _id: string
  title: string
  titleEn?: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  tags?: string[]
  issueNumber?: string
  featured?: boolean
  estimatedReadingTime?: number
  body?: PortableTextBlock[]
}

export type Project = {
  _id: string
  name: string
  slug: { current: string }
  index?: string
  year?: string
  desc?: string
  stack?: string[]
  link?: string
  github?: string
  featured?: boolean
  coverImage?: { asset?: { _id: string; url: string } }
  body?: PortableTextBlock[]
  relatedPosts?: Pick<Post, '_id' | 'title' | 'slug' | 'publishedAt' | 'issueNumber'>[]
}

export type CvRow = {
  _key?: string
  period: string
  role: string
  place: string
}

export type About = {
  _id: string
  name?: string
  nameEn?: string
  portrait?: { asset: { _ref: string } }
  intro?: PortableTextBlock[]
  cv?: CvRow[]
  collaboration?: PortableTextBlock[]
  email?: string
}
