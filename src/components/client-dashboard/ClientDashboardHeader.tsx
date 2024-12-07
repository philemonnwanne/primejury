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
import { UserRound, Settings, Lock, HelpCircle, FileText, Bell } from "lucide-react"
import { Link } from "react-router-dom"

export function ClientDashboardHeader() {
  const { toast } = useToast()

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "Notification feature coming soon",
    })
  }

  const handleMenuItemClick = (action: string) => {
    toast({
      title: action,
      description: `${action} feature coming soon`,
    })
  }

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="flex-1">
          <h2 className="text-lg font-semibold">Client Dashboard</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNotificationClick}
          className="mr-2"
        >
          <Bell className="h-4 w-4" />
        </Button>
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
              <DropdownMenuItem onClick={() => handleMenuItemClick("Profile Settings")}>
                <UserRound className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMenuItemClick("Account Settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMenuItemClick("Privacy & Security")}>
                <Lock className="mr-2 h-4 w-4" />
                <span>Privacy & Security</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleMenuItemClick("Help & Support")}>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMenuItemClick("Terms & Conditions")}>
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