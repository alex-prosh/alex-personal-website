'use client'

import { usePathname } from 'next/navigation'
import ObfuscatedEmail from './ObfuscatedEmail'

export default function Footer() {
  const pathname = usePathname()
  if (pathname === '/cv') return null

  return (
    <footer>
      <span>Alex Proshkin · UC Berkeley</span>
      <ObfuscatedEmail user="pro" domain="berkeley.edu" />
    </footer>
  )
}
