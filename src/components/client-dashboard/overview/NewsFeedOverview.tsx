import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Newspaper } from "lucide-react"

interface NewsItem {
  id: string
  title: string
  category: "legal" | "industry" | "regulatory"
  date: string
  priority: "high" | "medium" | "low"
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "New Legal Regulations Affecting Property Law",
    category: "regulatory",
    date: "2024-03-18",
    priority: "high",
  },
  {
    id: "2",
    title: "Industry Update: Changes in Insurance Claims Process",
    category: "industry",
    date: "2024-03-17",
    priority: "medium",
  },
  {
    id: "3",
    title: "Supreme Court Ruling on Contract Law",
    category: "legal",
    date: "2024-03-16",
    priority: "high",
  },
]

export function NewsFeedOverview() {
  const getCategoryStyle = (category: NewsItem["category"]) => {
    switch (category) {
      case "legal":
        return "bg-blue-500/10 text-blue-500"
      case "industry":
        return "bg-green-500/10 text-green-500"
      case "regulatory":
        return "bg-purple-500/10 text-purple-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Newspaper className="h-5 w-5" />
          Latest Legal Updates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockNews.map((news) => (
          <div
            key={news.id}
            className="flex flex-col space-y-2 rounded-lg border p-4"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <Badge variant="secondary" className={getCategoryStyle(news.category)}>
                  {news.category}
                </Badge>
                <h4 className="font-medium">{news.title}</h4>
              </div>
              <span className="text-sm text-muted-foreground">
                {new Date(news.date).toLocaleDateString()}
              </span>
            </div>
            <Button variant="link" className="self-end" asChild>
              <Link to="/client-dashboard/news-feed">Read More</Link>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}