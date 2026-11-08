import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from './supabase'

function sessionId() {
  let id = sessionStorage.getItem('propel-sid')
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem('propel-sid', id)
  }
  return id
}

function deviceType() {
  const ua = navigator.userAgent
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return 'tablet'
  if (/Mobi|Android|iPhone/i.test(ua)) return 'mobile'
  return window.innerWidth < 640 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop'
}

let geoPromise = null
function geo() {
  if (!geoPromise) {
    const cached = sessionStorage.getItem('propel-geo')
    if (cached) {
      geoPromise = Promise.resolve(JSON.parse(cached))
    } else {
      geoPromise = fetch('https://ipapi.co/json/')
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => {
          const g = j ? { country: j.country_name || null, city: j.city || null } : { country: null, city: null }
          sessionStorage.setItem('propel-geo', JSON.stringify(g))
          return g
        })
        .catch(() => ({ country: null, city: null }))
    }
  }
  return geoPromise
}

export async function trackPageview(path) {
  if (!supabase || path.startsWith('/admin')) return
  const g = await geo()
  try {
    await supabase.from('pageviews').insert({
      path,
      referrer: document.referrer || '',
      session_id: sessionId(),
      device: deviceType(),
      country: g.country,
      city: g.city,
    })
  } catch {
    /* analytics must never break the site */
  }
}

export async function trackEvent(type, path = '') {
  if (!supabase) return
  try {
    await supabase.from('events').insert({ type, path, session_id: sessionId() })
  } catch {
    /* ignore */
  }
}

export function useAnalytics() {
  const { pathname } = useLocation()
  const tracked = useRef(null)
  useEffect(() => {
    if (tracked.current === pathname) return
    tracked.current = pathname
    trackPageview(pathname)
  }, [pathname])
}