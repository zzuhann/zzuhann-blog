'use client'

import { useState } from 'react'
import Link from 'next/link'

type NavItem = { href: string; label: string; num: string }

export default function MobileNav({ nav }: { nav: NavItem[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-label={open ? '關閉選單' : '開啟選單'}
        className="text-body-muted hover:text-body transition-colors p-1"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4l12 12M16 4L4 16" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 6h14M3 10h14M3 14h14" />
          </svg>
        )}
      </button>

      {open && (
        <div
          className="animate-slide-down absolute top-full left-0 right-0 border-b border-border"
          style={{ background: 'rgba(247,243,238,.96)', backdropFilter: 'blur(8px)' }}
        >
          <nav className="flex flex-col py-4">
            {nav.map(n => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-8 py-3 text-body-muted hover:text-body hover:bg-white/50 transition-colors"
              >
                <span
                  className="font-mono text-body-soft"
                  style={{ fontSize: '10px', letterSpacing: '.12em' }}
                >
                  {n.num}
                </span>
                <span style={{ fontSize: '15px', letterSpacing: '.02em' }}>{n.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
