import Link from 'next/link'

interface SectionHeadProps {
  chapterNum: string
  title: string
  linkLabel?: string
  linkHref?: string
}

export default function SectionHead({
  chapterNum,
  title,
  linkLabel,
  linkHref,
}: SectionHeadProps) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[1fr_2fr] items-end gap-8 mb-14 pb-[18px] border-b"
      style={{ borderColor: 'var(--rule)' }}
    >
      <div>
        <span
          className="font-mono text-ink-soft uppercase block mb-3.5"
          style={{ fontSize: '11px', letterSpacing: '.22em' }}
        >
          {chapterNum}
        </span>
        <h2
          className="font-serif font-medium text-ink m-0"
          style={{ fontSize: 'clamp(28px, 5vw, 36px)', letterSpacing: '-.01em', fontWeight: '900' }}
        >
          {title}
        </h2>
      </div>

      {linkLabel && linkHref && (
        <Link
          href={linkHref}
          className="font-mono text-ink uppercase border-b border-ink pb-0.5 self-end justify-self-end hover:text-accent hover:border-accent transition-colors"
          style={{ fontSize: '11px', letterSpacing: '.15em' }}
        >
          {linkLabel}
        </Link>
      )}
    </div>
  )
}
