import type { Metadata } from 'next'
import { M, MB } from '@/components/Math'

export const metadata: Metadata = { title: 'Exponentiation by Matrices · Alex Proshkin' }

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)', fontSize: 11,
      letterSpacing: '0.12em', textTransform: 'uppercase',
      color: 'var(--gold)', marginBottom: 40,
    }}>
      {children}
    </div>
  )
}

function MathBox({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      {label && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
          {label}
        </div>
      )}
      <div style={{ background: 'var(--crimson)', color: 'var(--bg)', padding: '18px 24px', borderRadius: 2, overflowX: 'auto' }}>
        {children}
      </div>
    </div>
  )
}

function Code({ src, label }: { src: string; label?: string }) {
  return (
    <div>
      {label && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
          {label}
        </div>
      )}
      <pre style={{ background: 'var(--crimson)', color: 'var(--bg)', fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.7, padding: '18px 20px', margin: 0, overflowX: 'auto', borderRadius: 2 }}>
        {src}
      </pre>
    </div>
  )
}

function Fig({ src, alt, caption }: { src: string; alt: string; caption: React.ReactNode }) {
  return (
    <div>
      <div style={{ border: '1px solid rgba(22,36,58,0.15)', overflow: 'hidden', marginBottom: 14, position: 'relative' }}>
        <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--img-gradient)', mixBlendMode: 'screen', pointerEvents: 'none' }} />
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
        {alt}
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.7, opacity: 0.75 }}>{caption}</div>
    </div>
  )
}

