import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function LawyerReviews() {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")

  const handleSubmitReview = () => {
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
        />

        <Button onClick={handleSubmitReview} className="w-full">
          Submit Review
        </Button>
      </CardContent>
    </Card>
  )
}