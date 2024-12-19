export const documentTypes = [
  {
    value: "motion",
    label: "Motion",
    category: "Civil Litigation",
    description: "Legal request to the court",
    template: "IN THE {county} COUNTY SUPERIOR COURT\nSTATE OF {state}\n\nCase No. {caseNumber}\n\nMOTION\n\nDate: {date}\n\n{content}"
  },
  {
    value: "complaint",
    label: "Complaint",
    category: "Civil Litigation",
    description: "Initial filing that starts a civil case",
    template: "IN THE {county} COUNTY SUPERIOR COURT\nSTATE OF {state}\n\nCase No. {caseNumber}\n\nCOMPLAINT\n\nDate: {date}\n\n{content}"
  },
  {
    value: "response",
    label: "Response",
    category: "Civil Litigation",
    description: "Response to a complaint or motion",
    template: "IN THE {county} COUNTY SUPERIOR COURT\nSTATE OF {state}\n\nCase No. {caseNumber}\n\nRESPONSE\n\nDate: {date}\n\n{content}"
  },
  {
    value: "brief",
    label: "Legal Brief",
    category: "Criminal Law",
    description: "Written legal argument",
    template: "IN THE {county} COUNTY SUPERIOR COURT\nSTATE OF {state}\n\nCase No. {caseNumber}\n\nLEGAL BRIEF\n\nDate: {date}\n\n{content}"
  }
]