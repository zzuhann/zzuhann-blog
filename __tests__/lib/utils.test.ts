import { describe, it, expect } from 'vitest'
import { formatDate, groupByYear } from '@/lib/utils'

describe('formatDate', () => {
  it('formats ISO date string to YYYY.MM.DD', () => {
    expect(formatDate('2026-04-18T00:00:00Z')).toBe('2026.04.18')
  })

  it('zero-pads single-digit month and day', () => {
    expect(formatDate('2025-01-05T00:00:00Z')).toBe('2025.01.05')
  })
})

describe('groupByYear', () => {
  const items = [
    { publishedAt: '2026-04-01T00:00:00Z', title: 'A' },
    { publishedAt: '2026-01-15T00:00:00Z', title: 'B' },
    { publishedAt: '2025-12-01T00:00:00Z', title: 'C' },
    { publishedAt: '2025-03-10T00:00:00Z', title: 'D' },
  ]

  it('groups items by year', () => {
    const result = groupByYear(items)
    expect(result).toHaveLength(2)
    expect(result[0]?.[0]).toBe('2026')
    expect(result[1]?.[0]).toBe('2025')
  })

  it('sorts years in descending order', () => {
    const result = groupByYear(items)
    const years = result.map(([year]) => year)
    expect(years).toEqual(['2026', '2025'])
  })

  it('puts all items of the same year in the same group', () => {
    const result = groupByYear(items)
    expect(result[0]?.[1]).toHaveLength(2)
    expect(result[1]?.[1]).toHaveLength(2)
  })
})
