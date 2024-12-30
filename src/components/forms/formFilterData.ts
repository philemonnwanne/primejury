export const states = [
  { id: "CA", name: "California" },
  { id: "NY", name: "New York" },
  { id: "TX", name: "Texas" },
  { id: "FL", name: "Florida" },
  { id: "IL", name: "Illinois" }
] as const;

export const counties: Record<string, Array<{ id: string; name: string }>> = {
  CA: [
    { id: "LA", name: "Los Angeles" },
    { id: "SF", name: "San Francisco" },
    { id: "SD", name: "San Diego" },
    { id: "SAC", name: "Sacramento" }
  ],
  NY: [
    { id: "NY", name: "New York" },
    { id: "KINGS", name: "Kings" },
    { id: "QUEENS", name: "Queens" },
    { id: "BRONX", name: "Bronx" }
  ],
  TX: [
    { id: "HARRIS", name: "Harris" },
    { id: "DALLAS", name: "Dallas" },
    { id: "BEXAR", name: "Bexar" },
    { id: "TRAVIS", name: "Travis" }
  ]
};

export const courtTypes: Record<string, Array<{ id: string; name: string }>> = {
  LA: [
    { id: "SUPERIOR", name: "Superior Court" },
    { id: "MUNICIPAL", name: "Municipal Court" },
    { id: "FAMILY", name: "Family Court" }
  ],
  SF: [
    { id: "SUPERIOR", name: "Superior Court" },
    { id: "MUNICIPAL", name: "Municipal Court" }
  ],
  NY: [
    { id: "SUPREME", name: "Supreme Court" },
    { id: "CIVIL", name: "Civil Court" },
    { id: "FAMILY", name: "Family Court" }
  ]
};

export const caseTypes: Record<string, Array<{ id: string; name: string }>> = {
  SUPERIOR: [
    { id: "CIVIL", name: "Civil" },
    { id: "CRIMINAL", name: "Criminal" },
    { id: "PROBATE", name: "Probate" },
    { id: "FAMILY", name: "Family Law" }
  ],
  MUNICIPAL: [
    { id: "TRAFFIC", name: "Traffic" },
    { id: "SMALL_CLAIMS", name: "Small Claims" },
    { id: "MISDEMEANOR", name: "Misdemeanor" }
  ],
  FAMILY: [
    { id: "DIVORCE", name: "Divorce" },
    { id: "CUSTODY", name: "Child Custody" },
    { id: "SUPPORT", name: "Child Support" }
  ]
};