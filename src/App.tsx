import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Index from "./pages/Index"
import DashboardOverview from "./pages/dashboard/Overview"
import Cases from "./pages/dashboard/Cases"
import Staff from "./pages/dashboard/Staff"
import StaffProfile from "./pages/dashboard/StaffProfile"
import Tasks from "./pages/dashboard/Tasks"
import Documents from "./pages/dashboard/Documents"
import Finance from "./pages/dashboard/Finance"
import Analytics from "./pages/dashboard/Analytics"
import Settings from "./pages/dashboard/Settings"
import LawyerDashboard from "./pages/lawyer-dashboard/Overview"
import LawyerCaseInsights from "./pages/lawyer-dashboard/CaseInsights"
import LawyerBilling from "./pages/lawyer-dashboard/Billing"
import LawyerNewsFeed from "./pages/lawyer-dashboard/NewsFeed"
import LawyerTasks from "./pages/lawyer-dashboard/Tasks"
import LawyerDocuments from "./pages/lawyer-dashboard/Documents"
import LawyerCalendar from "./pages/lawyer-dashboard/Calendar"
import LawyerMarketplace from "./pages/lawyer-dashboard/Marketplace"
import LawyerCommunications from "./pages/lawyer-dashboard/Communications"
import LawyerAnalytics from "./pages/lawyer-dashboard/Analytics"
import ClientDashboard from "./pages/client-dashboard/Overview"
import ClientCases from "./pages/client-dashboard/Cases"
import ClientForms from "./pages/client-dashboard/Forms"
import ClientDocuments from "./pages/client-dashboard/Documents"
import ClientInsights from "./pages/client-dashboard/Insights"
import ClientNewsFeed from "./pages/client-dashboard/NewsFeed"
import ClientCommunications from "./pages/client-dashboard/Communications"
import ClientBilling from "./pages/client-dashboard/Billing"
import LawyerPublicProfiles from "./pages/lawyers/LawyerPublicProfiles"
import LawyerProfile from "./pages/lawyers/LawyerProfile"
import CaseBids from "./pages/client-dashboard/CaseBids"
import LawyerClients from "./pages/lawyer-dashboard/Clients"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/dashboard/cases" element={<Cases />} />
            <Route path="/dashboard/staff" element={<Staff />} />
            <Route path="/dashboard/staff/:id" element={<StaffProfile />} />
            <Route path="/dashboard/tasks" element={<Tasks />} />
            <Route path="/dashboard/documents" element={<Documents />} />
            <Route path="/dashboard/finance" element={<Finance />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
            <Route path="/lawyer-dashboard/case-insights" element={<LawyerCaseInsights />} />
            <Route path="/lawyer-dashboard/billing" element={<LawyerBilling />} />
            <Route path="/lawyer-dashboard/news" element={<LawyerNewsFeed />} />
            <Route path="/lawyer-dashboard/tasks" element={<LawyerTasks />} />
            <Route path="/lawyer-dashboard/documents" element={<LawyerDocuments />} />
            <Route path="/lawyer-dashboard/calendar" element={<LawyerCalendar />} />
            <Route path="/lawyer-dashboard/marketplace" element={<LawyerMarketplace />} />
            <Route path="/lawyer-dashboard/communications" element={<LawyerCommunications />} />
            <Route path="/lawyer-dashboard/analytics" element={<LawyerAnalytics />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/client-dashboard/cases" element={<ClientCases />} />
            <Route path="/client-dashboard/forms" element={<ClientForms />} />
            <Route path="/client-dashboard/documents" element={<ClientDocuments />} />
            <Route path="/client-dashboard/insights" element={<ClientInsights />} />
            <Route path="/client-dashboard/news" element={<ClientNewsFeed />} />
            <Route path="/client-dashboard/communications/:lawyerId?" element={<ClientCommunications />} />
            <Route path="/client-dashboard/billing" element={<ClientBilling />} />
            <Route path="/client-dashboard/case-bids" element={<CaseBids />} />
            <Route path="/lawyers" element={<LawyerPublicProfiles />} />
            <Route path="/lawyers/:id" element={<LawyerProfile />} />
            <Route path="/lawyer-dashboard/clients" element={<LawyerClients />} />
            <Route path="/lawyer-marketplace" element={<Navigate to="/lawyers" replace />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App