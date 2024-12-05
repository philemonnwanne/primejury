import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { NewsFilters } from "@/components/client-dashboard/news/NewsFilters"
import { NewsItem, NewsItemType } from "@/components/client-dashboard/news/NewsItem"
import { mockNews } from "@/components/client-dashboard/news/mockData"
import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"

export default function ClientNewsFeed() {
  const [selectedType, setSelectedType] = useState<NewsItemType["type"]>("all")

  const filteredNews = mockNews.filter(news => 
    selectedType === "all" || news.type === selectedType
  )

  return (
    <ClientDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">News Feed</h1>
            <p className="text-muted-foreground">
              Stay updated with the latest news and updates
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <NewsFilters
              selectedType={selectedType}
              onTypeChange={setSelectedType}
            />
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {filteredNews.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </div>
      </div>
    </ClientDashboardLayout>
  )
}