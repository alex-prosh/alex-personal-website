import type { Metadata } from 'next'
import ObfuscatedEmail from '@/components/ObfuscatedEmail'

export const metadata: Metadata = { title: 'Contact · Alex Proshkin' }

export default function ContactPage() {
  return (
    <div id="contact-hero">
      <img src="/images/hermes.png" alt="" />
      <div id="contact">
        <div id="contact-upper">
          <p>Contact</p>
        </div>
        <div id="contact-lower">
          <p>
            Feel free to reach out at{' '}
            <ObfuscatedEmail user="pro" domain="berkeley.edu" style={{ color: 'var(--gold)', fontWeight: 700 }} />.
            I typically reply within 24 hours. I am open to research
            discussions, collaboration, and opportunities in robotics and AI.
          </p>
        </div>
      </div>
    </div>
  )
}
