import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'CV · Alex Pro' }

export default function CVPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-14 pb-20">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-2xl font-semibold tracking-tight">CV</h1>
        <a
          href="/cv.pdf"
          download
          className="text-sm text-white bg-accent hover:bg-[#9a6a3a] transition-colors px-4 py-2 rounded"
        >
          Download PDF
        </a>
      </div>

      <section className="mb-10">
        <p className="text-[10px] tracking-widest uppercase text-accent font-semibold mb-4">
          Education
        </p>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-medium">PhD, Robotics</span>
              <span className="text-xs text-muted">2023 – present</span>
            </div>
            <p className="text-xs text-muted">UC Berkeley</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <p className="text-[10px] tracking-widest uppercase text-accent font-semibold mb-4">
          Experience
        </p>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-medium">Research Intern</span>
              <span className="text-xs text-muted">Summer 2024</span>
            </div>
            <p className="text-xs text-muted">Company Name</p>
          </div>
        </div>
      </section>
    </div>
  )
}
