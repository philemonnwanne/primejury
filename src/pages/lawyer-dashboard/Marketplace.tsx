import { LawyerDashboardLayout } from "@/layouts/LawyerDashboardLayout"
import { MarketplaceCaseList } from "@/components/marketplace/MarketplaceCaseList"
import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters"

export default function LawyerMarketplace() {
  return (
    <LawyerDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Case Marketplace</h1>
        </div>
        <MarketplaceFilters />
        <MarketplaceCaseList />
      </div>
    </LawyerDashboardLayout>
  )
}