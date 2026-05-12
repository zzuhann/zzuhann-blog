interface PageHeadProps {
  kicker: string
  title: React.ReactNode
  lede?: string
}

export default function PageHead({ kicker, title, lede }: PageHeadProps) {
  return (
    <header
      className="border-b"
      style={{
        padding: '80px 0 56px',
        borderColor: 'var(--rule)',
        marginBottom: '56px',
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-14 items-end"
      >
        <div>
          <p
            className="font-mono text-ink-soft uppercase mb-6"
            style={{ fontSize: '11px', letterSpacing: '.22em' }}
          >
            {kicker}
          </p>
          <h1
            className="font-serif font-medium text-ink m-0"
            style={{
              fontSize: 'clamp(48px, 6vw, 80px)',
              lineHeight: 1,
              letterSpacing: '-.01em',
            }}
          >
            {title}
          </h1>
        </div>

        {lede && (
          <p
            className="font-serif text-ink-muted m-0 leading-[1.8]"
            style={{ fontSize: '18px', maxWidth: '36ch', textWrap: 'pretty' }}
          >
            {lede}
          </p>
        )}
      </div>
    </header>
  )
}
