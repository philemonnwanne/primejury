import { ScrollArea } from "@/components/ui/scroll-area"
import { User } from "lucide-react"
import { cn } from "@/lib/utils"
import { LawyerProfile } from "@/data/lawyerProfiles"

interface LawyerListProps {
  lawyers: LawyerProfile[]
  selectedLawyer: string | undefined
  onSelectLawyer: (id: string) => void
}

export function LawyerList({ lawyers, selectedLawyer, onSelectLawyer }: LawyerListProps) {
  return (
    <ScrollArea className="h-full">
      {lawyers.map((lawyer) => (
        <button
          key={lawyer.id}
          onClick={() => onSelectLawyer(lawyer.id)}
          className={cn(
            "w-full flex items-center gap-3 p-3 hover:bg-accent transition-colors",
            selectedLawyer === lawyer.id && "bg-accent"
          )}
        >
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="text-left">
            <p className="font-medium">{lawyer.name}</p>
            <p className="text-xs text-muted-foreground">{lawyer.specialization}</p>
          </div>
        </button>
      ))}
    </ScrollArea>
  )
}