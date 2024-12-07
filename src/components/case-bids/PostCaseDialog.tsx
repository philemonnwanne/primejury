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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Case posted successfully")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Post New Case</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
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
            <Select required>
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
          <Button type="submit" className="w-full">Post Case</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}