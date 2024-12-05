import { NewsItemType } from "./NewsItem"

export const mockNews: NewsItemType[] = [
  {
    id: "1",
    type: "legal",
    title: "New Legal Precedent Set",
    content: "A recent Supreme Court decision has set a new precedent for...",
    date: "2024-02-20",
    scope: {
      level: "national",
      country: "United States"
    },
    industryCategory: "Legal Services"
  },
  {
    id: "2",
    type: "regulatory",
    title: "Regulatory Framework Update",
    content: "The regulatory commission has announced new guidelines for...",
    date: "2024-02-19",
    scope: {
      level: "state",
      country: "United States",
      state: "California"
    },
    industryCategory: "Banking & Finance"
  },
  {
    id: "3",
    type: "industry",
    title: "Industry Trends Report",
    content: "Latest industry analysis shows significant shifts in...",
    date: "2024-02-18",
    scope: {
      level: "world"
    },
    industryCategory: "Technology"
  }
]