import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface CaseOverviewTabProps {
  isEditing: boolean
  caseData: any // Replace with proper type
}

export function CaseOverviewTab({ isEditing, caseData }: CaseOverviewTabProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState(caseData)

  const handleSave = () => {
    // In a real app, this would make an API call
    toast({
      title: "Changes Saved",
      description: "Case details have been updated successfully.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Case Title</label>
            {isEditing ? (
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            ) : (
              <p className="text-muted-foreground">{formData.title}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Case Type</label>
            {isEditing ? (
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="civil">Civil Litigation</SelectItem>
                  <SelectItem value="criminal">Criminal Defense</SelectItem>
                  <SelectItem value="family">Family Law</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-muted-foreground">{formData.type}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            {isEditing ? (
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-muted-foreground">{formData.status}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>
            {isEditing ? (
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-muted-foreground">{formData.priority}</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Case Description</label>
          {isEditing ? (
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="min-h-[100px]"
            />
          ) : (
            <p className="text-muted-foreground">{formData.description}</p>
          )}
        </div>
        {isEditing && <Button onClick={handleSave}>Save Changes</Button>}
      </CardContent>
    </Card>
  )
}