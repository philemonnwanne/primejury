import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
  const [newOffer, setNewOffer] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const { toast } = useToast()

  const handleAddOffer = () => {
    if (!newOffer) {
      toast({
        title: "Error",
        description: "Please enter a settlement amount",
        variant: "destructive",
      })
      return
    }

    const offer = {
      id: `${Date.now()}`,
      amount: newOffer,
      status: "pending",
      date: new Date().toISOString().split('T')[0],
    }

    setOffers([offer, ...offers])
    setNewOffer("")
    setShowAddDialog(false)
    
    toast({
      title: "Settlement Offer Added",
      description: "The new settlement offer has been added successfully.",
    })
  }

  const handleRemoveOffer = (id: string) => {
    setOffers(offers.filter(offer => offer.id !== id))
    toast({
      title: "Settlement Offer Removed",
      description: "The settlement offer has been removed successfully.",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Settlement Offers</CardTitle>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Offer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Settlement Offer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Settlement Amount</label>
                <Input
                  placeholder="Enter amount (e.g. $50,000)"
                  value={newOffer}
                  onChange={(e) => setNewOffer(e.target.value)}
                />
              </div>
              <Button onClick={handleAddOffer} className="w-full">
                Add Offer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveOffer(offer.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
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