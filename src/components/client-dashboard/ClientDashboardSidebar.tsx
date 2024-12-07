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
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  { title: "Overview", icon: LayoutDashboard, url: "/client-dashboard" },
  { 
    title: "My Cases", 
    icon: Briefcase, 
    url: "/client-dashboard/cases",
    badge: { count: 2, variant: "destructive" as const }
  },
  { 
    title: "Legal Forms", 
    icon: FileText, 
    url: "/client-dashboard/forms",
    badge: { count: 3, variant: "destructive" as const }
  },
  { 
    title: "Document Center", 
    icon: Folder, 
    url: "/client-dashboard/documents",
    badge: { count: 1, variant: "default" as const }
  },
  { title: "Case Insights", icon: BarChart2, url: "/client-dashboard/insights" },
  { 
    title: "News Feed", 
    icon: Rss, 
    url: "/client-dashboard/news",
    badge: { count: 5, variant: "default" as const }
  },
  { 
    title: "Communications", 
    icon: MessageSquare, 
    url: "/client-dashboard/communications",
    badge: { count: 3, variant: "destructive" as const }
  },
  { title: "Billing", icon: CreditCard, url: "/client-dashboard/billing" },
]

export function ClientDashboardSidebar() {
  return (
    <Sidebar className="sticky top-0 h-screen">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-sm font-medium">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a 
                      href={item.url} 
                      className="group flex items-center gap-3 px-4 py-3 relative rounded-lg transition-all duration-200 hover:bg-sidebar-accent/10"
                    >
                      <item.icon className="h-4 w-4 transition-colors duration-200 group-hover:text-primary" />
                      <span className="text-sm font-medium transition-colors duration-200 group-hover:text-primary">
                        {item.title}
                      </span>
                      {item.badge && (
                        <Badge 
                          variant={item.badge.variant}
                          className="absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-200 group-hover:scale-110"
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