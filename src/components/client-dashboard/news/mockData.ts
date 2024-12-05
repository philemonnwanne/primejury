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
  },
  {
    id: "11",
    type: "industry",
    title: "Tech Giants Unveil New AI Research Center",
    content: "Major technology companies collaborate on groundbreaking artificial intelligence research facility...",
    date: "2024-02-10",
    scope: {
      level: "world"
    },
    industryCategory: "Technology",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      caption: "The new AI research facility in Silicon Valley"
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
    industryCategory: "Environmental",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
      caption: "Humpback whales during migration season"
    }
  },
  {
    id: "13",
    type: "legal",
    title: "Remote Work Policy Updates",
    content: "New legal framework for remote work arrangements across multiple jurisdictions...",
    date: "2024-02-08",
    scope: {
      level: "national",
      country: "United States",
      state: "All States"
    },
    industryCategory: "Employment Law",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      caption: "Remote workers adapting to new policies"
    }
  },
  {
    id: "14",
    type: "industry",
    title: "Agricultural Innovation Summit",
    content: "Global agricultural leaders gather to discuss sustainable farming practices...",
    date: "2024-02-07",
    scope: {
      level: "world"
    },
    industryCategory: "Agriculture",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      caption: "Innovative sustainable farming methods in action"
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
    industryCategory: "Data Privacy",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      caption: "Expert analysis of new privacy regulations"
    }
  },
  {
    id: "16",
    type: "industry",
    title: "Renewable Energy Breakthrough",
    content: "Scientists announce major advancement in solar energy storage technology...",
    date: "2024-02-05",
    scope: {
      level: "world"
    },
    industryCategory: "Energy",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/jkaMiaRLgvY",
      caption: "Demonstration of new solar storage technology"
    }
  },
  {
    id: "17",
    type: "legal",
    title: "Healthcare Data Protection Standards",
    content: "New regulations for handling patient data in digital healthcare systems...",
    date: "2024-02-04",
    scope: {
      level: "national",
      country: "United States",
      state: "California"
    },
    industryCategory: "Healthcare",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f",
      caption: "Modern healthcare facilities implementing new standards"
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
    industryCategory: "Banking & Finance",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/Yb6825iv0Vk",
      caption: "Analysis of new cryptocurrency regulations"
    }
  },
  {
    id: "19",
    type: "industry",
    title: "Space Tourism Guidelines",
    content: "International Space Tourism Association releases safety guidelines...",
    date: "2024-02-02",
    scope: {
      level: "world"
    },
    industryCategory: "Tourism & Hospitality",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/C4VHfmiwuv4",
      caption: "Overview of space tourism safety protocols"
    }
  },
  {
    id: "20",
    type: "legal",
    title: "Artificial Intelligence Ethics Framework",
    content: "Global AI Ethics Committee establishes binding guidelines for AI development...",
    date: "2024-02-01",
    scope: {
      level: "world"
    },
    industryCategory: "Technology",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      caption: "AI systems under new ethical guidelines"
    }
  }
]
