export default function AboutSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section
      className="mt-14"
      style={{ paddingTop: '28px', borderTop: '1px solid var(--border)' }}
    >
      <h2
        className="font-mono text-ink-soft uppercase mb-5"
        style={{ fontSize: '11px', letterSpacing: '.2em', fontWeight: 400 }}
      >
        {label}
      </h2>
      {children}
    </section>
  )
}
