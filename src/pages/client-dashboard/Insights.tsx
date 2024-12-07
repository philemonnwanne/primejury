import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { PreviousCaseCard } from "@/components/cases/PreviousCaseCard"
import { CaseDetails } from "@/components/cases/CaseDetails"
import { InsightFilters } from "@/components/cases/InsightFilters"
import { CaseTimeline } from "@/components/cases/CaseTimeline"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mockPreviousCases = [
  {
    id: "1",
    title: "Johnson v. Smith Manufacturing",
    type: "Civil - Product Liability",
    duration: {
      startDate: "2023-01-15",
      endDate: "2023-08-22",
      totalDays: 219,
    },
    description:
      "Product liability case involving defective manufacturing equipment that caused workplace injuries. Case was settled with comprehensive safety improvements implemented.",
    lawyer: {
      name: "Sarah Parker",
      id: "sp001",
    },
    documents: [
      {
        id: "doc1",
        title: "Initial Complaint",
        type: "Legal Filing",
        dateAdded: "2023-01-15",
      },
      {
        id: "doc2",
        title: "Settlement Agreement",
        type: "Legal Document",
        dateAdded: "2023-08-15",
      },
      {
        id: "doc3",
        title: "Safety Inspection Report",
        type: "Evidence",
        dateAdded: "2023-03-20",
      },
    ],
    disposition: "Settled with $500,000 compensation and mandatory safety reforms",
    judge: "Hon. Michael Roberts",
    location: {
      city: "Sacramento",
      state: "California",
      county: "Sacramento",
    },
    status: "settled" as const,
  },
  {
    id: "2",
    title: "Estate of Williams",
    type: "Family Law - Estate Planning",
    duration: {
      startDate: "2023-04-10",
      endDate: "2023-09-30",
      totalDays: 173,
    },
    description:
      "Complex estate planning case involving multiple beneficiaries and international assets. Successfully established a comprehensive trust structure.",
    lawyer: {
      name: "John Davis",
      id: "jd002",
    },
    documents: [
      {
        id: "doc4",
        title: "Will and Testament",
        type: "Legal Document",
        dateAdded: "2023-04-10",
      },
      {
        id: "doc5",
        title: "Trust Agreement",
        type: "Legal Document",
        dateAdded: "2023-07-22",
      },
    ],
    disposition: "Successfully executed estate plan with all parties in agreement",
    judge: "Hon. Patricia Chen",
    location: {
      city: "San Francisco",
      state: "California",
      county: "San Francisco",
    },
    status: "won" as const,
  },
  {
    id: "3",
    title: "State v. Thompson",
    type: "Criminal Defense",
    duration: {
      startDate: "2023-02-01",
      endDate: "2023-11-15",
      totalDays: 287,
    },
    description:
      "Criminal defense case involving allegations of white-collar fraud. Successfully proved client's innocence through detailed financial analysis.",
    lawyer: {
      name: "Emma Roberts",
      id: "er003",
    },
    documents: [
      {
        id: "doc6",
        title: "Defense Strategy",
        type: "Legal Document",
        dateAdded: "2023-02-15",
      },
      {
        id: "doc7",
        title: "Financial Analysis Report",
        type: "Evidence",
        dateAdded: "2023-05-20",
      },
      {
        id: "doc8",
        title: "Character Witness Statements",
        type: "Evidence",
        dateAdded: "2023-07-10",
      },
    ],
    disposition: "All charges dismissed with prejudice",
    judge: "Hon. James Wilson",
    location: {
      city: "Los Angeles",
      state: "California",
      county: "Los Angeles",
    },
    status: "won" as const,
  },
]

