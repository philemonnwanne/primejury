import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface NewsItemType {
  id: string
  title: string
  content: string
  date: string
  type: "all" | "legal" | "regulatory" | "industry"
  scope: {
    level: "world" | "national"
    country?: string
    state?: string
  }
  industryCategory: string
  media?: {
    type: "image" | "video"
    url: string
    caption?: string
  }
}

interface NewsItemProps {
  news: NewsItemType
}

export function NewsItem({ news }: NewsItemProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{news.title}</CardTitle>
          <span className="text-sm text-muted-foreground">
            {new Date(news.date).toLocaleDateString()}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {news.media && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            {news.media.type === "image" ? (
              <img
                src={news.media.url}
                alt={news.media.caption || news.title}
                className="object-cover w-full h-full"
              />
            ) : (
              <iframe
                src={news.media.url}
                title={news.media.caption || news.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
            {news.media.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
                {news.media.caption}
              </div>
            )}
          </div>
        )}
        <p className="text-muted-foreground">{news.content}</p>
      </CardContent>
    </Card>
  )
}