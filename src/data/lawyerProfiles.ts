export interface LawyerProfile {
  id: string
  name: string
  title: string
  email: string
  phone: string
  specialization: string[]
  education: {
    degree: string
    institution: string
    year: number
  }[]
  experience: {
    position: string
    company: string
    duration: string
    description: string
  }[]
  achievements: string[]
  barAdmissions: string[]
  languages: string[]
  publications?: string[]
  currentCaseload: number
  successRate: number
  imageUrl?: string
}

export const lawyerProfiles: LawyerProfile[] = [
  {
    id: "sarah-parker",
    name: "Sarah Parker",
    title: "Senior Partner",
    email: "sarah.parker@lawfirm.com",
    phone: "(555) 123-4567",
    specialization: ["Civil Litigation", "Product Liability", "Corporate Law"],
    education: [
      {
        degree: "Juris Doctor",
        institution: "Harvard Law School",
        year: 2008
      },
      {
        degree: "Bachelor of Arts in Political Science",
        institution: "Yale University",
        year: 2005
      }
    ],
    experience: [
      {
        position: "Senior Partner",
        company: "Current Law Firm",
        duration: "2015 - Present",
        description: "Lead counsel in over 100 civil litigation cases with a 92% success rate"
      },
      {
        position: "Associate Attorney",
        company: "Johnson & Smith LLP",
        duration: "2008 - 2015",
        description: "Specialized in product liability and corporate law cases"
      }
    ],
    achievements: [
      "Named Top 40 Under 40 Civil Litigator (2019)",
      "Successfully negotiated settlements totaling over $50M",
      "Published author in Harvard Law Review"
    ],
    barAdmissions: ["California State Bar", "New York State Bar"],
    languages: ["English", "Spanish"],
    publications: [
      "Modern Approaches to Civil Litigation (Harvard Law Review, 2018)",
      "Corporate Liability in the Digital Age (Law Journal, 2020)"
    ],
    currentCaseload: 15,
    successRate: 92
  },
  {
    id: "michael-chang",
    name: "Michael Chang",
    title: "Partner",
    email: "michael.chang@lawfirm.com",
    phone: "(555) 234-5678",
    specialization: ["Corporate Law", "Mergers & Acquisitions", "International Business Law"],
    education: [
      {
        degree: "Juris Doctor",
        institution: "Stanford Law School",
        year: 2010
      },
      {
        degree: "MBA",
        institution: "Stanford Graduate School of Business",
        year: 2010
      }
    ],
    experience: [
      {
        position: "Partner",
        company: "Current Law Firm",
        duration: "2016 - Present",
        description: "Specialized in complex corporate transactions and international business law"
      },
      {
        position: "Senior Associate",
        company: "Global Legal Partners",
        duration: "2010 - 2016",
        description: "Handled major M&A transactions and corporate restructuring"
      }
    ],
    achievements: [
      "Chambers USA Ranked Lawyer (2020)",
      "Led legal team in $2B cross-border merger",
      "Board Member, Asian American Bar Association"
    ],
    barAdmissions: ["California State Bar", "Washington State Bar"],
    languages: ["English", "Mandarin", "Cantonese"],
    currentCaseload: 12,
    successRate: 88
  },
  {
    id: "emily-wilson",
    name: "Emily Wilson",
    title: "Senior Associate",
    email: "emily.wilson@lawfirm.com",
    phone: "(555) 345-6789",
    specialization: ["Estate Planning", "Probate Law", "Tax Law"],
    education: [
      {
        degree: "Juris Doctor",
        institution: "Columbia Law School",
        year: 2012
      },
      {
        degree: "Bachelor in Economics",
        institution: "Princeton University",
        year: 2009
      }
    ],
    experience: [
      {
        position: "Senior Associate",
        company: "Current Law Firm",
        duration: "2017 - Present",
        description: "Specializes in complex estate planning and tax law matters"
      },
      {
        position: "Associate",
        company: "Estate Law Group",
        duration: "2012 - 2017",
        description: "Handled probate cases and estate administration"
      }
    ],
    achievements: [
      "Certified Specialist in Estate Planning",
      "Published author in Tax Law Review",
      "Speaker at National Estate Planning Conference"
    ],
    barAdmissions: ["California State Bar"],
    languages: ["English", "French"],
    publications: [
      "Modern Estate Planning Strategies (Tax Law Review, 2019)",
      "Digital Assets in Estate Planning (Estate Planning Journal, 2021)"
    ],
    currentCaseload: 20,
    successRate: 95
  },
  {
    id: "john-davis",
    name: "John Davis",
    title: "Partner",
    email: "john.davis@lawfirm.com",
    phone: "(555) 456-7890",
    specialization: ["Family Law", "Estate Planning", "Mediation"],
    education: [
      {
        degree: "Juris Doctor",
        institution: "UC Berkeley School of Law",
        year: 2009
      },
      {
        degree: "Bachelor in Psychology",
        institution: "UCLA",
        year: 2006
      }
    ],
    experience: [
      {
        position: "Partner",
        company: "Current Law Firm",
        duration: "2015 - Present",
        description: "Lead family law practice group and mediation services"
      },
      {
        position: "Associate",
        company: "Family Law Associates",
        duration: "2009 - 2015",
        description: "Handled divorce, custody, and estate planning cases"
      }
    ],
    achievements: [
      "Certified Family Law Specialist",
      "Certified Mediator",
      "Pro Bono Award for Family Law Services"
    ],
    barAdmissions: ["California State Bar"],
    languages: ["English"],
    currentCaseload: 18,
    successRate: 90
  },
  {
    id: "emma-roberts",
    name: "Emma Roberts",
    title: "Senior Associate",
    email: "emma.roberts@lawfirm.com",
    phone: "(555) 567-8901",
    specialization: ["Criminal Defense", "White Collar Crime", "Civil Rights"],
    education: [
      {
        degree: "Juris Doctor",
        institution: "NYU School of Law",
        year: 2011
      },
      {
        degree: "Bachelor in Criminal Justice",
        institution: "University of Michigan",
        year: 2008
      }
    ],
    experience: [
      {
        position: "Senior Associate",
        company: "Current Law Firm",
        duration: "2016 - Present",
        description: "Specializes in criminal defense and white collar crime cases"
      },
      {
        position: "Public Defender",
        company: "San Francisco Public Defender's Office",
        duration: "2011 - 2016",
        description: "Represented clients in criminal cases and civil rights matters"
      }
    ],
    achievements: [
      "Outstanding Young Lawyer Award (2019)",
      "100+ Criminal Cases Successfully Defended",
      "Featured Speaker at Criminal Law Symposium"
    ],
    barAdmissions: ["California State Bar", "New York State Bar"],
    languages: ["English", "Portuguese"],
    currentCaseload: 10,
    successRate: 85
  }
]