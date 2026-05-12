import type { Metadata } from 'next'
import { getClient } from '@/lib/sanity/client'
import { ALL_PROJECTS_QUERY } from '@/lib/sanity/queries'
import type { Project } from '@/lib/sanity/types'
import PageHead from '@/components/ui/PageHead'
import ProjectCard from '@/components/projects/ProjectCard'

export const metadata: Metadata = {
  title: '專案',
  description: '選錄的個人專案。',
}

export default async function ProjectsPage() {
  const projects = await getClient().fetch<Project[]>(ALL_PROJECTS_QUERY)

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="wrap">
        <PageHead
          kicker={`SELECTED WORKS · 2022—${new Date().getFullYear()}`}
          title={<>專案<em style={{ fontFamily: 'var(--font-latin-serif)', fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>selected</em></>}
          lede="選錄的個人專案。有些還在持續開發，有些已經封存。它們的共通之處：都是為了某個我自己也想要的東西做出來的。"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {projects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </main>
  )
}
