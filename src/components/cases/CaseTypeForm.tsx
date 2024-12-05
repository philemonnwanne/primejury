import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Progress } from "@/components/ui/progress"
import { CaseTypeSelect } from "./CaseTypeSelect"
import { caseTypeQuestions, type CaseType } from "./questions/caseTypeQuestions"

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
        navigate(`/lawyer-marketplace?state=${answers["State"] || ""}&caseType=${caseType || ""}`)
      } else {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const questions = caseType ? caseTypeQuestions[caseType] : []
  const totalSteps = questions.length + 1
  const progress = (currentStep / totalSteps) * 100

  const initialCaseTypeOptions = [
    { value: "criminal", label: "Criminal Law" },
    { value: "civil", label: "Civil Law" },
    { value: "immigration", label: "Immigration Law" },
    { value: "corporate", label: "Corporate Law" },
    { value: "complex_litigation", label: "Complex Litigation" },
    { value: "education", label: "Education Law" },
    { value: "family", label: "Family Law" },
  ]

  return (
    <div className="space-y-6">
      <div className="w-full px-4">
        <Progress value={progress} className="w-full" />
      </div>
      
      <div className="flex gap-4 flex-wrap items-start px-4">
        <div className="flex-none">
          <CaseTypeSelect
            question="Case Type"
            options={initialCaseTypeOptions}
            onValueChange={(value) => handleSelect(value, "Case Type")}
          />
        </div>

        {caseType && questions.map((step, index) => (
          currentStep > index && (
            <div key={step.question} className="flex-none">
              <CaseTypeSelect
                question={step.question}
                options={step.options}
                onValueChange={(value) => handleSelect(value, step.question)}
              />
            </div>
          )
        ))}
      </div>
    </div>
  )
}