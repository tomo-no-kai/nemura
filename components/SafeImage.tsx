"use client";
import { useState } from "react";

const FALLBACK = "/default-image.png";

type SafeImageProps = {
  src?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function SafeImage({ src, alt, className, style, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK);

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      className={className}
      style={style}
      onError={() => setImgSrc(FALLBACK)}
    />
  );
}