import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase, supabaseConfigured } from '../lib/supabase'

const DAY = 86400000
const DEVICE_COLORS = { mobile: 'var(--accent)', desktop: 'var(--lime)', tablet: 'var(--info)' }
const STATUS_TONE = { new: 'var(--accent)', contacted: 'var(--warning)', closed: 'var(--success)' }

function dayKey(d) {
  return new Date(d).toISOString().slice(0, 10)
}

function relTime(iso) {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000)
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}

function tally(rows, key) {
  const m = new Map()
  for (const r of rows) {
    const v = r[key] || 'Direct / none'
    m.set(v, (m.get(v) || 0) + 1)
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1])
}

function Setup() {
  return (
    <div className="adm-center">
      <motion.div className="adm-card adm-setup" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <span className="eyebrow">Control room</span>
        <h1 className="display-md" style={{ margin: '16px 0 12px' }}>Connect Supabase</h1>
        <p className="adm-dim">
          Analytics and leads are built in, but no database is connected yet. Three steps and this
          dashboard goes live:
        </p>
        <ol className="adm-steps">
          <li><span className="idx mono">01</span> Run <code>supabase/schema.sql</code> in your Supabase SQL Editor.</li>
          <li><span className="idx mono">02</span> Create an admin user under Authentication → Users (email + password).</li>
          <li>
            <span className="idx mono">03</span> Add your keys to <code>.env</code> and restart the dev server:
            <pre className="adm-code">{`VITE_SUPABASE_URL=https://your-project.supabase.co\nVITE_SUPABASE_ANON_KEY=your-anon-key`}</pre>
          </li>
        </ol>
        <Link to="/" className="btn btn-ghost btn-sm">← Back to site</Link>
      </motion.div>
    </div>
  )
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setBusy(false)
  }

  return (
    <div className="adm-center">
      <motion.form className="adm-card adm-login" onSubmit={submit} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <span className="eyebrow">Propel control room</span>
        <h1 className="display-md" style={{ margin: '16px 0 24px' }}>Admin sign in</h1>
        <div className="field">
          <label htmlFor="adm-email">Email</label>
          <input id="adm-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@propelsportsinfra.com" />
        </div>
        <div className="field" style={{ marginTop: 16 }}>
          <label htmlFor="adm-pass">Password</label>
          <input id="adm-pass" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        {error && <div className="adm-error">{error}</div>}
        <button className="btn btn-solid" disabled={busy} style={{ marginTop: 24, width: '100%', justifyContent: 'center' }}>
          {busy ? 'Signing in…' : <>Sign in <span className="arrow">→</span></>}
        </button>
        <p className="adm-dim" style={{ marginTop: 16, fontSize: 12.5 }}>
          Use the admin user you created in Supabase Authentication. Visitors can never read this data.
        </p>
      </motion.form>
    </div>
  )
}

