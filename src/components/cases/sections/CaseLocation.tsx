import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Building2, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  const getMapUrl = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    // Check if user is on iOS for Apple Maps
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    return isIOS
      ? `maps://maps.apple.com/?q=${encodedAddress}`
      : `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Location</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-2">
          <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
          <div>
            <p className="text-sm text-muted-foreground">
              {location.city}, {location.state}
            </p>
            <p className="text-sm text-muted-foreground">
              {location.county} County
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <Building2 className="h-4 w-4 text-muted-foreground mt-1" />
          <div className="flex-1">
            <p className="font-medium">{location.courthouse.name}</p>
            <Button
              variant="link"
              className="h-auto p-0 text-sm text-primary hover:underline break-words whitespace-normal text-left"
              onClick={() => window.open(getMapUrl(location.courthouse.address), '_blank')}
            >
              {location.courthouse.address}
            </Button>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <Phone className="h-4 w-4 text-muted-foreground mt-1" />
          <div>
            <p className="text-sm text-muted-foreground">{location.courthouse.phone}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}