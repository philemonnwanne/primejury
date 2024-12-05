import { useState } from "react"
import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type NewsType = "all" | "legal" | "regulatory" | "industry"

interface NewsItem {
  id: string
  type: NewsType
  title: string
  content: string
  date: string
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    type: "legal",
    title: "New Supreme Court Ruling on Property Rights",
    content: "The Supreme Court has issued a landmark decision affecting property rights...",
    date: "2024-02-20",
  },
  {
    id: "2",
    type: "regulatory",
    title: "Updated Compliance Requirements",
    content: "New regulatory requirements have been announced for businesses...",
    date: "2024-02-19",
  },
  {
    id: "3",
    type: "industry",
    title: "Legal Tech Trends 2024",
    content: "The legal industry is seeing rapid adoption of AI-powered tools...",
    date: "2024-02-18",
  },
]

export default function ClientNewsFeed() {
  const [selectedType, setSelectedType] = useState<NewsType>("all")

  const filteredNews = selectedType === "all" 
    ? mockNews 
    : mockNews.filter(news => news.type === selectedType)

  return (
    <ClientDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">News Feed</h1>
            <p className="text-muted-foreground">
              Stay updated with the latest legal news and updates
            </p>
          </div>
          <Select
            value={selectedType}
            onValueChange={(value) => setSelectedType(value as NewsType)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select news type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All News</SelectItem>
              <SelectItem value="legal">Legal Updates</SelectItem>
              <SelectItem value="regulatory">Regulatory Changes</SelectItem>
              <SelectItem value="industry">Industry News</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {filteredNews.map((news) => (
            <Card key={news.id}>
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
          ))}
        </div>
      </div>
    </ClientDashboardLayout>
  )
}