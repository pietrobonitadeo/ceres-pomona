import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ceres & Pomona | Marketing Digital",
  description: "Diseñamos landing pages visuales que convierten visitas en clientes.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  )
}
