import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface SettlementOffer {
  id: string
  amount: string
  status: string
  date: string
}

interface SettlementOffersProps {
  offers: SettlementOffer[]
}

export function SettlementOffers({ offers: initialOffers }: SettlementOffersProps) {
  const [offers, setOffers] = useState(initialOffers)
  const { toast } = useToast()

  const handleAcceptOffer = (id: string) => {
    setOffers(offers.map(offer => 
      offer.id === id ? { ...offer, status: "accepted" } : offer
    ))
    toast({
      title: "Offer Accepted",
      description: "The settlement offer has been accepted successfully.",
    })
  }

  const handleDeclineOffer = (id: string) => {
    setOffers(offers.map(offer => 
      offer.id === id ? { ...offer, status: "rejected" } : offer
    ))
    toast({
      title: "Offer Declined",
      description: "The settlement offer has been declined.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settlement Offers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="space-y-1">
              <p className="font-medium">{offer.amount}</p>
              <p className="text-sm text-muted-foreground">
                Offered on {offer.date}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge
                variant={
                  offer.status === "accepted"
                    ? "default"
                    : offer.status === "rejected"
                    ? "destructive"
                    : "secondary"
                }
              >
                {offer.status}
              </Badge>
              {offer.status === "pending" && (
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleAcceptOffer(offer.id)}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Accept
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeclineOffer(offer.id)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Decline
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        {offers.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            No settlement offers yet
          </p>
        )}
      </CardContent>
    </Card>
  )
}