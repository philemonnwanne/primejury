import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

interface Contact {
  id: string
  name: string
  email: string
  role: string
  cases: Array<{
    id: string
    title: string
    authorizedViewers: Array<{
      name: string
      role: string
    }>
  }>
}

// Mock data for demonstration
const mockContacts: Contact[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "client",
    cases: [
      {
        id: "case1",
        title: "Smith vs. Johnson",
        authorizedViewers: [
          { name: "Sarah Parker", role: "lawyer" },
          { name: "Mary Smith", role: "family_member" }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Emily Brown",
    email: "emily.brown@example.com",
    role: "client",
    cases: [
      {
        id: "case2",
        title: "Estate Planning",
        authorizedViewers: [
          { name: "Michael Chang", role: "lawyer" },
          { name: "Robert Brown", role: "beneficiary" }
        ]
      }
    ]
  },
  {
    id: "3",
    name: "Sarah Parker",
    email: "sarah.parker@lawfirm.com",
    role: "lawyer",
    cases: [
      {
        id: "case1",
        title: "Smith vs. Johnson",
        authorizedViewers: []
      },
      {
        id: "case2",
        title: "Estate Planning",
        authorizedViewers: []
      }
    ]
  },
  {
    id: "4",
    name: "Michael Chang",
    email: "michael.chang@lawfirm.com",
    role: "paralegal",
    cases: [
      {
        id: "case2",
        title: "Estate Planning",
        authorizedViewers: []
      }
    ]
  }
]

export function ContactDirectory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedContact, setExpandedContact] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("clients")

  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (activeTab === "clients") {
      return matchesSearch && contact.role === "client"
    } else {
      return matchesSearch && ["lawyer", "paralegal"].includes(contact.role)
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Directory</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-4">
          <TabsList>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="internal">Internal Staff</TabsTrigger>
          </TabsList>
          <TabsContent value="clients">
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="border rounded-lg p-4 space-y-2"
                  >
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setExpandedContact(
                        expandedContact === contact.id ? null : contact.id
                      )}
                    >
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                      </div>
                      <Badge>{contact.role}</Badge>
                    </div>
                    
                    {expandedContact === contact.id && (
                      <div className="mt-4 space-y-4">
                        {contact.cases.map((case_) => (
                          <div key={case_.id} className="bg-accent/50 rounded-lg p-3">
                            <p className="font-medium mb-2">{case_.title}</p>
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Authorized Viewers:</p>
                              <div className="grid gap-2">
                                {case_.authorizedViewers.map((viewer, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between text-sm"
                                  >
                                    <span>{viewer.name}</span>
                                    <Badge variant="outline">{viewer.role}</Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="internal">
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="border rounded-lg p-4 space-y-2"
                  >
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setExpandedContact(
                        expandedContact === contact.id ? null : contact.id
                      )}
                    >
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                      </div>
                      <Badge>{contact.role}</Badge>
                    </div>
                    
                    {expandedContact === contact.id && (
                      <div className="mt-4 space-y-4">
                        <p className="text-sm font-medium">Assigned Cases:</p>
                        {contact.cases.map((case_) => (
                          <div key={case_.id} className="bg-accent/50 rounded-lg p-3">
                            <p className="font-medium">{case_.title}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}