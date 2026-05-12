import type { Metadata } from 'next'
import Link from 'next/link'
import { getClient } from '@/lib/sanity/client'
import { ALL_POSTS_QUERY } from '@/lib/sanity/queries'
import type { Post } from '@/lib/sanity/types'
import { groupByYear, formatDate } from '@/lib/utils'
import PageHead from '@/components/ui/PageHead'

export const metadata: Metadata = {
  title: '文章',
  description: '一份按時間倒序排列的書寫紀錄。',
}

export default async function BlogPage() {
  const posts = await getClient().fetch<Post[]>(ALL_POSTS_QUERY)
  const byYear = groupByYear(posts)
  const totalCount = posts.length

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="wrap">
        <PageHead
          kicker={`ARCHIVE · 2019—${new Date().getFullYear()} · ${totalCount} ENTRIES`}
          title={<>文章<em style={{ fontFamily: 'var(--font-latin-serif)', fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>archive</em></>}
          lede="一份按時間倒序排列的書寫紀錄。最新的文章在上方。每一篇都標註了標籤與閱讀時間，方便你判斷要不要花這段時間。"
        />

        {byYear.map(([year, list]) => (
          <section key={year} className="mb-[72px]">
            <div
              className="flex items-baseline gap-6 pb-3.5 mb-2"
              style={{ borderBottom: '1px solid var(--rule)' }}
            >
              <span
                className="text-ink"
                style={{ fontFamily: 'var(--font-latin-serif)', fontSize: '56px', fontWeight: 400, lineHeight: 1, letterSpacing: '-.01em' }}
              >
                {year}
              </span>
              <span
                className="font-mono text-ink-soft uppercase"
                style={{ fontSize: '11px', letterSpacing: '.18em' }}
              >
                YEAR
              </span>
              <span
                className="font-mono text-ink-soft ml-auto"
                style={{ fontSize: '11px', letterSpacing: '.15em' }}
              >
                {list.length} ARTICLES
              </span>
            </div>

            <div>
              {list.map(post => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group grid items-baseline border-b border-border py-[26px] hover:bg-white/60 transition-colors no-underline"
                  style={{ gridTemplateColumns: '96px 1fr 140px', gap: '32px' }}
                >
                  <span
                    className="font-mono text-ink-soft"
                    style={{ fontSize: '11px', letterSpacing: '.1em' }}
                  >
                    {formatDate(post.publishedAt)}
                  </span>

                  <div>
                    <h3
                      className="font-serif font-medium text-ink group-hover:text-accent transition-colors mb-1.5"
                      style={{
                        fontSize: '21px',
                        lineHeight: 1.4,
                        letterSpacing: '-.005em',
                        fontFeatureSettings: '"palt"',
                      }}
                    >
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p
                        className="text-ink-muted m-0"
                        style={{ fontSize: '13.5px', lineHeight: 1.65 }}
                      >
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  <div
                    className="text-right font-mono text-ink-soft hidden md:block"
                    style={{ fontSize: '10.5px', letterSpacing: '.12em' }}
                  >
                    {post.tags?.[0] && <div>{post.tags[0]}</div>}
                    {post.estimatedReadingTime && <div>{post.estimatedReadingTime} 分鐘</div>}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
