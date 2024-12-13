import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { MarketplaceCaseList } from "@/components/marketplace/MarketplaceCaseList"
import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters"
import { LawyerMarketplaceProfile } from "@/components/marketplace/LawyerMarketplaceProfile"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LawyerMarketplace() {
  return (
    <LawyerDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Case Marketplace</h1>
        </div>

        <Tabs defaultValue="cases">
          <TabsList>
            <TabsTrigger value="cases">Available Cases</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cases" className="space-y-6">
            <MarketplaceFilters />
            <MarketplaceCaseList />
          </TabsContent>
          
          <TabsContent value="profile">
            <LawyerMarketplaceProfile />
          </TabsContent>
        </Tabs>
      </div>
    </LawyerDashboardLayout>
  )
}