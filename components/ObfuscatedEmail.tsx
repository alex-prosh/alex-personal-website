'use client'

import type { CSSProperties } from 'react'

interface Props {
  user: string
  domain: string
  className?: string
  style?: CSSProperties
}

export default function ObfuscatedEmail({ user, domain, className, style }: Props) {
  const email = `${user}@${domain}`
  return (
    <a href={`mailto:${email}`} className={className} style={style}>
      {email}
    </a>
  )
}
