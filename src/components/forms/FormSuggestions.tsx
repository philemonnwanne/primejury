import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const mockCurrentCase = {
  type: "immigration",
  title: "Visa Application",
}

const suggestedForms = {
  immigration: [
    {
      title: "Form I-485",
      description: "Application to Register Permanent Residence",
      usage: "Required for adjusting status to permanent resident",
    },
    {
      title: "Form I-130",
      description: "Petition for Alien Relative",
      usage: "Used to establish relationship with a qualifying relative",
    },
  ],
  criminal: [
    {
      title: "Plea Agreement",
      description: "Standard plea agreement document",
      usage: "Used when negotiating a plea deal with prosecutors",
    },
  ],
  civil: [
    {
      title: "Settlement Agreement",
      description: "Civil case settlement document",
      usage: "Used to document terms of settlement between parties",
    },
  ],
  family: [
    {
      title: "Custody Agreement",
      description: "Child custody arrangement document",
      usage: "Used to establish custody terms between parents",
    },
  ],
}

export function FormSuggestions() {
  const currentCaseForms =
    suggestedForms[mockCurrentCase.type as keyof typeof suggestedForms] || []

  if (!currentCaseForms.length) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          Suggested Forms for {mockCurrentCase.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentCaseForms.map((form) => (
          <div
            key={form.title}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">{form.title}</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{form.usage}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-sm text-muted-foreground">
                {form.description}
              </p>
            </div>
            <Button>View Form</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}