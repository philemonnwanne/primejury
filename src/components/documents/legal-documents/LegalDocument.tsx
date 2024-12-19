import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  court: {
    marginBottom: 20,
    textAlign: "center",
  },
  content: {
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
  },
  footer: {
    marginTop: 30,
    textAlign: "left",
  },
})

interface Court {
  name: string
  state: string
  county: string
  address: string
}

interface LegalDocumentProps {
  type: string
  caseNumber: string
  content: string
  court?: Court
}

export function LegalDocument({ type, caseNumber, content, court }: LegalDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{type}</Text>
          <Text>Case Number: {caseNumber}</Text>
        </View>

        {court && (
          <View style={styles.court}>
            <Text>{court.name}</Text>
            <Text>{court.address}</Text>
            <Text>{court.county}, {court.state}</Text>
          </View>
        )}

        <View style={styles.content}>
          <Text>{content}</Text>
        </View>
      </Page>
    </Document>
  )
}