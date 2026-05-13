import Image from 'next/image'
import Link from 'next/link'
import SectionHead from '@/components/ui/SectionHead'

export default function AboutPreview() {
  return (
    <section style={{ padding: '64px 0' }}>
      <div className="wrap">
        <SectionHead
          chapterNum="CHAPTER 03"
          title="關於我"
          linkLabel="關於我 →"
          linkHref="/about"
        />

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-14 items-center">
          <div className="overflow-hidden" style={{ aspectRatio: '4/5', position: 'relative' }}>
            <Image
              src="/images/about-me.JPG"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p
              className="font-serif text-body mb-6 leading-[1.85]"
              style={{
                fontSize: '16px',
                fontFeatureSettings: '"palt"',
                letterSpacing: '.01em',
                textWrap: 'pretty',
              }}
            >
              約三年半前端工程師經驗，擅長 React, Next.js, TypeScript, Styled-Components, PandaCSS, etc. 希望做的產品服務可以解決使用者痛點，也能產生一些正面的影響。
              <br/>
              <br/>
              如果你有任何想法、或是需要前端工程師的諮詢或服務，都歡迎跟我說！詳細資訊可以在關於我頁面找到。
            </p>
            <Link
              href="/about"
              className="inline-block font-mono text-body uppercase border border-border hover:border-body transition-colors"
              style={{ fontSize: '11px', letterSpacing: '.16em', padding: '10px 20px' }}
            >
              關於我 →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
