import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, FileText, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface LegalForm {
  id: string
  title: string
  category: string
  state: string
  description: string
  type: string
}

const mockLegalForms: LegalForm[] = [
  {
    id: "1",
    title: "Criminal Complaint Form",
    category: "criminal",
    state: "California",
    description: "Standard form for filing criminal complaints",
    type: "Court Filing"
  },
  {
    id: "2",
    title: "Civil Case Cover Sheet",
    category: "civil",
    state: "California",
    description: "Required cover sheet for civil case filings",
    type: "Court Filing"
  },
  {
    id: "3",
    title: "Family Law Petition",
    category: "family",
    state: "California",
    description: "Initial filing form for family law cases",
    type: "Court Filing"
  },
  {
    id: "4",
    title: "Immigration Form I-485",
    category: "immigration",
    state: "Federal",
    description: "Application to Register Permanent Residence",
    type: "USCIS Form"
  }
]

export function LegalFormDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedState, setSelectedState] = useState<string>("all")

  const filteredForms = mockLegalForms.filter(form => {
    const matchesSearch = form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || form.category === selectedCategory
    const matchesState = selectedState === "all" || form.state === selectedState
    return matchesSearch && matchesCategory && matchesState
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search forms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="criminal">Criminal Law</SelectItem>
            <SelectItem value="civil">Civil Law</SelectItem>
            <SelectItem value="family">Family Law</SelectItem>
            <SelectItem value="immigration">Immigration</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            <SelectItem value="California">California</SelectItem>
            <SelectItem value="New York">New York</SelectItem>
            <SelectItem value="Texas">Texas</SelectItem>
            <SelectItem value="Federal">Federal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredForms.map((form) => (
          <Card key={form.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {form.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{form.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Category: {form.category}</span>
                  <span>•</span>
                  <span>State: {form.state}</span>
                  <span>•</span>
                  <span>Type: {form.type}</span>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    Preview
                  </Button>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}