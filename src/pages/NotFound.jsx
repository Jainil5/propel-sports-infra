import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="notfound">
      <div>
        <span className="eyebrow">Out of bounds</span>
        <h1 className="display-xl" style={{ margin: '20px 0' }}>404</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 32 }}>
          This lane doesn't exist. Let's get you back on track.
        </p>
        <Link to="/" className="btn btn-solid">Back to home <span className="arrow">→</span></Link>
      </div>
    </div>
  )
}