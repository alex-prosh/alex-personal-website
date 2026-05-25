import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'CV · Alex Proshkin' }

export default function CVPage() {
  return (
    <div style={{ background: '#F3EEE5', minHeight: 'calc(100vh - 128px)' }}>
      <iframe
        src="https://docs.google.com/document/d/1UCArqmI-XQbuIc6W7-4O4TMiFVuWOJ_j/preview"
        style={{ width: '100%', height: 'calc(100vh - 128px)', border: 'none', display: 'block' }}
      />
    </div>
  )
}
