import type { Metadata } from 'next'
import { getClient } from '@/lib/sanity/client'
import { ABOUT_QUERY } from '@/lib/sanity/queries'
import type { About } from '@/lib/sanity/types'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity/image'
import PortableTextRenderer from '@/components/blog/PortableTextRenderer'
import type { PortableTextBlock } from '@portabletext/react'

export const metadata: Metadata = {
  title: '關於',
  description: '前端工程師，主要在做設計系統與介面架構。',
}

export default async function AboutPage() {
  const about = await getClient().fetch<About | null>(ABOUT_QUERY)

  const name = about?.name ?? '之翰'
  const nameEn = about?.nameEn ?? 'Software designer & writer.'
  const email = about?.email ?? 'zzuhanlin@gmail.com'

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="wrap">
        <span
          className="font-mono text-ink-soft uppercase"
          style={{ display: 'block', fontSize: '11px', letterSpacing: '.14em', padding: '12px 0 24px' }}
        >
          ABOUT · 關於
        </span>

        <div
          className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-[72px]"
          style={{ paddingBottom: '40px' }}
        >
          {/* Left sticky column */}
          <aside style={{ position: 'sticky', top: '88px', alignSelf: 'start' }}>
            {about?.portrait ? (
              <div style={{ position: 'relative', aspectRatio: '4/5', marginBottom: '20px' }}>
                <Image
                  src={urlForImage(about.portrait.asset).url()}
                  alt={name}
                  fill
                  className="object-cover"
                  style={{ border: '1px solid var(--border)' }}
                />
              </div>
            ) : (
              <div
                className="flex items-center justify-center text-ink-soft font-mono uppercase"
                style={{
                  aspectRatio: '4/5',
                  background: 'repeating-linear-gradient(135deg, #EDE7DD 0 6px, #E6E0D8 6px 12px)',
                  border: '1px solid var(--border)',
                  fontSize: '11px',
                  letterSpacing: '.16em',
                  marginBottom: '20px',
                  textAlign: 'center',
                }}
              >
                PORTRAIT<br />4 × 5
              </div>
            )}
            <p
              className="font-mono text-ink-soft uppercase"
              style={{ fontSize: '10.5px', letterSpacing: '.12em' }}
            >
              Photographed in Taipei, 2025
            </p>
          </aside>

          {/* Right content */}
          <div>
            <h1
              className="font-serif font-medium text-ink"
              style={{ fontSize: '48px', margin: '0 0 4px', lineHeight: 1.1, letterSpacing: '-.005em' }}
            >
              {name}
            </h1>
            <p
              className="text-accent mb-10"
              style={{
                fontFamily: 'var(--font-latin-serif)',
                fontStyle: 'italic',
                fontSize: '22px',
                margin: '0 0 40px',
              }}
            >
              {nameEn}
            </p>

            <div className="font-serif text-ink leading-[1.9] mb-14" style={{ fontSize: '19px' }}>
              {about?.intro ? (
                <PortableTextRenderer value={about.intro as PortableTextBlock[]} />
              ) : (
                <>
                  <p style={{ marginBottom: '1.2em', textWrap: 'pretty' }}>
                    前端工程師，主要做設計系統與介面架構。過去十幾年的職涯大概可以分成兩段：前幾年以為自己在做「網頁」；後幾年發現自己其實在做「印刷品」，只是換了一個媒介。
                  </p>
                  <p style={{ marginBottom: '1.2em', textWrap: 'pretty' }}>
                    這個網站是我用來整理思考的地方。每篇文章發布前都會經過至少三次重寫，所以更新得不快——但每一篇我都還算滿意。
                  </p>
                </>
              )}
            </div>

            {/* CV */}
            <AboutSection label="EXPERIENCE · 經歷">
              <div className="flex flex-col">
                {(about?.cv ?? [
                  { period: '2023—', role: 'Principal Engineer', place: '某新加坡 SaaS · 遠端' },
                  { period: '2020—23', role: 'Design Systems Lead', place: 'Pinkoi · 台北' },
                  { period: '2017—20', role: 'Senior Frontend Engineer', place: '17LIVE · 台北' },
                  { period: '2014—17', role: 'Frontend Engineer', place: 'Self-employed' },
                ]).map((row, i) => (
                  <div
                    key={i}
                    className="grid gap-6 py-4 border-b border-border items-baseline"
                    style={{ gridTemplateColumns: '90px 1fr 1fr', fontSize: '14.5px' }}
                  >
                    <span className="font-mono text-ink-soft" style={{ fontSize: '12px', letterSpacing: '.1em' }}>
                      {row.period}
                    </span>
                    <span className="font-serif font-medium text-ink" style={{ fontSize: '16px' }}>
                      {row.role}
                    </span>
                    <span className="text-ink-muted" style={{ fontSize: '13.5px' }}>
                      {row.place}
                    </span>
                  </div>
                ))}
              </div>
            </AboutSection>

            {/* Values */}
            <AboutSection label="VALUES · 工作裡在意的事">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(about?.values ?? [
                  { num: 'i.', title: '克制優於完整', desc: '與其讓系統支援所有可能性，不如清楚劃出「我們不做什麼」。系統的形狀來自被刪掉的部分。' },
                  { num: 'ii.', title: '排版是介面的骨架', desc: '字級、行高、留白能決定一個產品是否能讓人安心使用。排版不是裝飾，是結構。' },
                  { num: 'iii.', title: '慢更新但長壽', desc: '寧可一年寫八篇還行的文章，也不要一個月寫一篇 listicle。網路不缺急著被讀的東西。' },
                  { num: 'iv.', title: '為自己做的工具最好用', desc: '每一個我長期維護的工具，都是自己日常會用的東西。沒有這個前提，工具會很快變壞。' },
                ]).map((v, i) => (
                  <div key={i}>
                    <p
                      className="text-accent"
                      style={{ fontFamily: 'var(--font-latin-serif)', fontStyle: 'italic', fontSize: '32px', lineHeight: 1, marginBottom: '8px' }}
                    >
                      {v.num}
                    </p>
                    <h3
                      className="font-serif font-medium text-ink"
                      style={{ fontSize: '18px', margin: '0 0 8px' }}
                    >
                      {v.title}
                    </h3>
                    <p
                      className="text-ink-muted leading-[1.7] m-0"
                      style={{ fontSize: '14px' }}
                    >
                      {v.desc}
                    </p>
                  </div>
                ))}
              </div>
            </AboutSection>

            {/* Collaboration */}
            <AboutSection label="COLLABORATION · 合作">
              <div className="font-serif text-ink leading-[1.9]" style={{ fontSize: '19px' }}>
                {about?.collaboration ? (
                  <PortableTextRenderer value={about.collaboration as PortableTextBlock[]} />
                ) : (
                  <>
                    <p style={{ marginBottom: '1.2em' }}>
                      目前接受小規模的顧問與寫作合作——主要是設計系統、前端架構評估、與技術書寫的協助。每月最多一個案子。
                    </p>
                    <p>
                      來信請寄至{' '}
                      <a
                        href={`mailto:${email}`}
                        style={{ color: 'var(--accent)', borderBottom: '1px solid var(--accent)' }}
                      >
                        {email}
                      </a>
                      。請附上你的專案脈絡與大概的時程，這對於我判斷能否幫上忙非常重要。
                    </p>
                  </>
                )}
              </div>
            </AboutSection>
          </div>
        </div>
      </div>
    </main>
  )
}

function AboutSection({ label, children }: { label: string; children: React.ReactNode }) {
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
