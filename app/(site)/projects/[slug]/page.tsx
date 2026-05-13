import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getClient } from '@/lib/sanity/client'
import { PROJECT_BY_SLUG_QUERY, PROJECT_SLUGS_QUERY } from '@/lib/sanity/queries'
import type { Project } from '@/lib/sanity/types'
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
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: project.name,
      description: project.desc ?? undefined,
      type: 'website',
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getClient().fetch<Project | null>(PROJECT_BY_SLUG_QUERY, { slug })

  if (!project) notFound()

  const coverImageUrl = project.coverImage?.asset?.url

  return (
    <main id="main-content" tabIndex={-1} style={{ paddingBottom: '120px' }}>
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
          className="grid grid-cols-1 md:grid-cols-2 gap-14"
          style={{ padding: '40px 0', borderBottom: '1px solid var(--rule)' }}
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
                fontSize: 'clamp(28px, 3vw, 40px)',
                lineHeight: 1.15,
                margin: '0 0 14px',
                letterSpacing: '-.005em',
              }}
            >
              {project.name}
            </h1>
            {project.desc && (
              <p
                className="font-serif text-body-muted leading-[1.8] m-0"
                style={{ fontSize: '16px', textWrap: 'pretty' }}
              >
                {project.desc}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 self-end">
            <FactRow label="Since" value={project.year ?? '—'} />
            <FactRow label="Stack" value={project.stack?.join(' · ') ?? '—'} />
            {project.link && (
              <FactRow
                label="Site"
                value={
                  <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
                    {project.link} ↗
                  </a>
                }
              />
            )}
            {project.github && (
              <FactRow
                label="GitHub"
                value={
                  <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
                    {project.github} ↗
                  </a>
                }
              />
            )}
          </div>
        </div>

        {/* Cover image */}
        {coverImageUrl ? (
          <div className="my-14" style={{ border: '1px solid var(--border)' }}>
            <Image
              src={coverImageUrl}
              alt={project.name}
              width={1400}
              height={600}
              className="w-full object-cover"
              style={{ aspectRatio: '21/9' }}
              priority
            />
          </div>
        ) : (
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
        )}

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-14">
          <nav className="hidden md:flex flex-col gap-1" style={{ position: 'sticky', top: '88px', alignSelf: 'start' }}>
            <NavItem href="#content" label="內文" active />
            {(project.relatedPosts?.length ?? 0) > 0 && <NavItem href="#related" label="相關文章" />}
          </nav>

          <div>
            {project.body && (
              <div id="content" className="prose">
                <PortableTextRenderer value={project.body} />
              </div>
            )}

            {project.relatedPosts && project.relatedPosts.length > 0 && (
              <section
                id="related"
                className="mt-[88px] pt-9"
                style={{ borderTop: '1px solid var(--rule)' }}
              >
                <p
                  className="font-mono text-body-soft uppercase mb-2.5"
                  style={{ fontSize: '11px', letterSpacing: '.2em' }}
                >
                  RELATED ARTICLES
                </p>
                <div className="flex flex-col gap-0">
                  {project.relatedPosts.map((r, i) => (
                    <Link
                      key={r._id}
                      href={`/blog/${r.slug.current}`}
                      className={`group pt-[18px] hover:no-underline cursor-pointer${i > 0 ? ' border-t border-border' : ''}`}
                    >
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
