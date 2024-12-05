import {
  Briefcase,
  FileText,
  Folder,
  BarChart2,
  Rss,
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
  { title: "My Cases", icon: Briefcase, url: "/client-dashboard/cases" },
  { title: "Legal Forms", icon: FileText, url: "/client-dashboard/forms" },
  { title: "Document Center", icon: Folder, url: "/client-dashboard/documents" },
  { title: "Case Insights", icon: BarChart2, url: "/client-dashboard/insights" },
  { title: "News Feed", icon: Rss, url: "/client-dashboard/news" },
]

export function ClientDashboardSidebar() {
  return (
    <Sidebar className="sticky top-0 h-screen">
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