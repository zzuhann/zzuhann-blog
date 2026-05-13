import type { Metadata } from 'next'
import { Noto_Sans_TC, Noto_Serif_TC } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const notoSerifTC = Noto_Serif_TC({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-serif-tc',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: "%s — zzuhann's space",
    default: "zzuhann's space",
  },
  description: '寫一些自己的想法和一些關於前端開發的想法筆記。生活有很多種模樣，想讓各式各樣的樣子都能夠被記錄下來。',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    siteName: "zzuhann's space",
    images: [{ url: '/images/og-banner.png', width: 1200, height: 630, alt: "zzuhann's space" }],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="zh-Hant"
      className={`${notoSansTC.variable} ${notoSerifTC.variable}`}
    >
      <body>{children}</body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  )
}
