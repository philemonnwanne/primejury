import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface LawyerProfilesSidebarProps {
  selectedSpecializations: string[]
  onSpecializationChange: (specialization: string) => void
  successRateRange: [number, number]
  onSuccessRateChange: (value: [number, number]) => void
  selectedLanguages: string[]
  onLanguageChange: (language: string) => void
}

const specializations = [
  "Civil Litigation",
  "Corporate Law",
  "Criminal Defense",
  "Estate Planning",
  "Family Law",
  "Immigration",
  "Product Liability",
  "Tax Law",
  "White Collar Crime"
]

const languages = ["English", "Spanish", "Mandarin", "Cantonese", "French", "Portuguese"]

export function LawyerProfilesSidebar({
  selectedSpecializations,
  onSpecializationChange,
  successRateRange,
  onSuccessRateChange,
  selectedLanguages,
  onLanguageChange,
}: LawyerProfilesSidebarProps) {
  return (
    <Sidebar className="w-[240px] border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Specializations</SidebarGroupLabel>
          <SidebarGroupContent className="space-y-2">
            {specializations.map((spec) => (
              <div key={spec} className="flex items-center space-x-2">
                <Checkbox
                  id={`spec-${spec}`}
                  checked={selectedSpecializations.includes(spec)}
                  onCheckedChange={() => onSpecializationChange(spec)}
                />
                <Label htmlFor={`spec-${spec}`} className="text-sm">
                  {spec}
                </Label>
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4" />

        <SidebarGroup>
          <SidebarGroupLabel>Success Rate</SidebarGroupLabel>
          <SidebarGroupContent className="px-2 py-4">
            <Slider
              value={[successRateRange[0], successRateRange[1]]}
              onValueChange={(value) => onSuccessRateChange(value as [number, number])}
              min={0}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="mt-2 text-sm text-muted-foreground">
              {successRateRange[0]}% - {successRateRange[1]}%
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4" />

        <SidebarGroup>
          <SidebarGroupLabel>Languages</SidebarGroupLabel>
          <SidebarGroupContent className="space-y-2">
            {languages.map((lang) => (
              <div key={lang} className="flex items-center space-x-2">
                <Checkbox
                  id={`lang-${lang}`}
                  checked={selectedLanguages.includes(lang)}
                  onCheckedChange={() => onLanguageChange(lang)}
                />
                <Label htmlFor={`lang-${lang}`} className="text-sm">
                  {lang}
                </Label>
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}