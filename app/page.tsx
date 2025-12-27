'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SplashWelcome() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome') // 3秒後に ページへ
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background-light">
      <Image
        src="/logo.png"
        alt="プロジェクトロゴ"
        width={200}
        height={200}
        priority
      />
    </main>
  )
}