import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { WhatsAppFloat } from './components/Shared'
import { BottomNav, Splash } from './components/Mobile'
import Cursor from './components/Cursor'
import { ScrollProgress } from './components/Motion'
import { useAnalytics } from './lib/analytics'
import Admin from './pages/Admin'
import Home from './pages/Home'
import About from './pages/About'
import { CatalogIndex, CatalogDetail } from './pages/Catalog'
import Projects from './pages/Projects'
import Certificates from './pages/Certificates'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 640px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const onChange = (e) => setMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return mobile
}

export default function App() {
  const location = useLocation()
  const isMobile = useIsMobile()
  const isAdmin = location.pathname.startsWith('/admin')
  useAnalytics()
  return (
    <div className="grain">
      <ScrollToTop />
      <ScrollProgress />
      {!isAdmin && <Splash />}
      {!isAdmin && <Nav />}
      <motion.main
        key={location.pathname}
        initial={isMobile ? { opacity: 0, x: 28 } : { opacity: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<CatalogIndex type="services" />} />
          <Route path="/services/:slug" element={<CatalogDetail type="services" />} />
          <Route path="/products" element={<CatalogIndex type="products" />} />
          <Route path="/products/:slug" element={<CatalogDetail type="products" />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/:page" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
      {!isAdmin && <Footer />}
      {!isAdmin && <BottomNav />}
      {!isAdmin && <WhatsAppFloat />}
      {!isAdmin && <Cursor />}
    </div>
  )
}