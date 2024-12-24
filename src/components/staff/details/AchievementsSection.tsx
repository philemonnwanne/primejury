import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X } from "lucide-react"
import { StaffMember } from "../mock-data"

interface AchievementsSectionProps {
  staffMember: StaffMember
  isEditing: boolean
  onAchievementsChange: (achievements: string[]) => void
}

export function AchievementsSection({ 
  staffMember, 
  isEditing, 
  onAchievementsChange 
}: AchievementsSectionProps) {
  const handleAddAchievement = () => {
    onAchievementsChange([...(staffMember.achievements || []), ""])
  }

  const handleRemoveAchievement = (index: number) => {
    const newAchievements = staffMember.achievements?.filter((_, i) => i !== index)
    onAchievementsChange(newAchievements || [])
  }

  const handleAchievementChange = (index: number, value: string) => {
    const newAchievements = staffMember.achievements?.map((achievement, i) => {
      if (i === index) return value
      return achievement
    })
    onAchievementsChange(newAchievements || [])
  }

  if (isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Achievements</h3>
          <Button type="button" size="sm" onClick={handleAddAchievement}>
            <Plus className="h-4 w-4 mr-2" />
            Add Achievement
          </Button>
        </div>
        <div className="space-y-2">
          {staffMember.achievements?.map((achievement, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={achievement}
                onChange={(e) => handleAchievementChange(index, e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveAchievement(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Achievements</h3>
      <div className="space-y-2">
        {staffMember.achievements?.map((achievement, index) => (
          <div key={index} className="flex items-center gap-2">
            <Badge variant="outline" className="h-2 w-2 rounded-full p-0" />
            <p>{achievement}</p>
          </div>
        ))}
      </div>
    </div>
  )
}