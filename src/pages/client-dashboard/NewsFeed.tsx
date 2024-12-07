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

  // Get sponsored news
  const sponsoredNews = mockNews.filter(news => news.sponsored);

  // Filter regular news according to user preferences
  const filteredNews = mockNews
    .filter(news => {
      if (news.breaking || news.sponsored) return false;
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
      <div className="space-y-6 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Legal News Feed</h1>
            <p className="text-muted-foreground text-lg">
              Stay updated with the latest legal and industry news
            </p>
          </div>
        </div>

        {/* Breaking News Section - Always visible */}
        {breakingNews.length > 0 && (
          <div className="mb-8">
            <Card className="border-red-200 bg-red-50/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-red-600">Breaking News</h2>
                  <span className="text-sm text-red-500 bg-red-100 px-3 py-1 rounded-full">
                    {breakingNews.length} Updates
                  </span>
                </div>
                <ScrollArea className="w-full whitespace-nowrap rounded-md">
                  <div className="flex w-max space-x-4 p-4">
                    {breakingNews.map((news) => (
                      <div key={news.id} className="w-[400px] shrink-0">
                        <NewsItem news={news} />
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" className="mt-2" />
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters Section */}
        <Card className="bg-gray-50/50">
          <CardContent className="pt-6">
            <NewsFilters
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              onScopeChange={setSelectedScope}
              onIndustryChange={setSelectedIndustry}
            />
          </CardContent>
        </Card>

        {/* Main News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main News Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Sponsored News Section */}
            {sponsoredNews.length > 0 && (
              <div className="space-y-4">
                {sponsoredNews.map((news) => (
                  <NewsItem key={news.id} news={news} />
                ))}
              </div>
            )}

            {/* Regular News Section */}
            <div className="space-y-4">
              {filteredNews.map((news) => (
                <NewsItem key={news.id} news={news} />
              ))}
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Trending Topics</h3>
                <div className="space-y-2">
                  {["Legal Tech", "Regulatory Changes", "Industry Updates", "Court Decisions", "Legal Practice"].map((topic) => (
                    <div key={topic} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                      <span className="text-sm font-medium">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ClientDashboardLayout>
  )
}