import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Mail, Phone, Gavel } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface Lawyer {
  name: string
  email: string
  phone: string
  id: string
}

interface LegalRepresentativesProps {
  lawyer: Lawyer
  judge: string
}

export function LegalRepresentatives({ 
  lawyer: initialLawyer,
  judge: initialJudge 
}: LegalRepresentativesProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [lawyer, setLawyer] = useState(initialLawyer)
  const [judge, setJudge] = useState(initialJudge)
  const { toast } = useToast()

  const handleSave = () => {
    // In a real app, this would make an API call
    toast({
      title: "Representatives Updated",
      description: "Legal representatives have been updated successfully.",
    })
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Legal Representatives</CardTitle>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit Representatives
          </Button>
        ) : (
          <Button onClick={handleSave}>Save Changes</Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Assigned Lawyer</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Name</p>
                {isEditing ? (
                  <Input
                    value={lawyer.name}
                    onChange={(e) =>
                      setLawyer({ ...lawyer, name: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{lawyer.name}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Email</p>
                {isEditing ? (
                  <Input
                    value={lawyer.email}
                    onChange={(e) =>
                      setLawyer({ ...lawyer, email: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{lawyer.email}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Phone</p>
                {isEditing ? (
                  <Input
                    value={lawyer.phone}
                    onChange={(e) =>
                      setLawyer({ ...lawyer, phone: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{lawyer.phone}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Presiding Judge</h4>
          <div className="flex items-center space-x-2">
            <Gavel className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              {isEditing ? (
                <Input
                  value={judge}
                  onChange={(e) => setJudge(e.target.value)}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{judge}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}