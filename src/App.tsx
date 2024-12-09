import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Index from "@/pages/Index"
import LawyerDashboard from "@/pages/lawyer-dashboard/Overview"
import ClientDashboard from "@/pages/client-dashboard/Overview"
import LawyerProfile from "@/pages/lawyers/LawyerProfile"
import LawyerPublicProfiles from "@/pages/lawyers/LawyerPublicProfiles"
import Communications from "@/pages/client-dashboard/Communications"
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/lawyers/:id" element={<LawyerProfile />} />
        <Route path="/lawyers" element={<LawyerPublicProfiles />} />
        <Route path="/client-dashboard/communications/:lawyerId?" element={<Communications />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App