import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'DRS Asset Tracker · Alex Proshkin' }

const timeline = [
  {
    date: 'Feb 2023',
    title: 'Foundation',
    description: 'Established Firebase Firestore schema using a flattened, denormalized design — assets and locations stored separately to minimize data transfer per query. Proved WPA2-Enterprise WiFi auth on ESP32 for school-network integration.',
  },
  {
    date: 'Feb – Mar 2023',
    title: 'RFID Pipeline',
    description: 'Migrated M6E Nano comms from software to hardware serial (38400 baud, Serial2) for reliability. Built the full read-to-cloud pipeline: ESP32 deduplicates tags on a 2-second window, serializes with ArduinoJson, then HTTP POSTs to a local Flask endpoint which batch-writes to Firestore with server-side timestamps.',
  },
  {
    date: 'Mar 2023',
    title: 'Flutter App & Chassis v1',
    description: 'Flutter app with bottom-nav architecture — Profile, Assets, Map, Events Log. Designed and 3D printed the first PLA enclosure to house the breadboard, M6E reader, and power supply as a single portable unit.',
  },
  {
    date: 'Apr 2023',
    title: 'LED State Machine & Admin Panel',
    description: 'Non-blocking LED status feedback runs as a concurrent ESP32 task: green for normal operation, blue for WiFi loss, red for RFID module failure. Completed the Flutter admin control panel for live inventory management and tag-to-room assignment.',
  },
  {
    date: 'May 2023',
    title: 'Enclosure v3 & Map Integration',
    description: 'Third enclosure iteration with chamfered sensor mount and improved cable routing. Integrated flutter_map to visualise real-time asset locations across rooms on an interactive floor plan.',
  },
]

const decisions = [
  {
    challenge: 'High-frequency re-reads',
    solution: 'Two-second deduplication window in firmware using a map of last-seen timestamps per EPC. Eliminates redundant cloud writes without missing genuine tag re-entries.',
  },
  {
    challenge: 'Accurate timestamps on embedded hardware',
    solution: 'ESP32 syncs wall-clock time from the server on boot, accounting for network latency. All final timestamps are then applied server-side via Firestore transforms — single source of truth.',
  },
  {
    challenge: 'Blocking I/O in a tight read loop',
    solution: 'WiFi monitoring and LED updates run as separate FreeRTOS tasks on the ESP32, keeping the RFID polling loop non-blocking and responsive regardless of network state.',
  },
  {
    challenge: 'Unknown M6E baud rate at startup',
    solution: 'Firmware attempts target baud first, then falls back to 115200 bps during handshake. Handles different hardware configurations and power cycles gracefully.',
  },
]

