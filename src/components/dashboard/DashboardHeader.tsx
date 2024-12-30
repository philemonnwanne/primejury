import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DashboardNotificationPanel } from "./notifications/DashboardNotificationPanel"

export function DashboardHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-6">
        <div className="flex-1 flex items-center gap-4">
          <div className="w-full max-w-sm flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search cases, tasks, or clients..." 
              className="w-full"
            />
          </div>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-white" />
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-80 p-0" 
            align="end"
            sideOffset={8}
          >
            <DashboardNotificationPanel />
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}