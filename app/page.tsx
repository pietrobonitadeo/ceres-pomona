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
import { MessageCircle, Calendar, Monitor, Play, FileText, Video, ArrowRight, Star, TrendingUp, Users, Clock } from "lucide-react"

const WHATSAPP = "https://wa.me/543442472249?text=Hola%20C%26P%2C%20quiero%20consultar%20sobre%20sus%20servicios%20de%20marketing%20automotriz"
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

/* ─── Fade up suave ─── */
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
  "Anuncios en Video", "Marketing Automotriz", "Consultas por WhatsApp",
  "Guiones Estratégicos", "Páginas que Convierten", "Ventas a Fin de Mes",
  "Rubro Automotriz", "Campañas que Venden",
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

/* ─── METODOLOGÍA — 4 pasos del nuevo servicio ─── */
const METHODOLOGY = [
  {
    num: "01",
    icon: FileText,
    title: "Guión estratégico",
    desc: "Analizamos tu stock, tu diferencial y cómo piensa tu comprador. Escribimos un guión que habla directo a quien está listo para comprar.",
  },
  {
    num: "02",
    icon: Video,
    title: "Video profesional",
    desc: "Producimos el video con el formato, el ritmo y el gancho visual pensados para que el auto detenga el scroll en cualquier feed.",
  },
  {
    num: "03",
    icon: Play,
    title: "Lanzamos el anuncio",
    desc: "Configuramos y publicamos la campaña donde están tus compradores. Las consultas llegan directo a tu WhatsApp desde el primer día.",
  },
  {
    num: "04",
    icon: MessageCircle,
    title: "Consultas calificadas",
    desc: "Personas que ya vieron el auto, quieren saber el precio o coordinar un test drive. Vos solo atendés y cerrás.",
  },
]

