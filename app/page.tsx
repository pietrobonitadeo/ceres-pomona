"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { MessageCircle, Calendar, Monitor, Zap, Eye, ArrowRight, Star } from "lucide-react"

const WHATSAPP = "https://wa.me/543442472249?text=Hola%20Ceres%20%26%20Pomona%2C%20quiero%20consultar%20sobre%20una%20landing%20page"
const CALENDLY = "https://calendly.com/pietrobonitadeo"

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const SERVICES = [
  {
    icon: Monitor,
    title: "Landing Pages Visuales",
    desc: "Páginas diseñadas para impactar al primer segundo y llevar al visitante directo a la acción.",
  },
  {
    icon: Zap,
    title: "Alta Conversión",
    desc: "Cada sección pensada con psicología de ventas: el visitante correcto toma acción.",
  },
  {
    icon: Eye,
    title: "Diseño que Comunica",
    desc: "Tu marca, tu voz, tu diferencial — visibles desde el primer scroll.",
  },
]

const TESTIMONIALS = [
  {
    text: "La landing que nos hicieron triplicó las consultas en el primer mes.",
    author: "Chita Automotores",
    role: "Concesionaria · Concepción del Uruguay",
  },
  {
    text: "Muy profesionales. Entendieron exactamente lo que necesitábamos sin dar vueltas.",
    author: "Cliente privado",
    role: "Servicios · Entre Ríos",
  },
  {
    text: "El diseño sorprendió a todos. Los clientes nos preguntan quién hizo la web.",
    author: "Emprendedora local",
    role: "Moda · Argentina",
  },
]

