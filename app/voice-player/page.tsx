'use client'

import React from "react"
import NavigationHeader from "@/components/NavigationHeader"
import NewsPlayer from "@/components/NewsPlayer"
import Wave from '@/assets/graphics/wave.svg'

export default function Page() {
  return (
    <main className="h-screen w-full relative flex flex-col overflow-hidden pt-[54px]"
    style={{ backgroundImage: 'linear-gradient(to bottom, #00040a, #003569, #004E9A)' }}
    >

      <div className="h-[54px] shrink-0">
        <NavigationHeader />
      </div>

      <div className="flex-1 relative z-10 pb-[36px]">
        <NewsPlayer />
      </div>

      <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
        <Wave className="w-full h-auto" />
      </div>

    </main>
  )
}