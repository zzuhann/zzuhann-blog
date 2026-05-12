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
  nameZh?: string
  slug: { current: string }
  index?: string
  year?: string
  status?: string
  desc?: string
  overview?: string
  stack?: string[]
  link?: string
  notes?: string[]
  featured?: boolean
  body?: PortableTextBlock[]
  relatedPosts?: Pick<Post, '_id' | 'title' | 'slug' | 'publishedAt' | 'issueNumber'>[]
}

export type CvRow = {
  _key?: string
  period: string
  role: string
  place: string
}

export type ValueItem = {
  _key?: string
  num: string
  title: string
  desc: string
}

export type About = {
  _id: string
  name?: string
  nameEn?: string
  portrait?: { asset: { _ref: string } }
  intro?: PortableTextBlock[]
  cv?: CvRow[]
  values?: ValueItem[]
  collaboration?: PortableTextBlock[]
  email?: string
}
