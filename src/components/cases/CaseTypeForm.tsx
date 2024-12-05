import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

type CaseType = "criminal" | "civil" | "immigration" | "corporate" | "complex_litigation" | "education" | "family"

interface FormStep {
  question: string
  options: { value: string; label: string }[]
}

const caseTypeQuestions: Record<CaseType, FormStep[]> = {
  criminal: [
    {
      question: "Severity",
      options: [
        { value: "felony", label: "Felony" },
        { value: "misdemeanor", label: "Misdemeanor" },
      ],
    },
    {
      question: "State",
      options: [
        { value: "CA", label: "California" },
        { value: "NY", label: "New York" },
        { value: "TX", label: "Texas" },
        // Add more states as needed
      ],
    },
    {
      question: "First Time Offender",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      question: "Criminal Record",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
  ],
  civil: [
    {
      question: "Civil Case Type",
      options: [
        { value: "contract", label: "Contract Dispute" },
        { value: "property", label: "Property Dispute" },
        { value: "personal_injury", label: "Personal Injury" },
      ],
    },
    {
      question: "State",
      options: [
        { value: "CA", label: "California" },
        { value: "NY", label: "New York" },
        { value: "TX", label: "Texas" },
      ],
    },
    {
      question: "Claim Amount",
      options: [
        { value: "small", label: "Under $10,000" },
        { value: "medium", label: "10,000 - $50,000" },
        { value: "large", label: "Over $50,000" },
      ],
    },
  ],
  immigration: [
    {
      question: "Visa Type",
      options: [
        { value: "family", label: "Family-Based" },
        { value: "employment", label: "Employment-Based" },
        { value: "asylum", label: "Asylum" },
      ],
    },
    {
      question: "Current Status",
      options: [
        { value: "in_country", label: "Currently in US" },
        { value: "abroad", label: "Outside US" },
      ],
    },
  ],
  corporate: [
    {
      question: "Business Type",
      options: [
        { value: "startup", label: "Startup" },
        { value: "small_business", label: "Small Business" },
        { value: "enterprise", label: "Enterprise" },
      ],
    },
    {
      question: "Legal Need",
      options: [
        { value: "formation", label: "Business Formation" },
        { value: "contracts", label: "Contract Review" },
        { value: "compliance", label: "Regulatory Compliance" },
      ],
    },
  ],
  complex_litigation: [
    {
      question: "Case Complexity",
      options: [
        { value: "multi_party", label: "Multi-Party" },
        { value: "class_action", label: "Class Action" },
        { value: "international", label: "International" },
      ],
    },
    {
      question: "Industry",
      options: [
        { value: "tech", label: "Technology" },
        { value: "finance", label: "Finance" },
        { value: "healthcare", label: "Healthcare" },
      ],
    },
  ],
  education: [
    {
      question: "Education Level",
      options: [
        { value: "k12", label: "K-12" },
        { value: "higher_ed", label: "Higher Education" },
        { value: "special_ed", label: "Special Education" },
      ],
    },
    {
      question: "Issue Type",
      options: [
        { value: "discrimination", label: "Discrimination" },
        { value: "discipline", label: "Discipline" },
        { value: "accommodations", label: "Accommodations" },
      ],
    },
  ],
  family: [
    {
      question: "Case Type",
      options: [
        { value: "divorce", label: "Divorce" },
        { value: "custody", label: "Child Custody" },
        { value: "support", label: "Child Support" },
      ],
    },
    {
      question: "State",
      options: [
        { value: "CA", label: "California" },
        { value: "NY", label: "New York" },
        { value: "TX", label: "Texas" },
      ],
    },
    {
      question: "Children Involved",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
  ],
}

export function CaseTypeForm() {
  const navigate = useNavigate()
  const [caseType, setCaseType] = useState<CaseType | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState(0)

  const handleSelect = (value: string, question: string) => {
    const newAnswers = { ...answers, [question]: value }
    setAnswers(newAnswers)

    if (question === "Case Type") {
      setCaseType(value as CaseType)
      setCurrentStep(1)
    } else {
      const questions = caseType ? caseTypeQuestions[caseType] : []
      const isLastQuestion = currentStep === questions.length
      
      if (isLastQuestion) {
        // Redirect to lawyer marketplace with filters
        navigate(`/lawyer-marketplace?state=${answers["State"] || ""}&caseType=${caseType || ""}`)
      } else {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const questions = caseType ? caseTypeQuestions[caseType] : []
  const totalSteps = questions.length + 1 // +1 for initial case type selection
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="space-y-6">
      <Progress value={progress} className="w-full" />
      
      <div className="flex gap-4">
        <Select onValueChange={(value) => handleSelect(value, "Case Type")}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Case Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="criminal">Criminal Law</SelectItem>
            <SelectItem value="civil">Civil Law</SelectItem>
            <SelectItem value="immigration">Immigration Law</SelectItem>
            <SelectItem value="corporate">Corporate Law</SelectItem>
            <SelectItem value="complex_litigation">Complex Litigation</SelectItem>
            <SelectItem value="education">Education Law</SelectItem>
            <SelectItem value="family">Family Law</SelectItem>
          </SelectContent>
        </Select>

        {caseType && questions.map((step, index) => (
          currentStep > index && (
            <Select
              key={step.question}
              onValueChange={(value) => handleSelect(value, step.question)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={step.question} />
              </SelectTrigger>
              <SelectContent>
                {step.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        ))}
      </div>
    </div>
  )
}