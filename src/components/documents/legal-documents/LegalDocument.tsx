import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 12,
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  caseInfo: {
    marginBottom: 20,
  },
  content: {
    lineHeight: 1.5,
    textAlign: "justify",
  },
  footer: {
    marginTop: 30,
    textAlign: "right",
  },
})

interface LegalDocumentProps {
  type: string
  caseNumber: string
  partyName: string
  content: string
}

export function LegalDocument({ type, caseNumber, partyName, content }: LegalDocumentProps) {
  const documentTitle = {
    complaint: "CIVIL COMPLAINT",
    motion: "MOTION FOR SUMMARY JUDGMENT",
    petition: "PETITION FOR DISSOLUTION",
  }[type] || "LEGAL DOCUMENT"

  const court = {
    complaint: "SUPERIOR COURT OF CALIFORNIA",
    motion: "SUPERIOR COURT OF CALIFORNIA",
    petition: "SUPERIOR COURT OF CALIFORNIA, FAMILY DIVISION",
  }[type] || "SUPERIOR COURT OF CALIFORNIA"

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>{court}</Text>
          <Text>COUNTY OF LOS ANGELES</Text>
        </View>

        <View style={styles.title}>
          <Text>{documentTitle}</Text>
        </View>

        <View style={styles.caseInfo}>
          <Text>Case Number: {caseNumber}</Text>
          <Text>Party Name: {partyName}</Text>
        </View>

        <View style={styles.content}>
          <Text>{content}</Text>
        </View>

        <View style={styles.footer}>
          <Text>Date: {new Date().toLocaleDateString()}</Text>
          <Text>Signature: _____________________</Text>
        </View>
      </Page>
    </Document>
  )
}