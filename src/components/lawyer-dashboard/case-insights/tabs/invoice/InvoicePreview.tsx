import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 12,
  },
  header: {
    marginBottom: 30,
    textAlign: "center",
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  info: {
    marginBottom: 30,
  },
  table: {
    display: "table",
    width: "100%",
    marginBottom: 30,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    paddingVertical: 5,
  },
  tableHeader: {
    backgroundColor: "#f4f4f4",
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
  total: {
    marginTop: 30,
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
  },
})

interface InvoicePreviewProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  invoice: {
    id: string
    amount: number
    description: string
    dueDate: string
    items?: Array<{
      description: string
      hours?: number
      rate?: number
      amount: number
    }>
  }
  onSave: () => void
  onSaveAndSend: () => void
  onEdit: () => void
  caseId: string
}

export function InvoicePreview({
  open,
  onOpenChange,
  invoice,
  onSave,
  onSaveAndSend,
  onEdit,
  caseId,
}: InvoicePreviewProps) {
  const handleSave = async () => {
    try {
      // Save to case documents
      await saveInvoiceToDocuments(invoice, caseId)
      onSave()
      toast.success("Invoice saved successfully")
    } catch (error) {
      toast.error("Failed to save invoice")
    }
  }

  const handleSaveAndSend = async () => {
    try {
      await saveInvoiceToDocuments(invoice, caseId)
      await sendInvoiceToClient(invoice)
      onSaveAndSend()
      toast.success("Invoice saved and sent to client")
    } catch (error) {
      toast.error("Failed to save and send invoice")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Invoice Preview</DialogTitle>
        </DialogHeader>
        <div className="h-[600px]">
          <PDFViewer width="100%" height="100%">
            <Document>
              <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                  <Text style={styles.logo}>Law Firm Logo</Text>
                  <Text style={styles.title}>INVOICE</Text>
                </View>
                <View style={styles.info}>
                  <Text>Invoice #: {invoice.id}</Text>
                  <Text>Date: {new Date().toLocaleDateString()}</Text>
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
                <View style={styles.total}>
                  <Text>Total Amount: ${invoice.amount}</Text>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onEdit}>
            Edit Invoice
          </Button>
          <Button variant="outline" onClick={handleSave}>
            Save Invoice
          </Button>
          <Button onClick={handleSaveAndSend}>
            Save & Send to Client
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

async function saveInvoiceToDocuments(invoice: any, caseId: string) {
  // In a real implementation, this would save to your backend
  console.log("Saving invoice to documents:", { invoice, caseId })
}

async function sendInvoiceToClient(invoice: any) {
  // In a real implementation, this would send to your backend
  console.log("Sending invoice to client:", invoice)
}