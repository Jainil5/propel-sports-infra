import { Link } from 'react-router-dom'
import { Reveal, CountUp, Marquee } from '../components/Motion'
import { PageHero, CTABand } from '../components/Shared'
import { brand, stats } from '../data/site'

const journey = [
  { year: '2020', title: 'Propel is founded', text: 'Propel Sports Infra Pvt Ltd is established in Ahmedabad with a single mission: manufacture high-quality synthetic sports surface materials in India.' },
  { year: '2021', title: 'First production line', text: 'Our Gujarat factory commissions its first PU binder and rubber granule processing lines, with an in-house quality laboratory from day one.' },
  { year: '2022', title: 'Track systems launch', text: 'Spray Coat, Sandwich and Full PU running track systems enter the market, delivering our first institutional and stadium projects.' },
  { year: '2023', title: '50-product basket', text: 'The catalogue expands to EPDM surfaces, football turf, PVC flooring and acrylic systems — a complete sports infrastructure basket.' },
  { year: '2024', title: 'Going international', text: 'Projects in Bhutan and Nepal and an international office in Sydney, Australia mark our expansion beyond India.' },
  { year: '2026', title: '800+ projects strong', text: 'Products now used in 15 nations, with a 100+ dealer network and ongoing R&D into water-based, eco-friendly track materials.' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={<>The company behind <span className="accent italic">the surface</span></>}
        lead={`${brand.legal} was founded in ${brand.founded}. Our main manufactured products are synthetic running track system materials — engineered, tested and made in India.`}
        word="Propel"
        crumb={[{ label: 'About Us' }]}
      />

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container split">
          <Reveal className="split-media">
            <img src="/images/gym-equipment.jpg" alt="Sports infrastructure manufacturing facility" />
            <div className="float-badge" style={{ top: 20, left: 20 }}>
              <span className="big">15</span>
              <span className="lbl">Nations using<br />our products</span>
            </div>
            <span className="tag mono">Factory · Kadi, Gujarat</span>
          </Reveal>
          <div className="split-body">
            <Reveal>
              <span className="eyebrow">Our story</span>
              <h2 className="display-md" style={{ margin: '18px 0 24px' }}>
                Quality is not a claim. <span className="accent italic">It's a process.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Our company strongly believes in quality production. Our facilities utilise the
                latest machinery and an in-house laboratory, so every batch of binder, granule
                and coating is tested before it leaves the factory.
              </p>
              <p>
                Our R&D focuses on new environmental products — including water-based running
                track materials — because the next generation of athletes deserves surfaces
                that are safe for them and for the planet.
              </p>
              <ul className="check-list">
                <li><span className="tick">✓</span> In-house laboratory testing on every batch</li>
                <li><span className="tick">✓</span> Latest machinery, controlled production</li>
                <li><span className="tick">✓</span> R&D in water-based, eco-friendly systems</li>
                <li><span className="tick">✓</span> Complete 50+ product basket under one roof</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee items={['Quality Control', 'Eco Friendly', 'Original Formulations', 'In-House R&D', 'Made in India']} paper />

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="stats">
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <div className="stat-num"><CountUp to={s.value} suffix={s.suffix} /></div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section paper">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">The journey</span>
              <h2 className="display-lg">From one line to <span className="accent italic">15 nations</span></h2>
            </Reveal>
          </div>
          <div className="split" style={{ alignItems: 'start' }}>
            <div className="timeline">
              {journey.map((j, i) => (
                <Reveal key={j.year} delay={i * 0.05} className="timeline-item">
                  <span className="year">{j.year}</span>
                  <h3 style={{ color: 'var(--ink-dark)' }}>{j.title}</h3>
                  <p style={{ color: 'var(--muted-dark)' }}>{j.text}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="split-media" delay={0.15}>
              <img src="/images/runner.jpg" alt="Athlete running on a synthetic track" style={{ height: 620 }} />
              <span className="tag mono" style={{ color: 'var(--ink)' }}>Every lane tells a story</span>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split-body">
            <Reveal>
              <span className="eyebrow">Mission & vision</span>
              <h2 className="display-md" style={{ margin: '18px 0 24px' }}>
                High quality. <span className="accent italic">No shortcuts.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                <strong style={{ color: 'var(--ink)' }}>Mission —</strong> to be the synthetic sports
                surface industry firm that only does high-quality, safe products: surfaces that
                protect athletes, last for decades and are manufactured responsibly.
              </p>
              <p>
                <strong style={{ color: 'var(--ink)' }}>Vision —</strong> a world-class sports
                surface within reach of every school, club and community in India and beyond.
              </p>
              <Link to="/contact" className="btn btn-solid" style={{ marginTop: 12 }}>
                Work with us <span className="arrow">→</span>
              </Link>
            </Reveal>
          </div>
          <Reveal className="split-media" delay={0.15}>
            <img src="/images/football-field.jpg" alt="Football pitch with synthetic turf at dusk" />
            <span className="tag mono">Surfaces for every level of play</span>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  )
}