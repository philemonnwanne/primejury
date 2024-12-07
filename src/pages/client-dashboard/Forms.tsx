import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { useState } from "react"
import { PendingFormsSection } from "@/components/forms/PendingFormsSection"
import { FormSuggestions } from "@/components/forms/FormSuggestions"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

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

export default function ClientForms() {
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
          <h1 className="text-3xl font-bold tracking-tight">Legal Forms</h1>
          <p className="text-muted-foreground">
            Access and fill out legal forms for your cases
          </p>
        </div>

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

        <Tabs defaultValue="criminal">
          <TabsList>
            <TabsTrigger value="criminal">Criminal Law</TabsTrigger>
            <TabsTrigger value="civil">Civil Law</TabsTrigger>
            <TabsTrigger value="immigration">Immigration Law</TabsTrigger>
            <TabsTrigger value="family">Family Law</TabsTrigger>
          </TabsList>
          <TabsContent value="criminal" className="space-y-4">
            {displayedForms
              .filter((form) => form.category === "Criminal Law")
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
                      <Button>Fill Out Form</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
          <TabsContent value="civil" className="space-y-4">
            {displayedForms
              .filter((form) => form.category === "Civil Law")
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
                      <Button>Fill Out Form</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
          <TabsContent value="immigration" className="space-y-4">
            {displayedForms
              .filter((form) => form.category === "Immigration Law")
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
                      <Button>Fill Out Form</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
          <TabsContent value="family" className="space-y-4">
            {displayedForms
              .filter((form) => form.category === "Family Law")
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
                      <Button>Fill Out Form</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
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