export default function Home() {
  return (
    <main className="bg-[#0e0c09] text-[#f0ead6] overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center">
        {/* Glow fondo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-900/20 rounded-full blur-[120px]" />
        </div>

        {/* Línea decorativa superior */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-700/40 to-transparent" />

        <Section className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8">
          <motion.div variants={fadeUp}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Ceres & Pomona" className="h-28 w-auto mx-auto mb-2 drop-shadow-2xl" />
          </motion.div>

          <motion.p variants={fadeUp} className="text-xs tracking-[0.3em] text-amber-600/70 uppercase">
            Marketing Digital
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight text-[#f0ead6]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Tu negocio merece
            <br />
            <span className="text-amber-400">una página que vende.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-[#f0ead6]/60 max-w-xl leading-relaxed">
            Diseñamos landing pages visuales que atrapan, convencen y convierten — desde el primer scroll.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-full bg-amber-500 hover:bg-amber-400 px-8 py-4 text-sm font-bold text-[#0e0c09] transition-all duration-300 hover:shadow-[0_0_40px_rgba(217,119,6,0.4)]"
            >
              <MessageCircle className="h-4 w-4" />
              Escribinos por WhatsApp
            </a>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-full border border-[#f0ead6]/20 bg-[#f0ead6]/5 hover:bg-[#f0ead6]/10 px-8 py-4 text-sm font-semibold text-[#f0ead6] transition-all duration-300 backdrop-blur-sm"
            >
              <Calendar className="h-4 w-4 text-amber-400" />
              Agendar una llamada
            </a>
          </motion.div>

          <motion.p variants={fadeUp} className="text-xs text-[#f0ead6]/25">
            Sin costo · Sin compromiso · Respondemos hoy
          </motion.p>
        </Section>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <div className="w-px h-12 bg-gradient-to-b from-amber-500/60 to-transparent mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* SEPARADOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-800/30 to-transparent" />

      {/* SERVICIOS */}
      <section className="py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <Section className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-xs tracking-[0.3em] text-amber-600/60 uppercase mb-4">
              Lo que hacemos
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-[#f0ead6]">
              Páginas que trabajan
              <br />
              <span className="text-amber-400">mientras vos descansás.</span>
            </motion.h2>
          </Section>

          <Section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className="group p-8 rounded-2xl border border-[#f0ead6]/8 bg-[#f0ead6]/3 hover:border-amber-700/40 hover:bg-amber-950/20 transition-all duration-300"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <s.icon className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-[#f0ead6] mb-3">{s.title}</h3>
                <p className="text-sm text-[#f0ead6]/50 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </Section>
        </div>
      </section>

      {/* SEPARADOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-800/30 to-transparent" />

      {/* PROCESO */}
      <section className="py-28 px-4 bg-[#0a0800]">
        <div className="max-w-4xl mx-auto">
          <Section className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-xs tracking-[0.3em] text-amber-600/60 uppercase mb-4">
              Cómo trabajamos
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-[#f0ead6]">
              Simple, rápido, efectivo.
            </motion.h2>
          </Section>

          <Section className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { num: "01", title: "Llamada inicial", desc: "Entendemos tu negocio, tu cliente ideal y tus objetivos en 30 minutos." },
              { num: "02", title: "Diseño y desarrollo", desc: "Creamos tu landing con foco visual y psicología de conversión." },
              { num: "03", title: "Entrega y resultados", desc: "Publicamos, medimos y ajustamos hasta que los números hablen." },
            ].map((step) => (
              <motion.div key={step.num} variants={fadeUp} className="flex flex-col items-center gap-4">
                <span className="text-5xl font-black text-amber-500/20 leading-none">{step.num}</span>
                <h3 className="text-lg font-bold text-[#f0ead6]">{step.title}</h3>
                <p className="text-sm text-[#f0ead6]/50 leading-relaxed max-w-xs">{step.desc}</p>
              </motion.div>
            ))}
          </Section>
        </div>
      </section>

      {/* SEPARADOR */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-800/30 to-transparent" />

      {/* TESTIMONIOS */}
      <section className="py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <Section className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-xs tracking-[0.3em] text-amber-600/60 uppercase mb-4">
              Clientes
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-[#f0ead6]">
              Lo que dicen los que
              <br />
              <span className="text-amber-400">ya dieron el paso.</span>
            </motion.h2>
          </Section>

          <Section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.author}
                variants={fadeUp}
                className="p-8 rounded-2xl border border-[#f0ead6]/8 bg-[#f0ead6]/3"
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-[#f0ead6]/70 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div>
                  <p className="text-sm font-bold text-[#f0ead6]">{t.author}</p>
                  <p className="text-xs text-[#f0ead6]/40 mt-0.5">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </Section>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-28 px-4 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-900/15 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <Section>
            <motion.p variants={fadeUp} className="text-xs tracking-[0.3em] text-amber-600/60 uppercase mb-6">
              Empezá hoy
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#f0ead6] mb-6 leading-tight">
              Tu próxima landing
              <br />
              <span className="text-amber-400">puede cambiar todo.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#f0ead6]/50 mb-10 text-lg">
              Contanos sobre tu negocio. Sin costo, sin presión.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-full bg-amber-500 hover:bg-amber-400 px-10 py-4 text-sm font-bold text-[#0e0c09] transition-all duration-300 hover:shadow-[0_0_50px_rgba(217,119,6,0.5)]"
              >
                <MessageCircle className="h-4 w-4" />
                Escribinos ahora
              </a>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-full border border-[#f0ead6]/20 bg-transparent hover:bg-[#f0ead6]/5 px-10 py-4 text-sm font-semibold text-[#f0ead6] transition-all duration-300"
              >
                <Calendar className="h-4 w-4 text-amber-400" />
                Agendar llamada
                <ArrowRight className="h-3.5 w-3.5 opacity-50" />
              </a>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#f0ead6]/8 py-10 px-4 text-center">
        <div className="flex flex-col items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Ceres & Pomona" className="h-12 w-auto opacity-60" />
          <p className="text-xs text-[#f0ead6]/25">
            © {new Date().getFullYear()} Ceres & Pomona Marketing Digital · Concepción del Uruguay, Entre Ríos
          </p>
        </div>
      </footer>

    </main>
  )
}
