import { ReactNode } from 'react'
import { Footer, Navbar } from '@/components'
import './globals.css'

export const metadata = {
  title: 'Car Hub',
  description: 'Discorver the best cars for you.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
