const { headers, PostData } = require('../utils');

async function createReferral(req, res, db) {
  try {
    const body = await PostData(req);
    const { doctor_id, patient_id, reason_for_referral, expiration_date } = JSON.parse(body);

    const msg = await new Promise((resolve, reject) => {
      db.query('INSERT INTO Referral(patient_id, doctor_id, reason_for_referral, expiration_date) VALUES(?, ?, ?, DATE ?)', [patient_id, doctor_id, reason_for_referral, expiration_date], (err, _db_res) => {
        if (err) {
          reject(err.sqlMessage);
        }

        const msg = 'Referral created successfully';
        console.log(msg);
        
        resolve(msg);
      });
    });

    res.writeHead(200, headers);
    res.end(JSON.stringify ({ message: msg }));
  } catch (err) {
    res.writeHead(400, headers);
    res.end(JSON.stringify ({ error: err }));
  }
}

async function getReferralDataForReceptionist(res, db) {
  try {
    console.log('hello from referral controller'); // Log to indicate the function is being executed

    // Query the referral table for patient_id, doctor_id, and expiration_date
    const referralQuery = 'SELECT patient_id, doctor_id, reason_for_referral, expiration_date FROM Referral';
    const [referralRows] = await db.promise().query(referralQuery);

    console.log('Referral rows:', referralRows); // Log the retrieved referral rows

    // Fetch details for each referral
    const referralsWithDetails = await Promise.all(referralRows.map(async referral => {
      const { patient_id, doctor_id, reason_for_referral, expiration_date } = referral;

      // Fetch patient's first name and last name
      const patientQuery = 'SELECT first_name, last_name FROM Patient WHERE patient_id = ?';
      const [patientResult] = await db.promise().query(patientQuery, [patient_id]);

      console.log('Patient result:', patientResult); // Log the retrieved patient details

      // Fetch doctor's first name and last name
      const doctorQuery = 'SELECT first_name, last_name, title FROM Employee WHERE employee_id = ?';
      const [doctorResult] = await db.promise().query(doctorQuery, [doctor_id]);

      console.log('Doctor result:', doctorResult); // Log the retrieved doctor details

      // Fetch insurance information for the patient
      const insuranceQuery = 'SELECT policy_number, group_number FROM Patient_InsuranceInformation WHERE patient_id = ?';
      const [insuranceDbResult] = await db.promise().query(insuranceQuery, [patient_id]);

      console.log('Insurance result:', insuranceDbResult); // Log the retrieved insurance details

      const insuranceResult = (insuranceDbResult.length > 0) ? insuranceDbResult[0] : { 'policy_number': 'No insurance info', 'group_number': 'No insurance info' };
      
      console.log(insuranceResult);

      return {
        patient: {
          first_name: patientResult[0].first_name,
          last_name: patientResult[0].last_name
        },
        doctor: {
          first_name: doctorResult[0].first_name,
          last_name: doctorResult[0].last_name,
          title: doctorResult[0].title
        },
        insurance: {
          policy_number: insuranceResult.policy_number,
          group_number: insuranceResult.group_number
        },
        reason_for_referral,
        expiration_date
      };
    }));

    console.log('Referrals with details:', referralsWithDetails); // Log the final list of referrals with details

    // Send the referral data to the client
    res.writeHead(200, headers);
    res.end(JSON.stringify(referralsWithDetails));
  } catch (error) {
    console.error('Error getting referral data for receptionist:', error);
    res.writeHead(500, headers);
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
}


module.exports = { createReferral, getReferralDataForReceptionist };
