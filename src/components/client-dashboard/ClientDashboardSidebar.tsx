import {
  Briefcase,
  CheckSquare,
  FileText,
  LayoutDashboard,
  MessageSquare,
  CreditCard,
  BookOpen,
  HelpCircle,
  LogOut,
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
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Overview", icon: LayoutDashboard, url: "/client-dashboard" },
  { title: "Active Cases", icon: Briefcase, url: "/client-dashboard/cases" },
  { title: "Tasks & Reminders", icon: CheckSquare, url: "/client-dashboard/tasks" },
  { title: "Documents", icon: FileText, url: "/client-dashboard/documents" },
  { title: "Messages", icon: MessageSquare, url: "/client-dashboard/communications" },
  { title: "Billing", icon: CreditCard, url: "/client-dashboard/billing" },
]

const resourceItems = [
  { title: "Legal Resources", icon: BookOpen, url: "/client-dashboard/resources" },
  { title: "Support", icon: HelpCircle, url: "/client-dashboard/support" },
]

export function ClientDashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button 
                    onClick={() => console.log("Sign out clicked")} 
                    className="flex items-center gap-3 px-3 py-2 w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}