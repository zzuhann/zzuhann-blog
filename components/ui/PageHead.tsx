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
        padding: '64px 0 44px',
        borderColor: 'var(--rule)',
        marginBottom: '48px',
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end"
      >
        <div>
          <p
            className="font-mono text-body-soft uppercase mb-5"
            style={{ fontSize: '11px', letterSpacing: '.22em' }}
          >
            {kicker}
          </p>
          <h1
            className="font-serif font-medium text-body m-0"
            style={{
              fontSize: 'clamp(36px, 4.5vw, 56px)',
              lineHeight: 1,
              letterSpacing: '-.01em',
            }}
          >
            {title}
          </h1>
        </div>

        {lede && (
          <p
            className="font-serif text-body-muted m-0 leading-[1.8]"
            style={{ fontSize: '16px', maxWidth: '38ch', textWrap: 'pretty' }}
          >
            {lede}
          </p>
        )}
      </div>
    </header>
  )
}
