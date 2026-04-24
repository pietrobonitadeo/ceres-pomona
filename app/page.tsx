"use client"

import * as React from "react"
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
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

/* ─── Fade up suave — reemplaza la animación letra por letra ─── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Marquee ─── */
const MARQUEE_ITEMS = [
  "Más Consultas", "Más Ventas", "Diseño Visual", "Marketing Digital",
  "Resultados Reales", "Páginas que Convierten", "Entrega en 7 Días", "Estrategia Digital",
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

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>
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

/* ─── Card servicio ─── */
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
      className="relative p-8 rounded-2xl bg-[#f0ead6]/3 cursor-default overflow-hidden"
    >
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-500"
        style={{
          background: hovered
            ? "linear-gradient(135deg, rgba(217,119,6,0.15), transparent)"
            : "transparent",
          boxShadow: hovered ? "inset 0 0 0 1px rgba(217,119,6,0.3)" : "inset 0 0 0 1px rgba(240,234,214,0.07)",
        }}
      />
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

const TESTIMONIALS = [
  { text: "La landing que nos hicieron triplicó las consultas en el primer mes. Antes la gente llegaba y se iba, ahora convierten.", author: "Chita Automotores", role: "Concesionaria · Concepción del Uruguay" },
  { text: "Entendieron el negocio desde el primer llamado. En una semana teníamos la página online y ya generando resultados.", author: "Cliente privado", role: "Servicios · Entre Ríos" },
  { text: "El diseño sorprendió a todos. Los clientes nos preguntan quién hizo la web — eso solo ya vale la inversión.", author: "Emprendedora local", role: "Moda · Argentina" },
]

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
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Ceres & Pomona"
                className="h-64 w-auto mx-auto"
                style={{
                  WebkitMaskImage: "radial-gradient(ellipse 75% 85% at 50% 50%, black 50%, transparent 100%)",
                  maskImage: "radial-gradient(ellipse 75% 85% at 50% 50%, black 50%, transparent 100%)",
                  filter: "drop-shadow(0 0 40px rgba(217,119,6,0.45))",
                }}
              />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xs tracking-[0.35em] text-amber-500/60 uppercase"
          >
            Marketing Digital
          </motion.p>

          {/* HEADLINE — Jobs to be Done + Loss Aversion */}
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight"
          >
            Más clientes.
            <br />
            <span className="text-amber-400">Sin cambiar lo que vendés.</span>
          </motion.h1>

          {/* SUBHEADLINE — Especificidad + urgencia suave */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="text-lg sm:text-xl text-[#f0ead6]/55 max-w-xl leading-relaxed"
          >
            Diseñamos landing pages para negocios que quieren convertir visitas en consultas reales —
            entregadas en menos de 7 días.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <MagneticButton
              href={WHATSAPP}
              className="flex items-center justify-center gap-2.5 rounded-full bg-amber-500 hover:bg-amber-400 px-9 py-4 text-sm font-bold text-[#0e0c09] transition-colors duration-300 hover:shadow-[0_0_50px_rgba(217,119,6,0.55)] cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" />
              Quiero más clientes
            </MagneticButton>
            <MagneticButton
              href={CALENDLY}
              className="flex items-center justify-center gap-2.5 rounded-full border border-[#f0ead6]/15 bg-[#f0ead6]/5 hover:bg-[#f0ead6]/10 px-9 py-4 text-sm font-semibold text-[#f0ead6] transition-colors duration-300 backdrop-blur-sm cursor-pointer"
            >
              <Calendar className="h-4 w-4 text-amber-400" />
              Agendar llamada gratis
            </MagneticButton>
          </motion.div>

          {/* MICROCOPY — reduce el miedo específico */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-xs text-[#f0ead6]/25"
          >
            Sin adelantos · Sin contratos · Tu página online en 7 días o te devolvemos el dinero
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-px bg-gradient-to-b from-amber-500/60 to-transparent mx-auto"
            animate={{ height: [0, 48, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ══════════ MARQUEE ══════════ */}
      <Marquee />

      {/* ══════════ STATS — Prueba social específica ══════════ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { icon: Users, value: 12, suffix: "+", label: "Negocios que ya confían en nosotros" },
            { icon: TrendingUp, value: 3, suffix: "x", label: "Más consultas en el primer mes" },
            { icon: Clock, value: 7, suffix: " días", label: "De la idea a tu página online" },
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
                <p className="text-xs text-[#f0ead6]/40 uppercase tracking-wider max-w-[140px]">{label}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-amber-800/30 to-transparent" />

      {/* ══════════ SERVICIOS — outcome-focused ══════════ */}
      <section className="py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-amber-600/60 uppercase mb-4">Lo que hacemos</p>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Una página que trabaja
              <br />
              <span className="text-amber-400">mientras vos atendés clientes.</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard
              icon={Monitor}
              title="Diseño que Para el Scroll"
              desc="El visitante entra, ve, y no puede irse. Cada pixel pensado para que se quede y tome acción."
              delay={0}
            />
            <ServiceCard
              icon={Zap}
              title="Copy que Convierte"
              desc="Las palabras correctas en el orden correcto. Tu cliente ideal se siente identificado y quiere hablar con vos."
              delay={0.12}
            />
            <ServiceCard
              icon={Eye}
              title="Lista para Vender en 7 Días"
              desc="No meses de espera, no presupuestos eternos. Acordamos el lunes, publicamos el viernes."
              delay={0.24}
            />
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-amber-800/30 to-transparent" />

      {/* ══════════ PROCESO ══════════ */}
      <section className="py-28 px-4 bg-[#0a0800] relative overflow-hidden">
        <Orb className="top-0 right-0 w-[400px] h-[400px] bg-amber-900/15" delay={1} />
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeUp className="text-center mb-20">
            <p className="text-xs tracking-[0.3em] text-amber-600/60 uppercase mb-4">Cómo trabajamos</p>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Tres pasos.
              <span className="text-amber-400"> Una semana.</span>
            </h2>
            <p className="text-[#f0ead6]/45 mt-4 max-w-md mx-auto">
              Sin reuniones infinitas, sin burocracia. Directo al resultado.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 relative">
            <div className="hidden sm:block absolute top-8 left-1/6 right-1/6 h-px bg-gradient-to-r from-amber-500/20 via-amber-500/40 to-amber-500/20" />
            {[
              { num: "01", title: "Llamada de 30 minutos", desc: "Entendemos tu negocio, tu cliente ideal y qué te impide crecer hoy." },
              { num: "02", title: "Diseñamos y construimos", desc: "Vos seguís trabajando. Nosotros armamos la landing con copy, diseño y toda la técnica." },
              { num: "03", title: "Online y generando", desc: "Publicamos, te entregamos todo listo y te explicamos cómo medirlo. Sin depender de nosotros." },
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

      {/* ══════════ TESTIMONIOS — Availability heuristic: hacemos el éxito fácil de imaginar ══════════ */}
      <section className="py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-amber-600/60 uppercase mb-4">Resultados reales</p>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Negocios como el tuyo
              <br />
              <span className="text-amber-400">que ya están creciendo.</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => {
              const ref = React.useRef(null)
              const inView = useInView(ref, { once: true, margin: "-60px" })
              return (
                <motion.div
                  key={t.author}
                  ref={ref}
                  initial={{ opacity: 0, y: 48 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
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

      {/* ══════════ CTA FINAL — Loss aversion + Zero price effect ══════════ */}
      <section className="py-32 px-4 relative overflow-hidden">
        <Orb className="bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-amber-900/20" delay={0} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-700/40 to-transparent" />

        <div className="relative max-w-3xl mx-auto text-center">
          <FadeUp>
            <p className="text-xs tracking-[0.3em] text-amber-600/60 uppercase mb-6">Última pregunta</p>

            {/* Loss aversion: el costo de no actuar */}
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
              ¿Cuántos clientes
              <br />
              <span className="text-amber-400">perdés cada semana?</span>
            </h2>

            <p className="text-[#f0ead6]/50 mb-4 text-lg max-w-xl mx-auto">
              Cada visita que llega a tu negocio sin una página que convierte, es un cliente
              que se va a la competencia. La primera llamada es gratis.
            </p>

            <p className="text-sm text-amber-400/70 mb-10 font-medium">
              → Entrega garantizada en 7 días o te devolvemos el dinero.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton
                href={WHATSAPP}
                className="flex items-center justify-center gap-2.5 rounded-full bg-amber-500 hover:bg-amber-400 px-10 py-4 text-sm font-bold text-[#0e0c09] transition-colors duration-300 hover:shadow-[0_0_60px_rgba(217,119,6,0.6)] cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" />
                Quiero mi landing ahora
              </MagneticButton>
              <MagneticButton
                href={CALENDLY}
                className="flex items-center justify-center gap-2.5 rounded-full border border-[#f0ead6]/15 bg-transparent hover:bg-[#f0ead6]/5 px-10 py-4 text-sm font-semibold text-[#f0ead6] transition-colors duration-300 cursor-pointer"
              >
                <Calendar className="h-4 w-4 text-amber-400" />
                Agendar llamada gratis
                <ArrowRight className="h-3.5 w-3.5 opacity-40" />
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="border-t border-[#f0ead6]/8 py-12 px-4 text-center">
        <FadeUp className="flex flex-col items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Ceres & Pomona"
            className="h-20 w-auto opacity-60 hover:opacity-90 transition-opacity duration-300"
            style={{
              WebkitMaskImage: "radial-gradient(ellipse 75% 85% at 50% 50%, black 50%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 75% 85% at 50% 50%, black 50%, transparent 100%)",
            }}
          />
          <p className="text-xs text-[#f0ead6]/20">
            © {new Date().getFullYear()} Ceres & Pomona Marketing Digital · Concepción del Uruguay, Entre Ríos
          </p>
        </FadeUp>
      </footer>
    </main>
  )
}
