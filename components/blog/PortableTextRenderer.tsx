import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/react'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity/image'

const components = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p>{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3>{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote>{children}</blockquote>
    ),
  },
  marks: {
    code: ({ children }: { children?: React.ReactNode }) => (
      <code>{children}</code>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href?: string; blank?: boolean }
      children?: React.ReactNode
    }) => {
      const target = value?.blank ? '_blank' : undefined
      const rel = value?.blank ? 'noopener noreferrer' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          style={{ color: 'var(--accent)', borderBottom: '1px solid currentColor' }}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({
      value,
    }: {
      value: { asset: { _ref: string }; caption?: string; alt?: string }
    }) => {
      if (!value?.asset) return null
      const match = value.asset._ref.match(/-(\d+)x(\d+)-/)
      const width = match?.[1] ? parseInt(match[1]) : 1200
      const height = match?.[2] ? parseInt(match[2]) : 800
      return (
        <figure className="figure">
          <Image
            src={urlForImage(value.asset).url()}
            alt={value.alt ?? ''}
            width={width}
            height={height}
            className="w-full h-auto"
          />
          {value.caption && (
            <figcaption className="figure__cap">
              <span>{value.caption}</span>
            </figcaption>
          )}
        </figure>
      )
    },
    code: ({
      value,
    }: {
      value: { code?: string; language?: string }
    }) => (
      <pre>
        <code>{value.code}</code>
      </pre>
    ),
  },
}

export default function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />
}
