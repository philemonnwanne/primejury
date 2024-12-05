import { NewsItemType } from "../NewsItem"

export const legalNews: NewsItemType[] = [
  {
    id: "1",
    type: "legal",
    title: "Global Trade Agreement Updates",
    content: "New international trade regulations affecting multiple jurisdictions have been announced...",
    date: "2024-02-20",
    scope: {
      level: "world"
    },
    source: {
      name: "World Trade Organization",
      isVerified: true,
      url: "https://www.wto.org"
    },
    industryCategory: "International Trade",
    interactions: {
      likes: 45,
      comments: 12,
      shares: 8
    }
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
    source: {
      name: "European Commission",
      isVerified: true,
      url: "https://ec.europa.eu"
    },
    industryCategory: "Data Privacy",
    interactions: {
      likes: 10,
      comments: 3,
      shares: 1
    }
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
    source: {
      name: "New York Times",
      isVerified: true,
      url: "https://www.nytimes.com"
    },
    industryCategory: "Banking & Finance",
    interactions: {
      likes: 25,
      comments: 5,
      shares: 2
    }
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
    source: {
      name: "Government of Canada",
      isVerified: true,
      url: "https://www.canada.ca"
    },
    industryCategory: "Cannabis",
    interactions: {
      likes: 15,
      comments: 4,
      shares: 1
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
    source: {
      name: "Department of Labor",
      isVerified: true,
      url: "https://www.dol.gov"
    },
    industryCategory: "Employment Law",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      caption: "Remote workers adapting to new policies"
    },
    interactions: {
      likes: 22,
      comments: 15,
      shares: 5
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
    source: {
      name: "Centers for Medicare & Medicaid Services",
      isVerified: true,
      url: "https://www.cms.gov"
    },
    industryCategory: "Healthcare",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f",
      caption: "Modern healthcare facilities implementing new standards"
    },
    interactions: {
      likes: 10,
      comments: 4,
      shares: 1
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
    source: {
      name: "Global AI Ethics Committee",
      isVerified: true,
      url: "https://www.globalaiethics.org"
    },
    industryCategory: "Technology",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      caption: "AI systems under new ethical guidelines"
    },
    interactions: {
      likes: 50,
      comments: 20,
      shares: 10
    }
  }
]
