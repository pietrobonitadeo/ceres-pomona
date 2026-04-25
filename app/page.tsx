"use client"

import * as React from "react"
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { ArrowRight, Calendar, MessageCircle, Play, Monitor, FileText, Video } from "lucide-react"

const WHATSAPP = "https://wa.me/543442472249?text=Hola%20C%26P%2C%20quiero%20consultar%20sobre%20sus%20servicios%20de%20marketing%20automotriz"
const CALENDLY = "https://calendly.com/pietrobonitadeo"

/* ─── Paleta oficial ─── */
const INK      = "#0A0A0A"
const GRAPHITE = "#2C2C2A"
const CREAM    = "#FCF4D6"
const MUTED    = "#B5AC8E"
const OLIVE    = "#4A9E4B"
const PURPLE   = "#7E3A95"

const FRAUNCES = "var(--font-fraunces)"
const INTER    = "var(--font-inter)"

/* ─── Underline editorial (púrpura, una por titular) ─── */
function U({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      textDecoration: "underline",
      textDecorationColor: PURPLE,
      textDecorationThickness: "2px",
      textUnderlineOffset: "6px",
    }}>
      {children}
    </span>
  )
}

/* ─── Eyebrow ─── */
function Eyebrow({ children, dot = false }: { children: React.ReactNode; dot?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {dot && (
        <span style={{
          display: "inline-block", width: "8px", height: "8px",
          borderRadius: "50%", backgroundColor: PURPLE, flexShrink: 0,
        }} />
      )}
      <span style={{
        fontFamily: INTER, fontSize: "11px", fontWeight: 500,
        textTransform: "uppercase", letterSpacing: "0.22em", color: MUTED,
      }}>
        {children}
      </span>
    </div>
  )
}

/* ─── Hairline ─── */
function Hairline() {
  return <div style={{ height: "1px", backgroundColor: GRAPHITE }} />
}

/* ─── Fade up ─── */
function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Botón magnético ─── */
function MagneticBtn({ children, href, primary = false }: {
  children: React.ReactNode; href: string; primary?: boolean
}) {
  const ref = React.useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.3)
    y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        x: sx, y: sy,
        fontFamily: INTER, fontSize: "13px", fontWeight: 500,
        letterSpacing: "0.02em", textDecoration: "none",
        display: "inline-flex", alignItems: "center", gap: "8px",
        padding: "13px 24px", borderRadius: "999px", cursor: "pointer",
        borderWidth: "1px", borderStyle: "solid",
        borderColor: primary ? "transparent" : GRAPHITE,
        backgroundColor: primary ? CREAM : "transparent",
        color: primary ? INK : CREAM,
      }}
      whileHover={{
        backgroundColor: primary ? "#F2E8B5" : "rgba(240,234,214,0.04)",
        borderColor: primary ? "transparent" : "rgba(240,234,214,0.2)",
      }}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.a>
  )
}

