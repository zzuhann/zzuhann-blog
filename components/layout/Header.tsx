import Link from 'next/link'
import MobileNav from './MobileNav'

const NAV = [
  { href: '/', label: '首頁', num: '01' },
  { href: '/blog', label: '文章', num: '02' },
  { href: '/projects', label: '專案', num: '03' },
  { href: '/about', label: '關於', num: '04' },
]

export default function Header() {
  return (
    <header
      className="border-b border-border sticky top-0 z-50"
      style={{
        background: 'rgba(247,243,238,.86)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="flex items-baseline justify-between"
        style={{ padding: '22px 32px', maxWidth: '84rem', margin: '0 auto' }}
      >
        <Link href="/" className="flex items-baseline gap-[14px] hover:no-underline">
          <span
            className="font-serif font-medium"
            style={{ fontSize: '19px', letterSpacing: '.02em', fontFeatureSettings: '"palt"', color: 'var(--text-body)' }}
          >
            之翰の備忘錄
          </span>
          <span
            className="font-mono text-ink-soft uppercase hidden sm:block"
            style={{ fontSize: '11px', letterSpacing: '.14em' }}
          >
            Editorial · est. 2019
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-baseline gap-8">
          {NAV.map(n => (
            <NavItem key={n.href} href={n.href} num={n.num} label={n.label} />
          ))}
        </nav>

        {/* Mobile nav */}
        <MobileNav nav={NAV} />
      </div>
    </header>
  )
}

function NavItem({ href, num, label }: { href: string; num: string; label: string }) {
  return (
    <Link
      href={href}
      className="relative text-ink-muted hover:text-ink-70 transition-colors"
      style={{ fontSize: '13.5px', letterSpacing: '.04em', padding: '4px 0' }}
    >
      <span
        className="font-mono text-ink-soft mr-1.5"
        style={{ fontSize: '10px', letterSpacing: '.1em' }}
      >
        {num}
      </span>
      {label}
    </Link>
  )
}
