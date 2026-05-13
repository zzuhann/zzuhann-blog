import type { Metadata } from 'next'
import Link from 'next/link'
import { getClient } from '@/lib/sanity/client'
import { ALL_POSTS_QUERY } from '@/lib/sanity/queries'
import type { Post } from '@/lib/sanity/types'
import { groupByYear, formatDate } from '@/lib/utils'
import PageHead from '@/components/ui/PageHead'

export const metadata: Metadata = {
  title: '文章',
  description: '寫一些自己的想法和一些關於前端開發的想法筆記。生活有很多種模樣，想讓各式各樣的樣子都能夠被記錄下來。',
}

export default async function BlogPage() {
  const posts = await getClient().fetch<Post[]>(ALL_POSTS_QUERY)
  const byYear = groupByYear(posts)
  const totalCount = posts.length

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="wrap">
        <PageHead
          kicker={`ARCHIVE · ${totalCount} ARTICLES`}
          title="文章"
          lede="寫一些自己的想法和一些關於前端開發的想法筆記。生活有很多種模樣，想讓各式各樣的樣子都能夠被記錄下來。"
        />

        {byYear.map(([year, list]) => (
          <section key={year} className="mb-[72px]">
            <div
              className="flex items-baseline gap-6 pb-3.5 mb-2"
              style={{ borderBottom: '1px solid var(--rule)' }}
            >
              <span
                className="text-ink-soft"
                style={{ fontFamily: 'var(--font-latin-serif)', fontSize: '40px', fontWeight: 400, lineHeight: 1, letterSpacing: '-.01em' }}
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
                  className="group grid items-start border-b border-border py-5 hover:bg-white/60 hover:px-3.5 transition-all no-underline grid-cols-1 gap-1.5 md:grid-cols-[96px_1fr_140px] md:items-baseline md:gap-8 md:py-[26px]"
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
                        className="text-ink-muted m-0 hidden md:block"
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
