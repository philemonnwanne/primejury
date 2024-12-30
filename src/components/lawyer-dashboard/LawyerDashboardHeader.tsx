import { Bell, Search, UserRound, Settings, Lock, HelpCircle, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useNavigate } from "react-router-dom"
import { LawyerNotificationPanel } from "./notifications/LawyerNotificationPanel"

export function LawyerDashboardHeader() {
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleMenuItemClick = (path: string) => {
    navigate(path)
  }

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
            <LawyerNotificationPanel />
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <UserRound className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleMenuItemClick("/lawyer-dashboard/settings/profile")}>
                <UserRound className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMenuItemClick("/lawyer-dashboard/settings/account")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMenuItemClick("/lawyer-dashboard/settings/privacy")}>
                <Lock className="mr-2 h-4 w-4" />
                <span>Privacy & Security</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleMenuItemClick("/lawyer-dashboard/help")}>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMenuItemClick("/lawyer-dashboard/terms")}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Terms & Conditions</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}