export default function MatrixExponentsPage() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--crimson)' }}>

      {/* Header */}
      <div style={{ borderBottom: '2px solid var(--crimson)', padding: '56px min(14%, 200px) 48px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
          Mathematics · 2023
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 800, margin: '0 0 20px', lineHeight: 1.05, maxWidth: 720 }}>
          Exponentiation<br />by Matrices
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--subtitle)', margin: 0, maxWidth: 580, lineHeight: 1.7 }}>
          How eigendecomposition turns a matrix differential equation into a closed-form solution,
          and what phase portraits reveal about long-run behavior. Advanced Topics Math, 2023.
        </p>
      </div>

      {/* Lead */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, margin: '64px min(14%, 200px)' }}>
        <div>
          <p style={{ fontSize: 19, lineHeight: 1.8, marginTop: 0 }}>
            Given a matrix <M tex="A" /> and an initial state <M tex="x_0 \in \mathbb{R}^n" />,
            the differential equation <M tex="\dot{x} = Ax" /> has the exact solution{' '}
            <M tex="x(t) = e^{At}\,x_0" />. The catch: computing the matrix exponential
            directly is expensive. Eigendecomposition provides a shortcut that reduces
            the problem to scalar exponentials, one per eigenvalue of <M tex="A" />.
          </p>
          <p style={{ fontSize: 19, lineHeight: 1.8, marginBottom: 0 }}>
            This project builds the intuition from first principles, implements interactive
            phase-plane visualizations in Python, and explores how the sign and magnitude
            of eigenvalues dictate qualitatively different long-run behaviors.
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
              {['Python', 'NumPy', 'Matplotlib', 'ipywidgets'].map(s => (
                <span key={s} style={{ fontSize: 11, padding: '3px 9px', border: '1px solid rgba(22,36,58,0.3)', letterSpacing: '0.03em' }}>{s}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11, marginBottom: 8 }}>Topics</div>
            <div>Eigendecomposition · matrix exponential · phase planes · linear ODEs · Euler&apos;s method</div>
          </div>
        </div>
      </div>

      {/* The ODE */}
      <div style={{ background: '#F9F9F9', borderTop: '1px solid rgba(22,36,58,0.12)', borderBottom: '1px solid rgba(22,36,58,0.12)', padding: '64px min(14%, 200px)' }}>
        <SectionLabel>The Problem</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.8, marginTop: 0 }}>
              A <em>linear autonomous system</em> is a differential equation of the form:
            </p>
            <MathBox label="System of ODEs">
              <MB tex="\dot{x} = Ax, \qquad x(0) = x_0" />
            </MathBox>
            <p style={{ fontSize: 17, lineHeight: 1.8 }}>
              where <M tex="A \in \mathbb{R}^{n \times n}" /> is a constant matrix and{' '}
              <M tex="x(t) \in \mathbb{R}^n" /> is the state we want to find.
              In 2D this describes trajectories in the plane. Each point{' '}
              <M tex="(x_1, x_2)" /> has a velocity <M tex="\dot{x} = A\begin{bmatrix}x_1\\x_2\end{bmatrix}" /> attached to it,
              forming a <em>vector field</em>.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, marginBottom: 0 }}>
              The exact solution is the <em>matrix exponential</em>:
            </p>
            <MathBox label="Exact solution">
              <MB tex="x(t) = e^{At}\,x_0" />
            </MathBox>
            <p style={{ fontSize: 17, lineHeight: 1.8, marginBottom: 0 }}>
              This generalizes the scalar case: when <M tex="A = a \in \mathbb{R}" />, the
              solution to <M tex="\dot{x} = ax" /> is <M tex="x(t) = e^{at} x_0" />.
            </p>
          </div>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.8, marginTop: 0 }}>
              The matrix exponential is defined by a power series:
            </p>
            <MathBox label="Definition">
              <MB tex="e^{At} = \sum_{k=0}^{\infty}\frac{(At)^k}{k!} = I + At + \frac{A^2 t^2}{2!} + \cdots" />
            </MathBox>
            <p style={{ fontSize: 17, lineHeight: 1.8 }}>
              This converges for any square matrix <M tex="A" />, but computing many
              matrix powers is <M tex="O(n^3)" /> per term — expensive.
              Eigendecomposition replaces those matrix multiplications with cheap scalar ones.
            </p>
            <div style={{ background: 'var(--crimson)', color: 'var(--bg)', padding: '18px 24px', borderRadius: 2 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Key property</div>
              <p style={{ fontSize: 15, lineHeight: 1.8, margin: 0 }}>
                If <M tex="A = V\Lambda V^{-1}" />, then{' '}
                <M tex="e^{At} = V\,e^{\Lambda t}\,V^{-1}" />. The matrix exponential
                inherits the eigenstructure of <M tex="A" />.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Eigendecomposition */}
      <div style={{ margin: '64px min(14%, 200px)' }}>
        <SectionLabel>Eigendecomposition</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.8, marginTop: 0 }}>
              A nonzero vector <M tex="v" /> is an <em>eigenvector</em> of <M tex="A" /> if
              applying <M tex="A" /> only scales it, never rotates it:
            </p>
            <MathBox label="Eigenvalue equation">
              <MB tex="Av = \lambda v" />
            </MathBox>
            <p style={{ fontSize: 17, lineHeight: 1.8 }}>
              Collecting eigenvectors as columns of <M tex="V = [v_1 \mid \cdots \mid v_n]" />
              and eigenvalues on the diagonal of <M tex="\Lambda = \operatorname{diag}(\lambda_1,\dots,\lambda_n)" />:
            </p>
            <MathBox label="Matrix form">
              <MB tex="AV = V\Lambda \quad\Longrightarrow\quad A = V\Lambda V^{-1}" />
            </MathBox>
            <p style={{ fontSize: 17, lineHeight: 1.8, marginBottom: 0 }}>
              This holds whenever <M tex="A" /> has <M tex="n" /> linearly independent
              eigenvectors (the diagonalizable case, which covers most matrices in practice).
            </p>
          </div>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.8, marginTop: 0 }}>
              Substituting <M tex="A = V\Lambda V^{-1}" /> into the power series,
              every <M tex="A^k = V\Lambda^k V^{-1}" />, so:
            </p>
            <MathBox label="Key simplification">
              <MB tex="e^{At} = V\!\left(\sum_{k=0}^{\infty}\frac{(\Lambda t)^k}{k!}\right)\!V^{-1} = V\,e^{\Lambda t}\,V^{-1}" />
            </MathBox>
            <p style={{ fontSize: 17, lineHeight: 1.8 }}>
              Because <M tex="\Lambda" /> is diagonal, its exponential is just:
            </p>
            <MathBox label="Diagonal matrix exponential">
              <MB tex="e^{\Lambda t} = \begin{pmatrix}e^{\lambda_1 t} & & \\ & \ddots & \\ & & e^{\lambda_n t}\end{pmatrix}" />
            </MathBox>
            <p style={{ fontSize: 17, lineHeight: 1.8, marginBottom: 0 }}>
              The full closed-form solution is:
            </p>
            <MathBox label="Closed-form solution">
              <MB tex="x(t) = V\,\operatorname{diag}\!\left(e^{\lambda_1 t},\dots,e^{\lambda_n t}\right)V^{-1}x_0" />
            </MathBox>
          </div>
        </div>
      </div>

      {/* Decomp steps figure */}
      <div style={{ background: '#F9F9F9', borderTop: '1px solid rgba(22,36,58,0.12)', borderBottom: '1px solid rgba(22,36,58,0.12)', padding: '64px min(14%, 200px)' }}>
        <SectionLabel>Three-Step Computation</SectionLabel>
        <div style={{ marginBottom: 48 }}>
          <Fig
            src="/images/matrix-exp/decomp-steps.png"
            alt="Solution steps"
            caption={
              <>
                Computing <M tex="x(t) = e^{At}x_0" /> in three steps:
                (1) project <M tex="x_0" /> into the eigenvector basis with <M tex="V^{-1}" />;
                (2) apply scalar growth/decay <M tex="e^{\lambda_i t}" /> along each eigendirection;
                (3) project back with <M tex="V" />.
              </>
            }
          />
        </div>
        <div style={{ marginBottom: 48 }}>
          <Fig
            src="/images/matrix-exp/scalar-exp.png"
            alt="Scalar exponentials"
            caption={
              <>
                The diagonal entries of <M tex="e^{\Lambda t}" />. Negative eigenvalues produce
                exponential decay (stable modes); positive ones grow without bound (unstable modes).
                The rate is <M tex="|\lambda|" />, the time constant <M tex="1/|\lambda|" />.
              </>
            }
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.8, marginTop: 0 }}>
              In the eigenvector basis <M tex="\tilde{x} = V^{-1}x" />, the system decouples completely:
            </p>
            <MathBox label="Decoupled in eigenbasis">
              <MB tex="\dot{\tilde{x}} = \Lambda\,\tilde{x} \quad\Longrightarrow\quad \tilde{x}_i(t) = e^{\lambda_i t}\,\tilde{x}_i(0)" />
            </MathBox>
            <p style={{ fontSize: 17, lineHeight: 1.8, marginBottom: 0 }}>
              Each coordinate <M tex="\tilde{x}_i" /> evolves independently as a scalar exponential.
              Coupling only reappears when projecting back into the original basis with <M tex="V" />.
            </p>
          </div>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.8, marginTop: 0 }}>
              Equivalently, the solution is a superposition of <em>modes</em>:
            </p>
            <MathBox label="Modal decomposition">
              <MB tex="x(t) = \sum_{i=1}^{n} c_i\,e^{\lambda_i t}\,v_i, \qquad c = V^{-1}x_0" />
            </MathBox>
            <p style={{ fontSize: 17, lineHeight: 1.8, marginBottom: 0 }}>
              Each mode <M tex="e^{\lambda_i t} v_i" /> decays or grows along its eigenvector
              direction. Long-run behavior is dominated by the mode with the largest
              real part of <M tex="\lambda_i" />.
            </p>
          </div>
        </div>
      </div>

      {/* Phase Portraits */}
      <div style={{ margin: '64px min(14%, 200px)' }}>
        <SectionLabel>Phase Portraits</SectionLabel>
        <p style={{ fontSize: 17, lineHeight: 1.8, marginTop: 0, maxWidth: 860, marginBottom: 48 }}>
          A phase portrait overlays the vector field <M tex="\dot{x} = Ax" /> with solution
          curves for many initial conditions simultaneously. The qualitative shape — whether
          trajectories converge, diverge, spiral, or oscillate — is entirely determined by
          the eigenvalues of <M tex="A" />. Dashed lines mark eigenvector directions.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 40 }}>
          <Fig
            src="/images/matrix-exp/case-stable-node.png"
            alt="Stable node"
            caption={
              <>
                <strong>Stable node:</strong> both eigenvalues real and negative,{' '}
                <M tex="\lambda_1 < \lambda_2 < 0" />. All trajectories converge to the
                origin. Near the origin, curves align with the slower eigenvector
                (smaller <M tex="|\lambda|" />).
              </>
            }
          />
          <Fig
            src="/images/matrix-exp/case-unstable-node.png"
            alt="Unstable node"
            caption={
              <>
                <strong>Unstable node:</strong> both eigenvalues real and positive,{' '}
                <M tex="0 < \lambda_1 < \lambda_2" />. Trajectories diverge from the origin.
                Equivalent to replacing <M tex="A" /> with <M tex="-A" /> in the stable case.
              </>
            }
          />
          <Fig
            src="/images/matrix-exp/case-saddle.png"
            alt="Saddle point"
            caption={
              <>
                <strong>Saddle point:</strong> eigenvalues of opposite sign,{' '}
                <M tex="\lambda_1 < 0 < \lambda_2" />. Trajectories are attracted along
                the stable manifold (gold dashes) and repelled along the unstable manifold
                (red dashes). Almost all initial conditions eventually escape to infinity.
              </>
            }
          />
          <Fig
            src="/images/matrix-exp/case-spiral.png"
            alt="Stable spiral"
            caption={
              <>
                <strong>Stable spiral:</strong> complex eigenvalues{' '}
                <M tex="\lambda = \alpha \pm \beta i" /> with <M tex="\alpha < 0" />.
                Trajectories rotate with angular frequency <M tex="\beta" /> while
                decaying at rate <M tex="|\alpha|" />. Pure imaginary{' '}
                (<M tex="\alpha = 0" />) gives closed orbits — a center.
              </>
            }
          />
        </div>

        {/* Original project figures */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <Fig
            src="/images/matrix-exp/phase-portrait.png"
            alt="Project: convergent field"
            caption={
              <>
                Phase portrait from the project. The matrix <M tex="A" /> was constructed
                interactively by entering two eigenvectors and eigenvalues; the code
                reconstructed <M tex="A = V\Lambda V^{-1}" /> and plotted the resulting
                vector field and integral curves in real time.
              </>
            }
          />
          <Fig
            src="/images/matrix-exp/euler-path.png"
            alt="Project: Euler's method path"
            caption={
              <>
                The orange path traces a single solution using Euler&apos;s method with step
                size <M tex="h = 0.01" />. Each step computes{' '}
                <M tex="x_{k+1} = x_k + h\,Ax_k" />, following the vector field
                numerically. At small <M tex="h" /> this closely matches the analytic
                solution <M tex="x(t) = e^{At}x_0" />.
              </>
            }
          />
        </div>
      </div>

      {/* Euler's Method */}
      <div style={{ background: '#F9F9F9', borderTop: '1px solid rgba(22,36,58,0.12)', borderBottom: '1px solid rgba(22,36,58,0.12)', padding: '64px min(14%, 200px)' }}>
        <SectionLabel>{"Euler's Method"}</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.8, marginTop: 0 }}>
              Euler&apos;s method approximates the solution by taking small linear steps along the vector field:
            </p>
            <MathBox label="Euler update rule">
              <MB tex="x_{k+1} = x_k + h\,Ax_k = (I + hA)\,x_k" />
            </MathBox>
            <p style={{ fontSize: 17, lineHeight: 1.8 }}>
              After <M tex="N" /> steps of size <M tex="h = t/N" />:
            </p>
            <MathBox label="N steps">
              <MB tex="x(t) \approx \left(I + \frac{t}{N}A\right)^{\!N} x_0 \xrightarrow{N\to\infty} e^{At}x_0" />
            </MathBox>
            <p style={{ fontSize: 17, lineHeight: 1.8, marginBottom: 0 }}>
              This limit is exactly the compound-interest definition of the exponential,
              now applied to matrices. It connects numerical integration directly to the
              analytic formula.
            </p>
          </div>
          <div>
            <Code
              label="Euler integration (forward + backward)"
              src={`def generate_path(x0, A, steps=1000):
    fwd = [x0]
    for _ in range(steps):           # forward in time
        fwd.append(fwd[-1] + A @ fwd[-1] / steps)

    bwd = [x0]
    for _ in range(steps):           # backward in time
        bwd.append(bwd[-1] - A @ bwd[-1] / steps)

    return np.concatenate([bwd[::-1], fwd[1:]])`}
            />
            <div style={{ marginTop: 28 }}>
              <Code
                label="Build the vector field"
                src={`X, Y = np.meshgrid(np.arange(-15, 16), np.arange(-15, 16))
U = A[0,0]*X + A[0,1]*Y   # ẋ₁ = a₁₁x₁ + a₁₂x₂
V = A[1,0]*X + A[1,1]*Y   # ẋ₂ = a₂₁x₁ + a₂₂x₂
mag = np.hypot(U, V)
ax.quiver(X, Y, U/mag, V/mag, pivot='mid')`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reconstruct A */}
      <div style={{ margin: '64px min(14%, 200px)' }}>
        <SectionLabel>Reconstructing A from Eigenpairs</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.8, marginTop: 0 }}>
              The interactive part of the project lets a user specify eigenvectors and
              eigenvalues directly. Given <M tex="v_1, v_2" /> and <M tex="\lambda_1, \lambda_2" />:
            </p>
            <MathBox label="Reconstruction">
              <MB tex="A = V\Lambda V^{-1} = \begin{bmatrix}v_1 & v_2\end{bmatrix} \begin{bmatrix}\lambda_1 & 0 \\ 0 & \lambda_2\end{bmatrix} \begin{bmatrix}v_1 & v_2\end{bmatrix}^{-1}" />
            </MathBox>
            <p style={{ fontSize: 17, lineHeight: 1.8, marginBottom: 0 }}>
              The resulting <M tex="A" /> is guaranteed to have exactly those eigenpairs.
              Flipping eigenvalue signs immediately transforms a stable phase portrait
              into an unstable one — making the connection between eigenvalues and
              long-run behavior viscerally clear.
            </p>
          </div>
          <Code
            label="Reconstruct A from eigenpairs"
            src={`def make_A(eigenvectors, eigenvalues):
    V      = np.column_stack(eigenvectors)
    Lambda = np.diag(eigenvalues)
    return V @ Lambda @ np.linalg.inv(V)   # A = V Λ V⁻¹

# Stable node: both eigenvalues negative
A = make_A([[1, 0], [0, 1]], [-1, -3])
# → [[-1,  0],
#    [ 0, -3]]

# Saddle: mixed signs
A = make_A([[1, 0], [0, 1]], [-1, 2])
# → [[-1,  0],
#    [ 0,  2]]`}
          />
        </div>
      </div>

      {/* Takeaway */}
      <div style={{ borderTop: '2px solid var(--crimson)', borderBottom: '2px solid var(--crimson)', padding: '64px min(14%, 200px)', background: 'var(--crimson)', color: 'var(--bg)' }}>
        <SectionLabel>Key Takeaway</SectionLabel>
        <p style={{ fontSize: 21, lineHeight: 1.8, maxWidth: 820, margin: '0 0 32px' }}>
          The solution to <M tex="\dot{x} = Ax" /> is entirely determined by the eigenstructure
          of <M tex="A" />. Each eigenvalue <M tex="\lambda_i" /> contributes a mode{' '}
          <M tex="c_i e^{\lambda_i t} v_i" /> to the solution. Negative real parts produce
          decay; positive real parts produce growth; imaginary parts produce oscillation.
          The phase portrait makes all three readable at a glance.
        </p>
        <MathBox>
          <MB tex="\boxed{x(t) = \sum_{i} c_i\, e^{\lambda_i t}\, v_i, \qquad c = V^{-1}x_0}" />
        </MathBox>
      </div>

      <div style={{ height: 64 }} />
    </div>
  )
}
