import { NewsItemType } from "../types"

export const sponsoredNews: NewsItemType[] = [
  {
    id: "sponsored-1",
    type: "industry",
    title: "Revolutionary Legal Document Management Software",
    content: "Discover how our AI-powered legal document management system is transforming law practices...",
    date: "2024-02-21",
    scope: {
      level: "world"
    },
    source: {
      name: "LegalTech Solutions",
      isVerified: true,
      url: "https://legaltechsolutions.com"
    },
    industryCategory: "Legal Technology",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
      caption: "Advanced legal document management system"
    },
    interactions: {
      likes: 45,
      comments: 12,
      shares: 8
    },
    sponsored: {
      advertiser: "LegalTech Solutions",
      cta: {
        text: "Try Free Demo",
        url: "https://legaltechsolutions.com/demo"
      }
    }
  }
]