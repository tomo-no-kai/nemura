import React, { ReactNode } from "react";

type BackgroundProps = {
  children: ReactNode;
};

export default function Background({ children }: BackgroundProps) {
  return (
    // min-h-screen を h-[100dvh] に変更し、はみ出しを禁止
    <div className="relative w-full"> 
      <div
        className="fixed inset-0 -z-10 bg-cover bg-top"
        style={{
          backgroundImage: "url('/bg2.png')",
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {children}
      </div>
    </div>
  );
}