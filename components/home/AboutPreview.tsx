import Link from 'next/link'
import SectionHead from '@/components/ui/SectionHead'

export default function AboutPreview() {
  return (
    <section style={{ padding: '88px 0' }}>
      <div className="wrap">
        <SectionHead
          chapterNum="CHAPTER 03"
          title="關於作者"
          subtitle="一段簡短的自我介紹。完整版本請看「關於」頁面。"
          linkLabel="完整簡介 →"
          linkHref="/about"
        />

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-14 items-start">
          <div
            className="flex items-center justify-center text-ink-soft font-mono uppercase"
            style={{
              aspectRatio: '4/5',
              background: 'repeating-linear-gradient(135deg, #EDE7DD 0 6px, #E6E0D8 6px 12px)',
              border: '1px solid var(--border)',
              fontSize: '10.5px',
              letterSpacing: '.16em',
            }}
          >
            PORTRAIT / 4×5
          </div>

          <div>
            <p
              className="font-serif text-ink mb-6 leading-[1.85]"
              style={{
                fontSize: '20px',
                fontFeatureSettings: '"palt"',
                letterSpacing: '.01em',
                textWrap: 'pretty',
              }}
            >
              前端工程師，主要在做設計系統與介面架構。最近幾年的工作集中在大型應用的排版品質與元件系統。
            </p>
            <p
              className="font-serif text-ink-muted leading-[1.85]"
              style={{
                fontSize: '20px',
                fontFeatureSettings: '"palt"',
                letterSpacing: '.01em',
                textWrap: 'pretty',
              }}
            >
              我把這個網站當成一份個人期刊在維護——主題不限，但都會經過很多次重寫才發布。如果你在做有趣的事，歡迎來信。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
