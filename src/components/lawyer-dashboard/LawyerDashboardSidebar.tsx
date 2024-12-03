import {
  LayoutDashboard,
  Briefcase,
  CheckSquare,
  FileText,
  MessageSquare,
  BarChart2,
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
  { title: "Cases", icon: Briefcase, url: "/lawyer-dashboard/cases" },
  { title: "Tasks", icon: CheckSquare, url: "/lawyer-dashboard/tasks" },
  { title: "Documents", icon: FileText, url: "/lawyer-dashboard/documents" },
  { title: "Messages", icon: MessageSquare, url: "/lawyer-dashboard/messages" },
  { title: "Performance", icon: BarChart2, url: "/lawyer-dashboard/performance" },
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