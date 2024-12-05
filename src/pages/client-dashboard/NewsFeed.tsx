import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
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

  // Get all breaking news, unfiltered
  const breakingNews = mockNews
    .filter(news => news.breaking)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Filter regular news according to user preferences
  const filteredNews = mockNews
    .filter(news => {
      // Skip breaking news as they're handled separately
      if (news.breaking) return false;
      
      // Always show sponsored content
      if (news.sponsored) return true;
      
      // Apply filters
      if (selectedType !== "all" && news.type !== selectedType) return false;
      if (selectedScope.level !== news.scope.level) return false;
      if (selectedScope.country && news.scope.country !== selectedScope.country) return false;
      if (selectedScope.state && news.scope.state !== selectedScope.state) return false;
      if (selectedIndustry !== "all" && news.industryCategory !== selectedIndustry) return false;
      
      return true;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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

        {/* Breaking News Section - Always visible */}
        {breakingNews.length > 0 && (
          <Card className="border-red-200 bg-red-50/30">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-red-500">Breaking News</span>
                <span className="text-xs text-red-500 bg-red-100 px-2 py-1 rounded-full">
                  {breakingNews.length} Updates
                </span>
              </h2>
              <ScrollArea className="w-full whitespace-nowrap rounded-md">
                <div className="flex w-max space-x-4 p-4">
                  {breakingNews.map((news) => (
                    <div key={news.id} className="w-[600px]">
                      <NewsItem news={news} />
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        {/* Filters Section */}
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

        {/* Regular News Section */}
        <div className="grid gap-4">
          {filteredNews.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </div>
      </div>
    </ClientDashboardLayout>
  )
}