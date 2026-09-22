import type { Metadata } from 'next'
import Link from 'next/link'
import { internalPages } from '@/content/internal'

export const metadata: Metadata = { title: 'Internal · Alex Proshkin' }

export default function InternalIndexPage() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--crimson)' }}>
      <div id="bio-upper">
        <p>Internal</p>
      </div>

      <div style={{ margin: '56px min(14%, 200px)' }}>
        {internalPages.map((p) => (
          <Link key={p.href} href={p.href} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
            <div
              style={{
                borderTop: '1px solid var(--crimson)',
                padding: '28px 0',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 32,
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                  {p.tag} · {p.date}
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 10, color: 'var(--title)' }}>{p.title}</div>
                <div style={{ fontSize: 14, color: 'var(--subtitle)', lineHeight: 1.6, maxWidth: 560 }}>{p.summary}</div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>
                Open →
              </div>
            </div>
          </Link>
        ))}
        <div style={{ borderTop: '1px solid rgba(22,36,58,0.15)' }} />
      </div>
    </div>
  )
}
