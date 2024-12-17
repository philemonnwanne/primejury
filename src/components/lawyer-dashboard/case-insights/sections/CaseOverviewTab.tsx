import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface CaseOverviewTabProps {
  initialData: {
    title: string
    type: string
    status: string
    priority: string
    description: string
    estimatedDuration: string
    subject: string
    filingDate: string
    nextHearing: string
  }
}

export function CaseOverviewTab({ initialData }: CaseOverviewTabProps) {
  const [data, setData] = useState(initialData)
  const { toast } = useToast()

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
            <Input 
              value={data.title} 
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Case Type</label>
            <Select 
              value={data.type}
              onValueChange={(value) => setData({ ...data, type: value })}
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
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Filing Date</label>
            <Input 
              type="date"
              value={data.filingDate}
              onChange={(e) => setData({ ...data, filingDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Next Hearing</label>
            <Input 
              type="date"
              value={data.nextHearing}
              onChange={(e) => setData({ ...data, nextHearing: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select 
              value={data.status}
              onValueChange={(value) => setData({ ...data, status: value })}
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
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>
            <Select 
              value={data.priority}
              onValueChange={(value) => setData({ ...data, priority: value })}
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
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Estimated Duration</label>
            <Input 
              value={data.estimatedDuration}
              onChange={(e) => setData({ ...data, estimatedDuration: e.target.value })}
              placeholder="e.g., 6-8 months"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Subject Matter</label>
          <Textarea 
            value={data.subject}
            onChange={(e) => setData({ ...data, subject: e.target.value })}
            className="min-h-[100px]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Case Description</label>
          <Textarea 
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="min-h-[100px]"
          />
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardContent>
    </Card>
  )
}