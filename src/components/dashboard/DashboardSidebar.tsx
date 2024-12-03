import { LayoutDashboard, Briefcase, CheckSquare, FileText, BarChart2, Settings, Users } from "lucide-react"
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
  { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
  { title: "Cases", icon: Briefcase, url: "/dashboard/cases" },
  { title: "Staff", icon: Users, url: "/dashboard/staff" },
  { title: "Tasks", icon: CheckSquare, url: "/dashboard/tasks" },
  { title: "Documents", icon: FileText, url: "/dashboard/documents" },
  { title: "Analytics", icon: BarChart2, url: "/dashboard/analytics" },
  { title: "Settings", icon: Settings, url: "/dashboard/settings" },
]

export function DashboardSidebar() {
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
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
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