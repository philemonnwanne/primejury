import {
  LayoutDashboard,
  PieChart,
  CreditCard,
  Bell,
  User,
  Settings,
  Menu,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/lawyer-dashboard" },
  { title: "Analytics", icon: PieChart, url: "/lawyer-dashboard/analytics" },
  { title: "Transactions", icon: CreditCard, url: "/lawyer-dashboard/transactions" },
  { title: "Notifications", icon: Bell, url: "/lawyer-dashboard/notifications" },
  { title: "Profile", icon: User, url: "/lawyer-dashboard/profile" },
  { title: "Settings", icon: Settings, url: "/lawyer-dashboard/settings" },
]

export function LawyerDashboardSidebar() {
  const isMobile = useIsMobile()

  const sidebarContent = (
    <Sidebar className="border-r-0">
      <SidebarContent>
        <div className="px-6 py-5">
          <h1 className="text-2xl font-bold mb-8">⚖️ Lawfirm</h1>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a 
                        href={item.url} 
                        className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="text-base font-normal">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
        
        {/* User Profile Section at Bottom */}
        <div className="mt-auto px-6 py-4 border-t">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-gray-500">Premium User</span>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="hidden md:block h-screen sticky top-0">
        {sidebarContent}
      </div>
      <SidebarTrigger className="hidden md:flex" />
    </SidebarProvider>
  )
}
