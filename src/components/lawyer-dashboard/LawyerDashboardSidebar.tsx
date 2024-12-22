import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Newspaper,
  ListCheck,
  FolderOpen,
  Calendar,
  BarChart2,
  Network,
  MessageSquare,
  Users,
  Clock
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
  { title: "Overview", icon: LayoutDashboard, url: "/lawyer-dashboard" },
  { title: "Case Insights", icon: FileText, url: "/lawyer-dashboard/case-insights" },
  { title: "Clients", icon: Users, url: "/lawyer-dashboard/clients" },
  { title: "Billing", icon: CreditCard, url: "/lawyer-dashboard/billing" },
  { title: "Timesheet", icon: Clock, url: "/lawyer-dashboard/timesheet" },
  { title: "News Feed", icon: Newspaper, url: "/lawyer-dashboard/news" },
  { title: "Tasks", icon: ListCheck, url: "/lawyer-dashboard/tasks" },
  { title: "Document Center", icon: FolderOpen, url: "/lawyer-dashboard/documents" },
  { title: "Calendar", icon: Calendar, url: "/lawyer-dashboard/calendar" },
  { title: "Analytics", icon: BarChart2, url: "/lawyer-dashboard/analytics" },
  { title: "Marketplace", icon: Network, url: "/lawyer-dashboard/marketplace" },
  { title: "Communications", icon: MessageSquare, url: "/lawyer-dashboard/communications" },
]

export function LawyerDashboardSidebar() {
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
      </SidebarContent>
    </Sidebar>
  )
}