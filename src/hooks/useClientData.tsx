import { useState } from "react"

export interface Case {
  id: string
  title: string
  status?: string
  description: string
  type?: string
  filingDate?: string
  outcome?: string
  closingDate?: string
  duration?: string
}

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  address: string
  joinDate: string
  source: "marketplace" | "direct"
  activeCases: Case[]
  pastCases: Case[]
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Sacramento, CA",
    joinDate: "2024-01-15",
    source: "marketplace",
    activeCases: [
      {
        id: "case1",
        title: "Contract Dispute Resolution",
        status: "In Progress",
        description: "Dispute over construction project delays",
        type: "Civil Litigation",
        filingDate: "2024-02-01",
      },
      {
        id: "case2",
        title: "Employment Agreement Review",
        status: "Pending Review",
        description: "Review and negotiation of executive employment contract",
        type: "Employment Law",
        filingDate: "2024-02-15",
      },
    ],
    pastCases: [
      {
        id: "case3",
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
    source: "direct",
    activeCases: [
      {
        id: "case4",
        title: "Business Merger",
        status: "Active",
        description: "Overseeing merger of two tech startups",
        type: "Corporate Law",
        filingDate: "2024-01-10",
      },
    ],
    pastCases: [
      {
        id: "case5",
        title: "Trademark Registration",
        outcome: "Approved",
        description: "Successfully registered company trademark",
        duration: "3 months",
        closingDate: "2023-12-01",
      },
    ],
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "(555) 345-6789",
    address: "789 Pine St, Los Angeles, CA",
    joinDate: "2023-12-05",
    source: "marketplace",
    activeCases: [
      {
        id: "case6",
        title: "Patent Application",
        status: "Under Review",
        description: "Filing patent for new technology invention",
        type: "Intellectual Property",
        filingDate: "2024-02-20",
      },
    ],
    pastCases: [
      {
        id: "case7",
        title: "Copyright Infringement",
        outcome: "Won",
        description: "Successfully defended client's copyright claim",
        duration: "8 months",
        closingDate: "2023-11-15",
      },
    ],
  },
]

export function useClientData() {
  const [clients] = useState<Client[]>(mockClients)

  const getClientById = (id: string) => {
    return clients.find((client) => client.id === id)
  }

  return {
    clients,
    getClientById,
  }
}