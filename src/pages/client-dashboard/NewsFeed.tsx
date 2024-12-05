import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { NewsFilters } from "@/components/client-dashboard/news/NewsFilters"
import { NewsItem } from "@/components/client-dashboard/news/NewsItem"
import { NewsItemType } from "@/components/client-dashboard/news/types"
import { mockNews } from "@/components/client-dashboard/news/mockData"
import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"

type ScopeType = {
  level: "world" | "national" | "state" | "local"
  country?: string
  state?: string
}

export default function ClientNewsFeed() {
  const [selectedType, setSelectedType] = useState<NewsItemType["type"]>("all")
  const [selectedScope, setSelectedScope] = useState<ScopeType>({ level: "world" })
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all")

  const filteredNews = mockNews.filter(news => {
    // Filter by type
    if (selectedType !== "all" && news.type !== selectedType) return false;
    
    // Filter by scope
    if (selectedScope.level !== news.scope.level) return false;
    if (selectedScope.country && news.scope.country !== selectedScope.country) return false;
    if (selectedScope.state && news.scope.state !== selectedScope.state) return false;
    
    // Filter by industry
    if (selectedIndustry !== "all" && news.industryCategory !== selectedIndustry) return false;
    
    return true;
  });

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
              onScopeChange={setSelectedScope}
              onIndustryChange={setSelectedIndustry}
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