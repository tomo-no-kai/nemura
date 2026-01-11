'use client'

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import SpeechNemura from "./SpeechNemura"
import NewsHeader from "./NewsHeader"
import AudioSeekBar from "./AudioSeekBar"
import NewsBody from "./NewsBody"
import ControlBar from "./ControlBar"
import PlaybackControls from "./PlaybackControls"

export default function NewsPlayer() {
  const news = {
    title: "AIが読む今日のニュース",
    body: "ここにニュース本文が入る",
    estimatedDuration: 180
  }

  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState('1X')
  const [sleepMinutes, setSleepMinutes] = useState<number | 'track-end'>('track-end')

  const router = useRouter()

  const handleSeek = (amount: number) => {
    setCurrentTime((prev) => {
      const nextTime = prev + amount
      return Math.min(Math.max(nextTime, 0), news.estimatedDuration)
    })
  }

  // 再生タイマー
  useEffect(() => {
    let timer: NodeJS.Timeout
    let sleepTimer: NodeJS.Timeout

    if (isPlaying) {
      // 通常再生
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= news.estimatedDuration) {
            setIsPlaying(false)
            return prev
          }
          const numericSpeed = playbackSpeed === '1X' ? 1 : parseFloat(playbackSpeed)
          return prev + 1 * numericSpeed
        })
      }, 1000)

      // スリープタイマー
      if (sleepMinutes !== 'track-end') {
        sleepTimer = setTimeout(() => {
          setIsPlaying(false)
          router.push('/good-night')
        }, Number(sleepMinutes) * 60 * 1000)
      } else {
        const remaining = Math.max(news.estimatedDuration - currentTime, 0)
        sleepTimer = setTimeout(() => {
          setIsPlaying(false)
          router.push('/good-night')
        }, remaining * 1000)
      }
    }

    return () => {
      clearInterval(timer)
      clearTimeout(sleepTimer)
    }
  }, [isPlaying, playbackSpeed, sleepMinutes, currentTime, news.estimatedDuration, router])

  return (
    <div className="w-full max-w-xl h-[100svh] flex flex-col">

      {/* 上：固定 */}
      <div className="shrink-0 space-y-4 pb-[36px]">
        <SpeechNemura isPlaying={isPlaying} />
        <div className="px-8">
          <NewsHeader title={news.title} estimatedDuration={news.estimatedDuration} />
        </div>
        <div className="px-8">
          <AudioSeekBar
            duration={news.estimatedDuration}
            current={currentTime}
            onSeek={setCurrentTime}
          />
        </div>
      </div>

      {/* 本文：レスポンシブ＋スクロール */}
      <div className="flex-1 max-h-[6lh] overflow-y-auto">
        <NewsBody body={news.body} />
      </div>

      {/* 下：固定 */}
      <div className="shrink-0 flex flex-col">
        <PlaybackControls
          isPlaying={isPlaying}
          onToggle={() => setIsPlaying(!isPlaying)}
          onRewind={() => handleSeek(-10)}
          onForward={() => handleSeek(10)}
        />
        <div className="pt-[36px]">
          <ControlBar
            playbackSpeed={playbackSpeed}
            setPlaybackSpeed={setPlaybackSpeed}
            sleepMinutes={sleepMinutes}
            setSleepMinutes={setSleepMinutes}
          />
        </div>
      </div>

    </div>
  )
}