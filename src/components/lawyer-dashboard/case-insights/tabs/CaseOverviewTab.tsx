import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface CaseOverviewTabProps {
  isEditing: boolean
  caseData: any // Replace with proper type
  onSave: () => void
}

export function CaseOverviewTab({ isEditing, caseData, onSave }: CaseOverviewTabProps) {
  const [formData, setFormData] = useState(caseData)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Case Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Case Title</label>
              <p className="text-muted-foreground">{formData.title}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Case Type</label>
              <p className="text-muted-foreground">{formData.type}</p>
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
                <Badge>{formData.status}</Badge>
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
                <Badge variant="outline">{formData.priority}</Badge>
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

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Legal Representatives</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Lead Lawyer</label>
                {isEditing ? (
                  <Input
                    value={formData.lawyer.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lawyer: { ...formData.lawyer, name: e.target.value },
                      })
                    }
                  />
                ) : (
                  <p className="text-muted-foreground">{formData.lawyer.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Judge</label>
                {isEditing ? (
                  <Input
                    value={formData.judge}
                    onChange={(e) =>
                      setFormData({ ...formData, judge: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-muted-foreground">{formData.judge}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Case Location</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                {isEditing ? (
                  <Input
                    value={formData.location.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location, city: e.target.value },
                      })
                    }
                  />
                ) : (
                  <p className="text-muted-foreground">{formData.location.city}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">County</label>
                {isEditing ? (
                  <Input
                    value={formData.location.county}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location, county: e.target.value },
                      })
                    }
                  />
                ) : (
                  <p className="text-muted-foreground">
                    {formData.location.county}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isEditing && (
        <Button onClick={onSave} className="w-full">
          Save Changes
        </Button>
      )}
    </div>
  )
}