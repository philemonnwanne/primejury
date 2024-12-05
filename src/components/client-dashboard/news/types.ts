export type ReactionType = "like" | "laugh" | "frown" | "dislike" | "love"

export interface MediaContent {
  type: "image" | "video"
  url: string
  caption?: string
}

export interface Source {
  name: string
  isVerified: boolean
  url?: string
}

export interface Interactions {
  likes: number
  comments: number
  shares: number
}

export interface NewsItemType {
  id: string
  title: string
  content: string
  date: string
  type: "all" | "legal" | "regulatory" | "industry"
  scope: {
    level: "world" | "national"
    country?: string
    state?: string
  }
  industryCategory: string
  source?: Source
  media?: MediaContent
  interactions?: Interactions
  breaking?: boolean
  sponsored?: {
    advertiser: string
    cta?: {
      text: string
      url: string
    }
  }
}