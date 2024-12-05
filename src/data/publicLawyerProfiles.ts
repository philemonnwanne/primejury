export interface PublicLawyerProfile {
  id: string
  name: string
  title: string
  email: string
  phone: string
  specialization: string[]
  yearsOfExperience: number
  successRate: number
  proBono: boolean
  currentCaseload: number
  gender: string
  ethnicity: string
  stateLicensed: string[]
}

export const publicLawyerProfiles: PublicLawyerProfile[] = [
  {
    id: "sarah-parker",
    name: "Sarah Parker",
    title: "Senior Partner",
    email: "sarah.parker@lawfirm.com",
    phone: "(555) 123-4567",
    specialization: ["Civil Litigation", "Product Liability", "Corporate Law"],
    yearsOfExperience: 15,
    successRate: 92,
    proBono: true,
    currentCaseload: 15,
    gender: "female",
    ethnicity: "white",
    stateLicensed: ["CA", "NY"]
  },
  {
    id: "michael-chang",
    name: "Michael Chang",
    title: "Partner",
    email: "michael.chang@lawfirm.com",
    phone: "(555) 234-5678",
    specialization: ["Corporate Law", "Mergers & Acquisitions"],
    yearsOfExperience: 12,
    successRate: 88,
    proBono: false,
    currentCaseload: 12,
    gender: "male",
    ethnicity: "asian",
    stateLicensed: ["CA", "WA"]
  },
  {
    id: "maria-rodriguez",
    name: "Maria Rodriguez",
    title: "Immigration Specialist",
    email: "maria.r@immigrationlaw.com",
    phone: "(555) 345-6789",
    specialization: ["Immigration Law", "Family Law"],
    yearsOfExperience: 8,
    successRate: 95,
    proBono: true,
    currentCaseload: 20,
    gender: "female",
    ethnicity: "hispanic",
    stateLicensed: ["TX", "AZ"]
  },
  {
    id: "james-wilson",
    name: "James Wilson",
    title: "Criminal Defense Attorney",
    email: "jwilson@criminaldefense.com",
    phone: "(555) 456-7890",
    specialization: ["Criminal Law", "Civil Rights"],
    yearsOfExperience: 20,
    successRate: 85,
    proBono: true,
    currentCaseload: 8,
    gender: "male",
    ethnicity: "black",
    stateLicensed: ["NY", "NJ"]
  }
]