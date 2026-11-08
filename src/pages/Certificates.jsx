import { Reveal } from '../components/Motion'
import { PageHero, CTABand } from '../components/Shared'

const certs = [
  { title: 'PP Tiles — UV & Load', text: 'Microlab: UV stability and breaking load test report for plastic products.' },
  { title: 'EPDM CFH Testing', text: 'Acousto-Scan: in-situ critical fall height testing of EPDM rubber flooring.' },
  { title: 'EPDM Technical Report', text: 'IRMRA: technical report on EPDM rubber granules.' },
  { title: 'PU Binder RR 2008 — PAH', text: 'Intertek: PAH test report, non-toxic substances, DESMOTOP-RR 2008.' },
  { title: 'PU Binder RR 2009 — PAH', text: 'Intertek: PAH test report, non-toxic substances, DESMOTOP-RR 2009.' },
  { title: 'PU Binder RR 2008 — SGS', text: 'SGS: lab test technical data for DESMOTOP-RR 2008.' },
  { title: 'Blue EPDM — PAH', text: 'Intertek: PAH test report, non-toxic substances, blue EPDM granules.' },
  { title: 'Dark Blue EPDM — PAH', text: 'Intertek: PAH test report, non-toxic substances, dark blue EPDM granules.' },
  { title: 'Acrytop — Viscosity', text: 'Microlab: lab test of acrylic topcoat viscosity.' },
  { title: 'Acrytop — Scratch', text: 'Microlab: topcoat scratch resistance test.' },
  { title: 'Acrytop — Heat', text: 'Microlab: topcoat heat temperature test (70 °C × 7 days).' },
  { title: 'Acrytop — Hardness', text: 'Microlab: lab test technical data, topcoat hardness.' },
  { title: 'EPDM — Weathering', text: 'Microlab: accelerated weather resistance test on EPDM rubber.' },
]

export default function Certificates() {
  return (
    <>
      <PageHero
        eyebrow="Certificates"
        title={<>Tested. Certified. <span className="accent italic">Trusted.</span></>}
        lead="Quality you can verify — our systems and materials are backed by independent testing and certified manufacturing processes."
        word="Proof"
        crumb={[{ label: 'Certificates' }]}
      />
      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container">
          <div className="cert-grid">
            {certs.map((c, i) => (
              <Reveal key={c.title} delay={(i % 4) * 0.06}>
                <div className="cert-card">
                  <div className="seal">✓</div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mono" style={{ textAlign: 'center', color: 'var(--muted)', marginTop: 48 }}>
              Full certificate copies available on request — <a href="mailto:info@propelsportsinfra.com" className="accent">info@propelsportsinfra.com</a>
            </p>
          </Reveal>
        </div>
      </section>
      <CTABand />
    </>
  )
}