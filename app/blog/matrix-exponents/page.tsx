import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Exponentiation by Matrices · Alex Proshkin' }

const codeSnippets = {
  decompose: `def generate_matrix(eigenvectors, eigenvalues):
    V      = np.array(eigenvectors).T   # columns are eigenvectors
    V_inv  = np.linalg.inv(V)
    Lambda = np.diag(eigenvalues)
    return V @ Lambda @ V_inv           # A = V Λ V⁻¹`,

  vectorField: `# Build direction field for  ẋ = Ax
X, Y = np.meshgrid(np.arange(-15, 16), np.arange(-15, 16))
U = A[0,0]*X + A[0,1]*Y
V = A[1,0]*X + A[1,1]*Y
mag = np.hypot(U, V)
ax.quiver(X, Y, U/mag, V/mag, pivot='mid')`,

  eulerPath: `def generate_path(x0, A, steps=1000):
    path = [x0]
    for _ in range(steps):                  # forward
        x = path[-1]
        path.append(x + A @ x / 100)
    # also integrate backward for full portrait
    return np.array(path)`,
}

const eigenCases = [
  {
    type: 'Stable node',
    condition: 'λ₁ < λ₂ < 0',
    behavior: 'All trajectories converge to the origin. The system is asymptotically stable.',
    color: '#2E7D52',
  },
  {
    type: 'Unstable node',
    condition: '0 < λ₁ < λ₂',
    behavior: 'All trajectories diverge from the origin to infinity. The system is unstable.',
    color: '#8B3A3A',
  },
  {
    type: 'Saddle point',
    condition: 'λ₁ < 0 < λ₂',
    behavior: 'Trajectories approach along one eigenvector axis and escape along the other.',
    color: '#7A6A2A',
  },
  {
    type: 'Center / spiral',
    condition: 'λ = α ± βi',
    behavior: 'Complex eigenvalues produce rotation. Pure imaginary gives closed orbits; real part determines stability.',
    color: '#2A4A7A',
  },
]

