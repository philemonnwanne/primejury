import { NewsItemType } from "../NewsItem"

export const regulatoryNews: NewsItemType[] = [
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
    source: {
      name: "SEC",
      isVerified: true,
      url: "https://www.sec.gov"
    },
    industryCategory: "Banking & Finance",
    interactions: {
      likes: 32,
      comments: 8,
      shares: 5
    }
  },
  {
    id: "4",
    type: "regulatory",
    title: "Texas Energy Sector Regulations",
    content: "New state-level energy regulations affecting power generation and distribution...",
    date: "2024-02-16",
    scope: {
      level: "national",
      country: "United States",
      state: "Texas"
    },
    source: {
      name: "Texas Commission on Environmental Quality",
      isVerified: true,
      url: "https://www.tceq.texas.gov"
    },
    industryCategory: "Energy",
    interactions: {
      likes: 20,
      comments: 7,
      shares: 4
    }
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
    source: {
      name: "World Health Organization",
      isVerified: true,
      url: "https://www.who.int"
    },
    industryCategory: "Healthcare",
    interactions: {
      likes: 75,
      comments: 20,
      shares: 10
    }
  },
  {
    id: "12",
    type: "regulatory",
    title: "Marine Wildlife Protection Act Implementation",
    content: "New international guidelines for protecting marine ecosystems and wildlife populations...",
    date: "2024-02-09",
    scope: {
      level: "world"
    },
    source: {
      name: "Environmental Protection Agency",
      isVerified: true,
      url: "https://www.epa.gov"
    },
    industryCategory: "Environmental",
    interactions: {
      likes: 32,
      comments: 3,
      shares: 1
    }
  },
  {
    id: "15",
    type: "regulatory",
    title: "Digital Privacy Framework",
    content: "European Union introduces comprehensive digital privacy regulations...",
    date: "2024-02-06",
    scope: {
      level: "national",
      country: "European Union"
    },
    source: {
      name: "European Commission",
      isVerified: true,
      url: "https://ec.europa.eu"
    },
    industryCategory: "Data Privacy",
    interactions: {
      likes: 14,
      comments: 6,
      shares: 3
    }
  },
  {
    id: "18",
    type: "regulatory",
    title: "Financial Technology Regulations",
    content: "Global financial authorities establish new framework for cryptocurrency trading...",
    date: "2024-02-03",
    scope: {
      level: "world"
    },
    source: {
      name: "Financial Stability Board",
      isVerified: true,
      url: "https://www.fsb.org"
    },
    industryCategory: "Banking & Finance",
    interactions: {
      likes: 9,
      comments: 2,
      shares: 0
    }
  },
  {
    id: "19",
    type: "regulatory",
    title: "Space Tourism Guidelines",
    content: "International Space Tourism Association releases safety guidelines...",
    date: "2024-02-02",
    scope: {
      level: "world"
    },
    source: {
      name: "International Space Tourism Association",
      isVerified: true,
      url: "https://www.istassociation.org"
    },
    industryCategory: "Tourism & Hospitality",
    interactions: {
      likes: 8,
      comments: 3,
      shares: 1
    }
  }
]
