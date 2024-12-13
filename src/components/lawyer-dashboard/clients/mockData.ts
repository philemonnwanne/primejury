export const mockClients = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    source: "direct" as const,
    activeCases: [
      {
        id: "case1",
        title: "Contract Dispute vs. Tech Corp",
        type: "Business Law",
      },
      {
        id: "case2",
        title: "Intellectual Property Claim",
        type: "IP Law",
      },
    ],
    pastCases: [
      {
        id: "case3",
        title: "Employment Agreement Review",
        type: "Employment Law",
      },
    ],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 234-5678",
    source: "marketplace" as const,
    activeCases: [
      {
        id: "case4",
        title: "Real Estate Transaction",
        type: "Real Estate",
      },
    ],
    pastCases: [],
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.c@example.com",
    phone: "(555) 345-6789",
    source: "marketplace" as const,
    activeCases: [],
    pastCases: [
      {
        id: "case5",
        title: "Patent Application",
        type: "IP Law",
      },
      {
        id: "case6",
        title: "Trademark Registration",
        type: "IP Law",
      },
    ],
  },
]