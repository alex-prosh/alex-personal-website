import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Writing · Alex Proshkin' }

const pieces = [
  {
    title: 'Exponentiation by Matrices',
    subtitle: 'Solving systems of differential equations through eigendecomposition and phase-plane visualization.',
    tag: 'Mathematics',
    year: 2023,
    href: '/blog/matrix-exponents',
  },
]

export default function BlogPage() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--crimson)' }}>
      <div id="bio-upper">
        <p>Writing</p>
      </div>

      <div style={{ margin: '56px min(14%, 200px)' }}>
        {pieces.map((p, i) => (
          <Link key={i} href={p.href} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
            <div
              style={{
                borderTop: '2px solid var(--crimson)',
                padding: '28px 0',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 32,
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                  {p.tag} · {p.year}
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>{p.title}</div>
                <div style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.6, maxWidth: 560 }}>{p.subtitle}</div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>
                Read →
              </div>
            </div>
          </Link>
        ))}
        <div style={{ borderTop: '1px solid rgba(22,36,58,0.15)' }} />
      </div>
    </div>
  )
}
