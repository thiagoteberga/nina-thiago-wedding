import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
