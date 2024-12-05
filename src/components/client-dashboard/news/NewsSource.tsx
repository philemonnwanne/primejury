import { Globe, CheckCircle, AlertCircle } from "lucide-react"
import { Source } from "./types"

interface NewsSourceProps {
  source: Source
}

export function NewsSource({ source }: NewsSourceProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Globe className="h-4 w-4" />
      {source.url ? (
        <a 
          href={source.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {source.name}
        </a>
      ) : (
        <span>{source.name}</span>
      )}
      {source.isVerified ? (
        <CheckCircle className="h-4 w-4 text-green-500" />
      ) : (
        <AlertCircle className="h-4 w-4 text-yellow-500" />
      )}
    </div>
  )
}