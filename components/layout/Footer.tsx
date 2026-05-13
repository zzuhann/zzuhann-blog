import Link from 'next/link'

const NAV = [
  { href: '/', label: '首頁' },
  { href: '/blog', label: '文章' },
  { href: '/projects', label: '專案' },
  { href: '/about', label: '關於' },
]

export default function Footer() {
  return (
    <footer
      className="border-t border-border pb-14"
      style={{ background: 'var(--bg-soft)', paddingTop: 'calc(56px + 120px)' }}
    >
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          <div>
            <p
              className="font-serif mb-2.5"
              style={{ fontSize: '22px', color: 'var(--text-body)' }}
            >
              zzuhann&apos;s space
            </p>
          </div>

          <FooterCol title="瀏覽">
            {NAV.map(n => (
              <li key={n.href}>
                <Link href={n.href} className="text-ink-muted hover:text-accent transition-colors">
                  {n.label}
                </Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="聯絡">
            <li>
              <a href="mailto:zzuhanlin@gmail.com" className="text-ink-muted hover:text-accent transition-colors">
                zzuhanlin@gmail.com
              </a>
            </li>
            <li><span className="text-ink-muted">GitHub</span></li>
          </FooterCol>
        </div>

        <div
          className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-2 font-mono text-ink-soft"
          style={{ fontSize: '11px', letterSpacing: '.08em' }}
        >
          <span>© 2019—2026 CHIH-HAN CHEN</span>
          <span className="hidden sm:block">SET IN NOTO SERIF TC · NOTO SANS TC</span>
          <span>EDITORIAL · est. 2019</span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p
        className="font-mono text-ink-soft uppercase mb-[18px]"
        style={{ fontSize: '10px', letterSpacing: '.18em' }}
      >
        {title}
      </p>
      <ul
        className="list-none m-0 p-0 flex flex-col gap-2.5 text-ink-muted"
        style={{ fontSize: '14px' }}
      >
        {children}
      </ul>
    </div>
  )
}
