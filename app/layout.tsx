import type { Metadata } from 'next'
import { Nanum_Myeongjo, Space_Mono } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

const nanum = Nanum_Myeongjo({
  subsets: ['latin'],
  variable: '--font-nanum',
  weight: ['400', '700', '800'],
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Alex Pro',
  description: 'Robotics researcher at UC Berkeley',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nanum.variable} ${spaceMono.variable}`}>
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
