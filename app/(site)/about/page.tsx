import type { Metadata } from 'next'
import { getClient } from '@/lib/sanity/client'
import { ABOUT_QUERY } from '@/lib/sanity/queries'
import type { About } from '@/lib/sanity/types'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity/image'
import PortableTextRenderer from '@/components/blog/PortableTextRenderer'
import type { PortableTextBlock } from '@portabletext/react'

export const metadata: Metadata = {
  title: '關於我',
  description: '約三年半前端工程師經驗，擅長 React, Next.js, TypeScript, Styled-Components, PandaCSS, etc. 希望做的產品服務可以解決使用者痛點，也能產生一些正面的影響。',
}

export default async function AboutPage() {
  const about = await getClient().fetch<About | null>(ABOUT_QUERY)

  return (
    <main id="main-content" tabIndex={-1} className="flex flex-col flex-1">

      {/* Intro — mirrors HeroSection */}
      <section className="border-b border-border" style={{ padding: '40px 0' }}>
        <div className="wrap">
          <div
            className="font-mono text-ink-soft uppercase flex gap-[14px] items-center"
            style={{ fontSize: '11px', letterSpacing: '.2em', marginBottom: '36px' }}
          >
            <span>ABOUT ME</span>
            <span className="flex-1 h-px bg-border" />
            <span>ZZUHANN</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] items-end">
            <div>
              {about?.portrait && (
                <div style={{ position: 'relative', aspectRatio: '4/5', maxHeight: '480px' }}>
                  <Image
                    src={urlForImage(about.portrait.asset).url()}
                    alt="me-portrait"
                    fill
                    className="object-cover"
                    style={{ border: '1px solid var(--border)' }}
                  />
                </div>
              )}
             
            </div>

            <div>

              <div className="font-serif leading-[1.85] [&_p]:mb-[2em] [&_p:last-child]:mb-0" style={{ fontSize: '16px', color: 'var(--text-body)' }}>
                {about?.intro && (
                  <PortableTextRenderer value={about.intro as PortableTextBlock[]} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CV */}
      <section style={{ padding: '60px 0' }}>
        <div className="wrap">
          <div className="pb-4 mb-10 border-b border-border">
            <h2
              className="font-serif font-normal m-0"
              style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', letterSpacing: '-.005em', color: 'var(--text-body)' }}
            >
              EXPERIENCE · 經歷
            </h2>
          </div>
          <div className="flex flex-col">
            {about?.cv?.map((row, i) => (
              <div
                key={i}
                className="grid gap-6 py-4 border-b border-border items-baseline"
                style={{ gridTemplateColumns: '90px 1fr 1fr' }}
              >
                <span className="font-mono text-ink-soft" style={{ fontSize: '12px', letterSpacing: '.1em' }}>
                  {row.period}
                </span>
                <span className="font-serif font-normal" style={{ fontSize: '16px', color: 'var(--text-body)' }}>
                  {row.role}
                </span>
                <span className="text-ink-muted" style={{ fontSize: '13.5px' }}>
                  {row.place}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration */}
      <section className="flex-1" style={{ padding: '40px 0', background: 'var(--bg-soft)' }}>
        <div className="wrap">
          <div className="pb-4 mb-10 border-b border-border">
            <h2
              className="font-serif font-normal m-0"
              style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', letterSpacing: '-.005em', color: 'var(--text-body)' }}
            >
              COLLABORATION · 合作
            </h2>
          </div>
          <div className="font-serif leading-[1.9] [&_p]:mb-[2em] [&_p:last-child]:mb-0 max-w-[38ch] md:max-w-none" style={{ fontSize: '16px', color: 'var(--text-body)' }}>
            {about?.collaboration && (
              <PortableTextRenderer value={about.collaboration as PortableTextBlock[]} />
            )}
          </div>
        </div>
      </section>

    </main>
  )
}
