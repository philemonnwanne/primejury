import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, Banknote } from "lucide-react"
import { PaymentMethod } from "./types"
import { useToast } from "@/hooks/use-toast"

interface PaymentMethodsListProps {
  paymentMethods: PaymentMethod[]
}

export function PaymentMethodsList({ paymentMethods }: PaymentMethodsListProps) {
  const { toast } = useToast()

  const handleRemovePaymentMethod = (id: string) => {
    toast({
      title: "Payment method removed",
      description: "The payment method has been removed successfully.",
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {paymentMethods.map((method) => (
        <Card key={method.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {method.type === "credit_card" ? "Credit Card" : "Bank Account"}
            </CardTitle>
            {method.isDefault && (
              <Badge variant="secondary">Default</Badge>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {method.type === "credit_card" ? (
                  <>
                    <CreditCard className="h-4 w-4" />
                    <div>
                      <p>****{method.last4}</p>
                      <p className="text-sm text-muted-foreground">
                        Expires: {method.expiryDate}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Banknote className="h-4 w-4" />
                    <div>
                      <p>{method.bankName}</p>
                      <p className="text-sm text-muted-foreground">
                        ****{method.last4}
                      </p>
                    </div>
                  </>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemovePaymentMethod(method.id)}
              >
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}