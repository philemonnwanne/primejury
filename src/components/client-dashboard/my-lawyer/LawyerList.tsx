import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { lawyerProfiles } from "@/data/lawyerProfiles"
import { ChevronRight, Star } from "lucide-react"

interface LawyerListProps {
  showCurrentOnly: boolean
  onSelectLawyer: (id: string) => void
}

export function LawyerList({ showCurrentOnly, onSelectLawyer }: LawyerListProps) {
  // In a real app, this would be filtered based on the client's case history
  const currentLawyer = lawyerProfiles[0]
  const previousLawyers = lawyerProfiles.slice(1)
  
  const displayedLawyers = showCurrentOnly ? [currentLawyer] : [currentLawyer, ...previousLawyers]

  return (
    <div className="space-y-4">
      {displayedLawyers.map((lawyer) => (
        <Card
          key={lawyer.id}
          className="p-4 cursor-pointer hover:bg-accent transition-colors"
          onClick={() => onSelectLawyer(lawyer.id)}
        >
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={lawyer.imageUrl} alt={lawyer.name} />
              <AvatarFallback>{lawyer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{lawyer.name}</h3>
                  <p className="text-sm text-muted-foreground">{lawyer.title}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm">{lawyer.successRate}%</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {lawyer.specialization.slice(0, 3).map((spec) => (
                  <Badge key={spec} variant="secondary" className="text-xs">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}