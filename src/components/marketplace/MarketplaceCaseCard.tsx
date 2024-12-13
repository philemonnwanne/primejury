import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, DollarSign, MapPin, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface CaseCardProps {
  case_: {
    id: string
    title: string
    type: string
    description: string
    budget: string
    location: string
    postedDate: string
    deadline: string
    isProBono: boolean
    status: string
  }
  onClick: () => void
}

export function MarketplaceCaseCard({ case_, onClick }: CaseCardProps) {
  const timePosted = formatDistanceToNow(new Date(case_.postedDate), { addSuffix: true })

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{case_.title}</CardTitle>
          <div className="flex gap-2">
            {case_.isProBono && (
              <Badge variant="secondary">Pro Bono</Badge>
            )}
            <Badge>{case_.status}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span>{case_.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>{case_.budget}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{case_.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Due by {new Date(case_.deadline).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Posted {timePosted}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{case_.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}