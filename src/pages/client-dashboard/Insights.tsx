import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { PreviousCaseCard } from "@/components/cases/PreviousCaseCard"
import { CaseDetails } from "@/components/cases/CaseDetails"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
            <CaseDetails caseId="1" />
          </TabsContent>

          <TabsContent value="previous" className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Case Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="civil">Civil</SelectItem>
                  <SelectItem value="criminal">Criminal</SelectItem>
                  <SelectItem value="family">Family Law</SelectItem>
                  <SelectItem value="immigration">Immigration</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="won">Won</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                  <SelectItem value="settled">Settled</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="sacramento">Sacramento</SelectItem>
                  <SelectItem value="san-francisco">San Francisco</SelectItem>
                  <SelectItem value="los-angeles">Los Angeles</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
