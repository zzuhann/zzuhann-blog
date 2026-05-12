import Link from 'next/link'
import type { Project } from '@/lib/sanity/types'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug.current}`}
      className="group bg-surface border border-border flex flex-col gap-4 cursor-pointer hover:shadow-[0_8px_24px_rgba(0,0,0,.06)] hover:-translate-y-0.5 hover:border-ink-soft transition-all no-underline"
      style={{ padding: '28px 28px 24px', minHeight: '280px' }}
    >
      <div
        className="flex justify-between items-baseline pb-3.5 border-b border-border"
      >
        <span
          className="font-mono text-ink-soft"
          style={{ fontSize: '11px', letterSpacing: '.12em' }}
        >
          {project.index}
        </span>
        <span
          className="font-mono text-ink-soft"
          style={{ fontSize: '11px', letterSpacing: '.12em' }}
        >
          {project.year}{project.status ? ` · ${project.status}` : ''}
        </span>
      </div>

      <div>
        <h3
          className="font-serif font-medium text-ink m-0"
          style={{ fontSize: '26px', lineHeight: 1.2 }}
        >
          {project.name}
        </h3>
        {project.nameZh && (
          <p
            className="text-ink-muted mt-1 mb-0"
            style={{
              fontFamily: 'var(--font-latin-serif)',
              fontStyle: 'italic',
              fontSize: '15px',
            }}
          >
            — {project.nameZh}
          </p>
        )}
      </div>

      {project.desc && (
        <p
          className="text-ink-muted flex-1 leading-[1.7] m-0"
          style={{ fontSize: '14px' }}
        >
          {project.desc}
        </p>
      )}

      <div
        className="flex justify-between items-center font-mono text-ink-soft uppercase pt-3.5 border-t"
        style={{ fontSize: '10.5px', letterSpacing: '.14em', borderStyle: 'dashed', borderColor: 'var(--border)' }}
      >
        <div className="flex gap-3">
          {project.stack?.slice(0, 3).map(s => <span key={s}>{s}</span>)}
        </div>
        <span className="text-ink group-hover:text-accent transition-colors">閱讀 →</span>
      </div>
    </Link>
  )
}
