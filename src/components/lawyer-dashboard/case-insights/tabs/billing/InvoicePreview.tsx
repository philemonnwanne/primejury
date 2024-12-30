import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer"
import { Invoice } from "../types"

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  info: {
    marginBottom: 20,
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#bfbfbf",
    minHeight: 30,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
  total: {
    marginTop: 20,
    textAlign: "right",
    fontSize: 16,
    fontWeight: "bold",
  },
})

interface InvoicePreviewProps {
  invoice: Invoice
  logoUrl?: string
}

export function InvoicePreviewDocument({ invoice, logoUrl }: InvoicePreviewProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {logoUrl && <Image style={styles.logo} src={logoUrl} />}
          <View>
            <Text style={styles.title}>INVOICE</Text>
            <Text>Invoice #{invoice.id}</Text>
            <Text>Date: {new Date().toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.info}>
          <Text>Description: {invoice.description}</Text>
          <Text>Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Description</Text>
            <Text style={styles.tableCell}>Hours</Text>
            <Text style={styles.tableCell}>Rate</Text>
            <Text style={styles.tableCell}>Amount</Text>
          </View>
          {invoice.items?.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.description}</Text>
              <Text style={styles.tableCell}>{item.hours}</Text>
              <Text style={styles.tableCell}>${item.rate}</Text>
              <Text style={styles.tableCell}>${item.amount}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.total}>Total Amount: ${invoice.amount}</Text>
      </Page>
    </Document>
  )
}