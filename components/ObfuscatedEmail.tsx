'use client'

interface Props {
  user: string
  domain: string
  className?: string
}

export default function ObfuscatedEmail({ user, domain, className }: Props) {
  const email = `${user}@${domain}`
  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  )
}
