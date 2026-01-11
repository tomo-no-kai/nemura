'use client'

import React from 'react'
import { CheckIcon } from "@icons/index"

const TIMES = ['1時間', '45分', '30分', '20分', '15分', '5分', 'オフ']

type Props = {
  onCloseAction: () => void
}

export default function SleepTimerModal({ onCloseAction }: Props) {
  const [selectedTime, setSelectedTime] = React.useState('オフ')

  return (
    <div className="relative inline-block text-sm">

      {/* メインボックス */}
      <div className="bg-[#0D1B2A]/90 text-white-soft w-36 rounded-[24px] p-4 shadow-2xl border border-white/5">
        <h2 className="text-gray-400 text-lg font-bold text-center mb-1">終了時間</h2>

        <hr className="border-white/20 mb-3" />

        <div className="flex flex-col gap-3">
          {TIMES.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className="flex items-center justify-center relative text-base font-medium hover:opacity-70 transition-opacity"
            >
              {selectedTime === time && (
                <CheckIcon className="absolute left-3 w-5 h-5" />
              )}
              <span className={selectedTime === time ? "ml-4" : ""}>
                {time}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* しっぽ */}
      <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-6 h-6 bg-[#0D1B2A]/90 rotate-45 rounded-sm" />
    </div>
  )
}