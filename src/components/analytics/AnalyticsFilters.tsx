import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AnalyticsFilters() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-wrap gap-4">
          <div className="w-[180px]">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="year">Past Year</SelectItem>
                <SelectItem value="quarter">Past Quarter</SelectItem>
                <SelectItem value="month">Past Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-[180px]">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Case Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="criminal">Criminal</SelectItem>
                <SelectItem value="civil">Civil</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-[180px]">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Lawyer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Lawyers</SelectItem>
                <SelectItem value="sarah">Sarah Parker</SelectItem>
                <SelectItem value="john">John Davis</SelectItem>
                <SelectItem value="emma">Emma Roberts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}