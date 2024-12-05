import { MediaContent } from "./types"
import { useState } from "react"

interface NewsMediaProps {
  media: MediaContent
  title: string
}

export function NewsMedia({ media, title }: NewsMediaProps) {
  const [imageError, setImageError] = useState(false)
  
  // Fallback image if the original fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085"

  const handleImageError = () => {
    console.log("Image failed to load:", media.url)
    setImageError(true)
  }

  if (!media || !media.url) {
    return null
  }

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
      {media.type === "image" ? (
        <img
          src={imageError ? fallbackImage : media.url}
          alt={media.caption || title}
          className="object-cover w-full h-full"
          onError={handleImageError}
          loading="lazy"
        />
      ) : media.type === "video" ? (
        <div className="w-full h-full">
          <iframe
            src={media.url}
            title={media.caption || title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            onError={() => console.log("Video failed to load:", media.url)}
          />
        </div>
      ) : null}
      {media.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
          {media.caption}
        </div>
      )}
    </div>
  )
}