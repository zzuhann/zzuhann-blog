import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="shell">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:font-mono focus:text-white focus:uppercase focus:rounded"
        style={{ background: 'var(--accent)', fontSize: '11px', letterSpacing: '.16em' }}
      >
        跳到主要內容
      </a>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
