import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Mail, Phone, Award, Briefcase } from "lucide-react"
import { publicLawyerProfiles } from "@/data/publicLawyerProfiles"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export function LawyerPublicProfilesList() {
  const [selectedLawyers, setSelectedLawyers] = useState<string[]>([])
  const [showComparison, setShowComparison] = useState(false)
  const navigate = useNavigate()

  const handleToggleSelect = (event: React.MouseEvent, lawyerId: string) => {
    event.stopPropagation()
    if (selectedLawyers.includes(lawyerId)) {
      setSelectedLawyers(selectedLawyers.filter(id => id !== lawyerId))
    } else if (selectedLawyers.length < 4) {
      setSelectedLawyers([...selectedLawyers, lawyerId])
    } else {
      toast.error("You can only compare up to 4 lawyers at a time")
    }
  }

  const handleCardClick = (lawyerId: string) => {
    navigate(`/lawyers/${lawyerId}`)
  }

  const selectedLawyersData = publicLawyerProfiles.filter(lawyer => 
    selectedLawyers.includes(lawyer.id)
  )

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {publicLawyerProfiles.map((lawyer) => (
          <Card 
            key={lawyer.id} 
            className="hover:shadow-lg transition-shadow relative cursor-pointer"
            onClick={() => handleCardClick(lawyer.id)}
          >
            <div className="absolute top-2 right-2 z-10">
              <Checkbox
                checked={selectedLawyers.includes(lawyer.id)}
                onCheckedChange={(checked) => {
                  const event = { stopPropagation: () => {} } as React.MouseEvent
                  handleToggleSelect(event, lawyer.id)
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={lawyer.imageUrl} alt={lawyer.name} />
                  <AvatarFallback>{lawyer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="flex items-center justify-between">
                    <span>{lawyer.name}</span>
                    <Badge variant="secondary">{lawyer.title}</Badge>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{lawyer.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{lawyer.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Award className="h-4 w-4" />
                  <span>{lawyer.yearsOfExperience} Years Experience</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>{lawyer.currentCaseload} Active Cases</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {lawyer.specialization.map((spec) => (
                    <Badge key={spec} variant="outline">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <Badge variant="secondary">Success Rate: {lawyer.successRate}%</Badge>
                {lawyer.proBono && (
                  <Badge variant="outline" className="bg-green-50">
                    Pro Bono Cases
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-6 right-6">
        <Button 
          className="px-4 py-2 shadow-lg"
          disabled={selectedLawyers.length < 2 || selectedLawyers.length > 4}
          onClick={() => setShowComparison(true)}
        >
          Compare Selected Lawyers ({selectedLawyers.length}/4)
        </Button>
      </div>

      <Dialog open={showComparison} onOpenChange={setShowComparison}>
        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle>Lawyer Comparison</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4">
            {selectedLawyersData.map((lawyer) => (
              <div key={lawyer.id} className="space-y-4">
                <div className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-2">
                    <AvatarImage src={lawyer.imageUrl} alt={lawyer.name} />
                    <AvatarFallback>{lawyer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{lawyer.name}</h3>
                  <Badge variant="secondary">{lawyer.title}</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Experience:</strong> {lawyer.yearsOfExperience} years</p>
                  <p className="text-sm"><strong>Success Rate:</strong> {lawyer.successRate}%</p>
                  <p className="text-sm"><strong>Active Cases:</strong> {lawyer.currentCaseload}</p>
                  <p className="text-sm"><strong>Pro Bono:</strong> {lawyer.proBono ? "Yes" : "No"}</p>
                  <div>
                    <strong className="text-sm">Specializations:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {lawyer.specialization.map((spec) => (
                        <Badge key={spec} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
