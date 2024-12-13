import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { Briefcase, MapPin, Award, Scale, GraduationCap } from "lucide-react"

interface MarketplaceProfile {
  id: string
  name: string
  title: string
  specializations: string[]
  locations: string[]
  yearsOfExperience: number
  education: {
    degree: string
    institution: string
    year: number
  }[]
  certifications: string[]
  proBono: boolean
  imageUrl?: string
}

export function LawyerMarketplaceProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<MarketplaceProfile>({
    id: "1",
    name: "Sarah Parker",
    title: "Senior Partner",
    specializations: ["Civil Litigation", "Corporate Law"],
    locations: ["Sacramento, CA", "San Francisco, CA"],
    yearsOfExperience: 15,
    education: [
      {
        degree: "Juris Doctor",
        institution: "Harvard Law School",
        year: 2008
      }
    ],
    certifications: ["California State Bar", "Certified Mediator"],
    proBono: true
  })

  const handleProfileUpdate = (updatedProfile: Partial<MarketplaceProfile>) => {
    setProfile({ ...profile, ...updatedProfile })
    toast.success("Profile updated successfully")
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Marketplace Profile</CardTitle>
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.imageUrl} alt={profile.name} />
              <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{profile.name}</h3>
              <p className="text-muted-foreground">{profile.title}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Experience</span>
              </div>
              <p>{profile.yearsOfExperience} years</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Practice Locations</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.locations.map((location) => (
                  <Badge key={location} variant="secondary">
                    {location}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Specializations</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.specializations.map((spec) => (
                <Badge key={spec} variant="outline">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Education</span>
            </div>
            {profile.education.map((edu, index) => (
              <div key={index} className="space-y-1">
                <p className="font-medium">{edu.degree}</p>
                <p className="text-sm text-muted-foreground">
                  {edu.institution}, {edu.year}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Certifications</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.certifications.map((cert) => (
                <Badge key={cert} variant="secondary">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>

          {profile.proBono && (
            <Badge className="bg-green-100 text-green-800">
              Takes Pro Bono Cases
            </Badge>
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[600px]">
            <div className="space-y-6 p-4">
              <div className="space-y-2">
                <label className="font-medium">Name</label>
                <Input
                  value={profile.name}
                  onChange={(e) => handleProfileUpdate({ name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="font-medium">Title</label>
                <Input
                  value={profile.title}
                  onChange={(e) => handleProfileUpdate({ title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="font-medium">Years of Experience</label>
                <Input
                  type="number"
                  value={profile.yearsOfExperience}
                  onChange={(e) => handleProfileUpdate({ yearsOfExperience: parseInt(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <label className="font-medium">Specializations (comma-separated)</label>
                <Textarea
                  value={profile.specializations.join(", ")}
                  onChange={(e) => handleProfileUpdate({ 
                    specializations: e.target.value.split(",").map(s => s.trim()) 
                  })}
                />
              </div>

              <div className="space-y-2">
                <label className="font-medium">Practice Locations (comma-separated)</label>
                <Textarea
                  value={profile.locations.join(", ")}
                  onChange={(e) => handleProfileUpdate({ 
                    locations: e.target.value.split(",").map(s => s.trim()) 
                  })}
                />
              </div>

              <Button onClick={() => setIsEditing(false)} className="w-full">
                Save Changes
              </Button>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}