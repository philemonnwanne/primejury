import { legalNews } from "./legalNews"
import { regulatoryNews } from "./regulatoryNews"
import { industryNews } from "./industryNews"
import { NewsItemType } from "../NewsItem"

export const mockNews: NewsItemType[] = [
  ...legalNews,
  ...regulatoryNews,
  ...industryNews
]