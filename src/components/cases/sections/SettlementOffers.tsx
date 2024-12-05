import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
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

export function SettlementOffers({ offers }: SettlementOffersProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState<{ id: string; amount: string; action: 'accept' | 'reject' } | null>(null)
  const { toast } = useToast()

  const handleSettlementAction = (offerId: string, amount: string, action: 'accept' | 'reject') => {
    setSelectedOffer({ id: offerId, amount, action })
    setShowConfirmDialog(true)
  }

  const handleConfirmAction = () => {
    if (!selectedOffer) return

    toast({
      title: `Settlement Offer ${selectedOffer.action}ed`,
      description: `You have ${selectedOffer.action}ed the settlement offer of ${selectedOffer.amount}`,
    })

    setShowConfirmDialog(false)
    setSelectedOffer(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settlement Offers</CardTitle>
        <CardDescription>Review and manage settlement offers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="flex flex-col rounded-lg border p-4 space-y-4"
          >
            <div className="flex items-center space-x-4">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{offer.amount}</p>
                <p className="text-sm text-muted-foreground">
                  Offered on {offer.date}
                </p>
              </div>
            </div>
            {offer.status === "pending" && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleSettlementAction(offer.id, offer.amount, "accept")
                  }
                  className="flex-1 text-green-600 hover:text-green-700"
                >
                  Accept
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleSettlementAction(offer.id, offer.amount, "reject")
                  }
                  className="flex-1 text-red-600 hover:text-red-700"
                >
                  Decline
                </Button>
              </div>
            )}
            {offer.status !== "pending" && (
              <Badge
                variant={offer.status === "accepted" ? "default" : "secondary"}
              >
                {offer.status}
              </Badge>
            )}
          </div>
        ))}
      </CardContent>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Confirm {selectedOffer?.action} Settlement Offer
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {selectedOffer?.action} the settlement offer of {selectedOffer?.amount}? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAction}>
              Confirm {selectedOffer?.action}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}