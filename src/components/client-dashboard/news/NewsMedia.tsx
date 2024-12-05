import { MediaContent } from "./types"

interface NewsMediaProps {
  media: MediaContent
  title: string
}

export function NewsMedia({ media, title }: NewsMediaProps) {
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
      {media.type === "image" ? (
        <img
          src={media.url}
          alt={media.caption || title}
          className="object-cover w-full h-full"
        />
      ) : (
        <iframe
          src={media.url}
          title={media.caption || title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      {media.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
          {media.caption}
        </div>
      )}
    </div>
  )
}