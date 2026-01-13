'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Background from "@/components/Background"
import Lottie from "lottie-react"
import smileNemura from "@/assets/animations/smile-nemura.json"
import Logo from '@/assets/graphics/logo.svg'

export default function GoodNightPage() {
  const [mounted, setMounted] = useState(false)
  const [answeredNo, setAnsweredNo] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Background variant="morning">
      <Logo className="pt-[54px]" />

      <main
        className={`
          h-[70svh] w-full relative overflow-hidden
          transition-opacity duration-1000 ease-out
          ${mounted ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {/* セリフ + ボタン */}
        <div className="absolute left-0 top-[6%] w-full flex flex-col items-center px-6 gap-6 drop-shadow-white-glow">
          <div className="text-center space-y-1 text-white-soft">
            {!answeredNo ? (
              <>
                <p className="text-2xl tracking-wide">おはようございます！</p>
                <p className="text-xl text-white-soft">
                  聞き逃したニュースはありますか？
                </p>
              </>
            ) : (
              <p
                onClick={() => setAnsweredNo(false)}
                className="text-2xl tracking-wide cursor-pointer
                          transition-opacity active:opacity-60"
              >
                また夜に会いましょう！
              </p>
            )}
          </div>

          {/* ボタン */}
          {!answeredNo && (
            <div className="flex gap-4">
              <button
                onClick={() => setAnsweredNo(true)}
                className="px-6 py-2 rounded-full bg-[#F7EED2] text-button font-medium
                          backdrop-blur-md transition-all active:scale-95"
              >
                ない
              </button>

              <button
                onClick={() => router.push('/playlist')}
                className="px-6 py-2 rounded-full bg-[#F7EED2] text-button font-medium
                          backdrop-blur-md transition-all active:scale-95"
              >
                ある
              </button>
            </div>
          )}
        </div>

        {/* ねむら */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
          style={{
            top: "30%",
            width: "95%",
            maxWidth: "400px",
          }}
        >
          <div className="relative shrink-0 w-[280px] h-[280px]">
            <Lottie
              animationData={smileNemura}
              loop
              autoplay
              className="w-full h-full opacity-90"
            />
          </div>
        </div>
      </main>
    </Background>
  )
}