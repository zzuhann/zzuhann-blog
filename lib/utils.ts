export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

export function groupByYear<T extends { publishedAt: string }>(
  items: T[]
): [string, T[]][] {
  const groups: Record<string, T[]> = {}
  for (const item of items) {
    const year = new Date(item.publishedAt).getFullYear().toString()
    if (!groups[year]) groups[year] = []
    groups[year].push(item)
  }
  return Object.entries(groups).sort(([a], [b]) => Number(b) - Number(a))
}
