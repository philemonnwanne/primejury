import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type GeographicScope = "world" | "national" | "state" | "local"
type Industry = 
  | "legal" 
  | "healthcare" 
  | "technology" 
  | "finance" 
  | "manufacturing" 
  | "retail" 
  | "education" 
  | "energy" 
  | "agriculture" 
  | "construction" 
  | "transportation" 
  | "telecommunications" 
  | "entertainment" 
  | "hospitality" 
  | "real_estate" 
  | "aerospace" 
  | "automotive" 
  | "biotechnology" 
  | "pharmaceutical" 
  | "environmental"

interface NewsItem {
  id: string
  geographicScope: GeographicScope
  country?: string
  state?: string
  industry?: Industry
  title: string
  content: string
  date: string
}

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "Brazil",
  "India"
]

const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", 
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", 
  "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
]

const mockNews: NewsItem[] = [
  {
    id: "1",
    geographicScope: "world",
    title: "Global Legal Framework Changes",
    content: "Major changes in international law affecting global business operations...",
    date: "2024-02-20",
    industry: "legal"
  },
  {
    id: "2",
    geographicScope: "national",
    country: "United States",
    title: "US Healthcare Reform",
    content: "New healthcare regulations affecting medical practices nationwide...",
    date: "2024-02-19",
    industry: "healthcare"
  },
  {
    id: "3",
    geographicScope: "state",
    country: "United States",
    state: "California",
    title: "California Tech Regulations",
    content: "New state-wide technology regulations affecting Silicon Valley...",
    date: "2024-02-18",
    industry: "technology"
  },
  {
    id: "4",
    geographicScope: "local",
    country: "United States",
    state: "New York",
    title: "NYC Financial District Updates",
    content: "Local regulations affecting financial institutions in Manhattan...",
    date: "2024-02-17",
    industry: "finance"
  }
]

export default function ClientNewsFeed() {
  const [geographicScope, setGeographicScope] = useState<GeographicScope>("world")
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [selectedState, setSelectedState] = useState<string>("")
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | "all">("all")

  const filteredNews = mockNews.filter(news => {
    // Geographic filter
    if (geographicScope !== news.geographicScope) return false
    if (geographicScope === "national" && selectedCountry && news.country !== selectedCountry) return false
    if (geographicScope === "state" && selectedCountry === "United States" && selectedState && news.state !== selectedState) return false
    
    // Industry filter
    if (selectedIndustry !== "all" && news.industry !== selectedIndustry) return false
    
    return true
  })

  return (
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
          <div className="flex flex-wrap gap-4">
            <div className="w-[180px]">
              <Select
                value={geographicScope}
                onValueChange={(value: GeographicScope) => {
                  setGeographicScope(value)
                  setSelectedCountry("")
                  setSelectedState("")
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Geographic Scope" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="world">World</SelectItem>
                  <SelectItem value="national">National</SelectItem>
                  <SelectItem value="state">State</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {geographicScope === "national" && (
              <div className="w-[180px]">
                <Select
                  value={selectedCountry}
                  onValueChange={setSelectedCountry}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(country => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {geographicScope === "state" && selectedCountry === "United States" && (
              <div className="w-[180px]">
                <Select
                  value={selectedState}
                  onValueChange={setSelectedState}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {usStates.map(state => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="w-[180px]">
              <Select
                value={selectedIndustry}
                onValueChange={(value: Industry | "all") => setSelectedIndustry(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="energy">Energy</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="transportation">Transportation</SelectItem>
                  <SelectItem value="telecommunications">Telecommunications</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="real_estate">Real Estate</SelectItem>
                  <SelectItem value="aerospace">Aerospace</SelectItem>
                  <SelectItem value="automotive">Automotive</SelectItem>
                  <SelectItem value="biotechnology">Biotechnology</SelectItem>
                  <SelectItem value="pharmaceutical">Pharmaceutical</SelectItem>
                  <SelectItem value="environmental">Environmental</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

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
  )
}