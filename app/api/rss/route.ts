import { getClient } from '@/lib/sanity/client'
import { ALL_POSTS_QUERY } from '@/lib/sanity/queries'
import type { Post } from '@/lib/sanity/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export async function GET() {
  const posts = await getClient().fetch<Post[]>(ALL_POSTS_QUERY)

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>zzuhann's space</title>
    <link>${SITE_URL}</link>
    <description>寫一些自己的想法和一些關於前端開發的想法筆記。生活有很多種模樣，想讓各式各樣的樣子都能夠被記錄下來。</description>
    <language>zh-TW</language>
    <atom:link href="${SITE_URL}/api/rss" rel="self" type="application/rss+xml" />
    ${posts
      .map(
        post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug.current}</link>
      <guid>${SITE_URL}/blog/${post.slug.current}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      ${post.excerpt ? `<description><![CDATA[${post.excerpt}]]></description>` : ''}
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
