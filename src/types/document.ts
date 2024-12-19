export interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadDate: string
  case: string
  accessLevel: "firm-wide" | "lawyer-only" | "client-accessible"
  url: string
}