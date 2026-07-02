'use client'

import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'

interface Props {
  user: string
  domain: string
  className?: string
  style?: CSSProperties
}

export default function ObfuscatedEmail({ user, domain, className, style }: Props) {
  // Assembled only after mount so the address never appears in server-rendered HTML
  const [email, setEmail] = useState('')
  useEffect(() => {
    setEmail(`${user}@${domain}`)
  }, [user, domain])

  if (!email) return null
  return (
    <a href={`mailto:${email}`} className={className} style={style}>
      {email}
    </a>
  )
}
