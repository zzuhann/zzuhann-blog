import Link from 'next/link'
import type { Project } from '@/lib/sanity/types'
import SectionHead from '@/components/ui/SectionHead'
import ProjectCard from '@/components/projects/ProjectCard'

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section style={{ padding: '88px 0', background: 'var(--bg-soft)' }}>
      <div className="wrap">
        <SectionHead
          chapterNum="CHAPTER 02"
          title="選錄專案"
          subtitle="這些是過去幾年裡，做給自己也做給別人用的東西。它們的共通點：都比一開始想像的還小，但活得比預期還久。"
          linkLabel="所有專案 →"
          linkHref="/projects"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
