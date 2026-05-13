export default function FactRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div
      className="grid gap-6 py-3 border-b"
      style={{
        gridTemplateColumns: '100px 1fr',
        borderStyle: 'dashed',
        borderColor: 'var(--border)',
        fontSize: '13.5px',
        alignItems: 'baseline',
      }}
    >
      <span
        className="font-mono text-body-soft uppercase"
        style={{ fontSize: '10.5px', letterSpacing: '.16em' }}
      >
        {label}
      </span>
      <span className="text-body">{value}</span>
    </div>
  )
}