const mockTimelineEvents = [
  {
    date: "2024-01-15",
    title: "Case Filed",
    description: "Initial case documentation submitted to the court",
    status: "completed" as const,
    details: {
      lawyerNotes: "Initial filing completed successfully. All required documentation was properly submitted. Need to follow up on court's initial review timeline.\n\nKey points to address in next phase:\n- Gather additional witness statements\n- Review precedent cases\n- Prepare preliminary evidence list",
      evidenceRequests: [
        {
          id: "er1",
          description: "Original contract documents",
          status: "received" as const,
          dueDate: "2024-01-30"
        },
        {
          id: "er2",
          description: "Email correspondence from 2023",
          status: "pending" as const,
          dueDate: "2024-02-15"
        }
      ],
      blockers: [
        {
          id: "b1",
          description: "Awaiting court clerk verification of submitted documents",
          severity: "low" as const,
          status: "resolved" as const
        }
      ]
    }
  },
  {
    date: "2024-02-01",
    title: "Discovery Phase",
    description: "Started gathering evidence and documentation",
    status: "completed" as const,
    details: {
      lawyerNotes: "Discovery process initiated. Multiple document requests sent to opposing counsel.\n\nCritical areas of focus:\n- Financial records from 2020-2023\n- Communication records between parties\n- Expert witness identification",
      evidenceRequests: [
        {
          id: "er3",
          description: "Financial statements (2020-2023)",
          status: "received" as const,
          dueDate: "2024-02-20"
        },
        {
          id: "er4",
          description: "Expert witness credentials",
          status: "rejected" as const,
          dueDate: "2024-02-25"
        }
      ],
      blockers: [
        {
          id: "b2",
          description: "Opposing counsel requesting extension for document production",
          severity: "medium" as const,
          status: "resolved" as const
        }
      ]
    }
  },
  {
    date: "2024-02-15",
    title: "Motion Filed",
    description: "Motion for summary judgment submitted",
    status: "current" as const,
    details: {
      lawyerNotes: "Motion for summary judgment filed based on strong documentary evidence. Expecting opposition response within 14 days.\n\nKey arguments:\n- Contract breach clearly documented\n- Damages calculation supported by expert analysis\n- No material facts in dispute",
      evidenceRequests: [
        {
          id: "er5",
          description: "Updated damage calculation report",
          status: "pending" as const,
          dueDate: "2024-03-01"
        }
      ],
      blockers: [
        {
          id: "b3",
          description: "Expert witness availability limited for next hearing",
          severity: "high" as const,
          status: "active" as const
        },
        {
          id: "b4",
          description: "Missing crucial financial documentation from Q4 2023",
          severity: "medium" as const,
          status: "active" as const
        }
      ]
    }
  },
  {
    date: "2024-03-20",
    title: "Upcoming Hearing",
    description: "Scheduled court appearance for motion hearing",
    status: "upcoming" as const,
    details: {
      lawyerNotes: "Preparing for motion hearing. Need to focus on addressing potential opposition arguments.\n\nPreparation checklist:\n- Review all submitted evidence\n- Prepare oral arguments\n- Coordinate with expert witnesses",
      evidenceRequests: [
        {
          id: "er6",
          description: "Updated expert witness report",
          status: "pending" as const,
          dueDate: "2024-03-15"
        }
      ],
      blockers: [
        {
          id: "b5",
          description: "Court reporter availability uncertain",
          severity: "low" as const,
          status: "active" as const
        }
      ]
    }
  }
]

export default function Insights() {
  return (
    <ClientDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Case Insights</h1>
        </div>

        <Tabs defaultValue="current" className="space-y-6">
          <TabsList>
            <TabsTrigger value="current">Current Cases</TabsTrigger>
            <TabsTrigger value="previous">Previous Cases</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <CaseDetails caseId="1" />
              </div>
              <CaseTimeline events={mockTimelineEvents} />
            </div>
          </TabsContent>

          <TabsContent value="previous" className="space-y-6">
            <InsightFilters />
            <div className="grid gap-6">
              {mockPreviousCases.map((case_) => (
                <PreviousCaseCard key={case_.id} caseData={case_} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ClientDashboardLayout>
  )
}