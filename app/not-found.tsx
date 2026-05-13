import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{ padding: '120px 0 160px' }}>
      <div className="wrap-read text-center">
        <p
          className="font-mono text-body-soft uppercase mb-8"
          style={{ fontSize: '11px', letterSpacing: '.22em' }}
        >
          404 · NOT FOUND
        </p>
        <h1
          className="font-serif font-medium text-body mb-6"
          style={{ fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: 1, margin: '0 0 24px' }}
        >
          找不到這頁。
        </h1>
        <p className="text-body-muted mb-10" style={{ fontSize: '16px' }}>
          這個頁面不存在，或已經被移動了。
        </p>
        <Link
          href="/"
          className="font-mono text-body uppercase border-b border-body pb-0.5 hover:text-accent hover:border-accent transition-colors"
          style={{ fontSize: '11px', letterSpacing: '.15em' }}
        >
          回到首頁 →
        </Link>
      </div>
    </main>
  )
}
