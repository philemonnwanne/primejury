import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentLibrary } from "@/components/documents/DocumentLibrary"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Folder } from "lucide-react"
import { PendingDocuments } from "@/components/documents/PendingDocuments"
import { DocumentUploadDialog } from "@/components/documents/DocumentUploadDialog"
import { PendingFormsSection } from "@/components/forms/PendingFormsSection"
import { FormSuggestions } from "@/components/forms/FormSuggestions"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

const mockCases = [
  {
    id: "1",
    title: "Smith vs. Johnson",
    documentCount: 5,
  },
  {
    id: "2",
    title: "Estate Planning - Brown",
    documentCount: 3,
  },
  {
    id: "3",
    title: "Personal Injury Case",
    documentCount: 2,
  }
]

const formCategories = {
  criminal: [
    {
      title: "Criminal Defense Questionnaire",
      description: "Initial case assessment form for criminal defense cases",
      category: "Criminal Law",
    },
    {
      title: "Witness Statement Form",
      description: "Standard form for documenting witness testimonies",
      category: "Criminal Law",
    },
  ],
  civil: [
    {
      title: "Civil Complaint Form",
      description: "Initial filing document for civil lawsuits",
      category: "Civil Law",
    },
    {
      title: "Settlement Agreement",
      description: "Template for documenting settlement terms",
      category: "Civil Law",
    },
  ],
  immigration: [
    {
      title: "Visa Application Support",
      description: "Supporting documentation for visa applications",
      category: "Immigration Law",
    },
    {
      title: "Citizenship Application",
      description: "Forms required for citizenship process",
      category: "Immigration Law",
    },
  ],
  family: [
    {
      title: "Divorce Petition",
      description: "Standard divorce filing documentation",
      category: "Family Law",
    },
    {
      title: "Child Custody Agreement",
      description: "Template for custody arrangements",
      category: "Family Law",
    },
  ],
}

export default function FormsAndDocuments() {
  const [showCommandDialog, setShowCommandDialog] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setSelectedCategory(null)
  }

  const filteredForms = selectedCategory
    ? formCategories[selectedCategory as keyof typeof formCategories]
    : Object.values(formCategories).flat()

  const displayedForms = filteredForms.filter((form) =>
    form.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <ClientDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Forms & Documents</h1>
          <p className="text-muted-foreground">
            Access legal forms and manage case-related documents
          </p>
        </div>

        <Tabs defaultValue="forms" className="space-y-4">
          <TabsList>
            <TabsTrigger value="forms">Legal Forms</TabsTrigger>
            <TabsTrigger value="documents">Document Center</TabsTrigger>
          </TabsList>

          <TabsContent value="forms" className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search forms..."
                className="pl-10"
                onClick={() => setShowCommandDialog(true)}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            <PendingFormsSection />
            <FormSuggestions />

            <Tabs defaultValue="criminal" className="space-y-4">
              <TabsList>
                <TabsTrigger value="criminal">Criminal Law</TabsTrigger>
                <TabsTrigger value="civil">Civil Law</TabsTrigger>
                <TabsTrigger value="immigration">Immigration Law</TabsTrigger>
                <TabsTrigger value="family">Family Law</TabsTrigger>
              </TabsList>

              {["criminal", "civil", "immigration", "family"].map((category) => (
                <TabsContent key={category} value={category} className="space-y-4">
                  {displayedForms
                    .filter((form) => form.category === `${category.charAt(0).toUpperCase() + category.slice(1)} Law`)
                    .map((form) => (
                      <Card key={form.title}>
                        <CardHeader>
                          <CardTitle className="text-xl">{form.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-muted-foreground">{form.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              {form.category}
                            </span>
                            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                              Fill Out Form
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <PendingDocuments />

            <Card>
              <CardHeader>
                <CardTitle>Upload Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      Drag and drop your files here, or
                    </p>
                    <DocumentUploadDialog cases={mockCases} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Case Folders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockCases.map((case_) => (
                  <div
                    key={case_.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Folder className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">{case_.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {case_.documentCount} documents
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => window.open(`/case/${case_.id}/documents`, '_blank')}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      View
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <CommandDialog open={showCommandDialog} onOpenChange={setShowCommandDialog}>
          <CommandInput placeholder="Search forms by category..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Categories">
              {Object.entries(formCategories).map(([key, forms]) => (
                <CommandItem
                  key={key}
                  onSelect={() => {
                    setSelectedCategory(key)
                    setShowCommandDialog(false)
                  }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)} Law ({forms.length})
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    </ClientDashboardLayout>
  )
}