'use client'

import { useEffect, useRef, useState } from 'react'
import { MEDIA_BASE, type AbcTask } from '@/content/abc-tasks'
import { formatHours } from './TaskName'

const RATES = [1, 2, 4, 8]

export default function EpisodeGallery({ tasks }: { tasks: AbcTask[] }) {
  const [rate, setRate] = useState(1)
  const videos = useRef(new Map<string, HTMLVideoElement>())

  // Clips use preload="none"; defaultPlaybackRate makes the rate survive the first load.
  useEffect(() => {
    videos.current.forEach((v) => {
      v.defaultPlaybackRate = rate
      v.playbackRate = rate
    })
  }, [rate])

  return (
    <div>
      <div className="speed-control" role="group" aria-label="Playback speed for all clips">
        <span>Speed</span>
        {RATES.map((r) => (
          <button key={r} type="button" aria-pressed={r === rate} onClick={() => setRate(r)}>
            {r}×
          </button>
        ))}
      </div>

      {tasks.map((task) => (
        <section key={task.slug} id={task.slug} style={{ borderTop: '1px solid var(--crimson)', padding: '28px 0 36px', scrollMarginTop: 16 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: 10 }}>
            {task.slug} · {task.trainDir}
          </div>
          <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>{task.name}</h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--subtitle)', margin: '0 0 10px' }}>
            {formatHours(task)} · {task.episodes.toLocaleString('en-US')} episodes of ABC training data
          </p>
          {task.rubric && (
            <p style={{ fontSize: 14, color: 'var(--subtitle)', lineHeight: 1.6, margin: 0, maxWidth: 640 }}>
              Rubric, max {task.rubric.max}
              {task.rubric.maxNote && ` (${task.rubric.maxNote})`}: {task.rubric.criteria}
            </p>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginTop: 20 }}>
            {task.samples.map((id) => {
              const file = `${MEDIA_BASE}/${task.slug}__${id}`
              return (
                <figure key={id} style={{ margin: 0 }}>
                  <video
                    ref={(el) => {
                      if (el) videos.current.set(file, el)
                      else videos.current.delete(file)
                    }}
                    src={`${file}.mp4`}
                    poster={`${file}.jpg`}
                    controls
                    muted
                    playsInline
                    preload="none"
                    style={{ width: '100%', aspectRatio: '4 / 3', display: 'block', background: 'var(--crimson-dark)' }}
                  />
                  <figcaption style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--subtitle)', marginTop: 8 }}>
                    episode {id}
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </section>
      ))}
      <div style={{ borderTop: '1px solid rgba(22,36,58,0.15)' }} />
    </div>
  )
}
