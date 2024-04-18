import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const ReferralPDF = ({ referralData }) => {
    if (!referralData) {
        return null; // Return null if referralData is null or undefined
    }
    console.log(referralData);

    const renderReferral = (referral) => (
        <Page key={referral.expirationDate} size="A4" style={styles.page}>
            {/* VitalLife HealthCare */}
            <Text style={styles.center}>VitalLife HealthCare</Text>
            
            {/* Primary Doctor Referral Form */}
            <View style={styles.box}>
                <Text style={styles.primaryDoctorReferral}>Primary Doctor Referral Form</Text>
            </View>

            {/* Referral Expiration Date */}
            <Text style={styles.right}>Referral Expiration Date: {referral.expirationDate}</Text>

            {/* Patient Name and Doctor */}
            <Text style={styles.left}>Patient Name: {referral.patientFirstName} {referral.patientLastName}</Text>
            <Text style={styles.left}>Referred by Primary Doctor to: {referral.doctorFirstName} {referral.doctorLastName}</Text>

            {/* Reason for Referral */}
            <View style={styles.reasonBox}>
                <Text style={styles.center}>Reason for Referral</Text>
                <View style={styles.box}>
                    <Text style={styles.reason}>{referral.reasonForReferral}</Text>
                </View>
            </View>

            {/* Insurance Details */}
            <View style={styles.insuranceContainer}>
                <View style={styles.insuranceItem}>
                    <Text style={[styles.label, styles.smallText]}>Insurance Type</Text>
                    <Text style={styles.smallText}>Health Insurance Gold</Text>
                </View>
                <View style={styles.insuranceItem}>
                    <Text style={[styles.label, styles.smallText]}>Policy Number</Text>
                    <Text style={styles.smallText}>{referral.policyNumber}</Text>
                </View>
                <View style={styles.insuranceItem}>
                    <Text style={[styles.label, styles.smallText]}>Group Number</Text>
                    <Text style={styles.smallText}>{referral.groupNumber}</Text>
                </View>
                <View style={styles.insuranceItem}>
                    <Text style={[styles.label, styles.smallText]}>Insurance Phone#</Text>
                    <Text style={styles.smallText}>719-004-4828</Text>
                </View>
            </View>

            {/* Referring Clinician Information */}
            <View style={styles.separator} />
            <View style={styles.clinicianTitleBox}>
                <Text style={[styles.clinicianTitle, styles.smallText]}>Referring Clinician Information</Text>
            </View>
            <View style={styles.clinicianContainer}>
                <View style={styles.clinicianItem}>
                    <Text style={[styles.label, styles.smallText]}>Phone Number</Text>
                    <Text style={styles.smallText}>713-449-5567</Text>
                </View>
                <View style={styles.clinicianItem}>
                    <Text style={[styles.label, styles.smallText]}>Address</Text>
                    <Text style={styles.smallText}>321 Wrong Street, Houston, USA</Text>
                </View>
                <View style={styles.clinicianItem}>
                    <Text style={[styles.label, styles.smallText]}>Email</Text>
                    <Text style={styles.smallText}>VitalLabs@medc.org</Text>
                </View>
            </View>
        </Page>
    );

    return (
        <Document>
            {Array.isArray(referralData) ? referralData.map(renderReferral) : renderReferral(referralData)}
        </Document>
    );
};

const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    center: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
    },
    right: {
        textAlign: 'right',
        marginTop: 10,
    },
    left: {
        textAlign: 'left',
        marginTop: 10,
    },
    primaryDoctorReferral: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    box: {
        marginVertical: 10,
        textAlign: 'center',
        borderColor: '#000',
        borderWidth: 1,
        padding: 10,
    },
    reasonBox: {
        marginTop: 100, // Pushes Reason for Referral away from text above it
    },
    reason: {
        textAlign: 'center',
    },
    insuranceContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    insuranceItem: {
        width: '47%',
        textAlign: 'center',
        borderColor: '#000',
        borderWidth: 1,
        padding: 10,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    smallText: {
        fontSize: 10, // Smaller font size
    },
    separator: {
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    clinicianTitleBox: {
        marginTop: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#000',
        textAlign: 'center',
        padding: 5,
    },
    clinicianTitle: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    clinicianContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    clinicianItem: {
        width: '30%',
        textAlign: 'center',
        borderColor: '#000',
        borderWidth: 1,
        padding: 10,
    },
});

export default ReferralPDF;
