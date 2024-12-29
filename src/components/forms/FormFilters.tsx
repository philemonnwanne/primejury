import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"

interface FormFiltersProps {
  onSearch: (value: string) => void
  onCategoryChange: (value: string) => void
  onLanguageChange: (value: string) => void
}

export function FormFilters({ onSearch, onCategoryChange, onLanguageChange }: FormFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search forms..."
          className="pl-10"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Select onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="civil">Civil</SelectItem>
            <SelectItem value="criminal">Criminal</SelectItem>
            <SelectItem value="family">Family</SelectItem>
            <SelectItem value="business">Business</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={onLanguageChange}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="spanish">Spanish</SelectItem>
            <SelectItem value="french">French</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}