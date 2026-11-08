import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll, animate } from 'framer-motion'

export function Reveal({ children, delay = 0, y = 36, blur = true, className = '', once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}

export function Parallax({ children, speed = 0.15, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`])
  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div style={{ y, scale: 1.2, height: '100%', width: '100%' }}>{children}</motion.div>
    </div>
  )
}

export function CountUp({ to, suffix = '', duration = 2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, duration])
  return (
    <span ref={ref}>
      {val}
      {suffix && <sup>{suffix}</sup>}
    </span>
  )
}

export function TiltCard({ children, className = '', max = 7 }) {
  const ref = useRef(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const rx = useSpring(useTransform(y, [0, 1], [max, -max]), { stiffness: 180, damping: 18 })
  const ry = useSpring(useTransform(x, [0, 1], [-max, max]), { stiffness: 180, damping: 18 })

  const onMove = (e) => {
    if (window.matchMedia('(hover: none)').matches) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    x.set(px)
    y.set(py)
    ref.current.style.setProperty('--mx', `${px * 100}%`)
    ref.current.style.setProperty('--my', `${py * 100}%`)
  }
  const onLeave = () => { x.set(0.5); y.set(0.5) }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  )
}

export function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })
  const onMove = (e) => {
    if (window.matchMedia('(hover: none)').matches) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ x: sx, y: sy, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  )
}

export function Marquee({ items, paper = false }) {
  const row = [...items, ...items]
  return (
    <div className={`marquee${paper ? ' paper' : ''}`} aria-hidden="true">
      <div className="marquee-track">
        {row.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}
            <span className="dot" />
          </span>
        ))}
      </div>
    </div>
  )
}

export function LaneLines({ vertical = false, count = 6, className = '' }) {
  return (
    <svg className={className} width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const pos = `${((i + 1) / (count + 1)) * 100}%`
        return vertical ? (
          <line key={i} x1={pos} y1="0" x2={pos} y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray={i % 2 ? '10 14' : undefined} />
        ) : (
          <line key={i} x1="0" y1={pos} x2="100%" y2={pos} stroke="currentColor" strokeWidth="1" strokeDasharray={i % 2 ? '10 14' : undefined} />
        )
      })}
    </svg>
  )
}