/* ─── TESTIMONIOS — sector automotriz ─── */
const TESTIMONIALS = [
  {
    text: "En el primer mes de campaña tuvimos más de 40 consultas nuevas por WhatsApp. Cerramos 8 unidades. Nunca habíamos tenido esos números en tan poco tiempo.",
    author: "Chita Automotores",
    role: "Concesionaria · Concepción del Uruguay",
  },
  {
    text: "El guión del video fue la clave. Los compradores llegaban al WhatsApp ya convencidos del auto — solo faltaba coordinar la visita o el test drive.",
    author: "Autocentro Paraná",
    role: "Seminuevos · Entre Ríos",
  },
  {
    text: "Antes pagábamos publicidad y no sabíamos si servía. Ahora cada peso va a campañas con anuncios concretos que traen consultas reales y medibles.",
    author: "Motor Sur",
    role: "Concesionaria · Gualeguaychú",
  },
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

          {/* Badge — especialistas automotriz */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-amber-500/30 bg-amber-500/8 px-5 py-2 text-xs font-medium text-amber-400 tracking-wide"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Especialistas en marketing automotriz
          </motion.div>

          {/* HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight"
          >
            Consultas en tu WhatsApp.
            <br />
            <span className="text-amber-400">Ventas a fin de mes.</span>
          </motion.h1>

          {/* SUBHEADLINE */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="text-lg sm:text-xl text-[#f0ead6]/55 max-w-xl leading-relaxed"
          >
            Creamos anuncios en video con guión estratégico y páginas de alta conversión —
            especializados en el rubro automotriz.
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
              Quiero más ventas
            </MagneticButton>
            <MagneticButton
              href={CALENDLY}
              className="flex items-center justify-center gap-2.5 rounded-full border border-[#f0ead6]/15 bg-[#f0ead6]/5 hover:bg-[#f0ead6]/10 px-9 py-4 text-sm font-semibold text-[#f0ead6] transition-colors duration-300 backdrop-blur-sm cursor-pointer"
            >
              <Calendar className="h-4 w-4 text-amber-400" />
              Agendar llamada gratis
            </MagneticButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-xs text-[#f0ead6]/25"
          >
            Sin adelantos · Sin contratos · Primer anuncio en menos de 7 días
          </motion.p>
        </motion.div>

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
          <motion.div className="w-px bg-gradient-to-b from-amber-500/60 to-transparent mx-auto"
            animate={{ height: [0, 48, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </section>

      {/* ══════════ MARQUEE ══════════ */}
      <Marquee />

      {/* ══════════ STATS ══════════ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { icon: Users, value: 12, suffix: "+", label: "Negocios automotrices trabajando con nosotros" },
            { icon: TrendingUp, value: 3, suffix: "x", label: "Más consultas en el primer mes de campaña" },
            { icon: Clock, value: 7, suffix: " días", label: "Para lanzar tu primer anuncio en video" },
          ].map(({ icon: Icon, value, suffix, label }, i) => {
            const ref = React.useRef(null)
            const inView = useInView(ref, { once: true })
            return (
              <motion.div key={label} ref={ref}
                initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
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

      {/* ══════════ SERVICIOS — 2 offerings ══════════ */}
      <section className="py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-amber-600/60 uppercase mb-4">Servicios</p>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Dos formas de llenar
              <br />
              <span className="text-amber-400">tu agenda de compradores.</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* CAMPAÑAS EN VIDEO — protagonista, ocupa 2/3 */}
            <FadeUp className="lg:col-span-2" delay={0}>
              <div className="relative h-full p-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 overflow-hidden group hover:border-amber-500/35 transition-colors duration-300">
                <Orb className="bottom-0 right-0 w-[300px] h-[300px] bg-amber-800/20" delay={2} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/25">
                      <Play className="h-5 w-5 text-amber-400" />
                    </div>
                    <span className="text-xs tracking-widest text-amber-400/80 uppercase font-medium bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1.5">
                      Nuevo servicio
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#f0ead6] mb-4 leading-tight">
                    Campañas de video<br />para WhatsApp
                  </h3>
                  <p className="text-[#f0ead6]/55 leading-relaxed mb-8 max-w-lg">
                    Creamos anuncios en video con guión estratégico, pensados específicamente para el rubro automotriz.
                    El objetivo es siempre el mismo: que cada peso invertido traiga una consulta real por WhatsApp,
                    lista para cerrar a fin de mes.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Guión estratégico incluido",
                      "Producción de video profesional",
                      "Configuración del anuncio",
                      "Consultas directas a tu WhatsApp",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-sm text-[#f0ead6]/60">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* LANDING PAGES — segundo servicio */}
            <FadeUp delay={0.15}>
              <div className="relative h-full p-8 rounded-2xl border border-[#f0ead6]/8 bg-[#f0ead6]/3 overflow-hidden group hover:border-amber-700/30 transition-colors duration-300">
                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <Monitor className="h-5 w-5 text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#f0ead6] mb-4 leading-tight">
                    Landing pages<br />que convierten
                  </h3>
                  <p className="text-[#f0ead6]/55 leading-relaxed mb-8">
                    Diseñamos páginas de alta conversión que capturan al visitante y lo convierten en consulta.
                    Copy, diseño y técnica — todo en menos de 7 días.
                  </p>
                  <div className="flex flex-col gap-3">
                    {[
                      "Diseño visual de alto impacto",
                      "Copy estratégico",
                      "Online en 7 días",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-sm text-[#f0ead6]/60">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-amber-800/30 to-transparent" />

      {/* ══════════ METODOLOGÍA — el proceso del nuevo servicio ══════════ */}
      <section className="py-28 px-4 bg-[#0a0800] relative overflow-hidden">
        <Orb className="top-0 right-0 w-[450px] h-[450px] bg-amber-900/15" delay={1} />
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeUp className="text-center mb-20">
            <p className="text-xs tracking-[0.3em] text-amber-600/60 uppercase mb-4">Cómo funciona</p>
            <h2 className="text-4xl sm:text-5xl font-bold">
              De cero a tu primer anuncio
              <br />
              <span className="text-amber-400">en cuatro pasos.</span>
            </h2>
            <p className="text-[#f0ead6]/45 mt-4 max-w-md mx-auto">
              Nos encargamos de todo. Vos te enfocás en atender las consultas que llegan.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {METHODOLOGY.map((step, i) => {
              const ref = React.useRef(null)
              const inView = useInView(ref, { once: true, margin: "-60px" })
              return (
                <motion.div
                  key={step.num} ref={ref}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  className="relative flex flex-col gap-5 p-6 rounded-2xl border border-[#f0ead6]/8 bg-[#f0ead6]/3"
                >
                  <span className="absolute top-4 right-4 text-6xl font-black text-[#f0ead6]/4 select-none leading-none">{step.num}</span>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <step.icon className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest text-amber-500/50 font-medium uppercase mb-1.5">{step.num}</p>
                    <h3 className="text-lg font-bold text-[#f0ead6] mb-2">{step.title}</h3>
                    <p className="text-sm text-[#f0ead6]/50 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <FadeUp className="mt-12 text-center" delay={0.4}>
            <p className="text-[#f0ead6]/25 text-sm tracking-wide">
              Guión → Video → Anuncio →{" "}
              <span className="text-amber-400/60">Tu WhatsApp lleno de consultas.</span>
            </p>
          </FadeUp>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-amber-800/30 to-transparent" />

      {/* ══════════ TESTIMONIOS ══════════ */}
      <section className="py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-amber-600/60 uppercase mb-4">Resultados reales</p>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Concesionarias que ya
              <br />
              <span className="text-amber-400">están vendiendo más.</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => {
              const ref = React.useRef(null)
              const inView = useInView(ref, { once: true, margin: "-60px" })
              return (
                <motion.div
                  key={t.author} ref={ref}
                  initial={{ opacity: 0, y: 48 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="p-8 rounded-2xl border border-[#f0ead6]/8 bg-[#f0ead6]/3 hover:border-amber-700/30 transition-colors duration-300"
                >
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, j) => (
                      <motion.div key={j}
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
        <Orb className="bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-amber-900/20" delay={0} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-700/40 to-transparent" />

        <div className="relative max-w-3xl mx-auto text-center">
          <FadeUp>
            <p className="text-xs tracking-[0.3em] text-amber-600/60 uppercase mb-6">El siguiente paso</p>

            {/* Loss aversion: cada mes sin campaña = ventas perdidas */}
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Cada mes sin campaña
              <br />
              <span className="text-amber-400">es ventas que no cerraste.</span>
            </h2>

            <p className="text-[#f0ead6]/50 mb-4 text-lg max-w-xl mx-auto leading-relaxed">
              Tu competencia ya usa video y WhatsApp para vender. En 30 minutos sabemos si
              podemos ayudarte — y qué tipo de campaña le va mejor a tu stock.
            </p>

            <p className="text-sm text-amber-400/70 mb-10 font-medium">
              → Sin adelantos · Sin contratos · Primer anuncio en 7 días
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton
                href={WHATSAPP}
                className="flex items-center justify-center gap-2.5 rounded-full bg-amber-500 hover:bg-amber-400 px-10 py-4 text-sm font-bold text-[#0e0c09] transition-colors duration-300 hover:shadow-[0_0_60px_rgba(217,119,6,0.6)] cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" />
                Quiero más ventas
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
