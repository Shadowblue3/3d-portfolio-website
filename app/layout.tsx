import type { Metadata } from 'next'
import { Geist, Geist_Mono, Silkscreen, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CursorAura } from '@/components/cursor-aura'
import './globals.css'
const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const silkscreen = Silkscreen({ weight: '400', subsets: ['latin'], variable: '--font-rubik-glitch' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  title: 'Saptarshi Bhunia | Full Stack Developer & AI/ML Engineer',
  description: 'Portfolio of Saptarshi Bhunia — Full Stack Web Developer specializing in modern web experiences, AI, Machine Learning, and Deep Learning.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
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
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
