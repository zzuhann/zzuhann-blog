export default function HeroSection() {
  const now = new Date()
  const month = now.toLocaleString('en-US', { month: 'long' }).toUpperCase()
  const year = now.getFullYear()

  return (
    <section
      className="border-b border-border"
      style={{ padding: '96px 0 88px' }}
    >
      <div className="wrap">
        <div
          className="font-mono text-ink-soft uppercase flex gap-[14px] items-center"
          style={{ fontSize: '11px', letterSpacing: '.2em', marginBottom: '36px' }}
        >
          <span>ISSUE №.012</span>
          <span className="flex-1 h-px bg-border" />
          <span>{month} · {year}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[72px] items-end">
          <h1
            className="font-serif font-medium text-ink m-0"
            style={{
              fontSize: 'clamp(48px, 6vw, 88px)',
              lineHeight: 1.04,
              letterSpacing: '-.005em',
              fontFeatureSettings: '"palt"',
              textWrap: 'balance',
            }}
          >
            關於介面、<br />
            程式碼與{' '}
            <em
              className="not-italic font-normal text-accent"
              style={{ fontFamily: 'var(--font-latin-serif)', fontStyle: 'italic' }}
            >
              quiet
            </em>
            <br />
            的閱讀筆記。
          </h1>

          <div>
            <p
              className="text-ink-muted leading-[1.85] mb-8"
              style={{ fontSize: '16px', maxWidth: '34ch' }}
            >
              這是一份慢速更新的技術期刊。我寫關於前端架構、設計系統、以及每一個我無法停止思考的小細節。每篇文章都被當成印刷品在做。
            </p>

            <div
              className="flex flex-col gap-4 font-mono text-ink-soft uppercase"
              style={{ fontSize: '11px', letterSpacing: '.12em' }}
            >
              <MetaRow label="本期主題" value="邊界 / Boundaries" />
              <MetaRow label="已發行" value="012 期" />
              <MetaRow label="下期預定" value="2026.06.15" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex justify-between border-b text-ink-soft"
      style={{ padding: '12px 0', borderColor: 'var(--border)', borderStyle: 'dashed' }}
    >
      <span>{label}</span>
      <strong className="text-ink font-medium">{value}</strong>
    </div>
  )
}
