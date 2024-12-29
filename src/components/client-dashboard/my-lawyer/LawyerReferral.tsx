import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { toast } from "sonner"

export function LawyerReferral() {
  const [referralEmail, setReferralEmail] = useState("")
  const [referralMessage, setReferralMessage] = useState("")

  const handleSendReferral = () => {
    if (!referralEmail) {
      toast.error("Please enter an email address")
      return
    }
    
    toast.success("Referral sent successfully")
    setReferralEmail("")
    setReferralMessage("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Refer a Friend</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Friend's Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="friend@example.com"
            value={referralEmail}
            onChange={(e) => setReferralEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Personal Message (Optional)
          </label>
          <Textarea
            id="message"
            placeholder="Write a personal message..."
            value={referralMessage}
            onChange={(e) => setReferralMessage(e.target.value)}
          />
        </div>

        <Button onClick={handleSendReferral} className="w-full">
          Send Referral
        </Button>
      </CardContent>
    </Card>
  )
}