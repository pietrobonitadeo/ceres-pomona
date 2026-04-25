import type { Metadata } from "next"
import { Fraunces, Inter } from "next/font/google"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400"],
  style: ["normal", "italic"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  title: "C&P Marketing — Marketing que se mide en ventas",
  description: "Campañas de Meta Ads y páginas web premium para pymes argentinas. Especializados en automotriz.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`h-full antialiased ${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-full">{children}</body>
    </html>
  )
}
