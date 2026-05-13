import type { Metadata } from 'next'
import { getClient } from '@/lib/sanity/client'
import { ALL_PROJECTS_QUERY } from '@/lib/sanity/queries'
import type { Project } from '@/lib/sanity/types'
import PageHead from '@/components/ui/PageHead'
import ProjectCard from '@/components/projects/ProjectCard'

export const metadata: Metadata = {
  title: '專案',
  description: '一些碎片、一些專案、一些想做的事，綜合起來成了作品集、拼湊成我自己的樣子。',
  alternates: { canonical: '/projects' },
}

export default async function ProjectsPage() {
  const projects = await getClient().fetch<Project[]>(ALL_PROJECTS_QUERY)

  return (
    <main id="main-content" tabIndex={-1} style={{ paddingBottom: '120px' }}>
      <div className="wrap">
        <PageHead
          kicker='SELECTED WORKS'
          title="專案"
          lede="一些碎片、一些專案、一些想做的事，綜合起來成了作品集、拼湊成我自己的樣子。"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </main>
  )
}
