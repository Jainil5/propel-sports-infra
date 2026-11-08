import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion'

function Ball({ size = 28, ghost = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" style={ghost ? undefined : { filter: 'drop-shadow(0 4px 10px rgba(216, 255, 62, 0.35))' }}>
      <circle cx="16" cy="16" r="14.5" fill="var(--lime)" />
      <circle cx="16" cy="16" r="14.5" fill="none" stroke="rgba(16,16,18,0.35)" strokeWidth="1" />
      <circle cx="11" cy="10" r="2.1" fill="rgba(16,16,18,0.4)" />
      <circle cx="20" cy="8.5" r="2.1" fill="rgba(16,16,18,0.4)" />
      <circle cx="24" cy="16" r="2.1" fill="rgba(16,16,18,0.4)" />
      <circle cx="19.5" cy="23" r="2.1" fill="rgba(16,16,18,0.4)" />
      <circle cx="10.5" cy="21.5" r="2.1" fill="rgba(16,16,18,0.4)" />
      <circle cx="15.5" cy="15.5" r="2.1" fill="rgba(16,16,18,0.4)" />
      <path d="M6 12a11 11 0 0 1 6-6" stroke="rgba(255,255,255,0.75)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default function Cursor() {
  const [enabled] = useState(
    () =>
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [hover, setHover] = useState(false)
  const [press, setPress] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pulse, setPulse] = useState(0)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.5 })
  const t1x = useSpring(x, { stiffness: 260, damping: 28 })
  const t1y = useSpring(y, { stiffness: 260, damping: 28 })
  const t2x = useSpring(x, { stiffness: 110, damping: 24 })
  const t2y = useSpring(y, { stiffness: 110, damping: 24 })
  const spin = useSpring(useTransform(useVelocity(x), [-1500, 0, 1500], [-40, 0, 40]), { stiffness: 120, damping: 14 })

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-cursor')
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const over = (e) => {
      setHover(Boolean(e.target.closest('a, button, select, input, textarea, label, [role="button"]')))
    }
    const down = () => {
      setPress(true)
      setPulse((p) => p + 1)
    }
    const up = () => setPress(false)
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)
    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const scale = press ? 0.75 : hover ? 1.5 : 1
  return (
    <>
      <motion.div className="cursor-layer" style={{ x: t2x, y: t2y, opacity: visible ? 0.12 : 0 }} aria-hidden="true">
        <div className="cursor-center"><Ball size={20} ghost /></div>
      </motion.div>
      <motion.div className="cursor-layer" style={{ x: t1x, y: t1y, opacity: visible ? 0.25 : 0 }} aria-hidden="true">
        <div className="cursor-center"><Ball size={24} ghost /></div>
      </motion.div>
      <motion.div className="cursor-layer" style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }} aria-hidden="true">
        <div className="cursor-center">
          <AnimatePresence>
            {pulse > 0 && (
              <motion.span
                key={pulse}
                className="cursor-ring"
                initial={{ scale: 0.4, opacity: 0.9 }}
                animate={{ scale: 2.6, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </AnimatePresence>
          <motion.span
            className="cursor-hover-ring"
            animate={{ scale: hover ? 1 : 0.4, opacity: hover ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
          <motion.span animate={{ scale, rotate: spin }} transition={{ type: 'spring', stiffness: 400, damping: 22 }} style={{ display: 'block' }}>
            <Ball />
          </motion.span>
        </div>
      </motion.div>
    </>
  )
}