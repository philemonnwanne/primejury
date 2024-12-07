import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostCaseDialog } from "@/components/case-bids/PostCaseDialog"
import { CaseBidsList } from "@/components/case-bids/CaseBidsList"
import { ActiveBidsTable } from "@/components/case-bids/ActiveBidsTable"

export default function CaseBids() {
  return (
    <ClientDashboardLayout>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Case Bids</h1>
          <PostCaseDialog />
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList>
            <TabsTrigger value="active">Active Cases</TabsTrigger>
            <TabsTrigger value="received">Received Bids</TabsTrigger>
            <TabsTrigger value="history">Bid History</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <CaseBidsList />
          </TabsContent>

          <TabsContent value="received" className="space-y-4">
            <ActiveBidsTable />
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Past Bids</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No past bids to display.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClientDashboardLayout>
  )
}