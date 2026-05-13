export default function Tag({ label }: { label: string }) {
  return (
    <span
      className="font-mono text-body-soft uppercase"
      style={{ fontSize: '10.5px', letterSpacing: '.14em' }}
    >
      {label}
    </span>
  )
}
