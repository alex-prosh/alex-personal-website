import type { Metadata } from 'next'

// Everything under /internal is unlisted: nothing on the site links here,
// and these pages are kept out of search indexes.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return children
}
