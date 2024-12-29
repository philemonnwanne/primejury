import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SuggestedForm {
  id: string
  title: string
  description: string
  category: string
  usage: string
}

interface SuggestedFormsProps {
  caseType: string
  forms: SuggestedForm[]
}

export function SuggestedForms({ caseType, forms }: SuggestedFormsProps) {
  if (!forms.length) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          Suggested Forms for {caseType}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {forms.map((form) => (
          <div
            key={form.id}
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