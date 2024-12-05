import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CaseTypeSelect } from "./CaseTypeSelect"
import { Textarea } from "@/components/ui/textarea"
import { caseTypeQuestions, type CaseType } from "./questions/caseTypeQuestions"

export function CaseTypeForm() {
  const navigate = useNavigate()
  const [findLawyerType, setFindLawyerType] = useState<string | null>(null)
  const [caseType, setCaseType] = useState<CaseType | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [caseDetails, setCaseDetails] = useState("")

  const handleSelect = (value: string, question: string) => {
    const newAnswers = { ...answers, [question]: value }
    setAnswers(newAnswers)

    if (question === "Find Lawyer Type") {
      setFindLawyerType(value)
      setCurrentStep(1)
    } else if (question === "Case Type") {
      setCaseType(value as CaseType)
      setCurrentStep(2)
    } else {
      const questions = caseType ? caseTypeQuestions[caseType] : []
      const isLastQuestion = currentStep === questions.length + 1

      if (isLastQuestion) {
        if (findLawyerType === "self") {
          navigate(`/lawyers?state=${answers["State"] || ""}&caseType=${caseType || ""}`)
        } else {
          setCurrentStep(currentStep + 1)
        }
      } else {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handleSubmit = () => {
    // Store case with pending status and details
    const caseData = {
      ...answers,
      caseType,
      status: "pending_review",
      details: caseDetails,
    }
    console.log("Submitting case for lawyer review:", caseData)
    // Here you would typically make an API call to store the case
    navigate("/client-dashboard/cases")
  }

  const initialFindLawyerOptions = [
    { value: "self", label: "I want to find a lawyer myself" },
    { value: "review", label: "I want lawyers to review my case" },
  ]

  const initialCaseTypeOptions = [
    { value: "criminal", label: "Criminal Law" },
    { value: "civil", label: "Civil Law" },
    { value: "immigration", label: "Immigration Law" },
    { value: "corporate", label: "Corporate Law" },
    { value: "complex_litigation", label: "Complex Litigation" },
    { value: "education", label: "Education Law" },
    { value: "family", label: "Family Law" },
  ]

  const questions = caseType ? caseTypeQuestions[caseType] : []
  const totalSteps = questions.length + (findLawyerType === "review" ? 3 : 2)
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="space-y-6">
      <div className="w-full px-4">
        <Progress value={progress} className="w-full" />
      </div>
      
      <div className="flex gap-4 flex-wrap items-start px-4">
        <div className="flex-none">
          {currentStep === 0 && (
            <CaseTypeSelect
              question="Find Lawyer Type"
              options={initialFindLawyerOptions}
              onValueChange={(value) => handleSelect(value, "Find Lawyer Type")}
            />
          )}
        </div>

        {findLawyerType && currentStep >= 1 && (
          <div className="flex-none">
            <CaseTypeSelect
              question="Case Type"
              options={initialCaseTypeOptions}
              onValueChange={(value) => handleSelect(value, "Case Type")}
            />
          </div>
        )}

        {caseType && questions.map((step, index) => (
          currentStep > index + 1 && (
            <div key={step.question} className="flex-none">
              <CaseTypeSelect
                question={step.question}
                options={step.options}
                onValueChange={(value) => handleSelect(value, step.question)}
              />
            </div>
          )
        ))}

        {findLawyerType === "review" && 
         currentStep > questions.length + 1 && (
          <div className="w-full px-4">
            <Textarea
              placeholder="Please provide as much detail about your case as possible (max 700 characters)..."
              value={caseDetails}
              onChange={(e) => setCaseDetails(e.target.value.slice(0, 700))}
              className="min-h-[200px]"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-muted-foreground">
                {caseDetails.length}/700 characters
              </span>
              <Button 
                onClick={handleSubmit}
                className="mt-4"
              >
                Submit Case for Review
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}