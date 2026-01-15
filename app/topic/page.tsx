'use client'

import { ArrowRightIcon, AddCircleIcon, PlayCircleIcon } from "@/app/assets/icons";
import { useEffect, useState } from "react";
import SafeImage from "@/components/SafeImage";

export default function TopicPage() {
  const [popularNews, setPopularNews] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/hatena?type=popular")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setPopularNews(data);
      })
      .catch(() => setError("Failed to load data"));
  }, []);

  const speakText = (text: string) => {
    if (typeof window === "undefined") return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
  };

  return (
    <div className="bg-background-light text-white px-2 py-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Topic News</h2>
        </div>

        {error && <p className="text-red-400">{error}</p>}

        <div className="space-y-4">
          {popularNews.slice(0, 20).map((i) => (
            <div
              key={i.title}
              className="flex space-x-3 bg-[#3A86FF]/10 rounded-xl p-2 relative"
            >
              {/* 画像 */}
              <div className="w-20 h-20 relative flex-shrink-0">
                <SafeImage
                  src={i["hatena:imageurl"] || "/default-image.png"}
                  alt={i.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* 右側コンテンツ */}
              <div className="flex-grow flex flex-col">
                <h3 className="text-base font-semibold line-clamp-2">
                  {i.title}
                </h3>
                <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400">🌐</span>
                    <span>
                      {Array.isArray(i["dc:subject"]) ? i["dc:subject"][0] : i["dc:subject"] || "未分類"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                <AddCircleIcon className="w-7 h-7 text-gray-400 cursor-pointer" />

                <PlayCircleIcon
                  className="w-7 h-7 text-gray-400 cursor-pointer"
                  onClick={() => speakText(i.title)}
                />

                <button
                  onClick={stopSpeech}
                  className="text-red-400 hover:text-red-500 text-xl leading-none cursor-pointer"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}