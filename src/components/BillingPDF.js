import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const BillingPDF = ({ billingData }) => {
    console.log("Billing Data:", billingData);
  
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>VitalLife HealthCare</Text>
            <Text style={styles.invoiceText}>Receipt</Text>
          </View>
  
          {/* Billing Details */}
          {billingData && billingData.length > 0 && billingData.map((charge, index) => (
            <View key={index} style={styles.section}>
              {/* Row 1 */}
              <View style={styles.row}>
                <Text style={styles.address}>{charge.clinicPhoneNumber}</Text>
                <Text style={styles.date}>{charge.date_charged}</Text>
              </View>
              <Text style={styles.address}>{charge.clinicAddress}</Text>
              {/* Row 2 */}
              <View style={styles.row}>
                <Text style={styles.clinicName}>{charge.clinicName}</Text>
                <Text style={styles.doctorName}>Dr. {charge.doctorFirstName} {charge.doctorLastName}</Text>
                <Text style={styles.invoiceNumber}>Invoice # {charge.invoice_num}</Text>
              </View>
              {/* Box for Total Payment */}
              <View style={styles.totalPaymentBox}>
                <Text>Total payment due: ${charge.amount}</Text>
                <Text>Paid: ${charge.paid}</Text>
                <Text>Total balance: ${charge.amount - charge.paid}</Text>
              </View>
              {/* Appointment Status Receipt */}
              <Text style={styles.appointmentReceipt}>
                Appointment Status Receipt For {charge.patientFirstName} {charge.patientLastName}
              </Text>
            </View>
          ))}
        </Page>
      </Document>
    );
};

const styles = StyleSheet.create({
    page: {
      padding: 30,
    },
    header: {
      textAlign: 'center',
      marginBottom: 20,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    invoiceText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    section: {
      marginBottom: 350, // Increased margin between rows
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10, // Increased margin between elements in a row
    },
    address: {
      flexGrow: 1,
      marginBottom: 30, // Added margin bottom for address
    },
    date: {
      width: '40%', // Increased width of date text
      textAlign: 'right',
    },
    clinicName: {
       
        textAlign: 'left', // Aligned clinic name to the left
      },
    
      doctorName: {
        
        textAlign: 'center', // Aligned doctor name to the center
      },
    
      invoiceNumber: {
       
        textAlign: 'right', // Aligned invoice number to the right
      },
    
    totalPaymentBox: {
      textAlign: 'center',
      border: 1,
      padding: 10,
      marginBottom: 20,
    },
    appointmentReceipt: {
      textAlign: 'center',
    },
  });
  

export default BillingPDF;
