import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { StaffMember } from "./mock-data"
import { X, Edit2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DemographicsSection } from "./details/DemographicsSection"
import { EducationSection } from "./details/EducationSection"
import { AchievementsSection } from "./details/AchievementsSection"

interface StaffMemberDetailsProps {
  staffMember: StaffMember
}

export function StaffMemberDetails({ staffMember: initialStaffMember }: StaffMemberDetailsProps) {
  const { toast } = useToast()
  const [staffMember, setStaffMember] = useState(initialStaffMember)
  const [permissions, setPermissions] = useState(staffMember.permissions || [])
  const [assignedCases, setAssignedCases] = useState(staffMember.assignedCases || [])
  const [assignedTasks, setAssignedTasks] = useState(staffMember.assignedTasks || [])
  const [isEditing, setIsEditing] = useState(false)

  const handleFieldChange = (field: string, value: string) => {
    setStaffMember(prev => ({ ...prev, [field]: value }))
  }

  const handleEducationChange = (education: StaffMember['education']) => {
    setStaffMember(prev => ({ ...prev, education }))
  }

  const handleAchievementsChange = (achievements: string[]) => {
    setStaffMember(prev => ({ ...prev, achievements }))
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

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Changes Saved",
      description: "Staff member details have been updated successfully.",
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

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Staff Member Information</CardTitle>
                {isEditing ? (
                  <Button onClick={handleSave}>Save Changes</Button>
                ) : (
                  <Button variant="outline" size="icon" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-6">
                  <DemographicsSection
                    staffMember={staffMember}
                    isEditing={isEditing}
                    onFieldChange={handleFieldChange}
                  />

                  <Separator />

                  <EducationSection
                    staffMember={staffMember}
                    isEditing={isEditing}
                    onEducationChange={handleEducationChange}
                  />

                  <Separator />

                  <AchievementsSection
                    staffMember={staffMember}
                    isEditing={isEditing}
                    onAchievementsChange={handleAchievementsChange}
                  />

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Performance Overview</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Active Cases</p>
                        <p className="font-medium">{staffMember.activeCases}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Completed Cases</p>
                        <p className="font-medium">{staffMember.completedCases}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Pending Tasks</p>
                        <p className="font-medium">{staffMember.pendingTasks}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
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
      </Tabs>
    </div>
  )
}
