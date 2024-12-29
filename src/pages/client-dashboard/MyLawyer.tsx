import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { LawyerProfile } from "@/components/client-dashboard/my-lawyer/LawyerProfile"
import { LawyerCommunication } from "@/components/client-dashboard/my-lawyer/LawyerCommunication"
import { LawyerReviews } from "@/components/client-dashboard/my-lawyer/LawyerReviews"
import { LawyerReferral } from "@/components/client-dashboard/my-lawyer/LawyerReferral"
import { LawyerList } from "@/components/client-dashboard/my-lawyer/LawyerList"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { LawyerCalendar } from "@/components/client-dashboard/my-lawyer/LawyerCalendar"
import { Toggle } from "@/components/ui/toggle"

export default function MyLawyer() {
  const [selectedLawyerId, setSelectedLawyerId] = useState<string | null>(null)
  const [showCurrentOnly, setShowCurrentOnly] = useState(true)

  return (
    <ClientDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Lawyer</h1>
          <p className="text-muted-foreground">
            Manage your legal representation and communication
          </p>
        </div>

        {!selectedLawyerId ? (
          <div className="space-y-4">
            <div className="flex justify-end">
              <Toggle 
                pressed={showCurrentOnly}
                onPressedChange={setShowCurrentOnly}
                className="data-[state=on]:bg-primary"
              >
                {showCurrentOnly ? "Current Lawyer" : "All Lawyers"}
              </Toggle>
            </div>
            <LawyerList 
              showCurrentOnly={showCurrentOnly}
              onSelectLawyer={(id) => setSelectedLawyerId(id)}
            />
          </div>
        ) : (
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="referral">Referral</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <LawyerProfile 
                lawyerId={selectedLawyerId}
                onBack={() => setSelectedLawyerId(null)}
              />
            </TabsContent>

            <TabsContent value="communication" className="space-y-4">
              <LawyerCommunication />
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <LawyerCalendar lawyerId={selectedLawyerId} />
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <LawyerReviews lawyerId={selectedLawyerId} />
            </TabsContent>

            <TabsContent value="referral" className="space-y-4">
              <LawyerReferral />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </ClientDashboardLayout>
  )
}