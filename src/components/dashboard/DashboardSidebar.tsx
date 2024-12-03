import { Home, Activity, CreditCard, Bell, User, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/dashboard" },
  { title: "Analytics", icon: Activity, url: "/dashboard/analytics" },
  { title: "Transactions", icon: CreditCard, url: "/dashboard/finance" },
  { title: "Notifications", icon: Bell, url: "/dashboard/notifications" },
  { title: "Profile", icon: User, url: "/dashboard/profile" },
  { title: "Settings", icon: Settings, url: "/dashboard/settings" },
]

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="px-6 py-5">
          <h1 className="text-xl font-bold">Finance</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">Premium User</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}