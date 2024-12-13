import { useState } from "react"

// This would typically come from your API/database
const mockClients = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Sacramento, CA",
    joinDate: "2024-01-15",
    source: "marketplace" as const,
    activeCases: [
      {
        id: "case1",
        title: "Contract Dispute Resolution",
        status: "In Progress",
        description: "Dispute over construction project delays",
        type: "Civil Litigation",
        filingDate: "2024-02-01",
      },
    ],
    pastCases: [
      {
        id: "case2",
        title: "Property Dispute",
        outcome: "Settled",
        description: "Boundary dispute with neighbor",
        duration: "4 months",
        closingDate: "2023-12-15",
      },
    ],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 234-5678",
    address: "456 Oak Ave, San Francisco, CA",
    joinDate: "2023-11-20",
    source: "direct" as const,
    activeCases: [],
    pastCases: [
      {
        id: "case3",
        title: "Divorce Proceedings",
        outcome: "Completed",
        description: "Amicable divorce settlement",
        duration: "6 months",
        closingDate: "2024-01-30",
      },
    ],
  },
]

export function useClientData() {
  const [clients] = useState(mockClients)

  const getClientById = (id: string) => {
    return clients.find(client => client.id === id)
  }

  return {
    clients,
    getClientById,
  }
}