export default function MatrixExponentsPage() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--crimson)' }}>

      {/* ── Header ── */}
      <div style={{ borderBottom: '2px solid var(--crimson)', padding: '56px min(14%, 200px) 48px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
          Mathematics · 2023
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 800, margin: '0 0 20px', lineHeight: 1.05, maxWidth: 720 }}>
          Exponentiation<br />by Matrices
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, opacity: 0.6, margin: '0 0 0', maxWidth: 560, lineHeight: 1.7 }}>
          Solving systems of differential equations through eigendecomposition and phase-plane visualization.
          Built for Advanced Topics Math, 2023.
        </p>
      </div>

      {/* ── Lead ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, margin: '64px min(14%, 200px)' }}>
        <div>
          <p style={{ fontSize: 20, lineHeight: 1.75, margin: 0 }}>
            A 2×2 matrix applied repeatedly to a vector traces a path through the plane.
            When the matrix encodes a rate of change, that path is the solution to a differential
            equation. This project investigates how eigendecomposition turns that path into
            a closed-form expression, and what phase portraits reveal about long-term behavior.
          </p>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11, marginBottom: 8 }}>Context</div>
            <div>Advanced Topics Mathematics, senior year</div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11, marginBottom: 8 }}>Tools</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
              {['Python', 'NumPy', 'Matplotlib', 'ipywidgets', 'Euler\'s Method'].map(s => (
                <span key={s} style={{ fontSize: 11, padding: '3px 9px', border: '1px solid rgba(22,36,58,0.3)', letterSpacing: '0.03em' }}>{s}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11, marginBottom: 8 }}>Topics</div>
            <div>Eigendecomposition, matrix exponential, phase planes, ODEs</div>
          </div>
        </div>
      </div>

      {/* ── Core Concept ── */}
      <div style={{ background: '#F3EFE4', borderTop: '1px solid rgba(22,36,58,0.12)', borderBottom: '1px solid rgba(22,36,58,0.12)', padding: '64px min(14%, 200px)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 40 }}>
          The Core Idea
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.75, marginTop: 0 }}>
              A linear system of differential equations takes the form <strong>ẋ = Ax</strong>,
              where A is a constant matrix and x is a vector of unknowns. The solution is
              the <em>matrix exponential</em>: x(t) = e^(At) · x(0).
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.75 }}>
              Computing e^(At) directly is expensive. Eigendecomposition gives a shortcut.
              If A = VΛV⁻¹, then e^(At) = V · diag(e^(λ₁t), e^(λ₂t)) · V⁻¹. The matrix
              exponential reduces to scalar exponentials on the diagonal, one per eigenvalue.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.75, marginBottom: 0 }}>
              This means: to understand how any point in the plane moves over time under ẋ = Ax,
              you only need to know the eigenvalues and eigenvectors of A. The eigenvectors
              define the coordinate axes of the natural frame; the eigenvalues set the rate
              and direction of growth or decay along each axis.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, marginBottom: 32 }}>
              <div style={{ color: 'var(--gold)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Decomposition</div>
              <div style={{ background: 'var(--crimson)', color: 'var(--bg)', padding: '20px 24px', lineHeight: 2.0, borderRadius: 2 }}>
                <div>A  =  V · Λ · V⁻¹</div>
                <div style={{ opacity: 0.55, fontSize: 11, marginTop: 4 }}>where  Λ = diag(λ₁, λ₂, ...)</div>
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, marginBottom: 32 }}>
              <div style={{ color: 'var(--gold)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Matrix Exponential</div>
              <div style={{ background: 'var(--crimson)', color: 'var(--bg)', padding: '20px 24px', lineHeight: 2.0, borderRadius: 2 }}>
                <div>e^(At)  =  V · diag(e^(λ₁t), e^(λ₂t)) · V⁻¹</div>
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
              <div style={{ color: 'var(--gold)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Solution</div>
              <div style={{ background: 'var(--crimson)', color: 'var(--bg)', padding: '20px 24px', lineHeight: 2.0, borderRadius: 2 }}>
                <div>x(t)  =  e^(At) · x(0)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Eigenvalue Cases ── */}
      <div style={{ margin: '64px min(14%, 200px)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 40 }}>
          Behavior by Eigenvalue Type
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          {eigenCases.map((c, i) => (
            <div key={i} style={{ borderTop: `2px solid ${c.color}`, paddingTop: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                <div style={{ fontSize: 16, fontWeight: 800 }}>{c.type}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gold)' }}>{c.condition}</div>
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.78 }}>{c.behavior}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Phase Portraits ── */}
      <div style={{ borderTop: '1px solid rgba(22,36,58,0.12)', borderBottom: '1px solid rgba(22,36,58,0.12)', background: '#F3EFE4', padding: '64px min(14%, 200px)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 40 }}>
          Phase Portraits
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>

          <div>
            <div style={{ border: '1px solid rgba(22,36,58,0.15)', overflow: 'hidden', marginBottom: 16 }}>
              <img
                src="/images/matrix-exp/phase-portrait.png"
                alt="Stable node phase portrait — all trajectories converge to origin"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
              Stable node
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.65, opacity: 0.75 }}>
              Both eigenvalues negative. Every trajectory flows into the origin regardless of
              starting position. The dashed lines mark the eigenvector directions, which act
              as the "axes" of the natural coordinate frame. Solution curves straighten out
              to align with the slower eigenvector as t → ∞.
            </div>
          </div>

          <div>
            <div style={{ border: '1px solid rgba(22,36,58,0.15)', overflow: 'hidden', marginBottom: 16 }}>
              <img
                src="/images/matrix-exp/euler-path.png"
                alt="Saddle point phase portrait with Euler's method path traced in orange"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
              Saddle point with Euler path
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.65, opacity: 0.75 }}>
              Mixed-sign eigenvalues. Trajectories converge along one axis and diverge along
              the other. The orange path is a single solution traced by Euler's method from
              a chosen initial condition, demonstrating how numerical integration follows
              the analytically computed vector field.
            </div>
          </div>

        </div>
      </div>

      {/* ── Code ── */}
      <div style={{ margin: '64px min(14%, 200px)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 40 }}>
          Implementation
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 28 }}>
          {[
            { label: 'Reconstruct A from eigenpairs', code: codeSnippets.decompose },
            { label: 'Build the direction field', code: codeSnippets.vectorField },
            { label: "Euler's method path", code: codeSnippets.eulerPath },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                {s.label}
              </div>
              <pre style={{
                background: 'var(--crimson)',
                color: 'var(--bg)',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                lineHeight: 1.7,
                padding: '18px 20px',
                margin: 0,
                overflowX: 'auto',
                borderRadius: 2,
              }}>
                {s.code}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* ── Takeaway ── */}
      <div style={{ borderTop: '2px solid var(--crimson)', borderBottom: '2px solid var(--crimson)', padding: '64px min(14%, 200px)', background: 'var(--crimson)', color: 'var(--bg)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 32 }}>
          Key Takeaway
        </div>
        <p style={{ fontSize: 22, lineHeight: 1.7, maxWidth: 760, margin: 0 }}>
          The geometry of a matrix, read through its eigenvectors, determines the long-run
          fate of every trajectory under the associated differential equation. Eigenvalues
          are not just algebraic curiosities — they are the exponents that appear in the
          closed-form solution, and their signs partition the phase plane into qualitatively
          distinct regimes.
        </p>
      </div>

      <div style={{ height: 64 }} />
    </div>
  )
}
