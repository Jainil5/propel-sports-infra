import { Link, useParams, Navigate } from 'react-router-dom'
import { Reveal, TiltCard } from '../components/Motion'
import { PageHero, CTABand } from '../components/Shared'
import { services, getService } from '../data/services'
import { products, getProduct } from '../data/products'

export function CatalogIndex({ type }) {
  const isServices = type === 'services'
  const items = isServices ? services : products
  return (
    <>
      <PageHero
        eyebrow={isServices ? 'Our services' : 'Our products'}
        title={isServices
          ? <>Surface systems, <span className="accent italic">engineered</span></>
          : <>Manufactured <span className="accent italic">in-house</span></>}
        lead={isServices
          ? 'Twelve complete surfacing systems — from competition running tracks to children’s play areas — installed and supported end to end.'
          : 'Nine core manufactured products: the binders, granules, tiles and coatings behind every Propel surface.'}
        word={isServices ? 'Systems' : 'Products'}
        crumb={[{ label: isServices ? 'Services' : 'Products' }]}
      />
      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container">
          <div className="card-grid">
            {items.map((item, i) => (
              <Reveal key={item.slug} delay={(i % 3) * 0.07}>
                <TiltCard className="p-card">
                  <Link to={`/${type}/${item.slug}`} style={{ display: 'contents' }}>
                    <div className="p-card-media">
                      <img src={item.image} alt={item.name} loading="lazy" />
                      <span className="chip mono">{item.category}</span>
                    </div>
                    <div className="p-card-body">
                      <h3>{item.name}</h3>
                      <p>{item.short}</p>
                      <span className="p-card-link">{isServices ? 'View system' : 'View product'} →</span>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  )
}

export function CatalogDetail({ type }) {
  const { slug } = useParams()
  const isServices = type === 'services'
  const item = isServices ? getService(slug) : getProduct(slug)
  const siblings = (isServices ? services : products).filter((x) => x.slug !== slug).slice(0, 3)

  if (!item) return <Navigate to={`/${type}`} replace />

  return (
    <>
      <PageHero
        eyebrow={item.category}
        title={item.name}
        word={isServices ? 'System' : 'Product'}
        crumb={[
          { label: isServices ? 'Services' : 'Products', to: `/${type}` },
          { label: item.name },
        ]}
      />

      <section className="section" style={{ paddingTop: 10 }}>
        <div className="container detail-hero">
          <Reveal>
            <p style={{ color: 'var(--muted)', fontSize: 17, marginBottom: 28 }}>{item.short}</p>
            <div className="tag-row" style={{ marginTop: 0 }}>
              {item.applications.map((a) => <span className="tag" key={a}>{a}</span>)}
            </div>
            <div style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-solid">Request a quote <span className="arrow">→</span></Link>
              <a href="https://api.whatsapp.com/send/?phone=919978631811" target="_blank" rel="noreferrer" className="btn btn-ghost">WhatsApp us</a>
            </div>
          </Reveal>
          <Reveal className="detail-hero-media" delay={0.15}>
            {item.video ? (
              <video src={item.video} poster={item.image} autoPlay muted loop playsInline aria-label={`${item.name} in play`} />
            ) : (
              <img src={item.image} alt={item.name} />
            )}
          </Reveal>
        </div>
      </section>

      <section className="section paper" style={{ paddingTop: 80 }}>
        <div className="container detail-body">
          <div className="prose" style={{ color: 'var(--ink-dark)' }}>
            <Reveal>
              <h2 style={{ color: 'var(--ink-dark)' }}>Overview</h2>
              {item.intro.map((p, i) => (
                <p key={i} style={{ color: 'var(--muted-dark)' }}>{p}</p>
              ))}
            </Reveal>
            <Reveal>
              <h2 style={{ color: 'var(--ink-dark)' }}>Key features</h2>
              <ul>
                {item.features.map((f) => <li key={f} style={{ color: 'var(--muted-dark)' }}>{f}</li>)}
              </ul>
            </Reveal>
            <Reveal>
              <h2 style={{ color: 'var(--ink-dark)' }}>Where it works</h2>
              <ul>
                {item.applications.map((a) => <li key={a} style={{ color: 'var(--muted-dark)' }}>{a}</li>)}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="spec-card" style={{ background: '#fff', borderColor: 'var(--line-dark)' }}>
              <h3 style={{ color: 'var(--ink-dark)' }}>Technical snapshot</h3>
              {item.specs.map((s) => (
                <div className="spec-row" key={s.k} style={{ borderColor: 'var(--line-dark)' }}>
                  <span className="k" style={{ color: 'var(--muted-dark)' }}>{s.k}</span>
                  <span className="v" style={{ color: 'var(--ink-dark)' }}>{s.v}</span>
                </div>
              ))}
              <Link to="/contact" className="btn btn-dark btn-sm" style={{ marginTop: 24, width: '100%', justifyContent: 'center' }}>
                Get full datasheet <span className="arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">Keep exploring</span>
              <h2 className="display-md">Related {isServices ? 'systems' : 'products'}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link to={`/${type}`} className="btn btn-ghost btn-sm">View all <span className="arrow">→</span></Link>
            </Reveal>
          </div>
          <div className="card-grid">
            {siblings.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.07}>
                <TiltCard className="p-card">
                  <Link to={`/${type}/${s.slug}`} style={{ display: 'contents' }}>
                    <div className="p-card-media">
                      <img src={s.image} alt={s.name} loading="lazy" />
                      <span className="chip mono">{s.category}</span>
                    </div>
                    <div className="p-card-body">
                      <h3>{s.name}</h3>
                      <p>{s.short}</p>
                      <span className="p-card-link">View →</span>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}