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
import { Download, Eye, Share2, Search } from "lucide-react"
import { DocumentViewer } from "./DocumentViewer"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadDate: string
  case: string
  accessLevel: "firm-wide" | "lawyer-only" | "client-accessible"
  url: string
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Contract_v1.pdf",
    type: "PDF",
    size: "2.5 MB",
    uploadDate: "2024-02-20",
    case: "Smith vs. Johnson",
    accessLevel: "lawyer-only",
    url: "/documents/contract.pdf",
  },
  {
    id: "2",
    name: "Evidence_photo.jpg",
    type: "Image",
    size: "1.2 MB",
    uploadDate: "2024-02-19",
    case: "Tech Corp Merger",
    accessLevel: "firm-wide",
    url: "/documents/evidence.jpg",
  },
]

const accessLevelColors = {
  "firm-wide": "default",
  "lawyer-only": "secondary",
  "client-accessible": "outline",
} as const

export function DocumentLibrary() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterAccess, setFilterAccess] = useState<string>("all")

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || doc.type === filterType
    const matchesAccess = filterAccess === "all" || doc.accessLevel === filterAccess
    return matchesSearch && matchesType && matchesAccess
  })

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
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="PDF">PDF</SelectItem>
            <SelectItem value="Image">Image</SelectItem>
            <SelectItem value="Word">Word</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterAccess} onValueChange={setFilterAccess}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Access Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Access Levels</SelectItem>
            <SelectItem value="firm-wide">Firm-Wide</SelectItem>
            <SelectItem value="lawyer-only">Lawyer-Only</SelectItem>
            <SelectItem value="client-accessible">Client-Accessible</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Case</TableHead>
              <TableHead>Access Level</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell>{doc.uploadDate}</TableCell>
                <TableCell>{doc.case}</TableCell>
                <TableCell>
                  <Badge variant={accessLevelColors[doc.accessLevel]}>
                    {doc.accessLevel}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DocumentViewer
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />
    </div>
  )
}