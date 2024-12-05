import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Share2, ThumbsUp } from "lucide-react"
import { useState } from "react"

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
  interactions?: {
    likes: number
    comments: number
    shares: number
  }
}

interface NewsItemProps {
  news: NewsItemType
}

export function NewsItem({ news }: NewsItemProps) {
  const [likes, setLikes] = useState(news.interactions?.likes || 0)
  const [comments, setComments] = useState(news.interactions?.comments || 0)
  const [shares, setShares] = useState(news.interactions?.shares || 0)
  const [hasLiked, setHasLiked] = useState(false)

  const handleLike = () => {
    if (hasLiked) {
      setLikes(prev => prev - 1)
    } else {
      setLikes(prev => prev + 1)
    }
    setHasLiked(!hasLiked)
  }

  const handleComment = () => {
    // Increment comment count when comment feature is implemented
    setComments(prev => prev + 1)
  }

  const handleShare = () => {
    // Increment share count when share feature is implemented
    setShares(prev => prev + 1)
  }

  return (
    <Card className="transition-all duration-200 hover:shadow-lg">
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
      <CardFooter className="border-t pt-4 space-x-4">
        <Button
          variant="ghost"
          size="sm"
          className={`gap-2 ${hasLiked ? 'text-primary' : ''}`}
          onClick={handleLike}
        >
          <ThumbsUp className="h-4 w-4" />
          <span>{likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={handleComment}
        >
          <MessageSquare className="h-4 w-4" />
          <span>{comments}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4" />
          <span>{shares}</span>
        </Button>
      </CardFooter>
    </Card>
  )
}