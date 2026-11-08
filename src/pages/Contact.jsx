import { useState } from 'react'
import { Reveal } from '../components/Motion'
import { PageHero } from '../components/Shared'
import { brand, offices } from '../data/site'
import { services } from '../data/services'
import { supabase } from '../lib/supabase'

export default function Contact() {
  const [state, setState] = useState('idle')

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const lead = {
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone') || '',
      interest: data.get('interest') || '',
      message: data.get('message') || '',
      source: 'contact-form',
    }
    if (supabase) {
      setState('sending')
      const { error } = await supabase.from('leads').insert(lead)
      if (!error) {
        setState('sent')
        e.target.reset()
        return
      }
      setState('error')
      return
    }
    const subject = encodeURIComponent(`Quote request: ${lead.interest || 'Sports surface project'}`)
    const body = encodeURIComponent(
      `Name: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nInterest: ${lead.interest}\n\n${lead.message}`,
    )
    window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`
    setState('mailto')
  }

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={<>Get in touch with <span className="accent italic">Propel</span></>}
        lead="Tell us about your project — our team responds with a specification and a free quote, usually within one working day."
        word="Talk"
        crumb={[{ label: 'Contact Us' }]}
      />

      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container contact-grid">
          <div>
            {offices.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.08}>
                <div className="office-card">
                  <h3>{o.title}</h3>
                  <p>{o.address}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.25}>
              <div className="contact-lines">
                {brand.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/[^+\d]/g, '')}`}>
                    <span className="ic">✆</span> {p}
                  </a>
                ))}
                <a href={`mailto:${brand.email}`}><span className="ic">✉</span> {brand.email}</a>
                <a href={`mailto:${brand.salesEmail}`}><span className="ic">✉</span> {brand.salesEmail}</a>
                <a href={`mailto:${brand.intlEmail}`}><span className="ic">✉</span> {brand.intlEmail}</a>
                <a href="#"><span className="ic">◷</span> {brand.hours}</a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form className="form-card" onSubmit={onSubmit}>
              <h2>Get a free quote now</h2>
              <p>
                {supabase
                  ? 'Send the details straight to our team — we reply with a specification and a free quote.'
                  : 'Fill in the details and your email app will open with the request ready to send.'}
              </p>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="name">Your name</label>
                  <input id="name" name="name" required placeholder="Full name" />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" placeholder="+91" />
                </div>
                <div className="field full">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required placeholder="you@company.com" />
                </div>
                <div className="field full">
                  <label htmlFor="interest">I'm interested in</label>
                  <select id="interest" name="interest" defaultValue="">
                    <option value="" disabled>Select a system or product</option>
                    {services.map((s) => <option key={s.slug}>{s.name}</option>)}
                    <option>Other / multiple products</option>
                  </select>
                </div>
                <div className="field full">
                  <label htmlFor="message">Project details</label>
                  <textarea id="message" name="message" placeholder="Area size, location, timeline…" />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-solid"
                disabled={state === 'sending'}
                style={{ marginTop: 24, width: '100%', justifyContent: 'center' }}
              >
                {state === 'sending' ? 'Sending…' : <>Send request <span className="arrow">→</span></>}
              </button>
              {state === 'sent' && (
                <div className="form-success">
                  Request received — our team will reach out within one working day with your
                  specification and quote.
                </div>
              )}
              {state === 'error' && (
                <div className="form-success" style={{ borderColor: 'var(--danger, #ff4d4d)' }}>
                  Couldn't send just now. Please try again, or write to us directly at{' '}
                  <a href={`mailto:${brand.email}`} className="accent">{brand.email}</a>.
                </div>
              )}
              {state === 'mailto' && (
                <div className="form-success">
                  Your email app should now be open with the request pre-filled. If it didn't open,
                  write to us directly at <a href={`mailto:${brand.email}`} className="accent">{brand.email}</a>.
                </div>
              )}
              <p className="form-note">We never share your details. Response within one working day.</p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}