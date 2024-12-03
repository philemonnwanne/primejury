import { LayoutDashboard, Briefcase, CheckSquare, FileText, BarChart2, Settings, Users, DollarSign } from "lucide-react"
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
  { title: "Finance", icon: DollarSign, url: "/dashboard/finance" },
  { title: "Analytics", icon: BarChart2, url: "/dashboard/analytics" },
  { title: "Settings", icon: Settings, url: "/dashboard/settings" },
]

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="pt-6">
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-sm font-medium">Menu</SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title} className="px-3">
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