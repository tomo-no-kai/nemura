'use client'

const FALLBACK = '/default-image.png'

export default function SafeImage({
  src,
  alt = '',
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      {...props}
      src={src || FALLBACK}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={(e) => {
        e.currentTarget.src = FALLBACK
      }}
    />
  )
}