import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const tabs = [
  { to: '/', label: 'Home', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M10 21v-6h4v6" /></svg>
  ) },
  { to: '/products', label: 'Products', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" /></svg>
  ) },
  { to: '/projects', label: 'Projects', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="9" ry="4" /><path d="M12 3v18" /></svg>
  ) },
  { to: '/about', label: 'About', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" /></svg>
  ) },
  { to: '/contact', label: 'Contact', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16.5v3a1.5 1.5 0 0 1-1.6 1.5A17.5 17.5 0 0 1 3 4.6 1.5 1.5 0 0 1 4.5 3h3a1.5 1.5 0 0 1 1.5 1.3c.1.9.3 1.8.6 2.6a1.5 1.5 0 0 1-.3 1.6L8 9.8a14 14 0 0 0 6.2 6.2l1.3-1.3a1.5 1.5 0 0 1 1.6-.3c.8.3 1.7.5 2.6.6a1.5 1.5 0 0 1 1.3 1.5z" /></svg>
  ) },
]

export function BottomNav() {
  const { pathname } = useLocation()
  return (
    <nav className="bottom-nav" aria-label="Primary mobile">
      {tabs.map((t) => {
        const active = t.to === '/' ? pathname === '/' : pathname.startsWith(t.to)
        return (
          <NavLink key={t.to} to={t.to} className={`bn-tab${active ? ' active' : ''}`}>
            {active && (
              <motion.span
                layoutId="bn-pill"
                className="bn-pill"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="bn-icon">{t.icon}</span>
            <span className="bn-label mono">{t.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}

export function Splash() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (sessionStorage.getItem('propel-splash')) return
    sessionStorage.setItem('propel-splash', '1')
    setShow(true)
    // no cleanup: StrictMode's double effect run must not kill the hide timer
    setTimeout(() => setShow(false), 1600)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="splash-inner">
            <motion.div
              className="splash-mark"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <svg viewBox="0 0 48 48" width="56" height="56" aria-hidden="true">
                <circle cx="24" cy="24" r="21" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
                <ellipse cx="24" cy="24" rx="21" ry="9" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6" />
                <path d="M24 3v42" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6" />
              </svg>
            </motion.div>
            <div className="splash-word">
              {'PROPEL'.split('').map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.55, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  {c}
                </motion.span>
              ))}
            </div>
            <motion.span
              className="splash-sub mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              SPORTS INFRA
            </motion.span>
            <motion.div
              className="splash-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}