import Image from 'next/image'

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
          className="font-mono text-body-soft uppercase flex gap-[14px] items-center"
          style={{ fontSize: '11px', letterSpacing: '.2em', marginBottom: '36px' }}
        >
          <span>ISSUE №.001</span>
          <span className="flex-1 h-px bg-border" />
          <span>{month} · {year}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[72px] items-end">
          <div
            className="w-full overflow-hidden"
            style={{ aspectRatio: '3 / 4', maxHeight: '480px', position: 'relative' }}
          >
            <Image
              src="/images/hero-banner.JPG"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <p
              className="text-body-muted leading-[1.85] mb-8"
              style={{ fontSize: '16px', maxWidth: '34ch' }}
            >
              寫一些自己的想法和一些關於前端開發的想法筆記。生活有很多種模樣，想讓各式各樣的樣子都能夠被記錄下來。
            </p>

            <div
              className="flex flex-col gap-4 font-mono text-body-soft uppercase"
              style={{ fontSize: '11px', letterSpacing: '.12em' }}
            >
              <MetaRow label="本期主題" value="[STELLAR 開發日記] STELLAR — 台灣生日應援地圖誕生！" />
              <MetaRow label="已發行" value="001 期" />
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
      className="flex justify-between border-b text-body-soft"
      style={{ padding: '12px 0', borderColor: 'var(--border)', borderStyle: 'dashed' }}
    >
      <span className="shrink-0">{label}</span>
      <strong className="text-body font-medium text-right">{value}</strong>
    </div>
  )
}
