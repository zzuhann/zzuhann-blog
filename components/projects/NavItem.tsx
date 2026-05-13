export default function NavItem({ label, href, active }: { label: string; href: string; active?: boolean }) {
  return (
    <a
      href={href}
      className="font-mono uppercase border-t border-border py-2 transition-colors hover:no-underline"
      style={{
        fontSize: '11px',
        letterSpacing: '.14em',
        color: active ? 'var(--text)' : 'var(--text-soft)',
        display: 'block',
      }}
    >
      {active && '→ '}{label}
    </a>
  )
}
