export type DocumentAccessLevel = "firm-wide" | "lawyer-only" | "client-accessible";

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  case: string;
  accessLevel: DocumentAccessLevel;
  url: string;
}