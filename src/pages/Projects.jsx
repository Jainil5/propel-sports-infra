import { Reveal } from '../components/Motion'
import { PageHero, CTABand } from '../components/Shared'
import { projects } from '../data/site'

export default function Projects() {
  return (
    <>
      <PageHero
        eyebrow="Completed projects"
        title={<>800+ projects. <span className="accent italic">One standard.</span></>}
        lead="A selection of the grounds we've delivered — from school tracks in Gujarat to international projects across South Asia and beyond."
        word="Built"
        crumb={[{ label: 'Projects' }]}
      />
      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container">
          <div className="project-grid">
            {projects.map((p, i) => (
              <Reveal key={`${p.name}-${i}`} delay={(i % 3) * 0.07}>
                <div className="project-card">
                  <img src={p.image} alt={p.name} loading="lazy" />
                  <div className="overlay">
                    <h3>{p.name}</h3>
                    <span className="loc mono">{p.location}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  )
}