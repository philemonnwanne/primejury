import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Building2, Phone } from "lucide-react"

interface CaseLocationProps {
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

export function CaseLocation({ location }: CaseLocationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Location</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">
              {location.city}, {location.state}
            </p>
            <p className="text-sm text-muted-foreground">
              {location.county} County
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="font-medium">{location.courthouse.name}</p>
            <p className="text-sm text-muted-foreground">{location.courthouse.address}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">{location.courthouse.phone}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}