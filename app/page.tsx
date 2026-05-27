import { projects } from '@/content/research'

export default function HomePage() {
  return (
    <>
      {/* Splash */}
      <div id="splash-image">
        <img src="/images/splash.png?v=2" alt="" />
      </div>

      {/* Bio */}
      <div id="bio">
        <div id="bio-upper">
          <p>Biography</p>
        </div>
        <div id="bio-lower">
          <p>
            I&apos;m a grad student at UC Berkeley, advised by{' '}
            <a href="https://people.eecs.berkeley.edu/~pabbeel/">Pieter Abbeel</a>.
            I work on robot foundation models and the question of what makes embodied systems intelligent.
            Incoming Research Scientist at{' '}
            <a href="https://www.gsi.company" target="_blank" rel="noopener noreferrer">Grounded Superintelligence</a>{' '}
            this summer.
          </p>
        </div>
      </div>

      {/* Past Work */}
      <div id="work">
        <h1><a href="#work">Past Work</a></h1>
        {projects.map((project) => (
          <div className="card" key={project.title}>
            <div className="type-container">
              <div className="type-left">{project.type ?? 'Paper'}</div>
              <div className="type-right">{project.type === 'Company' ? new Date().getFullYear() : (project.year ?? project.tag)}</div>
            </div>
            <h1>{project.title}</h1>
            <div className="rule" />
            <div className="text-container">
              <div className="text-left">
                <p>{project.description}</p>
              </div>
              <div className="text-right">
                {project.links.paper && (
                  <a href={project.links.paper} target="_blank" rel="noopener noreferrer">
                    {project.type === 'Company' ? 'Visit site →' : 'Read more →'}
                  </a>
                )}
                {!project.links.paper && project.links.code && (
                  <a href={project.links.code} target="_blank" rel="noopener noreferrer">
                    View code →
                  </a>
                )}
              </div>
            </div>
            <div className="rule" />
            {project.venue && (
              <div className="footnote">
                <p>Published at <span>{project.venue}</span></p>
              </div>
            )}
          </div>
        ))}
      </div>

    </>
  )
}
