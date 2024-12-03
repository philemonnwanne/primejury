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
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App