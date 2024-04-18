import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import ReferralPDF from '../../components/ReferralPDF'; // Import ReferralPDF component
import { PDFDownloadLink } from '@react-pdf/renderer';

const ReceptionistReferral = () => {
    const [referrals, setReferrals] = useState([]);
    const [lastReferral, setLastReferral] = useState(null);
    const [filterName, setFilterName] = useState('');

    useEffect(() => {
        const fetchReferrals = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/referralReceptionist`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const processedReferrals = data.map(referral => ({
                    patientFirstName: referral.patient.first_name,
                    patientLastName: referral.patient.last_name,
                    doctorFirstName: referral.doctor.first_name,
                    doctorLastName: referral.doctor.last_name,
                    doctorTitle: referral.doctor.title,
                    reasonForReferral: referral.reason_for_referral,
                    expirationDate: referral.expiration_date.split('T')[0],
                    policyNumber: referral.insurance.policy_number,
                    groupNumber: referral.insurance.group_number
                }));

                setReferrals(processedReferrals);
            } catch (error) {
                console.error("Error fetching referrals:", error);
            }
        };

        fetchReferrals();
    }, []);

    const filteredReferrals = referrals.filter(referral =>
        referral.patientFirstName.toLowerCase().includes(filterName.toLowerCase()) ||
        referral.patientLastName.toLowerCase().includes(filterName.toLowerCase())
    );

    // Function to handle PDF generation and download
    const handleGeneratePDF = () => {
       
        // Check if there are referrals available
        if (filteredReferrals.length === 0) {
            console.log('no referral');
            return;
        }

        // Generate the PDF content dynamically using the ReferralPDF component
        const pdfContent = (
            <ReferralPDF referralData={lastReferral ? [lastReferral] : []} />
        );

        const linkStyle = {
          textDecoration: 'none',
          color: '#000',
          fontSize: '16px',
          padding: '5px 10px',
          borderRadius: '5px',
          cursor: 'pointer',
      };
  
        return (
            <PDFDownloadLink document={pdfContent} fileName="referral.pdf">
                {({ blob, url, loading, error }) =>
                  <span style={linkStyle}>
                    {loading ? 'Generating PDF...' : 'Download Referral PDF'}
                  </span>
                }
            </PDFDownloadLink>
        );
    };

    // Function to handle selecting a referral
    const handleSelectReferral = (index) => {
        setLastReferral(referrals[index]);
    };

    return (
        <>
            <Navbar />
            <h1 style={{ textAlign: 'center' }}>Front Desk Referrals</h1>
            <div style={{ margin: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Button to trigger PDF generation */}
                    <button>{handleGeneratePDF()}</button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Filter input field */}
                    <input
                        type="text"
                        placeholder="Filter by name"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                </div>
            </div>
            <div style={{ margin: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Patient Name</th>
                            <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Doctor Name</th>
                            <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Reason For Referral</th>
                            <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Expiration Date</th>
                            <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReferrals.length > 0 ? (
                            filteredReferrals.map((referral, index) => (
                                <tr key={index}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{referral.patientFirstName} {referral.patientLastName}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{referral.doctorFirstName} {referral.doctorLastName} ({referral.doctorTitle})</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{referral.reasonForReferral}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{referral.expirationDate}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                                        <button onClick={() => handleSelectReferral(index)}>Select Referral</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            // Render a single row with a message if there are no filtered referrals
                            <tr>
                                <td colSpan="5" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>No referrals found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ReceptionistReferral;
