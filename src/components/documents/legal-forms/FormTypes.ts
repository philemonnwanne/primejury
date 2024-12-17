export interface LegalFormType {
  value: string
  label: string
  category: string
  description: string
  template: string
}

export const formTypes: LegalFormType[] = [
  {
    value: "divorce_petition",
    label: "Divorce Petition",
    category: "Family Law",
    description: "Standard petition for dissolution of marriage",
    template: "IN THE FAMILY COURT OF {state}\nCOUNTY OF {county}\n\nIn re the Marriage of:\n\n{petitioner},\nPetitioner,\n\nand\n\n{respondent},\nRespondent.\n\nCase No. {caseNumber}\n\nPETITION FOR DISSOLUTION OF MARRIAGE\n\n{content}\n\nDated: {date}\n\n_____________________\nPetitioner"
  },
  {
    value: "custody_agreement",
    label: "Custody Agreement",
    category: "Family Law",
    description: "Legal agreement detailing child custody arrangements",
    template: "CUSTODY AGREEMENT\n\nCase No. {caseNumber}\n\nThis agreement is made between:\n{party1} and {party2}\n\n{content}\n\nDated: {date}\n\n_____________________\nParty 1\n\n_____________________\nParty 2"
  },
  {
    value: "civil_complaint",
    label: "Civil Complaint",
    category: "Civil Law",
    description: "Initial pleading that starts a civil lawsuit",
    template: "IN THE SUPERIOR COURT OF {state}\nFOR THE COUNTY OF {county}\n\n{plaintiff},\nPlaintiff,\n\nvs.\n\n{defendant},\nDefendant.\n\nCase No. {caseNumber}\n\nCOMPLAINT\n\n{content}\n\nDated: {date}\n\n_____________________\nAttorney for Plaintiff"
  },
  {
    value: "motion_summary_judgment",
    label: "Motion for Summary Judgment",
    category: "Civil Law",
    description: "Request for the court to decide a case without a full trial",
    template: "IN THE SUPERIOR COURT OF {state}\nFOR THE COUNTY OF {county}\n\nCase No. {caseNumber}\n\nMOTION FOR SUMMARY JUDGMENT\n\n{content}\n\nDated: {date}\n\n_____________________\nMoving Party"
  },
  {
    value: "criminal_motion",
    label: "Criminal Motion",
    category: "Criminal Law",
    description: "Standard motion in a criminal case",
    template: "IN THE SUPERIOR COURT OF {state}\nCRIMINAL DIVISION\nCOUNTY OF {county}\n\nTHE PEOPLE OF THE STATE OF {state}\n\nvs.\n\n{defendant},\nDefendant.\n\nCase No. {caseNumber}\n\n{content}\n\nDated: {date}\n\n_____________________\nAttorney for Defendant"
  },
  {
    value: "plea_agreement",
    label: "Plea Agreement",
    category: "Criminal Law",
    description: "Standard plea agreement document",
    template: "IN THE SUPERIOR COURT OF {state}\nCRIMINAL DIVISION\nCOUNTY OF {county}\n\nTHE PEOPLE OF THE STATE OF {state}\n\nvs.\n\n{defendant},\nDefendant.\n\nCase No. {caseNumber}\n\nPLEA AGREEMENT\n\n{content}\n\nDated: {date}\n\n_____________________\nDefendant\n\n_____________________\nDefense Attorney\n\n_____________________\nProsecutor"
  }
]