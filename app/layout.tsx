import './globals.css'
import type { Metadata } from 'next'
import { Zen_Maru_Gothic } from 'next/font/google'

const zenMaru = Zen_Maru_Gothic({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-zen-maru'
})

export const metadata: Metadata = {
  title: 'My App',
  description: '全ページ Zen Maru Gothic 適用',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${zenMaru.className} font-sans ${zenMaru.variable}`}>{children}</body>
    </html>
  )
}