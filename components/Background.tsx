import React, { ReactNode } from "react";

type BackgroundVariant = "morning" | "day" | "night";

type BackgroundProps = {
  children: ReactNode;
  variant?: BackgroundVariant;
};

export default function Background({
  children,
  variant = "day",
}: BackgroundProps) {
  const bgMap: Record<BackgroundVariant, string> = {
    morning: "/bg-morning.png",
    day: "/bg.png",
    night: "/bg-night.png",
  };

  const bgImage = bgMap[variant];

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {children}
      </div>
    </div>
  );
}