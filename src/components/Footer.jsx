import { Link } from 'react-router-dom'
import { brand, offices } from '../data/site'
import { services } from '../data/services'
import { products } from '../data/products'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Link to="/" className="logo">
              <span className="logo-mark">P</span>
              <span>
                Propel
                <small>Sports Infra</small>
              </span>
            </Link>
            <p>
              {brand.legal}. was founded in {brand.founded}. Main manufacturer products are
              synthetic running track system materials and sports flooring, made in India for the world.
            </p>
            <div className="socials" style={{ marginTop: 20 }}>
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">ig</a>
              <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X">𝕏</a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube">▶</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            {services.slice(0, 6).map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`}>{s.name}</Link>
            ))}
            <Link to="/services" className="accent">All services →</Link>
          </div>
          <div className="footer-col">
            <h4>Products</h4>
            {products.slice(0, 6).map((p) => (
              <Link key={p.slug} to={`/products/${p.slug}`}>{p.name}</Link>
            ))}
            <Link to="/products" className="accent">All products →</Link>
          </div>
          <div className="footer-col">
            <h4>Reach Us</h4>
            {brand.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/[^+\d]/g, '')}`}>{p}</a>
            ))}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <p style={{ marginTop: 12 }}>{offices[1].address}</p>
            <p>{brand.hours}</p>
          </div>
        </div>

        <div className="footer-word" aria-hidden="true">Propel</div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {brand.legal}. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-and-conditions">Terms & Conditions</Link>
            <Link to="/cancellations-and-refunds">Cancellations & Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}