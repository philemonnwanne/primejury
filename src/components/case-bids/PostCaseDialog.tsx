import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export function PostCaseDialog() {
  const [open, setOpen] = useState(false)
  const [caseType, setCaseType] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Case posted successfully")
    setOpen(false)
  }

  // Dynamic fields based on case type
  const getAdditionalFields = () => {
    switch (caseType) {
      case "civil":
        return (
          <>
            <div className="space-y-2">
              <Label>Dispute Value</Label>
              <Input type="number" placeholder="Estimated value of dispute" required />
            </div>
            <div className="space-y-2">
              <Label>Prior Attempts at Resolution</Label>
              <Textarea placeholder="Describe any previous attempts to resolve this dispute" />
            </div>
          </>
        )
      case "criminal":
        return (
          <>
            <div className="space-y-2">
              <Label>Charge Type</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select charge type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="misdemeanor">Misdemeanor</SelectItem>
                  <SelectItem value="felony">Felony</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Court Date (if scheduled)</Label>
              <Input type="date" />
            </div>
          </>
        )
      case "family":
        return (
          <>
            <div className="space-y-2">
              <Label>Case Urgency</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent (Within 24-48 hours)</SelectItem>
                  <SelectItem value="high">High (Within 1 week)</SelectItem>
                  <SelectItem value="medium">Medium (Within 2-3 weeks)</SelectItem>
                  <SelectItem value="low">Low (Within a month)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Children Involved</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Are children involved?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )
      case "corporate":
        return (
          <>
            <div className="space-y-2">
              <Label>Company Size</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
                  <SelectItem value="small">Small (11-50 employees)</SelectItem>
                  <SelectItem value="medium">Medium (51-200 employees)</SelectItem>
                  <SelectItem value="large">Large (201+ employees)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Industry</Label>
              <Input placeholder="Specify your industry" required />
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Post New Case</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Post a Case for Bids</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Case Title</Label>
            <Input id="title" placeholder="Enter case title" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Case Type</Label>
            <Select required onValueChange={(value) => setCaseType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select case type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="civil">Civil Litigation</SelectItem>
                <SelectItem value="criminal">Criminal Defense</SelectItem>
                <SelectItem value="family">Family Law</SelectItem>
                <SelectItem value="corporate">Corporate Law</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {getAdditionalFields()}
          <div className="space-y-2">
            <Label htmlFor="description">Case Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your case in detail"
              className="min-h-[100px]"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeline">Preferred Timeline</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select preferred timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">Urgent (ASAP)</SelectItem>
                <SelectItem value="1month">Within 1 month</SelectItem>
                <SelectItem value="3months">Within 3 months</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">Budget Range</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">$1,000 - $5,000</SelectItem>
                <SelectItem value="2">$5,000 - $10,000</SelectItem>
                <SelectItem value="3">$10,000 - $25,000</SelectItem>
                <SelectItem value="4">$25,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="documents">Additional Documents</Label>
            <Input type="file" multiple className="cursor-pointer" />
            <p className="text-sm text-muted-foreground">Upload any relevant documents (optional)</p>
          </div>
          <Button type="submit" className="w-full">Post Case</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}