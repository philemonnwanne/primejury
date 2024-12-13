import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export function MarketplaceFilters() {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search cases..." className="pl-8" />
      </div>
      <Select>
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Case Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="civil">Civil</SelectItem>
          <SelectItem value="criminal">Criminal</SelectItem>
          <SelectItem value="family">Family</SelectItem>
          <SelectItem value="corporate">Corporate</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ca">California</SelectItem>
          <SelectItem value="ny">New York</SelectItem>
          <SelectItem value="tx">Texas</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Pro Bono" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Cases</SelectItem>
          <SelectItem value="pro-bono">Pro Bono Only</SelectItem>
          <SelectItem value="paid">Paid Only</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}