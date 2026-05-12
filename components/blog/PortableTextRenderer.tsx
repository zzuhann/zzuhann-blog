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
        <a href={value?.href} target={target} rel={rel}>
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
      return (
        <figure className="figure">
          <div style={{ position: 'relative', aspectRatio: '16/9' }}>
            <Image
              src={urlForImage(value.asset).url()}
              alt={value.alt ?? ''}
              fill
              className="object-cover"
            />
          </div>
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
