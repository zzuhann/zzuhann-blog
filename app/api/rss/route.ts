import { getClient } from '@/lib/sanity/client'
import { ALL_POSTS_QUERY } from '@/lib/sanity/queries'
import type { Post } from '@/lib/sanity/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export async function GET() {
  const posts = await getClient().fetch<Post[]>(ALL_POSTS_QUERY)

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>之翰の備忘錄</title>
    <link>${SITE_URL}</link>
    <description>一份關於介面、程式碼與閱讀的個人技術期刊。</description>
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
