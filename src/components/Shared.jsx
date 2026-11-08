import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Reveal, Magnetic, LaneLines } from './Motion'
import { trackEvent } from '../lib/analytics'

export function SectionHead({ eyebrow, title, text, link, linkLabel = 'View all' }) {
  return (
    <div className="section-head">
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="display-lg">{title}</h2>
      </Reveal>
      {(text || link) && (
        <Reveal delay={0.1}>
          {text && <p>{text}</p>}
          {link && (
            <Link to={link} className="btn btn-ghost btn-sm" style={{ marginTop: text ? 16 : 0 }}>
              {linkLabel} <span className="arrow">→</span>
            </Link>
          )}
        </Reveal>
      )}
    </div>
  )
}

export function PageHero({ eyebrow, title, lead, word, crumb }) {
  return (
    <section className="page-hero">
      {word && <span className="bg-word" aria-hidden="true">{word}</span>}
      <div className="container">
        {crumb && (
          <Reveal y={16}>
            <div className="breadcrumb mono">
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              {crumb.map((c, i) =>
                c.to ? (
                  <span key={i} style={{ display: 'contents' }}>
                    <Link to={c.to}>{c.label}</Link>
                    <span className="sep">/</span>
                  </span>
                ) : (
                  <span key={i} style={{ color: 'var(--ink)' }}>{c.label}</span>
                ),
              )}
            </div>
          </Reveal>
        )}
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            className="display-xl"
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {title}
          </motion.h1>
        </div>
        {lead && (
          <Reveal delay={0.25}>
            <p className="lead">{lead}</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}

export function CTABand() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="cta">
            <LaneLines className="cta-lanes" count={5} />
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.8)' }}>Start your project</span>
            <h2 className="display-lg" style={{ marginTop: 18 }}>
              Ready to build ground that <span className="italic">performs?</span>
            </h2>
            <p>
              From running tracks to multi-sport flooring — get a free quote from the team
              that has delivered 800+ projects across 15 nations.
            </p>
            <Magnetic>
              <Link to="/contact" className="btn btn-ghost">
                Get a Free Quote <span className="arrow">→</span>
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function WhatsAppFloat() {
  return (
    <motion.a
      href="https://api.whatsapp.com/send/?phone=919978631811&text&type=phone_number&app_absent=0"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={() => trackEvent('whatsapp_click', window.location.pathname)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 15 }}
      className="wa-float"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.02c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.8-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/>
      </svg>
    </motion.a>
  )
}