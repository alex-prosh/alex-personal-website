import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Writing · Alex Proshkin' }

export default function BlogPage() {
  return (
    <div id="bio">
      <div id="bio-upper">
        <p>Writing</p>
      </div>
      <div id="bio-lower">
        <p>Coming soon.</p>
      </div>
    </div>
  )
}
