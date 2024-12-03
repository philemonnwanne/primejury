import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
})

interface AnalyticsReportProps {
  sections: string[]
}

export function AnalyticsReport({ sections }: AnalyticsReportProps) {
  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case "caseMetrics":
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Case Metrics</Text>
            <Text style={styles.text}>Total Cases: 124</Text>
            <Text style={styles.text}>Active Cases: 45</Text>
            <Text style={styles.text}>Success Rate: 89%</Text>
          </View>
        )
      case "lawyerPerformance":
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Lawyer Performance</Text>
            <Text style={styles.text}>Top Performer: Sarah Parker</Text>
            <Text style={styles.text}>Average Cases per Lawyer: 15</Text>
            <Text style={styles.text}>Resolution Rate: 85%</Text>
          </View>
        )
      case "financialMetrics":
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Financial Metrics</Text>
            <Text style={styles.text}>Total Revenue: $450,000</Text>
            <Text style={styles.text}>Average Case Value: $25,000</Text>
            <Text style={styles.text}>Outstanding Payments: $75,000</Text>
          </View>
        )
      case "trends":
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trends Analysis</Text>
            <Text style={styles.text}>Monthly Growth Rate: 5%</Text>
            <Text style={styles.text}>Case Resolution Time: -10%</Text>
            <Text style={styles.text}>Client Satisfaction: +8%</Text>
          </View>
        )
      default:
        return null
    }
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Analytics Report</Text>
        {sections.map((section) => renderSection(section))}
      </Page>
    </Document>
  )
}