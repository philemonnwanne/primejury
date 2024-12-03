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
import { Download, Eye, Trash2 } from "lucide-react"
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
  tags: string[]
  case: string
  url: string
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Contract_v1.pdf",
    type: "PDF",
    size: "2.5 MB",
    uploadDate: "2024-02-20",
    tags: ["Contract", "Evidence"],
    case: "Smith vs. Johnson",
    url: "/documents/contract.pdf",
  },
  {
    id: "2",
    name: "Evidence_photo.jpg",
    type: "Image",
    size: "1.2 MB",
    uploadDate: "2024-02-19",
    tags: ["Evidence"],
    case: "Tech Corp Merger",
    url: "/documents/evidence.jpg",
  },
]

export function DocumentLibrary() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || doc.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
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
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Case</TableHead>
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
                <TableCell>
                  <div className="flex gap-1">
                    {doc.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{doc.case}</TableCell>
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
                      <Trash2 className="h-4 w-4" />
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