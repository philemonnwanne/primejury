import { MessageSquare, Share2, ThumbsUp, Laugh, Frown, ThumbsDown, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { ReactionType } from "./types"
import { useState } from "react"

interface NewsInteractionsProps {
  initialLikes: number
  initialComments: number
  initialShares: number
}

export function NewsInteractions({ initialLikes, initialComments, initialShares }: NewsInteractionsProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [comments, setComments] = useState(initialComments)
  const [shares, setShares] = useState(initialShares)
  const [currentReaction, setCurrentReaction] = useState<ReactionType | null>(null)

  const handleReaction = (reaction: ReactionType) => {
    if (currentReaction === reaction) {
      setLikes(prev => prev - 1)
      setCurrentReaction(null)
    } else {
      if (currentReaction) {
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

  return (
    <div className="flex space-x-4">
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
            {(['like', 'laugh', 'frown', 'dislike', 'love'] as ReactionType[]).map((reaction) => (
              <Button
                key={reaction}
                variant="ghost"
                size="sm"
                className={`hover:text-primary ${currentReaction === reaction ? 'text-primary' : ''}`}
                onClick={() => handleReaction(reaction)}
              >
                {getReactionIcon(reaction)}
              </Button>
            ))}
          </div>
        </HoverCardContent>
      </HoverCard>
      <Button
        variant="ghost"
        size="sm"
        className="gap-2"
        onClick={() => setComments(prev => prev + 1)}
      >
        <MessageSquare className="h-4 w-4" />
        <span>{comments}</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="gap-2"
        onClick={() => setShares(prev => prev + 1)}
      >
        <Share2 className="h-4 w-4" />
        <span>{shares}</span>
      </Button>
    </div>
  )
}