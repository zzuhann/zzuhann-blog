import type { Project } from '@/lib/sanity/types'
import SectionHead from '@/components/ui/SectionHead'
import ProjectCard from '@/components/projects/ProjectCard'

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section style={{ padding: '88px 0', background: 'var(--bg-soft)' }}>
      <div className="wrap">
        <SectionHead
          chapterNum="CHAPTER 02"
          title="專案/作品集"
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
