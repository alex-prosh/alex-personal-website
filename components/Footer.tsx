import ObfuscatedEmail from './ObfuscatedEmail'

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="mx-auto max-w-3xl px-6 py-6 flex justify-between items-center">
        <span className="text-xs text-muted">Alex Pro · UC Berkeley</span>
        <ObfuscatedEmail
          user="pro"
          domain="berkeley.edu"
          className="text-xs text-muted hover:text-accent transition-colors"
        />
      </div>
    </footer>
  )
}
