"use client"

import * as React from "react"
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion"
import { MessageCircle, Calendar, Monitor, Zap, Eye, ArrowRight, Star, TrendingUp, Users, Clock } from "lucide-react"

const WHATSAPP = "https://wa.me/543442472249?text=Hola%20Ceres%20%26%20Pomona%2C%20quiero%20consultar%20sobre%20una%20landing%20page"
const CALENDLY = "https://calendly.com/pietrobonitadeo"

/* ─── Orb flotante ─── */
function Orb({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[100px] pointer-events-none ${className}`}
      animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.45, 0.25], x: [0, 20, 0], y: [0, -20, 0] }}
      transition={{ duration: 10 + delay * 2, repeat: Infinity, ease: "easeInOut", delay }}
    />
  )
}

/* ─── Grain overlay ─── */
function Grain() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999] opacity-[0.035]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  )
}

/* ─── Texto animado letra por letra ─── */
function AnimatedText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: delay + i * 0.025, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

/* ─── Marquee ─── */
const MARQUEE_ITEMS = [
  "Landing Pages", "Alta Conversión", "Diseño Visual", "Marketing Digital",
  "Branding", "Páginas que Venden", "Resultados Reales", "Estrategia Digital",
]

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="relative overflow-hidden py-5 border-y border-[#f0ead6]/8">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0e0c09] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0e0c09] to-transparent z-10" />
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-sm font-medium tracking-widest text-[#f0ead6]/30 uppercase">
            {item}
            <span className="text-amber-500/40">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ─── Contador animado ─── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * to))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, to])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

/* ─── Botón magnético ─── */
function MagneticButton({ children, className, href }: { children: React.ReactNode; className?: string; href: string }) {
  const ref = React.useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

/* ─── Card de servicio con borde animado ─── */
function ServiceCard({ icon: Icon, title, desc, delay }: { icon: React.ElementType; title: string; desc: string; delay: number }) {
  const [hovered, setHovered] = React.useState(false)
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-8 rounded-2xl bg-[#f0ead6]/3 cursor-default overflow-hidden group"
    >
      {/* Borde animado con gradiente */}
      <div className="absolute inset-0 rounded-2xl p-px">
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: hovered
              ? "linear-gradient(135deg, rgba(217,119,6,0.6), rgba(217,119,6,0.1), rgba(217,119,6,0.0))"
              : "linear-gradient(135deg, rgba(240,234,214,0.08), rgba(240,234,214,0.02))",
          }}
          animate={{ opacity: hovered ? 1 : 1 }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <div className="absolute inset-[1px] rounded-2xl bg-[#0e0c09]" />

      {/* Glow interior al hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-2xl bg-amber-900/15"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <motion.div
          animate={hovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20"
        >
          <Icon className="h-5 w-5 text-amber-400" />
        </motion.div>
        <h3 className="text-lg font-bold text-[#f0ead6] mb-3">{title}</h3>
        <p className="text-sm text-[#f0ead6]/50 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}

/* ─── Testimonio ─── */
const TESTIMONIALS = [
  { text: "La landing que nos hicieron triplicó las consultas en el primer mes.", author: "Chita Automotores", role: "Concesionaria · Entre Ríos" },
  { text: "Muy profesionales. Entendieron exactamente lo que necesitábamos.", author: "Cliente privado", role: "Servicios · Entre Ríos" },
  { text: "El diseño sorprendió a todos. Los clientes nos preguntan quién hizo la web.", author: "Emprendedora local", role: "Moda · Argentina" },
]

/* ─── Main ─── */
export default function Home() {
  const heroRef = React.useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <main className="bg-[#0e0c09] text-[#f0ead6] overflow-x-hidden">
      <Grain />

      {/* ══════════ HERO ══════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden">
        <Orb className="top-10 left-10 w-[500px] h-[500px] bg-amber-800/30" delay={0} />
        <Orb className="bottom-20 right-10 w-[400px] h-[400px] bg-orange-900/20" delay={3} />
        <Orb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-950/25" delay={6} />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />

        <motion.div style={{ y: logoY, opacity: heroOpacity }} className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8">

          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Ceres & Pomona" className="h-32 w-auto mx-auto drop-shadow-[0_0_60px_rgba(217,119,6,0.4)]" />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xs tracking-[0.35em] text-amber-500/60 uppercase"
          >
            Marketing Digital
          </motion.p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            <AnimatedText text="Tu negocio merece" delay={0.4} />
            <br />
            <span className="text-amber-400">
              <AnimatedText text="una página que vende." delay={0.6} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 1.2 }}
            className="text-lg sm:text-xl text-[#f0ead6]/55 max-w-xl leading-relaxed"
          >
            Diseñamos landing pages visuales que atrapan, convencen y convierten —
            desde el primer scroll.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <MagneticButton
              href={WHATSAPP}
              className="flex items-center justify-center gap-2.5 rounded-full bg-amber-500 hover:bg-amber-400 px-9 py-4 text-sm font-bold text-[#0e0c09] transition-colors duration-300 hover:shadow-[0_0_50px_rgba(217,119,6,0.55)] cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" />
              Escribinos por WhatsApp
            </MagneticButton>
            <MagneticButton
              href={CALENDLY}
              className="flex items-center justify-center gap-2.5 rounded-full border border-[#f0ead6]/15 bg-[#f0ead6]/5 hover:bg-[#f0ead6]/10 px-9 py-4 text-sm font-semibold text-[#f0ead6] transition-colors duration-300 backdrop-blur-sm cursor-pointer"
            >
              <Calendar className="h-4 w-4 text-amber-400" />
              Agendar una llamada
            </MagneticButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="text-xs text-[#f0ead6]/20"
          >
            Sin costo · Sin compromiso · Respondemos hoy
          </motion.p>
        </motion.div>

        {/* Scroll line */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <motion.div
            className="w-px bg-gradient-to-b from-amber-500/70 to-transparent"
            animate={{ height: [0, 48, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ══════════ MARQUEE ══════════ */}
      <Marquee />

      {/* ══════════ STATS ══════════ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { icon: Users, value: 12, suffix: "+", label: "Clientes activos" },
            { icon: TrendingUp, value: 3, suffix: "x", label: "Aumento promedio de consultas" },
            { icon: Clock, value: 7, suffix: " días", label: "Entrega promedio" },
          ].map(({ icon: Icon, value, suffix, label }, i) => {
            const ref = React.useRef(null)
            const inView = useInView(ref, { once: true })
            return (
              <motion.div
                key={label}
                ref={ref}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="flex flex-col items-center gap-2"
              >
                <Icon className="h-5 w-5 text-amber-500/50 mb-1" />
                <p className="text-4xl sm:text-5xl font-black text-amber-400">
                  <Counter to={value} suffix={suffix} />
                </p>
                <p className="text-xs text-[#f0ead6]/40 uppercase tracking-wider max-w-[120px]">{label}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-amber-800/30 to-transparent" />

      {/* ══════════ SERVICIOS ══════════ */}
      <section className="py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.3em] text-amber-600/60 uppercase mb-4"
            >
              Lo que hacemos
            </motion.p>
            <h2 className="text-4xl sm:text-5xl font-bold">
              <AnimatedText text="Páginas que trabajan" />
              <br />
              <span className="text-amber-400">
                <AnimatedText text="mientras vos descansás." delay={0.2} />
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard icon={Monitor} title="Landing Pages Visuales" desc="Páginas diseñadas para impactar al primer segundo y llevar al visitante directo a la acción." delay={0} />
            <ServiceCard icon={Zap} title="Alta Conversión" desc="Cada sección pensada con psicología de ventas: el visitante correcto toma acción." delay={0.12} />
            <ServiceCard icon={Eye} title="Diseño que Comunica" desc="Tu marca, tu voz, tu diferencial — visibles y memorables desde el primer scroll." delay={0.24} />
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-amber-800/30 to-transparent" />

      {/* ══════════ PROCESO ══════════ */}
      <section className="py-28 px-4 bg-[#0a0800] relative overflow-hidden">
        <Orb className="top-0 right-0 w-[400px] h-[400px] bg-amber-900/15" delay={1} />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.3em] text-amber-600/60 uppercase mb-4"
            >
              Cómo trabajamos
            </motion.p>
            <h2 className="text-4xl sm:text-5xl font-bold">
              <AnimatedText text="Simple, rápido, efectivo." />
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 relative">
            {/* Línea conectora */}
            <div className="hidden sm:block absolute top-8 left-1/6 right-1/6 h-px bg-gradient-to-r from-amber-500/20 via-amber-500/40 to-amber-500/20" />

            {[
              { num: "01", title: "Llamada inicial", desc: "Entendemos tu negocio, cliente ideal y objetivos en 30 minutos." },
              { num: "02", title: "Diseño y desarrollo", desc: "Creamos tu landing con foco visual y psicología de conversión." },
              { num: "03", title: "Entrega y resultados", desc: "Publicamos, medimos y ajustamos hasta que los números hablen." },
            ].map((step, i) => {
              const ref = React.useRef(null)
              const inView = useInView(ref, { once: true, margin: "-60px" })
              return (
                <motion.div
                  key={step.num}
                  ref={ref}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.2 }}
                  className="flex flex-col items-center text-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: i * 0.2 + 0.2 }}
                    className="w-16 h-16 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center"
                  >
                    <span className="text-xl font-black text-amber-400">{step.num}</span>
                  </motion.div>
                  <h3 className="text-lg font-bold text-[#f0ead6]">{step.title}</h3>
                  <p className="text-sm text-[#f0ead6]/50 leading-relaxed max-w-xs">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-amber-800/30 to-transparent" />

      {/* ══════════ TESTIMONIOS ══════════ */}
      <section className="py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.3em] text-amber-600/60 uppercase mb-4"
            >
              Clientes
            </motion.p>
            <h2 className="text-4xl sm:text-5xl font-bold">
              <AnimatedText text="Lo que dicen los que" />
              <br />
              <span className="text-amber-400">
                <AnimatedText text="ya dieron el paso." delay={0.2} />
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => {
              const ref = React.useRef(null)
              const inView = useInView(ref, { once: true, margin: "-60px" })
              return (
                <motion.div
                  key={t.author}
                  ref={ref}
                  initial={{ opacity: 0, y: 48, rotateX: 10 }}
                  animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="p-8 rounded-2xl border border-[#f0ead6]/8 bg-[#f0ead6]/3 hover:border-amber-700/30 transition-colors duration-300"
                >
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: i * 0.15 + j * 0.06 + 0.3, type: "spring" }}
                      >
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-[#f0ead6]/65 leading-relaxed mb-6 italic">"{t.text}"</p>
                  <div>
                    <p className="text-sm font-bold text-[#f0ead6]">{t.author}</p>
                    <p className="text-xs text-[#f0ead6]/35 mt-0.5">{t.role}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════ CTA FINAL ══════════ */}
      <section className="py-32 px-4 relative overflow-hidden">
        <Orb className="inset-x-0 bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-amber-900/20" delay={0} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-700/40 to-transparent" />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] text-amber-600/60 uppercase mb-6"
          >
            Empezá hoy
          </motion.p>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <AnimatedText text="Tu próxima landing" />
            <br />
            <span className="text-amber-400">
              <AnimatedText text="puede cambiar todo." delay={0.15} />
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-[#f0ead6]/50 mb-12 text-lg"
          >
            Contanos sobre tu negocio. Sin costo, sin presión.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticButton
              href={WHATSAPP}
              className="flex items-center justify-center gap-2.5 rounded-full bg-amber-500 hover:bg-amber-400 px-10 py-4 text-sm font-bold text-[#0e0c09] transition-colors duration-300 hover:shadow-[0_0_60px_rgba(217,119,6,0.6)] cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" />
              Escribinos ahora
            </MagneticButton>
            <MagneticButton
              href={CALENDLY}
              className="flex items-center justify-center gap-2.5 rounded-full border border-[#f0ead6]/15 bg-transparent hover:bg-[#f0ead6]/5 px-10 py-4 text-sm font-semibold text-[#f0ead6] transition-colors duration-300 cursor-pointer"
            >
              <Calendar className="h-4 w-4 text-amber-400" />
              Agendar llamada
              <ArrowRight className="h-3.5 w-3.5 opacity-40" />
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="border-t border-[#f0ead6]/8 py-12 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Ceres & Pomona" className="h-14 w-auto opacity-50 hover:opacity-80 transition-opacity duration-300" />
          <p className="text-xs text-[#f0ead6]/20">
            © {new Date().getFullYear()} Ceres & Pomona Marketing Digital · Concepción del Uruguay, Entre Ríos
          </p>
        </motion.div>
      </footer>
    </main>
  )
}
