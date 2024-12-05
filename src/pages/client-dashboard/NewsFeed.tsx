import { useState } from "react"
import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type NewsType = "all" | "legal" | "regulatory" | "industry" | "world" | "national" | "federal" | "state" | "local"

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
  {
    id: "4",
    type: "world",
    title: "International Legal Framework Updates",
    content: "Major changes in international law affecting global business operations...",
    date: "2024-02-17",
  },
  {
    id: "5",
    type: "national",
    title: "US Legal System Reforms",
    content: "New nationwide legal reforms set to transform the justice system...",
    date: "2024-02-16",
  },
  {
    id: "6",
    type: "federal",
    title: "Federal Law Amendment",
    content: "Congress passes new amendments to federal regulations...",
    date: "2024-02-15",
  },
  {
    id: "7",
    type: "state",
    title: "State Legislature Update",
    content: "New state laws affecting local businesses and residents...",
    date: "2024-02-14",
  },
  {
    id: "8",
    type: "local",
    title: "Local Ordinance Changes",
    content: "City council approves new local regulations...",
    date: "2024-02-13",
  }
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
              <SelectItem value="world">World News</SelectItem>
              <SelectItem value="national">National News</SelectItem>
              <SelectItem value="federal">Federal Law Changes</SelectItem>
              <SelectItem value="state">State Law Changes</SelectItem>
              <SelectItem value="local">Local Law Changes</SelectItem>
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