import {
  Briefcase,
  FileText,
  Folder,
  BarChart2,
  Rss,
  LayoutDashboard,
  MessageSquare,
  CreditCard,
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
  SidebarMenuBadge,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  { title: "Overview", icon: LayoutDashboard, url: "/client-dashboard" },
  { 
    title: "My Cases", 
    icon: Briefcase, 
    url: "/client-dashboard/cases",
    badge: { count: 2, variant: "destructive" }
  },
  { 
    title: "Legal Forms", 
    icon: FileText, 
    url: "/client-dashboard/forms",
    badge: { count: 3, variant: "destructive" }
  },
  { 
    title: "Document Center", 
    icon: Folder, 
    url: "/client-dashboard/documents",
    badge: { count: 1, variant: "default" }
  },
  { title: "Case Insights", icon: BarChart2, url: "/client-dashboard/insights" },
  { 
    title: "News Feed", 
    icon: Rss, 
    url: "/client-dashboard/news",
    badge: { count: 5, variant: "default" }
  },
  { 
    title: "Communications", 
    icon: MessageSquare, 
    url: "/client-dashboard/communications",
    badge: { count: 3, variant: "destructive" }
  },
  { title: "Billing", icon: CreditCard, url: "/client-dashboard/billing" },
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
                    <a href={item.url} className="flex items-center gap-3 px-3 py-2 relative">
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.title}</span>
                      {item.badge && (
                        <Badge 
                          variant={item.badge.variant} 
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                        >
                          {item.badge.count}
                        </Badge>
                      )}
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