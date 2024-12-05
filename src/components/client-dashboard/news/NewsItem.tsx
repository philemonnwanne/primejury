import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Share2, ThumbsUp, Laugh, Frown, ThumbsDown, Heart, Globe, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

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
  source?: {
    name: string
    isVerified: boolean
    url?: string
  }
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

type ReactionType = "like" | "laugh" | "frown" | "dislike" | "love"

export function NewsItem({ news }: NewsItemProps) {
  const [likes, setLikes] = useState(news.interactions?.likes || 0)
  const [comments, setComments] = useState(news.interactions?.comments || 0)
  const [shares, setShares] = useState(news.interactions?.shares || 0)
  const [currentReaction, setCurrentReaction] = useState<ReactionType | null>(null)

  const handleReaction = (reaction: ReactionType) => {
    if (currentReaction === reaction) {
      setLikes(prev => prev - 1)
      setCurrentReaction(null)
    } else {
      if (currentReaction) {
        // No change in count if switching reactions
        setCurrentReaction(reaction)
      } else {
        setLikes(prev => prev + 1)
        setCurrentReaction(reaction)
      }
    }
  }

  const getReactionIcon = (reaction: ReactionType) => {
    switch (reaction) {
      case "like":
        return <ThumbsUp className="h-4 w-4" />
      case "laugh":
        return <Laugh className="h-4 w-4" />
      case "frown":
        return <Frown className="h-4 w-4" />
      case "dislike":
        return <ThumbsDown className="h-4 w-4" />
      case "love":
        return <Heart className="h-4 w-4" />
    }
  }

  const handleComment = () => {
    setComments(prev => prev + 1)
  }

  const handleShare = () => {
    setShares(prev => prev + 1)
  }

  return (
    <Card className="transition-all duration-200 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">{news.title}</CardTitle>
            {news.source && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4" />
                {news.source.url ? (
                  <a 
                    href={news.source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {news.source.name}
                  </a>
                ) : (
                  <span>{news.source.name}</span>
                )}
                {news.source.isVerified ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
              </div>
            )}
          </div>
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
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`gap-2 ${currentReaction ? 'text-primary' : ''}`}
            >
              {currentReaction ? getReactionIcon(currentReaction) : <ThumbsUp className="h-4 w-4" />}
              <span>{likes}</span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-fit p-2">
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className={`hover:text-primary ${currentReaction === 'like' ? 'text-primary' : ''}`}
                onClick={() => handleReaction('like')}
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`hover:text-primary ${currentReaction === 'laugh' ? 'text-primary' : ''}`}
                onClick={() => handleReaction('laugh')}
              >
                <Laugh className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`hover:text-primary ${currentReaction === 'frown' ? 'text-primary' : ''}`}
                onClick={() => handleReaction('frown')}
              >
                <Frown className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`hover:text-primary ${currentReaction === 'dislike' ? 'text-primary' : ''}`}
                onClick={() => handleReaction('dislike')}
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`hover:text-primary ${currentReaction === 'love' ? 'text-primary' : ''}`}
                onClick={() => handleReaction('love')}
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>
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
