export default function Tag({ label }: { label: string }) {
  return (
    <span
      className="font-mono text-ink-soft uppercase"
      style={{ fontSize: '10.5px', letterSpacing: '.14em' }}
    >
      {label}
    </span>
  )
}
