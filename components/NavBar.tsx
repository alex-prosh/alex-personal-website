import Link from 'next/link'

export default function NavBar() {
  return (
    <nav>
      <div id="div-upper">
        <Link href="/"><img src="/images/logo.png" alt="Alex Proshkin" style={{ cursor: 'pointer' }} /></Link>
        <Link href="/">Alex<span style={{ color: 'var(--gold)' }}>ander</span><br />Pro<span style={{ color: 'var(--gold)' }}>shkin</span></Link>
      </div>
      <div id="div-lower">
        <div className="div-left" />
        <div className="div-right">
          <div className="nav-item"><Link href="/">Home</Link></div>
          <div className="nav-item"><Link href="/cv">CV</Link></div>
          <div className="nav-item"><Link href="/contact">Contact</Link></div>
          <div className="nav-item nav-highlight"><Link href="/blog">Writing</Link></div>
        </div>
      </div>
    </nav>
  )
}
