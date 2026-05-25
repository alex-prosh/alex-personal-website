import Link from 'next/link'

const links = [
  { label: 'About', href: '/' },
  { label: 'Research', href: '/research' },
  { label: 'Publications', href: '/publications' },
  { label: 'Blog', href: '/blog' },
  { label: 'CV', href: '/cv' },
]

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 h-14">
        <Link href="/" className="text-sm font-semibold text-[#1c1c1c] tracking-tight">
          Alex Pro
        </Link>
        <div className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-muted hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
