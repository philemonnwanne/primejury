import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { StaffMember } from "./mock-data"
import { DemographicsSection } from "./details/DemographicsSection"
import { EducationSection } from "./details/EducationSection"
import { AchievementsSection } from "./details/AchievementsSection"

interface StaffMemberDetailsProps {
  staffMember: StaffMember
}

export function StaffMemberDetails({ staffMember }: StaffMemberDetailsProps) {
  const { toast } = useToast()
  const [permissions, setPermissions] = useState(staffMember.permissions || [])
  const [assignedCases, setAssignedCases] = useState(staffMember.assignedCases || [])
  const [assignedTasks, setAssignedTasks] = useState(staffMember.assignedTasks || [])
  const [localStaffMember, setLocalStaffMember] = useState(staffMember)

  const handleDemographicsUpdate = (field: string, value: string) => {
    setLocalStaffMember(prev => ({ ...prev, [field]: value }))
    toast({
      title: "Details Updated",
      description: "Staff member details have been updated.",
    })
  }

  const handleEducationUpdate = (education: Array<{ degree: string; institution: string; year: number }>) => {
    setLocalStaffMember(prev => ({ ...prev, education }))
    toast({
      title: "Education Updated",
      description: "Staff member education has been updated.",
    })
  }

  const handleAchievementsUpdate = (achievements: string[]) => {
    setLocalStaffMember(prev => ({ ...prev, achievements }))
    toast({
      title: "Achievements Updated",
      description: "Staff member achievements have been updated.",
    })
  }

  const handlePermissionChange = (permissionId: string) => {
    setPermissions(prev => 
      prev.map(p => 
        p.id === permissionId ? { ...p, granted: !p.granted } : p
      )
    )
    toast({
      title: "Permission Updated",
      description: "Staff member permissions have been updated.",
    })
  }

  const handleUnassignCase = (caseId: string) => {
    setAssignedCases(prev => prev.filter(c => c.id !== caseId))
    toast({
      title: "Case Unassigned",
      description: "The case has been unassigned from the staff member.",
    })
  }

  const handleUnassignTask = (taskId: string) => {
    setAssignedTasks(prev => prev.filter(t => t.id !== taskId))
    toast({
      title: "Task Unassigned",
      description: "The task has been unassigned from the staff member.",
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="cases">Assigned Cases</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[600px]">
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Staff Member Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <DemographicsSection
                  staffMember={localStaffMember}
                  onUpdate={handleDemographicsUpdate}
                />
                <EducationSection
                  staffMember={localStaffMember}
                  onUpdate={handleEducationUpdate}
                />
                <AchievementsSection
                  staffMember={localStaffMember}
                  onUpdate={handleAchievementsUpdate}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cases">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignedCases.map(case_ => (
                    <div key={case_.id} className="relative flex items-center justify-between p-4 border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background shadow-sm hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => handleUnassignCase(case_.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div>
                        <p className="font-medium">{case_.title}</p>
                        <p className="text-sm text-muted-foreground">Status: {case_.status}</p>
                      </div>
                      <Button variant="outline" size="sm">View Case</Button>
                    </div>
                  ))}
                  <Button className="w-full">Assign New Case</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignedTasks.map(task => (
                    <div key={task.id} className="relative flex items-center justify-between p-4 border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background shadow-sm hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => handleUnassignTask(task.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{task.priority}</Badge>
                          <Badge variant="outline">{task.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Due: {task.dueDate}</p>
                      </div>
                      <Button variant="outline" size="sm">View Task</Button>
                    </div>
                  ))}
                  <Button className="w-full">Assign New Task</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle>Role & Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {permissions.map(permission => (
                    <div key={permission.id} className="flex items-center justify-between">
                      <Label htmlFor={permission.id}>{permission.name}</Label>
                      <Switch
                        id={permission.id}
                        checked={permission.granted}
                        onCheckedChange={() => handlePermissionChange(permission.id)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}