import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NewsItemType } from "./types"
import { NewsMedia } from "./NewsMedia"
import { NewsSource } from "./NewsSource"
import { NewsInteractions } from "./NewsInteractions"

interface NewsItemProps {
  news: NewsItemType
}

export function NewsItem({ news }: NewsItemProps) {
  return (
    <Card className={`transition-all duration-200 hover:shadow-lg border-0 ${news.sponsored ? 'border-primary/20' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {news.sponsored && (
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  Sponsored by {news.sponsored.advertiser}
                </span>
              )}
              <CardTitle className="text-xl">{news.title}</CardTitle>
            </div>
            {news.source && <NewsSource source={news.source} />}
          </div>
          <span className="text-sm text-muted-foreground">
            {new Date(news.date).toLocaleDateString()}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {news.media && <NewsMedia media={news.media} title={news.title} />}
        <p className="text-muted-foreground">{news.content}</p>
        {news.sponsored?.cta && (
          <Button 
            className="mt-4 bg-primary text-white hover:bg-primary/90"
            onClick={() => window.open(news.sponsored?.cta?.url, '_blank')}
          >
            {news.sponsored.cta.text}
          </Button>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4">
        <NewsInteractions
          initialLikes={news.interactions?.likes || 0}
          initialComments={news.interactions?.comments || 0}
          initialShares={news.interactions?.shares || 0}
        />
      </CardFooter>
    </Card>
  )
}