import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, AlertCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Review {
  id: string
  clientName: string
  clientAvatar?: string
  rating: number
  comment: string
  date: string
}

interface LawyerReviewsProps {
  lawyerId: string
}

export function LawyerReviews({ lawyerId }: LawyerReviewsProps) {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  
  // In a real app, these would be fetched based on the lawyerId
  const hasClosedCase = false // This would be determined by checking case status
  const previousReviews: Review[] = [
    {
      id: "1",
      clientName: "John Doe",
      rating: 5,
      comment: "Excellent service and communication throughout my case.",
      date: "2024-02-15"
    },
    {
      id: "2",
      clientName: "Jane Smith",
      rating: 4,
      comment: "Very professional and knowledgeable.",
      date: "2024-02-10"
    }
  ]

  const handleSubmitReview = () => {
    if (!hasClosedCase) {
      toast.error("You can only write a review after your case is closed")
      return
    }
    
    if (rating === 0) {
      toast.error("Please select a rating")
      return
    }
    if (!review.trim()) {
      toast.error("Please write a review")
      return
    }
    
    toast.success("Review submitted successfully")
    setRating(0)
    setReview("")
  }

  return (
    <div className="space-y-6">
      {!hasClosedCase && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You can write a review once your case is closed
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                variant="ghost"
                size="sm"
                className="p-0 h-8 w-8"
                onClick={() => setRating(star)}
                disabled={!hasClosedCase}
              >
                <Star 
                  className={`h-6 w-6 ${
                    star <= rating 
                      ? "text-yellow-400 fill-yellow-400" 
                      : "text-muted-foreground"
                  }`} 
                />
              </Button>
            ))}
          </div>

          <Textarea
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="min-h-[100px]"
            disabled={!hasClosedCase}
          />

          <Button 
            onClick={handleSubmitReview} 
            className="w-full"
            disabled={!hasClosedCase}
          >
            Submit Review
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Previous Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {previousReviews.map((review) => (
                <div key={review.id} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={review.clientAvatar} alt={review.clientName} />
                      <AvatarFallback>{review.clientName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{review.clientName}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}