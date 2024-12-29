import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { LawyerProfile } from "@/components/client-dashboard/my-lawyer/LawyerProfile"
import { LawyerCommunication } from "@/components/client-dashboard/my-lawyer/LawyerCommunication"
import { LawyerReviews } from "@/components/client-dashboard/my-lawyer/LawyerReviews"
import { LawyerReferral } from "@/components/client-dashboard/my-lawyer/LawyerReferral"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MyLawyer() {
  return (
    <ClientDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Lawyer</h1>
          <p className="text-muted-foreground">
            Manage your legal representation and communication
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="referral">Referral</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <LawyerProfile />
          </TabsContent>

          <TabsContent value="communication" className="space-y-4">
            <LawyerCommunication />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <LawyerReviews />
          </TabsContent>

          <TabsContent value="referral" className="space-y-4">
            <LawyerReferral />
          </TabsContent>
        </Tabs>
      </div>
    </ClientDashboardLayout>
  )
}