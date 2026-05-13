import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/lib/sanity/types'

export default function ProjectCard({ project }: { project: Project }) {
  const coverImageUrl = project.coverImage?.asset?.url

  return (
    <Link
      href={`/projects/${project.slug.current}`}
      className="group bg-surface border border-border flex flex-col cursor-pointer hover:shadow-[0_8px_24px_rgba(0,0,0,.06)] hover:-translate-y-0.5 hover:border-body-soft transition-all no-underline overflow-hidden"
      style={{ minHeight: '280px' }}
    >
      {coverImageUrl && (
        <div className="w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <Image
            src={coverImageUrl}
            alt={project.name}
            width={800}
            height={450}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 flex-1" style={{ padding: '28px 28px 24px' }}>
        <div className="flex justify-between items-baseline pb-3.5 border-b border-border">
          <span
            className="font-mono text-body-soft"
            style={{ fontSize: '11px', letterSpacing: '.12em' }}
          >
            {project.index}
          </span>
          <span
            className="font-mono text-body-soft"
            style={{ fontSize: '11px', letterSpacing: '.12em' }}
          >
            Since {project.year}
          </span>
        </div>

        <div>
          <h3
            className="font-serif font-medium text-body m-0"
            style={{ fontSize: '26px', lineHeight: 1.2 }}
          >
            {project.name}
          </h3>
        </div>

        {project.desc && (
          <p
            className="text-body-muted flex-1 leading-[1.7] m-0"
            style={{ fontSize: '14px' }}
          >
            {project.desc}
          </p>
        )}

        <div
          className="flex justify-between items-center font-mono text-body-soft uppercase pt-3.5 border-t"
          style={{ fontSize: '10.5px', letterSpacing: '.14em', borderStyle: 'dashed', borderColor: 'var(--border)' }}
        >
          <div className="flex gap-3">
            {project.stack?.slice(0, 3).map(s => <span key={s}>{s}</span>)}
            {(project.stack?.length ?? 0) > 3 && <span>···</span>}
          </div>
          <span className="text-body group-hover:text-accent transition-colors">閱讀 →</span>
        </div>
      </div>
    </Link>
  )
}
