import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function LawyerDashboardHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-6">
        <div className="flex-1 flex items-center gap-4">
          <div className="w-full max-w-sm flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search cases, tasks, or messages..." 
              className="w-full"
            />
          </div>
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
        </Button>
      </div>
    </header>
  )
}