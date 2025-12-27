import './globals.css';
import type { Metadata } from 'next'
import { Zen_Maru_Gothic } from 'next/font/google'
import { Providers } from './provider'

export const metadata: Metadata = {
  title: 'Nemura',
  description: '今日の世界を、Nemuraとともに。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>        
      </body>
    </html>
  )
}