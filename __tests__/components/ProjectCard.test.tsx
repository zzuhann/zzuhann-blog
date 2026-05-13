import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectCard from '@/components/projects/ProjectCard'
import type { Project } from '@/lib/sanity/types'

const mockProject: Project = {
  _id: 'p-01',
  name: 'Margin',
  slug: { current: 'margin' },
  index: 'P/01',
  year: '2026',
  desc: '為長篇技術文章打造的閱讀器。',
  stack: ['Swift', 'SwiftUI', 'CoreData'],
}

describe('ProjectCard', () => {
  it('renders project name', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('Margin')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('為長篇技術文章打造的閱讀器。')).toBeInTheDocument()
  })

  it('renders up to 3 stack items', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('Swift')).toBeInTheDocument()
    expect(screen.getByText('SwiftUI')).toBeInTheDocument()
    expect(screen.getByText('CoreData')).toBeInTheDocument()
  })

  it('renders year', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('2026')).toBeInTheDocument()
  })

  it('links to the correct project slug', () => {
    render(<ProjectCard project={mockProject} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/projects/margin')
  })
})
