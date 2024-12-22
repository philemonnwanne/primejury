import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
  },
  tableContainer: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableCell: {
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#000",
    flex: 1,
  },
})

interface BillingReportProps {
  data: {
    type: string
    date: string
    totalBilled: number
    totalPaid: number
    outstandingAmount: number
    cases: Array<{
      id: string
      title: string
      billedAmount: number
      paidAmount: number
      status: string
    }>
  }
}

export function BillingReport({ data }: BillingReportProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Billing Report</Text>
          <Text>Type: {data.type}</Text>
          <Text>Date: {data.date}</Text>
        </View>

        <View style={styles.section}>
          <Text>Total Billed: ${data.totalBilled}</Text>
          <Text>Total Paid: ${data.totalPaid}</Text>
          <Text>Outstanding Amount: ${data.outstandingAmount}</Text>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>Case</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Billed</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Paid</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Status</Text>
            </View>
          </View>
          {data.cases.map((case_) => (
            <View key={case_.id} style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>{case_.title}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>${case_.billedAmount}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>${case_.paidAmount}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{case_.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}
