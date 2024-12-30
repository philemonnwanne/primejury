import {
  Briefcase,
  FileText,
  BarChart2,
  Rss,
  LayoutDashboard,
  MessageSquare,
  CreditCard,
  Gavel,
  UserRound,
  ShoppingBag,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Overview", icon: LayoutDashboard, url: "/client-dashboard" },
  { title: "Case Bids", icon: Gavel, url: "/client-dashboard/case-bids" },
  { title: "My Cases", icon: Briefcase, url: "/client-dashboard/cases" },
  { title: "My Lawyer", icon: UserRound, url: "/client-dashboard/my-lawyer" },
  { title: "Forms & Documents", icon: FileText, url: "/client-dashboard/forms-and-documents" },
  { title: "Case Insights", icon: BarChart2, url: "/client-dashboard/insights" },
  { title: "News Feed", icon: Rss, url: "/client-dashboard/news" },
  { title: "Communications", icon: MessageSquare, url: "/client-dashboard/communications" },
  { title: "Billing", icon: CreditCard, url: "/client-dashboard/billing" },
  { title: "Marketplace", icon: ShoppingBag, url: "/lawyer-marketplace" },
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
                      <span className="text-sm font-medium transition-colors duration-200 hover:text-primary">
                        {item.title}
                      </span>
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