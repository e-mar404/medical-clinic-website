import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';

const ReceptionistReferral = () => {
  const [referrals, setReferrals] = useState([]);

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
            expirationDate: referral.expiration_date.split('T')[0] // Remove time portion
        }));

        setReferrals(processedReferrals);
      } catch (error) {
        console.error("Error fetching referrals:", error);
      }
    };

    fetchReferrals();
  }, []);
console.log(referrals);

return (
    <>
      <Navbar />
      <div style={{ margin: '20px' }}> {/* Add margin around the table */}
        <h1>Receptionist Referral Page</h1>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}> {/* Set table width to 100% and collapse table borders */}
          <thead>
            <tr>
              <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Patient Name</th>
              <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Doctor Name</th>
              <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Reason For Referral</th>
              <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Expiration Date</th>
            </tr>
          </thead>

          <tbody>
            {referrals.map((referral, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{referral.patientFirstName} {referral.patientLastName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{referral.doctorFirstName} {referral.doctorLastName} ({referral.doctorTitle})</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{referral.reasonForReferral}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{referral.expirationDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReceptionistReferral;
