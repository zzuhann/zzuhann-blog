import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getClient } from '@/lib/sanity/client'
import { PROJECT_BY_SLUG_QUERY, PROJECT_SLUGS_QUERY } from '@/lib/sanity/queries'
import type { Project } from '@/lib/sanity/types'
import { formatDate } from '@/lib/utils'
import PortableTextRenderer from '@/components/blog/PortableTextRenderer'
import FactRow from '@/components/projects/FactRow'
import NavItem from '@/components/projects/NavItem'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getClient().fetch<{ slug: string }[]>(PROJECT_SLUGS_QUERY)
  return slugs.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getClient().fetch<Project | null>(PROJECT_BY_SLUG_QUERY, { slug })
  if (!project) return {}
  return {
    title: project.name,
    description: project.desc,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getClient().fetch<Project | null>(PROJECT_BY_SLUG_QUERY, { slug })

  if (!project) notFound()

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="wrap">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-body-muted uppercase hover:text-accent transition-colors"
          style={{ fontSize: '11px', letterSpacing: '.14em', padding: '12px 0 24px', display: 'inline-flex' }}
        >
          ← 回到專案列表
        </Link>

        {/* Top section */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-14 pb-14"
          style={{ padding: '72px 0 56px', borderBottom: '1px solid var(--rule)' }}
        >
          <div>
            <p
              className="font-mono text-body-soft uppercase mb-7"
              style={{ fontSize: '11px', letterSpacing: '.22em' }}
            >
              PROJECT {project.index} · {project.year}
            </p>
            <h1
              className="font-serif font-medium text-body"
              style={{
                fontSize: 'clamp(40px, 5vw, 64px)',
                lineHeight: 1.08,
                margin: '0 0 18px',
                letterSpacing: '-.005em',
              }}
            >
              {project.name}
            </h1>
            {project.nameZh && (
              <p
                className="text-accent mb-8 m-0"
                style={{
                  fontFamily: 'var(--font-latin-serif)',
                  fontStyle: 'italic',
                  fontSize: '22px',
                  marginBottom: '32px',
                }}
              >
                — {project.nameZh}
              </p>
            )}
            {project.overview && (
              <p
                className="font-serif text-body-muted leading-[1.8] m-0"
                style={{ fontSize: '19px', textWrap: 'pretty' }}
              >
                {project.overview}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 self-end">
            <FactRow label="Year" value={project.year ?? '—'} />
            <FactRow label="Status" value={project.status ?? '—'} />
            <FactRow label="Stack" value={project.stack?.join(' · ') ?? '—'} />
            <FactRow label="Role" value="設計 / 開發 / 維護" />
            {project.link && (
              <FactRow
                label="Link"
                value={
                  <span style={{ color: 'var(--accent)' }}>
                    {project.link} ↗
                  </span>
                }
              />
            )}
          </div>
        </div>

        {/* Hero image placeholder */}
        <div
          className="flex items-center justify-center text-body-soft font-mono uppercase my-14"
          style={{
            aspectRatio: '21/9',
            background: 'repeating-linear-gradient(135deg, #EDE7DD 0 8px, #E6E0D8 8px 16px)',
            border: '1px solid var(--border)',
            fontSize: '12px',
            letterSpacing: '.16em',
          }}
        >
          PROJECT IMAGERY / 21:9
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-14">
          <nav className="hidden md:flex flex-col gap-1" style={{ position: 'sticky', top: '88px', alignSelf: 'start' }}>
            <NavItem href="#overview" label="概述" active />
            <NavItem href="#notes" label="技術筆記" />
            <NavItem href="#journal" label="開發日誌" />
            {(project.relatedPosts?.length ?? 0) > 0 && <NavItem href="#related" label="相關文章" />}
          </nav>

          <div>
            <div className="prose">
              <h2 id="overview"><span className="num">§ 01</span>概述</h2>
              <p>{project.overview}</p>

              {project.notes && project.notes.length > 0 && (
                <>
                  <h2 id="notes"><span className="num">§ 02</span>技術筆記</h2>
                  <ul>
                    {project.notes.map((note, i) => <li key={i}>{note}</li>)}
                  </ul>
                </>
              )}

              {project.body && (
                <>
                  <h2 id="journal"><span className="num">§ 03</span>開發日誌</h2>
                  <PortableTextRenderer value={project.body} />
                </>
              )}
            </div>

            {project.relatedPosts && project.relatedPosts.length > 0 && (
              <section
                id="related"
                className="mt-[88px] pt-9"
                style={{ borderTop: '1px solid var(--rule)' }}
              >
                <p
                  className="font-mono text-body-soft uppercase mb-7"
                  style={{ fontSize: '11px', letterSpacing: '.2em' }}
                >
                  RELATED ARTICLES · 相關書寫
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.relatedPosts.map(r => (
                    <Link
                      key={r._id}
                      href={`/blog/${r.slug.current}`}
                      className="group border-t border-border pt-[18px] hover:no-underline cursor-pointer"
                    >
                      <div
                        className="font-mono text-body-soft mb-2.5"
                        style={{ fontSize: '10.5px', letterSpacing: '.14em' }}
                      >
                        {r.issueNumber} · {r.publishedAt && formatDate(r.publishedAt)}
                      </div>
                      <h3
                        className="font-serif font-medium text-body group-hover:text-accent transition-colors m-0"
                        style={{ fontSize: '18px', lineHeight: 1.4 }}
                      >
                        {r.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

