import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getClient } from '@/lib/sanity/client'
import { POST_BY_SLUG_QUERY, POST_SLUGS_QUERY, ALL_POSTS_QUERY } from '@/lib/sanity/queries'
import type { Post } from '@/lib/sanity/types'
import { formatDate } from '@/lib/utils'
import PortableTextRenderer from '@/components/blog/PortableTextRenderer'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getClient().fetch<{ slug: string }[]>(POST_SLUGS_QUERY)
  return slugs.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getClient().fetch<Post | null>(POST_BY_SLUG_QUERY, { slug })
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [{ url: '/images/og-banner.png', width: 1200, height: 630 }],
    },
  }
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const [post, allPosts] = await Promise.all([
    getClient().fetch<Post | null>(POST_BY_SLUG_QUERY, { slug }),
    getClient().fetch<Post[]>(ALL_POSTS_QUERY),
  ])

  if (!post) notFound()

  const related = allPosts
    .filter(p => p._id !== post._id)
    .slice(0, 2)

  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            author: { '@type': 'Person', name: 'zzuhann', url: SITE_URL },
            url: `${SITE_URL}/blog/${slug}`,
          }),
        }}
      />
      <div className="wrap-read">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-body-muted uppercase hover:text-accent transition-colors"
          style={{ fontSize: '11px', letterSpacing: '.14em', padding: '12px 0 24px', display: 'inline-flex' }}
        >
          ← 回到文章列表
        </Link>

        <header style={{ marginBottom: '64px' }}>
          <div
            className="font-mono text-body-soft uppercase flex gap-[18px] items-center"
            style={{ fontSize: '11px', letterSpacing: '.22em', marginBottom: '32px' }}
          >
            <span>{post.issueNumber}</span>
            <span className="flex-1 h-px bg-border max-w-[200px]" />
            <span>{post.tags?.[0]}</span>
          </div>

          <h1
            className="font-serif font-medium text-body"
            style={{
              fontSize: 'clamp(36px, 4.8vw, 56px)',
              lineHeight: 1.15,
              margin: '0 0 28px',
              letterSpacing: '-.005em',
              fontFeatureSettings: '"palt"',
              textWrap: 'pretty',
            }}
          >
            {post.title}
          </h1>

          {post.titleEn && (
            <p
              className="text-accent"
              style={{
                fontFamily: 'var(--font-latin-serif)',
                fontStyle: 'italic',
                fontSize: '19px',
                lineHeight: 1.75,
                margin: '0 0 36px',
                maxWidth: '38ch',
              }}
            >
              {post.titleEn}
            </p>
          )}

          <div
            className="flex gap-7 pt-[22px] font-mono text-body-soft uppercase"
            style={{ fontSize: '11px', letterSpacing: '.12em', borderTop: '1px solid var(--text)' }}
          >
            <span>發布<strong className="text-body font-medium ml-2">{formatDate(post.publishedAt)}</strong></span>
            {post.estimatedReadingTime && (
              <span>閱讀<strong className="text-body font-medium ml-2">{post.estimatedReadingTime} 分鐘</strong></span>
            )}
          </div>
        </header>

        {post.body && (
          <article className="prose">
            <PortableTextRenderer value={post.body} />
          </article>
        )}

        <div
          className="flex justify-between font-mono text-body-soft uppercase mt-20 pt-8"
          style={{ fontSize: '11px', letterSpacing: '.12em', borderTop: '1px solid var(--border)' }}
        >
          <span>END · {post.issueNumber}</span>
          <span>SHARE · COPY LINK</span>
        </div>

        {related.length > 0 && (
          <section
            className="mt-[88px] pt-9"
            style={{ borderTop: '1px solid var(--rule)' }}
          >
            <p
              className="font-mono text-body-soft uppercase mb-7"
              style={{ fontSize: '11px', letterSpacing: '.2em' }}
            >
              RELATED · 延伸閱讀
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {related.map(r => (
                <Link
                  key={r._id}
                  href={`/blog/${r.slug.current}`}
                  className="group border-t border-border pt-[18px] hover:no-underline cursor-pointer"
                >
                  <div
                    className="font-mono text-body-soft mb-2.5"
                    style={{ fontSize: '10.5px', letterSpacing: '.14em' }}
                  >
                    {r.issueNumber} · {formatDate(r.publishedAt)}
                  </div>
                  <h2
                    className="font-serif font-medium text-body group-hover:text-accent transition-colors m-0"
                    style={{ fontSize: '18px', lineHeight: 1.4 }}
                  >
                    {r.title}
                  </h2>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
