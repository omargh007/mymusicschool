import { motion } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94]

/* ── Scroll Reveal wrapper ── */
const variants = {
  up:    { hidden: { opacity: 0, y: 40 },            visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -40 },           visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 },            visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.88 },      visible: { opacity: 1, scale: 1 } },
  fade:  { hidden: { opacity: 0 },                   visible: { opacity: 1 } },
}

export function ScrollReveal({ children, direction = 'up', delay = 0, duration = 0.7, className }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={variants[direction]}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

/* ── Stagger container + item pair ── */
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 20 },
  },
}

export function StaggerContainer({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={staggerContainer}
      transition={{ delayChildren: delay }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  )
}

/* ── Entrance (on mount) ── */
export function FadeUp({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

/* ── Organic floating bob ── */
export function FloatBob({ children, duration = 7, className }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -14, 0, 8, 0], x: [0, 4, 0, -3, 0] }}
      transition={{ duration, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
    >
      {children}
    </motion.div>
  )
}
