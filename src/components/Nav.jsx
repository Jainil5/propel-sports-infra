import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { services } from '../data/services'
import { products } from '../data/products'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services', mega: 'services' },
  { to: '/products', label: 'Products', mega: 'products' },
  { to: '/projects', label: 'Projects' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact Us' },
]

function MegaMenu({ type }) {
  const items = type === 'services' ? services : products
  return (
    <motion.div
      className="mega"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mega-head mono">
        <span>{type === 'services' ? 'Surface Systems' : 'Manufactured Products'}</span>
        <Link to={`/${type}`} className="accent">View all →</Link>
      </div>
      {items.map((item, i) => (
        <Link key={item.slug} to={`/${type}/${item.slug}`} className="mega-link">
          <span className="idx">{String(i + 1).padStart(2, '0')}</span>
          {item.name}
        </Link>
      ))}
    </motion.div>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSub, setMobileSub] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`nav${scrolled ? ' scrolled' : ''}${mobileOpen ? ' menu-open' : ''}`}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="nav-inner">
          <Link to="/" className="logo" aria-label="Propel Sports Infra home">
            <span className="logo-mark">P</span>
            <span>
              Propel
              <small>Sports Infra</small>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {links.map((link) => (
              <div
                key={link.to}
                className="nav-item"
                onMouseEnter={() => link.mega && setOpenMenu(link.mega)}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  onClick={() => link.mega && setOpenMenu(openMenu === link.mega ? null : link.mega)}
                >
                  {link.label}
                  {link.mega && <span className="chev">▾</span>}
                </NavLink>
                <AnimatePresence>
                  {link.mega && openMenu === link.mega && <MegaMenu type={link.mega} />}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="nav-cta">
            <Link to="/contact" className="btn btn-solid btn-sm">
              Get a Quote <span className="arrow">→</span>
            </Link>
            <button
              className={`burger${mobileOpen ? ' open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((link) => (
              <div key={link.to}>
                {link.mega ? (
                  <>
                    <button
                      className="m-link"
                      style={{ width: '100%' }}
                      onClick={() => setMobileSub(mobileSub === link.mega ? null : link.mega)}
                    >
                      {link.label}
                      <span className="accent">{mobileSub === link.mega ? '−' : '+'}</span>
                    </button>
                    <AnimatePresence>
                      {mobileSub === link.mega && (
                        <motion.div
                          className="mobile-sub"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <Link to={`/${link.mega}`}>View all {link.label.toLowerCase()} →</Link>
                          {(link.mega === 'services' ? services : products).map((item) => (
                            <Link key={item.slug} to={`/${link.mega}/${item.slug}`}>{item.name}</Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link to={link.to} className="m-link">
                    {link.label} <span className="accent">→</span>
                  </Link>
                )}
              </div>
            ))}
            <div style={{ marginTop: 28 }}>
              <Link to="/contact" className="btn btn-solid">Get a Free Quote <span className="arrow">→</span></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}