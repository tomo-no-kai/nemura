'use client'

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
    estimatedDuration: 180 // 総再生時間（秒）
  }

  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState('1X') // 文字列で管理
  // 現在の時間を進める
  const handleSeek = (amount: number) => {
    setCurrentTime((prev) => {
      const nextTime = prev + amount
      return Math.min(Math.max(nextTime, 0), news.estimatedDuration)
    })
  }

  // 再生タイマー
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= news.estimatedDuration) {
            setIsPlaying(false);
            return prev;
          }
          // numericSpeed を計算
          const numericSpeed = playbackSpeed === '1X' ? 1 : parseFloat(playbackSpeed)
          return prev + 1 * numericSpeed
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isPlaying, news.estimatedDuration, playbackSpeed]);

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
          />
        </div>
      </div>

    </div>
  )
}