import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
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
import LawyerCases from "./pages/lawyer-dashboard/Cases"
import LawyerTasks from "./pages/lawyer-dashboard/Tasks"
import LawyerDocuments from "./pages/lawyer-dashboard/Documents"
import LawyerMessages from "./pages/lawyer-dashboard/Messages"
import LawyerPerformance from "./pages/lawyer-dashboard/Performance"
import ClientDashboard from "./pages/client-dashboard/Overview"
import ClientCases from "./pages/client-dashboard/Cases"
import ClientForms from "./pages/client-dashboard/Forms"
import ClientDocuments from "./pages/client-dashboard/Documents"
import ClientInsights from "./pages/client-dashboard/Insights"
import ClientNewsFeed from "./pages/client-dashboard/NewsFeed"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="/lawyer-dashboard/cases" element={<LawyerCases />} />
          <Route path="/lawyer-dashboard/tasks" element={<LawyerTasks />} />
          <Route path="/lawyer-dashboard/documents" element={<LawyerDocuments />} />
          <Route path="/lawyer-dashboard/messages" element={<LawyerMessages />} />
          <Route path="/lawyer-dashboard/performance" element={<LawyerPerformance />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/client-dashboard/cases" element={<ClientCases />} />
          <Route path="/client-dashboard/forms" element={<ClientForms />} />
          <Route path="/client-dashboard/documents" element={<ClientDocuments />} />
          <Route path="/client-dashboard/insights" element={<ClientInsights />} />
          <Route path="/client-dashboard/news" element={<ClientNewsFeed />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App