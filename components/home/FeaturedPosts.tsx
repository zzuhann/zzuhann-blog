import Link from 'next/link'
import type { Post } from '@/lib/sanity/types'
import SectionHead from '@/components/ui/SectionHead'
import { formatDate } from '@/lib/utils'

export default function FeaturedPosts({ posts }: { posts: Post[] }) {
  return (
    <section style={{ padding: '88px 0' }}>
      <div className="wrap">
        <SectionHead
          chapterNum="CHAPTER 01"
          title="精選文章"
          linkLabel="所有文章 →"
          linkHref="/blog"
        />

        <div className="flex flex-col">
          {posts.map((post, i) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group grid items-start border-b border-border py-6 hover:bg-white/50 hover:px-3.5 transition-all cursor-pointer no-underline grid-cols-1 gap-2 md:grid-cols-[80px_1fr_90px] md:items-baseline md:gap-6"
            >
              <span
                className="font-mono text-ink-soft"
                style={{ fontSize: '12px', letterSpacing: '.1em' }}
              >
                {post.issueNumber ?? `N°.${String(i + 1).padStart(3, '0')}`}
              </span>

              <div>
                <h3
                  className="font-serif font-medium text-ink group-hover:text-accent transition-colors mb-1.5"
                  style={{
                    fontSize: '22px',
                    lineHeight: 1.35,
                    letterSpacing: '-.005em',
                    fontFeatureSettings: '"palt"',
                  }}
                >
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p
                    className="text-ink-muted hidden md:block"
                    style={{ fontSize: '13.5px', lineHeight: 1.65 }}
                  >
                    {post.excerpt}
                  </p>
                )}
              </div>

              {/* <span
                className="font-mono text-ink-soft hidden md:block"
                style={{ fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase' }}
              >
                {post.tags?.[0] && `${post.tags[0]} · `}
                {post.estimatedReadingTime && `${post.estimatedReadingTime} 分鐘`}
              </span> */}

              <span
                className="font-mono text-ink-soft text-right hidden sm:block"
                style={{ fontSize: '11px', letterSpacing: '.08em' }}
              >
                {formatDate(post.publishedAt)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
