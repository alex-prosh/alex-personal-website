import ObfuscatedEmail from './ObfuscatedEmail'

export default function Footer() {
  return (
    <footer>
      <span>Alex Proshkin · UC Berkeley</span>
      <ObfuscatedEmail user="pro" domain="berkeley.edu" />
    </footer>
  )
}
