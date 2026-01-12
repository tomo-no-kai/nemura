'use client'

import { useRouter } from "next/navigation";
import Background from "@/components/Background";
import NavigationHeader from "@/components/NavigationHeader";
import LottiePlayer from "@/components/LottiePlayer";

import { AddCircleIcon, GraphicIcon } from "@icons/index";
import smileJson from "@/app/assets/animations/smile-nemura.json";

export default function SettingsPage() {
  const router = useRouter();

  const SETTINGS_MENU = [
    {
      id: "topics",
      label: "おすすめトピック",
      icon: <AddCircleIcon className="w-7 h-7 text-gray-soft" />,
    },
    {
      id: "voice",
      label: "読み上げ音声",
      icon: <GraphicIcon className="w-7 h-7 text-gray-soft" />,
    },
  ];

  return (
    <Background>
      <div className="relative w-full h-[100dvh] flex flex-col overflow-hidden">
        <div className="h-[54px] shrink-0" />

        {/* ヘッダー */}
        <div className="h-[54px] shrink-0 relative z-50">
          <NavigationHeader hideSettingIcon />
        </div>

        {/* メインメニュー */}
        <div className="flex-1 flex flex-col justify-center items-center px-10 gap-5 z-20 -translate-y-40">
          {SETTINGS_MENU.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "topics") router.push("/settings/choose-topic");
                else if (item.id === "voice") router.push("/settings/choose-voice");
              }}
              className="group flex items-center w-full max-w-[340px] bg-white-soft py-4 px-5 rounded-full shadow-lg transition-all active:scale-[0.97]"
            >
              {/* アイコン */}
              <div className="flex items-center justify-center w-8 translate-y-0.5">
                {item.icon}
              </div>

              {/* ラベル */}
              <span className="ml-4 text-base leading-none text-gray-soft">{item.label}</span>
            </button>
          ))}
        </div>
        
        <div className="absolute bottom-[-60px] w-full flex justify-center pointer-events-none z-10">
          <LottiePlayer data={smileJson} width={340} height={340} />
        </div>
      </div>
    </Background>
  );
}