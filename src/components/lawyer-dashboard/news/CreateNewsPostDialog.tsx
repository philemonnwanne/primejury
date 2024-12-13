import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

interface CreateNewsPostDialogProps {
  children: React.ReactNode
}

export function CreateNewsPostDialog({ children }: CreateNewsPostDialogProps) {
  const [open, setOpen] = useState(false)
  const [isBreaking, setIsBreaking] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("News post created successfully")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create News Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter news title" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">News Type</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select news type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="legal">Legal Update</SelectItem>
                <SelectItem value="regulatory">Regulatory Change</SelectItem>
                <SelectItem value="industry">Industry News</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="scope">Scope</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select scope" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="world">Global</SelectItem>
                <SelectItem value="national">National</SelectItem>
                <SelectItem value="state">State</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your news content here"
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="media">Media (Optional)</Label>
            <Input type="file" accept="image/*,video/*" />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="breaking"
              checked={isBreaking}
              onCheckedChange={setIsBreaking}
            />
            <Label htmlFor="breaking">Mark as Breaking News</Label>
          </div>

          <Button type="submit" className="w-full">Post News</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}