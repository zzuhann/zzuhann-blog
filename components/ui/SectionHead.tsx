import Link from 'next/link'

interface SectionHeadProps {
  chapterNum: string
  title: string
  subtitle: string
  linkLabel?: string
  linkHref?: string
}

export default function SectionHead({
  chapterNum,
  title,
  subtitle,
  linkLabel,
  linkHref,
}: SectionHeadProps) {
  return (
    <div
      className="grid items-end gap-8 mb-14 pb-[18px] border-b"
      style={{
        gridTemplateColumns: '1fr 2fr',
        borderColor: 'var(--rule)',
      }}
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
          style={{ fontSize: '36px', letterSpacing: '-.01em' }}
        >
          {title}
        </h2>
      </div>

      <p
        className="text-ink-muted m-0 leading-[1.7]"
        style={{ fontSize: '14px', maxWidth: '44ch' }}
      >
        {subtitle}
      </p>

      {linkLabel && linkHref && (
        <Link
          href={linkHref}
          className="font-mono text-ink uppercase border-b border-ink pb-0.5 self-end justify-self-end hover:text-accent hover:border-accent transition-colors col-span-2 md:col-span-1"
          style={{ fontSize: '11px', letterSpacing: '.15em' }}
        >
          {linkLabel}
        </Link>
      )}
    </div>
  )
}
