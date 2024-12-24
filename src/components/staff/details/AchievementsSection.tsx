import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Pencil, Check, Plus, X } from "lucide-react"
import { StaffMember } from "../mock-data"

interface AchievementsSectionProps {
  staffMember: StaffMember
  onUpdate: (achievements: string[]) => void
}

export function AchievementsSection({ staffMember, onUpdate }: AchievementsSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [achievements, setAchievements] = useState(staffMember.achievements || [])
  const [newAchievement, setNewAchievement] = useState("")

  const handleAdd = () => {
    if (newAchievement.trim()) {
      setAchievements([...achievements, newAchievement.trim()])
      setNewAchievement("")
    }
  }

  const handleRemove = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    onUpdate(achievements)
    setIsEditing(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Achievements</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
        </Button>
      </div>
      <div className="space-y-2">
        {isEditing && (
          <div className="flex gap-2">
            <Input
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              placeholder="Add new achievement"
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleAdd}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-center gap-2">
            {isEditing ? (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => handleRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            ) : (
              <Badge variant="outline" className="h-2 w-2 rounded-full p-0" />
            )}
            <p>{achievement}</p>
          </div>
        ))}
      </div>
    </div>
  )
}