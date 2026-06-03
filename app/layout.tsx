import type { Metadata } from 'next'
import { Geist, Geist_Mono, Silkscreen, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CursorAura } from '@/components/cursor-aura'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const silkscreen = Silkscreen({ weight: '400', subsets: ['latin'], variable: '--font-rubik-glitch' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  title: 'Saptarshi Bhunia | Full Stack Developer & AI/ML Engineer',
  description: 'Portfolio of Saptarshi Bhunia — Full Stack Web Developer specializing in modern web experiences, AI, Machine Learning, and Deep Learning.',
  icons: {
    icon: '/favicon.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${silkscreen.variable} ${spaceGrotesk.variable}`}>
        <CursorAura />
        {children}
        <Toaster position="bottom-right" theme="dark" closeButton richColors />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
