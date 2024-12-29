import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Eye, Share2, Search, Folder, ChevronRight, ChevronDown, File } from "lucide-react"
import { DocumentViewer } from "./DocumentViewer"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export type DocumentAccessLevel = "firm-wide" | "lawyer-only" | "client-accessible";

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  case: string;
  accessLevel: DocumentAccessLevel;
  url: string;
}

// Mock data structure for cases and their documents
const mockCaseDocuments = [
  {
    caseId: "1",
    caseName: "Smith vs. Johnson",
    documents: {
      "Legal Filings": [
        {
          id: "1",
          name: "Initial Complaint.pdf",
          type: "PDF",
          size: "2.5 MB",
          uploadDate: "2024-02-20",
          case: "Smith vs. Johnson",
          accessLevel: "lawyer-only" as DocumentAccessLevel,
          url: "/documents/complaint.pdf",
        },
        {
          id: "2",
          name: "Response to Motion.pdf",
          type: "PDF",
          size: "1.8 MB",
          uploadDate: "2024-02-22",
          case: "Smith vs. Johnson",
          accessLevel: "lawyer-only" as DocumentAccessLevel,
          url: "/documents/response.pdf",
        }
      ],
      "Evidence": [
        {
          id: "3",
          name: "Evidence_photo.jpg",
          type: "Image",
          size: "1.2 MB",
          uploadDate: "2024-02-19",
          case: "Smith vs. Johnson",
          accessLevel: "firm-wide" as DocumentAccessLevel,
          url: "/documents/evidence.jpg",
        }
      ],
      "Client Forms": [
        {
          id: "4",
          name: "Client Authorization.pdf",
          type: "PDF",
          size: "0.5 MB",
          uploadDate: "2024-02-18",
          case: "Smith vs. Johnson",
          accessLevel: "client-accessible" as DocumentAccessLevel,
          url: "/documents/auth.pdf",
        }
      ]
    }
  },
  {
    caseId: "2",
    caseName: "Tech Corp Merger",
    documents: {
      "Contracts": [
        {
          id: "5",
          name: "Merger Agreement.pdf",
          type: "PDF",
          size: "3.5 MB",
          uploadDate: "2024-02-15",
          case: "Tech Corp Merger",
          accessLevel: "lawyer-only" as DocumentAccessLevel,
          url: "/documents/merger.pdf",
        }
      ],
      "Due Diligence": [
        {
          id: "6",
          name: "Financial Report.pdf",
          type: "PDF",
          size: "2.8 MB",
          uploadDate: "2024-02-16",
          case: "Tech Corp Merger",
          accessLevel: "lawyer-only" as DocumentAccessLevel,
          url: "/documents/finance.pdf",
        }
      ]
    }
  }
]

const accessLevelColors = {
  "firm-wide": "default",
  "lawyer-only": "secondary",
  "client-accessible": "outline",
} as const

export function DocumentLibrary({ type = "case" }: { type?: string }) {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCases, setExpandedCases] = useState<string[]>([])
  const [expandedCategories, setExpandedCategories] = useState<{[key: string]: string[]}>({})

  const toggleCase = (caseId: string) => {
    setExpandedCases(prev => 
      prev.includes(caseId) 
        ? prev.filter(id => id !== caseId)
        : [...prev, caseId]
    )
  }

  const toggleCategory = (caseId: string, category: string) => {
    setExpandedCategories(prev => {
      const caseCategories = prev[caseId] || []
      const newCaseCategories = caseCategories.includes(category)
        ? caseCategories.filter(cat => cat !== category)
        : [...caseCategories, category]
      return {
        ...prev,
        [caseId]: newCaseCategories
      }
    })
  }

  const isCategoryExpanded = (caseId: string, category: string) => {
    return expandedCategories[caseId]?.includes(category) || false
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        {mockCaseDocuments.map((caseData) => (
          <Collapsible
            key={caseData.caseId}
            open={expandedCases.includes(caseData.caseId)}
            className="border-b last:border-b-0"
          >
            <CollapsibleTrigger
              className="flex w-full items-center justify-between p-4 hover:bg-muted/50"
              onClick={() => toggleCase(caseData.caseId)}
            >
              <div className="flex items-center gap-2">
                <Folder className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{caseData.caseName}</span>
              </div>
              {expandedCases.includes(caseData.caseId) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-4 pb-4">
                {Object.entries(caseData.documents).map(([category, documents]) => (
                  <Collapsible
                    key={category}
                    open={isCategoryExpanded(caseData.caseId, category)}
                    className="mt-2"
                  >
                    <CollapsibleTrigger
                      className="flex w-full items-center justify-between p-2 hover:bg-muted/50 rounded-md"
                      onClick={() => toggleCategory(caseData.caseId, category)}
                    >
                      <div className="flex items-center gap-2">
                        <Folder className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{category}</span>
                      </div>
                      {isCategoryExpanded(caseData.caseId, category) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="ml-6 mt-2 space-y-2">
                        {documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50"
                          >
                            <div className="flex items-center gap-2">
                              <File className="h-4 w-4 text-muted-foreground" />
                              <span>{doc.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={accessLevelColors[doc.accessLevel]}>
                                {doc.accessLevel}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedDocument(doc)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      <DocumentViewer
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />
    </div>
  )
}