/* ─── Marquee ─── */
const MARQUEE_ITEMS = [
  "Anuncios en video", "Marketing automotriz", "Consultas por WhatsApp",
  "Páginas premium", "Ventas a fin de mes", "Meta Ads",
  "Rubro automotriz", "Entrega en 48 horas",
]

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div style={{ overflow: "hidden", padding: "18px 0", position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(to right, ${INK} 0%, transparent 12%, transparent 88%, ${INK} 100%)`,
        zIndex: 1, pointerEvents: "none",
      }} />
      <motion.div
        style={{ display: "flex", gap: "52px", whiteSpace: "nowrap" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span key={i} style={{
            fontFamily: INTER, fontSize: "11px", fontWeight: 500,
            textTransform: "uppercase", letterSpacing: "0.22em", color: MUTED,
            display: "flex", alignItems: "center", gap: "52px",
          }}>
            {item}
            <span style={{ color: GRAPHITE }}>·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ─── Contador ─── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * to))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, to])

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>
}

/* ─── DATA ─── */

const METHODOLOGY = [
  {
    num: "01", icon: FileText,
    title: "Guión estratégico",
    desc: "Analizamos tu stock, tu diferencial y cómo piensa tu comprador. Escribimos un guión que habla directo a quien está listo para comprar.",
  },
  {
    num: "02", icon: Video,
    title: "Video profesional",
    desc: "Producimos el video con el formato y el ritmo pensados para que el auto detenga el scroll en cualquier feed.",
  },
  {
    num: "03", icon: Play,
    title: "Lanzamos el anuncio",
    desc: "Configuramos y publicamos la campaña en Meta. Las consultas llegan directo a tu WhatsApp desde el primer día.",
  },
  {
    num: "04", icon: MessageCircle,
    title: "Consultas calificadas",
    desc: "Personas que ya vieron el auto y quieren coordinar una visita. Vos solo atendés y cerrás.",
  },
]

const TESTIMONIALS = [
  {
    text: "En el primer mes de campaña tuvimos más de 40 consultas nuevas por WhatsApp. Cerramos 8 unidades. Nunca habíamos tenido esos números en tan poco tiempo.",
    author: "Chita Automotores",
    role: "Concepción del Uruguay",
  },
  {
    text: "El guión del video fue la clave. Los compradores llegaban al WhatsApp ya convencidos del auto — solo faltaba coordinar la visita.",
    author: "Autocentro Paraná",
    role: "Entre Ríos",
  },
  {
    text: "Antes pagábamos publicidad y no sabíamos si servía. Ahora cada peso va a anuncios que traen consultas reales y medibles.",
    author: "Motor Sur",
    role: "Gualeguaychú",
  },
]

/* ─── PAGE ─── */

export default function Home() {
  const heroRef = React.useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const logoY      = useTransform(scrollYProgress, [0, 1], [0, -60])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <main style={{ backgroundColor: INK, color: CREAM, overflowX: "hidden" }}>

      {/* ════════════════ HERO ════════════════ */}
      <section
        ref={heroRef}
        style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          position: "relative", padding: "80px 24px", textAlign: "center",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", backgroundColor: GRAPHITE }} />

        <motion.div
          style={{ y: logoY, opacity: heroOpacity, width: "100%", maxWidth: "860px", display: "flex", flexDirection: "column", alignItems: "center", gap: "36px" }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="C&P Marketing"
                style={{
                  height: "180px", width: "auto",
                  WebkitMaskImage: "radial-gradient(ellipse 75% 85% at 50% 50%, black 50%, transparent 100%)",
                  maskImage: "radial-gradient(ellipse 75% 85% at 50% 50%, black 50%, transparent 100%)",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Eyebrow>Especialistas en marketing automotriz</Eyebrow>
          </motion.div>

          {/* Headline — Fraunces 300 */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: FRAUNCES, fontWeight: 300,
              fontSize: "clamp(40px, 7.5vw, 76px)",
              lineHeight: 1.0, letterSpacing: "-0.02em", margin: 0,
            }}
          >
            Consultas en tu WhatsApp.
            <br />
            <U>Ventas</U> a fin de mes.
          </motion.h1>

          {/* Subhead — Fraunces italic */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              fontFamily: FRAUNCES, fontStyle: "italic", fontWeight: 400,
              fontSize: "clamp(17px, 2.2vw, 21px)", lineHeight: 1.55,
              color: `${CREAM}99`, maxWidth: "540px", margin: 0,
            }}
          >
            Creamos anuncios en video con guión estratégico y páginas de alta conversión, especializados en el rubro automotriz.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 items-center justify-center"
          >
            <MagneticBtn href={WHATSAPP} primary>
              <MessageCircle size={14} />
              Quiero más ventas
              <ArrowRight size={14} />
            </MagneticBtn>
            <MagneticBtn href={CALENDLY}>
              <Calendar size={14} />
              Agendar llamada gratis
            </MagneticBtn>
          </motion.div>

          {/* Microcopy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            style={{ fontFamily: INTER, fontSize: "12px", color: MUTED, margin: 0 }}
          >
            Sin adelantos · Sin contratos · Primer anuncio en 7 días
          </motion.p>
        </motion.div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", backgroundColor: GRAPHITE }} />
      </section>

      {/* ════════════════ MARQUEE ════════════════ */}
      <Marquee />
      <Hairline />

      {/* ════════════════ STATS ════════════════ */}
      <section style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: 12, suffix: "+", label: "Negocios automotrices", sub: "trabajando con nosotros", green: false },
              { value: 3,  suffix: "×", label: "Más consultas",        sub: "en el primer mes",        green: true },
              { value: 7,  suffix: "",  label: "Días para lanzar",     sub: "tu primer anuncio",       green: false },
            ].map(({ value, suffix, label, sub, green }, i) => {
              const ref = React.useRef(null)
              const inView = useInView(ref, { once: true })
              return (
                <motion.div
                  key={label} ref={ref}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
                >
                  <Eyebrow>{label}</Eyebrow>
                  <p style={{
                    fontFamily: FRAUNCES, fontWeight: 300,
                    fontSize: "clamp(48px, 6vw, 72px)",
                    lineHeight: 1.0, letterSpacing: "-0.02em", margin: 0,
                  }}>
                    <Counter to={value} />
                    <span style={{ color: green ? OLIVE : CREAM }}>{suffix}</span>
                  </p>
                  <p style={{ fontFamily: INTER, fontSize: "13px", color: MUTED, margin: 0 }}>{sub}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <Hairline />

      {/* ════════════════ SERVICIOS ════════════════ */}
      <section style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <FadeUp>
            <div style={{ marginBottom: "60px" }}>
              <Eyebrow dot>Servicios</Eyebrow>
              <h2 style={{
                fontFamily: FRAUNCES, fontWeight: 400,
                fontSize: "clamp(28px, 4vw, 42px)",
                lineHeight: 1.05, letterSpacing: "-0.015em",
                marginTop: "16px", marginBottom: 0,
              }}>
                Dos formas de llenar tu agenda<br />de <U>compradores</U>.
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* CAMPAÑAS EN VIDEO — protagonista */}
            <FadeUp className="lg:col-span-2" delay={0.1}>
              <div style={{
                height: "100%", padding: "40px",
                border: `1px solid ${GRAPHITE}`, borderRadius: "4px",
                display: "flex", flexDirection: "column", gap: "28px",
              }}>
                <Eyebrow dot>Nuevo servicio</Eyebrow>
                <div>
                  <h3 style={{
                    fontFamily: FRAUNCES, fontWeight: 400,
                    fontSize: "clamp(24px, 3vw, 34px)",
                    lineHeight: 1.05, letterSpacing: "-0.015em",
                    margin: "0 0 12px 0",
                  }}>
                    Campañas de video<br />para WhatsApp.
                  </h3>
                  <p style={{
                    fontFamily: FRAUNCES, fontStyle: "italic", fontWeight: 400,
                    fontSize: "17px", color: `${CREAM}99`,
                    margin: 0, lineHeight: 1.5,
                  }}>
                    Anuncios que llenan tu WhatsApp de consultas calificadas.
                  </p>
                </div>
                <p style={{
                  fontFamily: INTER, fontSize: "15px",
                  color: `${CREAM}80`, lineHeight: 1.7,
                  margin: 0, maxWidth: "520px",
                }}>
                  Creamos anuncios en video con guión estratégico para el rubro automotriz. Cada peso invertido tiene que volver como una consulta real por WhatsApp, lista para cerrar a fin de mes.
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    "Guión estratégico incluido",
                    "Producción de video profesional",
                    "Configuración del anuncio en Meta Ads",
                    "Consultas directas a tu WhatsApp",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: INTER, fontSize: "14px", color: MUTED }}>
                      <span style={{ display: "inline-block", width: "5px", height: "5px", borderRadius: "50%", backgroundColor: MUTED, flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            {/* LANDING PAGES */}
            <FadeUp delay={0.2}>
              <div style={{
                height: "100%", padding: "40px",
                border: `1px solid ${GRAPHITE}`, borderRadius: "4px",
                display: "flex", flexDirection: "column", gap: "28px",
              }}>
                <Eyebrow>Páginas web</Eyebrow>
                <div>
                  <h3 style={{
                    fontFamily: FRAUNCES, fontWeight: 400,
                    fontSize: "clamp(22px, 2.8vw, 28px)",
                    lineHeight: 1.05, letterSpacing: "-0.015em",
                    margin: "0 0 12px 0",
                  }}>
                    Landing pages<br />que convierten.
                  </h3>
                  <p style={{
                    fontFamily: FRAUNCES, fontStyle: "italic", fontWeight: 400,
                    fontSize: "16px", color: `${CREAM}99`,
                    margin: 0, lineHeight: 1.5,
                  }}>
                    Diseño, copy y técnica. Lista en menos de 7 días.
                  </p>
                </div>
                <p style={{
                  fontFamily: INTER, fontSize: "15px",
                  color: `${CREAM}80`, lineHeight: 1.7, margin: 0,
                }}>
                  Diseñamos páginas de alta conversión que capturan al visitante y lo convierten en consulta.
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0, margin: "auto 0 0 0" }}>
                  {[
                    "Diseño visual de alto impacto",
                    "Copy estratégico",
                    "Online en 7 días",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: INTER, fontSize: "14px", color: MUTED }}>
                      <span style={{ display: "inline-block", width: "5px", height: "5px", borderRadius: "50%", backgroundColor: MUTED, flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      <Hairline />

      {/* ════════════════ METODOLOGÍA ════════════════ */}
      <section style={{ padding: "96px 24px", backgroundColor: "#0D0C0A" }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <FadeUp>
            <div style={{ marginBottom: "60px" }}>
              <Eyebrow>Cómo funciona</Eyebrow>
              <h2 style={{
                fontFamily: FRAUNCES, fontWeight: 400,
                fontSize: "clamp(28px, 4vw, 42px)",
                lineHeight: 1.05, letterSpacing: "-0.015em",
                marginTop: "16px", marginBottom: "12px",
              }}>
                De cero a tu primer anuncio<br />en cuatro <U>pasos</U>.
              </h2>
              <p style={{ fontFamily: INTER, fontSize: "15px", color: MUTED, margin: 0 }}>
                Nos encargamos de todo. Vos te enfocás en atender las consultas que llegan.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {METHODOLOGY.map((step, i) => {
              const ref = React.useRef(null)
              const inView = useInView(ref, { once: true, margin: "-60px" })
              return (
                <motion.div
                  key={step.num} ref={ref}
                  initial={{ opacity: 0, y: 32 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.12 }}
                  style={{
                    padding: "32px 28px",
                    border: `1px solid ${GRAPHITE}`, borderRadius: "4px",
                    display: "flex", flexDirection: "column", gap: "16px",
                    position: "relative", overflow: "hidden",
                  }}
                >
                  <span style={{
                    position: "absolute", top: "8px", right: "16px",
                    fontFamily: FRAUNCES, fontWeight: 300,
                    fontSize: "72px", lineHeight: 1,
                    color: `${CREAM}06`, userSelect: "none",
                    letterSpacing: "-0.03em",
                  }}>
                    {step.num}
                  </span>
                  <Eyebrow>{step.num}</Eyebrow>
                  <h3 style={{
                    fontFamily: FRAUNCES, fontWeight: 400,
                    fontSize: "20px", lineHeight: 1.1, margin: 0,
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontFamily: INTER, fontSize: "14px",
                    color: `${CREAM}75`, lineHeight: 1.65, margin: 0,
                  }}>
                    {step.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <Hairline />

      {/* ════════════════ TESTIMONIOS ════════════════ */}
      <section style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <FadeUp>
            <div style={{ marginBottom: "60px" }}>
              <Eyebrow dot>Resultados reales</Eyebrow>
              <h2 style={{
                fontFamily: FRAUNCES, fontWeight: 400,
                fontSize: "clamp(28px, 4vw, 42px)",
                lineHeight: 1.05, letterSpacing: "-0.015em",
                marginTop: "16px", marginBottom: 0,
              }}>
                Concesionarias que ya<br />están <U>vendiendo</U> más.
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => {
              const ref = React.useRef(null)
              const inView = useInView(ref, { once: true, margin: "-60px" })
              return (
                <motion.div
                  key={t.author} ref={ref}
                  initial={{ opacity: 0, y: 32 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.12 }}
                  style={{
                    padding: "36px 32px",
                    border: `1px solid ${GRAPHITE}`, borderRadius: "4px",
                    display: "flex", flexDirection: "column", gap: "24px",
                  }}
                >
                  <p style={{
                    fontFamily: FRAUNCES, fontStyle: "italic", fontWeight: 400,
                    fontSize: "15px", lineHeight: 1.7,
                    color: `${CREAM}80`, margin: 0, flex: 1,
                  }}>
                    "{t.text}"
                  </p>
                  <div style={{ borderTop: `1px solid ${GRAPHITE}`, paddingTop: "20px" }}>
                    <p style={{ fontFamily: INTER, fontSize: "14px", fontWeight: 500, color: CREAM, margin: "0 0 4px 0" }}>
                      {t.author}
                    </p>
                    <p style={{ fontFamily: INTER, fontSize: "12px", color: MUTED, margin: 0, letterSpacing: "0.03em" }}>
                      {t.role}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <Hairline />

      {/* ════════════════ CTA FINAL ════════════════ */}
      <section style={{ padding: "120px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <FadeUp>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
              <Eyebrow>El siguiente paso</Eyebrow>
            </div>
            <h2 style={{
              fontFamily: FRAUNCES, fontWeight: 300,
              fontSize: "clamp(40px, 6.5vw, 68px)",
              lineHeight: 1.0, letterSpacing: "-0.02em",
              margin: "0 0 24px 0",
            }}>
              Cada mes sin campaña<br />es <U>ventas</U> que no cerraste.
            </h2>
            <p style={{
              fontFamily: INTER, fontSize: "16px",
              color: MUTED, lineHeight: 1.65,
              maxWidth: "460px", margin: "0 auto 12px",
            }}>
              Tu competencia ya usa video y WhatsApp para vender. En 30 minutos sabemos si podemos ayudarte.
            </p>
            <p style={{ fontFamily: INTER, fontSize: "13px", color: MUTED, marginBottom: "40px" }}>
              Sin adelantos · Sin contratos · Primer anuncio en 7 días
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <MagneticBtn href={WHATSAPP} primary>
                <MessageCircle size={14} />
                Quiero más ventas
                <ArrowRight size={14} />
              </MagneticBtn>
              <MagneticBtn href={CALENDLY}>
                <Calendar size={14} />
                Agendar llamada gratis
              </MagneticBtn>
            </div>
          </FadeUp>
        </div>
      </section>

      <Hairline />

      {/* ════════════════ FOOTER ════════════════ */}
      <footer style={{ padding: "48px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="C&P Marketing"
            style={{
              height: "56px", width: "auto", opacity: 0.45,
              WebkitMaskImage: "radial-gradient(ellipse 75% 85% at 50% 50%, black 50%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 75% 85% at 50% 50%, black 50%, transparent 100%)",
            }}
          />
          <p style={{ fontFamily: INTER, fontSize: "12px", color: MUTED, letterSpacing: "0.03em", margin: 0 }}>
            © {new Date().getFullYear()} C&P Marketing · Concepción del Uruguay, Entre Ríos
          </p>
        </div>
      </footer>

    </main>
  )
}
