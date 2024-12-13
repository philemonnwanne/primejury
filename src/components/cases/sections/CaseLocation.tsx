import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, Building2, Phone } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface LocationProps {
  location: {
    city: string
    state: string
    county: string
    courthouse: {
      name: string
      address: string
      phone: string
    }
  }
}

export function CaseLocation({ location: initialLocation }: LocationProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [location, setLocation] = useState(initialLocation)
  const { toast } = useToast()

  const handleSave = () => {
    // In a real app, this would make an API call
    toast({
      title: "Location Updated",
      description: "Case location details have been updated successfully.",
    })
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Case Location</CardTitle>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit Location
          </Button>
        ) : (
          <Button onClick={handleSave}>Save Changes</Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">City</label>
            {isEditing ? (
              <Input
                value={location.city}
                onChange={(e) =>
                  setLocation({ ...location, city: e.target.value })
                }
              />
            ) : (
              <p className="text-sm text-muted-foreground">{location.city}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">State</label>
            {isEditing ? (
              <Input
                value={location.state}
                onChange={(e) =>
                  setLocation({ ...location, state: e.target.value })
                }
              />
            ) : (
              <p className="text-sm text-muted-foreground">{location.state}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">County</label>
            {isEditing ? (
              <Input
                value={location.county}
                onChange={(e) =>
                  setLocation({ ...location, county: e.target.value })
                }
              />
            ) : (
              <p className="text-sm text-muted-foreground">{location.county}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Courthouse Information</h4>
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Building2 className="h-4 w-4 text-muted-foreground mt-1" />
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">Name</label>
                {isEditing ? (
                  <Input
                    value={location.courthouse.name}
                    onChange={(e) =>
                      setLocation({
                        ...location,
                        courthouse: {
                          ...location.courthouse,
                          name: e.target.value,
                        },
                      })
                    }
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {location.courthouse.name}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">Address</label>
                {isEditing ? (
                  <Input
                    value={location.courthouse.address}
                    onChange={(e) =>
                      setLocation({
                        ...location,
                        courthouse: {
                          ...location.courthouse,
                          address: e.target.value,
                        },
                      })
                    }
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {location.courthouse.address}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground mt-1" />
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">Phone</label>
                {isEditing ? (
                  <Input
                    value={location.courthouse.phone}
                    onChange={(e) =>
                      setLocation({
                        ...location,
                        courthouse: {
                          ...location.courthouse,
                          phone: e.target.value,
                        },
                      })
                    }
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {location.courthouse.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}