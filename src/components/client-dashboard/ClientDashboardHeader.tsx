import { Button } from "@/components/ui/button"
import { Bell, Settings, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Logo from "@/components/Logo"

interface ClientDashboardHeaderProps {
  onNotificationClick: () => void
  className?: string
}

export function ClientDashboardHeader({ onNotificationClick, className }: ClientDashboardHeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-6">
        <Logo className="h-8 w-auto" />
        <nav className="hidden md:flex items-center space-x-4 ml-6">
          <a href="/client-dashboard" className="text-sm font-medium hover:text-primary">
            Home
          </a>
          <a href="/client-dashboard/cases" className="text-sm font-medium hover:text-primary">
            Cases
          </a>
          <a href="/client-dashboard/documents" className="text-sm font-medium hover:text-primary">
            Documents
          </a>
          <a href="/client-dashboard/communications" className="text-sm font-medium hover:text-primary">
            Messages
          </a>
        </nav>
        <div className="flex-1 flex items-center justify-end gap-4">
          <div className="w-full max-w-sm hidden md:flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search cases, documents..." 
              className="w-full"
            />
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={onNotificationClick}
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="/client-dashboard/settings">
              <Settings className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}