function BarChart({ series }) {
  const max = Math.max(1, ...series.map((s) => s.count))
  const W = 560
  const H = 180
  const bw = W / series.length
  return (
    <svg viewBox={`0 0 ${W} ${H + 26}`} className="adm-chart" role="img" aria-label="Visits per day">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line key={f} x1="0" x2={W} y1={H - H * f} y2={H - H * f} stroke="var(--line)" strokeWidth="1" />
      ))}
      {series.map((s, i) => {
        const h = Math.max(s.count ? 4 : 1, (s.count / max) * (H - 10))
        const today = i === series.length - 1
        return (
          <g key={s.day}>
            <rect
              x={i * bw + bw * 0.22}
              y={H - h}
              width={bw * 0.56}
              height={h}
              rx="4"
              fill={today ? 'var(--lime)' : 'var(--accent)'}
              opacity={s.count ? 1 : 0.25}
            >
              <title>{`${s.day}: ${s.count} visits`}</title>
            </rect>
            {i % 2 === 0 && (
              <text x={i * bw + bw / 2} y={H + 18} textAnchor="middle" className="adm-chart-lbl">
                {s.day.slice(5)}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

function HBars({ rows, total, color = 'var(--accent)' }) {
  if (!rows.length) return <p className="adm-empty">No data yet.</p>
  const max = rows[0][1]
  return (
    <div className="adm-hbars">
      {rows.slice(0, 6).map(([label, n]) => (
        <div className="adm-hbar" key={label}>
          <div className="adm-hbar-top">
            <span className="adm-hbar-label">{label}</span>
            <span className="mono adm-dim">{n} · {Math.round((n / total) * 100)}%</span>
          </div>
          <div className="adm-hbar-track">
            <motion.div
              className="adm-hbar-fill"
              style={{ background: color }}
              initial={{ width: 0 }}
              animate={{ width: `${(n / max) * 100}%` }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function DeviceDonut({ rows, total }) {
  if (!total) return <p className="adm-empty">No data yet.</p>
  const R = 42
  const C = 2 * Math.PI * R
  let offset = 0
  return (
    <div className="adm-donut-wrap">
      <svg viewBox="0 0 120 120" className="adm-donut" role="img" aria-label="Visits by device">
        {rows.map(([device, n]) => {
          const frac = n / total
          const el = (
            <circle
              key={device}
              cx="60" cy="60" r={R}
              fill="none"
              stroke={DEVICE_COLORS[device] || 'var(--muted)'}
              strokeWidth="14"
              strokeDasharray={`${frac * C} ${C}`}
              strokeDashoffset={-offset * C}
              transform="rotate(-90 60 60)"
            >
              <title>{`${device}: ${n}`}</title>
            </circle>
          )
          offset += frac
          return el
        })}
        <text x="60" y="64" textAnchor="middle" className="adm-donut-num">{total}</text>
      </svg>
      <div className="adm-legend">
        {rows.map(([device, n]) => (
          <span key={device} className="adm-legend-item">
            <i style={{ background: DEVICE_COLORS[device] || 'var(--muted)' }} />
            {device} <b className="mono">{n}</b>
          </span>
        ))}
      </div>
    </div>
  )
}

function Dashboard({ session, onSignOut }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [days, setDays] = useState(14)
  const [leadFilter, setLeadFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [updatedAt, setUpdatedAt] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    const since = new Date(Date.now() - 30 * DAY).toISOString()
    const [pv, ld, ev] = await Promise.all([
      supabase.from('pageviews').select('created_at,path,session_id,device,country,referrer').gte('created_at', since).order('created_at', { ascending: false }).limit(5000),
      supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(500),
      supabase.from('events').select('type,created_at').gte('created_at', since).limit(5000),
    ])
    if (pv.error || ld.error || ev.error) {
      setError(pv.error?.message || ld.error?.message || ev.error?.message)
    } else {
      setData({ pageviews: pv.data, leads: ld.data, events: ev.data })
      setUpdatedAt(new Date())
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
    const t = setInterval(load, 60000)
    return () => clearInterval(t)
  }, [load])

  const stats = useMemo(() => {
    if (!data) return null
    const { pageviews, leads, events } = data
    const today = dayKey(Date.now())
    const series = Array.from({ length: days }, (_, i) => {
      const d = new Date(Date.now() - (days - 1 - i) * DAY)
      const key = dayKey(d)
      return { day: key, count: pageviews.filter((p) => dayKey(p.created_at) === key).length }
    })
    const inWindow = pageviews.filter((p) => new Date(p.created_at).getTime() >= Date.now() - days * DAY)
    return {
      visits: inWindow.length,
      today: pageviews.filter((p) => dayKey(p.created_at) === today).length,
      sessions: new Set(inWindow.map((p) => p.session_id)).size,
      leads: leads.length,
      newLeads: leads.filter((l) => l.status === 'new').length,
      whatsapp: events.filter((e) => e.type === 'whatsapp_click').length,
      series,
      pages: tally(inWindow, 'path'),
      devices: tally(inWindow, 'device'),
      countries: tally(inWindow.filter((p) => p.country), 'country'),
      referrers: tally(inWindow.filter((p) => p.referrer), 'referrer'),
      recent: pageviews.slice(0, 8),
      windowTotal: inWindow.length,
    }
  }, [data, days])

  const leads = useMemo(() => {
    if (!data) return []
    const q = query.trim().toLowerCase()
    return data.leads.filter((l) =>
      (leadFilter === 'all' || l.status === leadFilter) &&
      (!q || `${l.name} ${l.email} ${l.interest}`.toLowerCase().includes(q)),
    )
  }, [data, leadFilter, query])

  const setStatus = async (id, status) => {
    const prev = data.leads
    setData((d) => ({ ...d, leads: d.leads.map((l) => (l.id === id ? { ...l, status } : l)) }))
    const { error } = await supabase.from('leads').update({ status }).eq('id', id)
    if (error) setData((d) => ({ ...d, leads: prev }))
  }

  const exportLeads = () => {
    const rows = [['name', 'email', 'phone', 'interest', 'status', 'created_at'], ...leads.map((l) => [l.name, l.email, l.phone, l.interest, l.status, l.created_at])]
    const csv = rows.map((r) => r.map((c) => `"${String(c).replaceAll('"', '""')}"`).join(',')).join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = `propel-leads-${dayKey(Date.now())}.csv`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <div className="admin">
      <header className="adm-head">
        <div className="adm-head-left">
          <span className="logo-mark">P</span>
          <div>
            <strong className="adm-title">Control room</strong>
            <span className="mono adm-dim">
              {session.user.email}{updatedAt ? ` · synced ${relTime(updatedAt.toISOString())}` : ''}
            </span>
          </div>
        </div>
        <div className="adm-head-actions">
          <Link to="/" className="btn btn-ghost btn-sm">View site</Link>
          <button className="btn btn-ghost btn-sm" onClick={load} disabled={loading}>
            {loading ? 'Syncing…' : 'Refresh'}
          </button>
          <button className="btn btn-dark btn-sm" onClick={onSignOut}>Sign out</button>
        </div>
      </header>

      <div className="adm-toolbar">
        <div className="field adm-range">
          <label htmlFor="adm-days">Window</label>
          <select id="adm-days" value={days} onChange={(e) => setDays(Number(e.target.value))}>
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
            <option value={30}>Last 30 days</option>
          </select>
        </div>
        <div className="field adm-range">
          <label htmlFor="adm-status">Leads</label>
          <select id="adm-status" value={leadFilter} onChange={(e) => setLeadFilter(e.target.value)}>
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="field adm-search">
          <label htmlFor="adm-q">Search leads</label>
          <input id="adm-q" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Name, email or interest…" />
        </div>
        <button className="btn btn-ghost btn-sm" onClick={exportLeads} disabled={!leads.length}>Export CSV ↓</button>
      </div>

      {error && <div className="adm-error adm-banner">{error} — check that supabase/schema.sql has been run.</div>}

      {!stats ? (
        <div className="adm-loading mono">{loading ? 'Loading telemetry…' : 'No data.'}</div>
      ) : (
        <>
          <div className="adm-stats">
            {[
              { label: `Visits · ${days}d`, value: stats.visits, tone: 'var(--accent)' },
              { label: 'Today', value: stats.today, tone: 'var(--lime)' },
              { label: 'Unique sessions', value: stats.sessions, tone: 'var(--info)' },
              { label: 'Leads', value: stats.leads, sub: `${stats.newLeads} new`, tone: 'var(--warning)' },
              { label: 'WhatsApp clicks', value: stats.whatsapp, tone: 'var(--success)' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="adm-stat"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="mono adm-dim">{s.label}</span>
                <strong style={{ color: s.tone }}>{s.value}</strong>
                {s.sub && <span className="adm-stat-sub mono">{s.sub}</span>}
              </motion.div>
            ))}
          </div>

          <div className="adm-card adm-chart-card">
            <div className="adm-card-head">
              <h2>Traffic</h2>
              <span className="mono adm-dim">visits per day · last {days} days</span>
            </div>
            <BarChart series={stats.series} />
          </div>

          <div className="adm-grid">
            <div className="adm-card">
              <div className="adm-card-head"><h2>Top pages</h2><span className="mono adm-dim">{stats.windowTotal} visits</span></div>
              <HBars rows={stats.pages} total={stats.windowTotal || 1} />
            </div>
            <div className="adm-card">
              <div className="adm-card-head"><h2>Devices</h2><span className="mono adm-dim">share of visits</span></div>
              <DeviceDonut rows={stats.devices} total={stats.windowTotal} />
            </div>
            <div className="adm-card">
              <div className="adm-card-head"><h2>Countries</h2><span className="mono adm-dim">by visits</span></div>
              <HBars rows={stats.countries} total={stats.windowTotal || 1} color="var(--info)" />
            </div>
            <div className="adm-card">
              <div className="adm-card-head"><h2>Referrers</h2><span className="mono adm-dim">where they came from</span></div>
              <HBars rows={stats.referrers} total={stats.windowTotal || 1} color="var(--lime)" />
            </div>
          </div>

          <div className="adm-card">
            <div className="adm-card-head"><h2>Recent visits</h2><span className="mono adm-dim">live · refreshes every 60s</span></div>
            {stats.recent.length ? (
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead><tr><th>When</th><th>Page</th><th>Device</th><th>Location</th><th>Referrer</th></tr></thead>
                  <tbody>
                    {stats.recent.map((p, i) => (
                      <tr key={i}>
                        <td className="mono adm-dim">{relTime(p.created_at)}</td>
                        <td className="adm-path">{p.path}</td>
                        <td><span className="adm-chip" style={{ color: DEVICE_COLORS[p.device] || 'var(--muted)', borderColor: 'currentColor' }}>{p.device}</span></td>
                        <td className="adm-dim">{p.city ? `${p.city}, ` : ''}{p.country || '—'}</td>
                        <td className="adm-dim adm-ref">{p.referrer || 'direct'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <p className="adm-empty">No visits recorded yet — they appear here as people browse the site.</p>}
          </div>

          <div className="adm-card">
            <div className="adm-card-head">
              <h2>Leads</h2>
              <span className="mono adm-dim">{leads.length} shown · {stats.newLeads} awaiting reply</span>
            </div>
            {leads.length ? (
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead><tr><th>Received</th><th>Name</th><th>Contact</th><th>Interest</th><th>Message</th><th>Status</th></tr></thead>
                  <tbody>
                    {leads.map((l) => (
                      <tr key={l.id}>
                        <td className="mono adm-dim">{relTime(l.created_at)}</td>
                        <td><strong>{l.name}</strong></td>
                        <td className="adm-contact">
                          <a href={`mailto:${l.email}`}>{l.email}</a>
                          {l.phone && <a href={`tel:${l.phone}`}>{l.phone}</a>}
                        </td>
                        <td className="adm-dim">{l.interest || '—'}</td>
                        <td className="adm-dim adm-msg">{l.message || '—'}</td>
                        <td>
                          <select
                            className="adm-status"
                            value={l.status}
                            style={{ color: STATUS_TONE[l.status] }}
                            onChange={(e) => setStatus(l.id, e.target.value)}
                            aria-label={`Status for ${l.name}`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <p className="adm-empty">No leads match — quote requests from the contact form land here.</p>}
          </div>
        </>
      )}
    </div>
  )
}

export default function Admin() {
  const [session, setSession] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!supabase) {
      setReady(true)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setReady(true)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!supabaseConfigured) return <Setup />
  if (!ready) return <div className="adm-center mono adm-dim">…</div>
  if (!session) return <Login />
  return <Dashboard session={session} onSignOut={() => supabase.auth.signOut()} />
}