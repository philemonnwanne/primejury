import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { MarketplaceStats } from "@/components/marketplace/MarketplaceStats"
import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters"
import { LawyerMarketplaceProfile } from "@/components/marketplace/LawyerMarketplaceProfile"
import { AvailableCasesList } from "@/components/marketplace/AvailableCasesList"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"

export default function LawyerMarketplace() {
  const [activeTab, setActiveTab] = useState("cases")

  useEffect(() => {
    const handleShowPendingBids = () => {
      document.dispatchEvent(new CustomEvent('marketplace-show-pending-bids'));
    };

    document.addEventListener('show-pending-bids', handleShowPendingBids);

    return () => {
      document.removeEventListener('show-pending-bids', handleShowPendingBids);
    };
  }, []);

  return (
    <LawyerDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Case Marketplace</h1>
        </div>

        <MarketplaceStats />

        <Tabs defaultValue="cases" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="cases">Available Cases</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cases" className="space-y-6">
            <MarketplaceFilters />
            <AvailableCasesList />
          </TabsContent>
          
          <TabsContent value="profile">
            <LawyerMarketplaceProfile />
          </TabsContent>
        </Tabs>
      </div>
    </LawyerDashboardLayout>
  )
}