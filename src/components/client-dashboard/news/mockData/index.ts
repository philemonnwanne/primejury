import { legalNews } from "./legalNews"
import { regulatoryNews } from "./regulatoryNews"
import { industryNews } from "./industryNews"
import { sponsoredNews } from "./sponsoredNews"
import { NewsItemType } from "../types"

export const mockNews: NewsItemType[] = [
  ...sponsoredNews,
  ...legalNews,
  ...regulatoryNews,
  ...industryNews
]