import type { Metadata } from 'next'
import { Alice } from 'next/font/google'
import './globals.css'

const alice = Alice({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-alice',
})

export const metadata: Metadata = {
  title: 'Nina & Thiago - Casamento',
  description: 'Confirme sua presença no casamento de Nina e Thiago',
  keywords: ['casamento', 'RSVP', 'Nina', 'Thiago', 'confirmação de presença'],
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={alice.variable}>
      <body className="font-alice">{children}</body>
    </html>
  )
}
