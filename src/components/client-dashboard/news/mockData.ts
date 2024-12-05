import { NewsItemType } from "./NewsItem"

export const mockNews: NewsItemType[] = [
  {
    id: "1",
    type: "legal",
    title: "Global Trade Agreement Updates",
    content: "New international trade regulations affecting multiple jurisdictions have been announced...",
    date: "2024-02-20",
    scope: {
      level: "world"
    },
    industryCategory: "International Trade"
  },
  {
    id: "2",
    type: "regulatory",
    title: "US Financial Services Reform",
    content: "The United States Securities and Exchange Commission has introduced new guidelines...",
    date: "2024-02-19",
    scope: {
      level: "national",
      country: "United States",
      state: "All States"
    },
    industryCategory: "Banking & Finance"
  },
  {
    id: "3",
    type: "industry",
    title: "California Tech Industry Report",
    content: "Silicon Valley's latest industry analysis reveals emerging trends in AI adoption...",
    date: "2024-02-18",
    scope: {
      level: "national",
      country: "United States",
      state: "California"
    },
    industryCategory: "Technology"
  },
  {
    id: "4",
    type: "legal",
    title: "European Union Data Protection Update",
    content: "New amendments to GDPR implementation across EU member states...",
    date: "2024-02-17",
    scope: {
      level: "national",
      country: "European Union"
    },
    industryCategory: "Data Privacy"
  },
  {
    id: "5",
    type: "regulatory",
    title: "Texas Energy Sector Regulations",
    content: "New state-level energy regulations affecting power generation and distribution...",
    date: "2024-02-16",
    scope: {
      level: "national",
      country: "United States",
      state: "Texas"
    },
    industryCategory: "Energy"
  },
  {
    id: "6",
    type: "industry",
    title: "Global Automotive Industry Trends",
    content: "Worldwide automotive manufacturing and electric vehicle adoption rates show significant growth...",
    date: "2024-02-15",
    scope: {
      level: "world"
    },
    industryCategory: "Automotive"
  },
  {
    id: "7",
    type: "legal",
    title: "New York Financial District Updates",
    content: "Wall Street regulatory compliance requirements have been updated...",
    date: "2024-02-14",
    scope: {
      level: "national",
      country: "United States",
      state: "New York"
    },
    industryCategory: "Banking & Finance"
  },
  {
    id: "8",
    type: "regulatory",
    title: "Global Healthcare Standards",
    content: "WHO announces new global healthcare standards and protocols...",
    date: "2024-02-13",
    scope: {
      level: "world"
    },
    industryCategory: "Healthcare"
  },
  {
    id: "9",
    type: "industry",
    title: "Florida Tourism Industry Report",
    content: "Post-pandemic tourism recovery shows promising trends in Florida...",
    date: "2024-02-12",
    scope: {
      level: "national",
      country: "United States",
      state: "Florida"
    },
    industryCategory: "Tourism & Hospitality"
  },
  {
    id: "10",
    type: "legal",
    title: "Canadian Cannabis Regulations",
    content: "Updates to national cannabis industry regulations and compliance requirements...",
    date: "2024-02-11",
    scope: {
      level: "national",
      country: "Canada"
    },
    industryCategory: "Cannabis"
  }
]