export default function DRSPage() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--crimson)' }}>

      {/* ── Hero ── */}
      <div style={{ position: 'relative', width: '100%', height: '56vh', minHeight: 340, overflow: 'hidden', borderBottom: '2px solid var(--crimson)' }}>
        <img
          src="/images/drs/hardware2.jpg"
          alt=""
          style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--img-gradient)', mixBlendMode: 'screen', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(12,24,40,0.82) 0%, rgba(12,24,40,0.4) 55%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 44, left: 'min(14%, 200px)', color: '#DEE8EE', maxWidth: 520 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 14 }}>
            Systems Project · 2023
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 800, margin: '0 0 18px', lineHeight: 1.05 }}>
            DRS Asset<br />Tracker
          </h1>
          <p style={{ fontSize: 15, opacity: 0.75, margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-mono)' }}>
            RFID · ESP32 · Firebase · Flutter
          </p>
        </div>
      </div>

      {/* ── Overview ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, margin: '72px min(14%, 200px)', alignItems: 'start' }}>
        <div>
          <p style={{ fontSize: 22, lineHeight: 1.65, margin: 0 }}>
            A real-time asset tracking system built for an applied engineering team.
            UHF RFID tags on physical assets are scanned by an ESP32-powered reader,
            deduplicated in firmware, and streamed to Firebase — where a Flutter web
            app gives administrators a live view of every asset across every room.
          </p>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11, marginBottom: 8 }}>Role</div>
            <div>Systems Engineer — hardware, firmware, Firebase schema</div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11, marginBottom: 8 }}>Team</div>
            <div>Applied Engineering Team, 2022–23</div>
          </div>
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11, marginBottom: 8 }}>Stack</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
              {['ESP32', 'M6E Nano (UHF)', 'Arduino C++', 'Firebase', 'Flutter/Dart', 'FreeRTOS'].map(s => (
                <span key={s} style={{ fontSize: 11, padding: '3px 9px', border: '1px solid rgba(22,36,58,0.3)', letterSpacing: '0.03em' }}>{s}</span>
              ))}
            </div>
          </div>
          <a
            href="https://github.com/alex-prosh/DRS-Asset-Tracker-public"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 13 }}
          >
            View on GitHub →
          </a>
        </div>
      </div>

      {/* ── Architecture Pipeline ── */}
      <div style={{ borderTop: '1px solid rgba(22,36,58,0.15)', borderBottom: '1px solid rgba(22,36,58,0.15)', background: '#DEE8EE', padding: '56px min(14%, 200px)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 40 }}>
          System Architecture
        </div>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, overflowX: 'auto' }}>
          {[
            { layer: '01', label: 'RFID Tags', detail: 'UHF EPC tags attached to physical assets' },
            { layer: '02', label: 'M6E Nano', detail: 'SparkFun UHF reader, 5 dBm, N. America band' },
            { layer: '03', label: 'ESP32', detail: 'Hardware serial, FreeRTOS tasks, 2s dedup, ArduinoJson' },
            { layer: '04', label: 'Firebase', detail: 'Firestore batch writes, server timestamps, flattened schema' },
            { layer: '05', label: 'Flutter App', detail: 'Assets, Map, Events Log, Admin panel — iOS/Android/Web' },
          ].map((item, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'stretch' }}>
              <div style={{ padding: '20px 28px', minWidth: 160 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', marginBottom: 6 }}>{item.layer}</div>
                <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>{item.label}</div>
                <div style={{ fontSize: 12, opacity: 0.65, lineHeight: 1.5, fontFamily: 'var(--font-mono)' }}>{item.detail}</div>
              </div>
              {i < arr.length - 1 && (
                <div style={{ display: 'flex', alignItems: 'center', padding: '0 4px', color: 'var(--gold)', fontSize: 18, opacity: 0.5 }}>→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Technical Decisions ── */}
      <div style={{ margin: '72px min(14%, 200px)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 40 }}>
          Key Design Decisions
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {decisions.map((d, i) => (
            <div key={i} style={{ borderTop: '2px solid var(--crimson)', paddingTop: 20 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gold)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Problem
              </div>
              <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 14 }}>{d.challenge}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gold)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Solution
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.65, opacity: 0.8 }}>{d.solution}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Timeline ── */}
      <div style={{ borderTop: '1px solid rgba(22,36,58,0.15)', padding: '72px min(14%, 200px)', background: '#DEE8EE' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 48 }}>
          Development Timeline
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 104, top: 8, bottom: 8, width: 1, background: 'rgba(22,36,58,0.18)' }} />
          {timeline.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 40, marginBottom: 48, alignItems: 'flex-start' }}>
              <div style={{ width: 80, flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)', paddingTop: 3, textAlign: 'right', lineHeight: 1.4 }}>
                {item.date}
              </div>
              <div style={{ flexShrink: 0, width: 10, height: 10, borderRadius: '50%', background: 'var(--crimson)', marginTop: 5, position: 'relative', zIndex: 1 }} />
              <div style={{ maxWidth: 580 }}>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 14, opacity: 0.75, lineHeight: 1.7 }}>{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Photos ── */}
      <div style={{ display: 'flex', borderTop: '2px solid var(--crimson)', borderBottom: '2px solid var(--crimson)' }}>
        <div style={{ width: '50%', position: 'relative', overflow: 'hidden', borderRight: '1px solid var(--crimson)', aspectRatio: '3/4' }}>
          <img src="/images/drs/hardware1.jpg" alt="Hardware breadboard close-up" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'center center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--img-gradient)', mixBlendMode: 'screen', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 12, left: 16, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(222,232,238,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            ESP32 + M6E Nano on breadboard
          </div>
        </div>
        <div style={{ width: '50%', position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}>
          <img src="/images/drs/hardware2.jpg" alt="Full hardware assembly" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'center center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--img-gradient)', mixBlendMode: 'screen', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 12, left: 16, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(222,232,238,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Full assembly with power supply
          </div>
        </div>
      </div>

      {/* ── GitHub CTA ── */}
      <div style={{ padding: '64px min(14%, 200px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid var(--crimson)' }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Explore the source</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, opacity: 0.6 }}>
            Firmware, Flutter app, Firebase schema, 3D print files
          </div>
        </div>
        <a
          href="https://github.com/alex-prosh/DRS-Asset-Tracker-public"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700,
            color: 'var(--bg)', background: 'var(--crimson)',
            padding: '14px 28px', display: 'inline-block',
            textDecoration: 'none', flexShrink: 0,
            transition: 'background 0.15s ease',
          }}
        >
          GitHub →
        </a>
      </div>

      <div style={{ height: 64 }} />
    </div>
  )
}
