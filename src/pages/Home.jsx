import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Reveal, CountUp, TiltCard, Magnetic, Marquee, LaneLines, Parallax } from '../components/Motion'
import { SectionHead, CTABand } from '../components/Shared'
import { brand, stats, reasons, projects, marqueeItems } from '../data/site'
import { services } from '../data/services'
import { products } from '../data/products'

const ease = [0.22, 1, 0.36, 1]

function Hero() {
  const ref = useRef(null)
  const rallyRef = useRef(null)
  const courtRef = useRef(null)
  const reduce = useReducedMotion()
  const [isMobile] = useState(() => window.matchMedia('(max-width: 640px)').matches)
  const [phase, setPhase] = useState(isMobile ? 'court' : 'rally')
  const [videoOk, setVideoOk] = useState(true)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    if (reduce || !videoOk) return
    if (phase === 'rally') {
      courtRef.current?.pause()
      rallyRef.current?.play().catch(() => {})
      const t = setTimeout(() => setPhase('court'), 8000)
      return () => clearTimeout(t)
    }
    rallyRef.current?.pause()
    courtRef.current?.play().catch(() => {})
  }, [phase, reduce, videoOk])

  const lines = [
    <>Surfaces that</>,
    <>propel <span className="accent italic">performance</span></>,
  ]

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero-media" style={{ y: imgY }}>
        <motion.div
          className="hero-focus"
          initial={{ scale: 1.04, filter: 'blur(8px)' }}
          animate={{ scale: phase === 'court' ? 1.14 : 1.04, filter: 'blur(0px)' }}
          transition={{ scale: { duration: 12, ease: 'easeOut' }, filter: { duration: 1.6, delay: 0.2, ease: 'easeOut' } }}
        >
          <img className="hero-poster" src="/images/court-outdoor.jpg" alt="Outdoor pickleball court during open play" />
          {videoOk && !reduce && (
            <>
              <video
                ref={rallyRef}
                className={`hero-video${phase === 'rally' ? ' on' : ''}`}
                autoPlay muted loop playsInline preload="auto"
                onError={(e) => { if (e.target === e.currentTarget) setVideoOk(false) }}
                aria-hidden="true" tabIndex={-1}
              >
                <source src="/videos/pickleball-rally.mp4" type="video/mp4" />
              </video>
              <video
                ref={courtRef}
                className={`hero-video${phase === 'court' ? ' on' : ''}`}
                muted loop playsInline preload="metadata"
                onError={(e) => { if (e.target === e.currentTarget) setVideoOk(false) }}
                aria-hidden="true" tabIndex={-1}
              >
                <source src="/videos/pickleball-court.mp4#t=2,22" type="video/mp4" media="(min-width: 641px)" />
                <source src="/videos/pickleball-court-mobile.mp4#t=2,22" type="video/mp4" />
              </video>
            </>
          )}
        </motion.div>
      </motion.div>
      <LaneLines className="hero-lanes" vertical count={7} />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-streaks" aria-hidden="true"><i /><i /><i /></div>
      <motion.div className="container hero-content" style={{ opacity: fade }}>
        <motion.span
          className="live-chip mono"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <i /> Live pickleball · open court
        </motion.span>
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {brand.tagline}
        </motion.span>
        <h1 className="display-xl hero-title" style={{ marginTop: 24 }}>
          {lines.map((line, i) => (
            <span className="line" key={i}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.35 + i * 0.14, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          className="hero-sub"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease }}
        >
          <p>
            From Olympic-style running tracks to football turf and EPDM play surfaces —
            we manufacture the ground champions train on. Made in India, trusted in 15 nations.
          </p>
          <div className="hero-actions">
            <Magnetic>
              <Link to="/products" className="btn btn-solid">Explore Products <span className="arrow">→</span></Link>
            </Magnetic>
            <Magnetic>
              <Link to="/contact" className="btn btn-ghost">Get a Free Quote</Link>
            </Magnetic>
          </div>
        </motion.div>
        <motion.div
          className="hero-meta mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <span>Est. {brand.founded}</span>
          <span>Ahmedabad · Gujarat · India</span>
          <span>800+ projects delivered</span>
        </motion.div>
      </motion.div>
      <span className="scroll-hint mono">Scroll</span>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={marqueeItems} />

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

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <Reveal className="split-media">
            <Parallax speed={0.08}>
              <img src="/images/stadium-aerial.jpg" alt="Aerial view of a modern sports stadium" />
            </Parallax>
            <div className="float-badge" style={{ top: 20, right: 20 }}>
              <span className="big">2020</span>
              <span className="lbl">Manufacturing<br />since</span>
            </div>
            <span className="tag mono">In-house production · Gujarat</span>
          </Reveal>
          <div className="split-body">
            <Reveal>
              <span className="eyebrow">Who we are</span>
              <h2 className="display-md" style={{ margin: '18px 0 24px' }}>
                Manufacturing excellence, <span className="accent italic">lane by lane</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                {brand.legal} was founded in {brand.founded} as a sports surface products
                manufacturing company. Our main manufactured products are synthetic running
                track system materials, sports flooring and rubber surfacing.
              </p>
              <p>
                Our manufacturing excellence sets us apart as a trusted sports ground
                infrastructure company delivering top-tier, durable solutions.
              </p>
              <ul className="check-list">
                <li><span className="tick">✓</span> In-house laboratory & latest machinery</li>
                <li><span className="tick">✓</span> R&D in water-based, eco-friendly systems</li>
                <li><span className="tick">✓</span> 50+ product basket, 100+ dealer network</li>
              </ul>
              <Magnetic>
                <Link to="/about" className="btn btn-ghost">About the company <span className="arrow">→</span></Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section paper">
        <div className="container">
          <SectionHead
            eyebrow="What we install"
            title={<>Surface systems <span className="accent italic">for every sport</span></>}
            text="Twelve engineered surfacing systems, from competition tracks to kindergarten play areas."
            link="/services"
            linkLabel="All services"
          />
          <div className="service-rows">
            {services.slice(0, 6).map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05} y={20}>
                <Link to={`/services/${s.slug}`} className="service-row">
                  <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{s.name}</h3>
                  <span className="cat mono">{s.category}</span>
                  <span className="go">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Manufactured by us"
            title={<>The product <span className="accent italic">basket</span></>}
            text="Binders, granules, tiles and coatings — the raw materials behind 800+ completed projects."
            link="/products"
            linkLabel="All products"
          />
          <div className="card-grid">
            {products.slice(0, 6).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07}>
                <TiltCard className="p-card">
                  <Link to={`/products/${p.slug}`} style={{ display: 'contents' }}>
                    <div className="p-card-media">
                      <img src={p.image} alt={p.name} loading="lazy" />
                      <span className="chip mono">{p.category}</span>
                    </div>
                    <div className="p-card-body">
                      <h3>{p.name}</h3>
                      <p>{p.short}</p>
                      <span className="p-card-link">View product →</span>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section paper">
        <div className="container">
          <SectionHead
            eyebrow="Why Propel"
            title={<>Built on <span className="accent italic">six pillars</span></>}
          />
          <div className="why-grid">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.06}>
                <div className="why-card" style={{ background: '#fff', borderColor: 'var(--line-dark)' }}>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{r.title}</h3>
                  <p style={{ color: 'var(--muted-dark)' }}>{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Completed projects"
            title={<>Ground we've <span className="accent italic">delivered</span></>}
            text="From school tracks in Gujarat to international projects in Bhutan and Nepal."
            link="/projects"
            linkLabel="All projects"
          />
          <div className="project-grid">
            {projects.slice(0, 6).map((p, i) => (
              <Reveal key={`${p.name}-${i}`} delay={i * 0.06}>
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