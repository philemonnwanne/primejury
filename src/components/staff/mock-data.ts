export interface StaffMember {
  id: number
  name: string
  role: "Lawyer" | "Paralegal" | "Legal Assistant" | "Administrator" | "Case Manager" | "Legal Secretary"
  email: string
  phone: string
  activeCases: number
  completedCases: number
  pendingTasks: number
  assignedCases?: Array<{
    id: string
    title: string
    status: string
  }>
  assignedTasks?: Array<{
    id: string
    title: string
    dueDate: string
    priority: "high" | "medium" | "low"
    status: "pending" | "in-progress" | "completed"
  }>
  permissions?: Array<{
    id: string
    name: string
    granted: boolean
  }>
}

export const staffMembers: StaffMember[] = [
  {
    id: 1,
    name: "Sarah Palmer",
    role: "Lawyer",
    email: "sarah.palmer@example.com",
    phone: "(555) 123-4567",
    activeCases: 5,
    completedCases: 12,
    pendingTasks: 3,
    assignedCases: [
      { id: "c1", title: "Smith vs. Johnson", status: "active" },
      { id: "c2", title: "Tech Corp Merger", status: "active" }
    ],
    assignedTasks: [
      { id: "t1", title: "Review Contract", dueDate: "2024-03-20", priority: "high", status: "in-progress" },
      { id: "t2", title: "Client Meeting", dueDate: "2024-03-22", priority: "medium", status: "pending" }
    ],
    permissions: [
      { id: "p1", name: "Case Management", granted: true },
      { id: "p2", name: "Document Access", granted: true },
      { id: "p3", name: "Billing Access", granted: true }
    ]
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Paralegal",
    email: "michael.chen@example.com",
    phone: "(555) 234-5678",
    activeCases: 3,
    completedCases: 8,
    pendingTasks: 2,
    assignedCases: [
      { id: "c3", title: "Estate Planning - Brown", status: "active" }
    ],
    assignedTasks: [
      { id: "t3", title: "Document Preparation", dueDate: "2024-03-21", priority: "medium", status: "pending" }
    ],
    permissions: [
      { id: "p1", name: "Case Management", granted: true },
      { id: "p2", name: "Document Access", granted: true },
      { id: "p3", name: "Billing Access", granted: false }
    ]
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Legal Assistant",
    email: "emily.rodriguez@example.com",
    phone: "(555) 345-6789",
    activeCases: 4,
    completedCases: 15,
    pendingTasks: 5,
    assignedCases: [
      { id: "c4", title: "Family Trust Case", status: "active" }
    ],
    assignedTasks: [
      { id: "t4", title: "File Organization", dueDate: "2024-03-23", priority: "low", status: "in-progress" }
    ],
    permissions: [
      { id: "p1", name: "Case Management", granted: false },
      { id: "p2", name: "Document Access", granted: true },
      { id: "p3", name: "Billing Access", granted: false }
    ]
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Case Manager",
    email: "james.wilson@example.com",
    phone: "(555) 456-7890",
    activeCases: 8,
    completedCases: 25,
    pendingTasks: 4,
    assignedCases: [
      { id: "c5", title: "Corporate Restructuring", status: "active" },
      { id: "c6", title: "IP Rights Case", status: "active" }
    ],
    assignedTasks: [
      { id: "t5", title: "Case Review", dueDate: "2024-03-24", priority: "high", status: "pending" }
    ],
    permissions: [
      { id: "p1", name: "Case Management", granted: true },
      { id: "p2", name: "Document Access", granted: true },
      { id: "p3", name: "Billing Access", granted: true }
    ]
  }
]