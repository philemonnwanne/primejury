import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface NewsItemType {
  id: string
  title: string
  content: string
  date: string
  type: "all" | "legal" | "regulatory" | "industry"
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
      <CardContent>
        <p className="text-muted-foreground">{news.content}</p>
      </CardContent>
    </Card>
  )
}