const { headers, PostData } = require('../utils')

const patientCharges = async (req, res, db) => {
  try {
    console.log('hi from billingController');

    // Query the Charges table to get charges data
    const query = 'SELECT clinic_id, patient_id, amount, date_charged, paid, invoice_num FROM Charges';
    const [rows] = await db.promise().query(query);

    if (rows.length === 0) {
      res.writeHead(404, headers);
      res.end(JSON.stringify({ message: 'No charges found' }));
      return; // Exit the function early if no charges are found
    }

    // Extract unique patient IDs from the charges data
    const patientIds = [...new Set(rows.map(charge => charge.patient_id))];

    // Query the Patient table to fetch patient names based on patient IDs
    const patientQuery = 'SELECT patient_id, first_name, last_name, primary_doctor_id FROM Patient WHERE patient_id IN (?)';
    const [patients] = await db.promise().query(patientQuery, [patientIds]);

    // Create a map to quickly lookup patient names and primary doctor IDs by patient ID
    const patientMap = {};
    patients.forEach(patient => {
      patientMap[patient.patient_id] = {
        firstName: patient.first_name,
        lastName: patient.last_name,
        primaryDoctorId: patient.primary_doctor_id
      };
    });

    // Extract unique primary doctor IDs from the patient data
    const doctorIds = [...new Set(patients.map(patient => patient.primary_doctor_id))];

    // Query the Employee table to fetch doctor names based on primary doctor IDs
    const doctorQuery = 'SELECT employee_id, first_name, last_name FROM Employee WHERE employee_id IN (?)';
    const [doctors] = await db.promise().query(doctorQuery, [doctorIds]);

    // Create a map to quickly lookup doctor names by doctor ID
    const doctorMap = {};
    doctors.forEach(doctor => {
      doctorMap[doctor.employee_id] = {
        firstName: doctor.first_name,
        lastName: doctor.last_name
      };
    });

    // Extract unique clinic IDs from the charges data
    const clinicIds = [...new Set(rows.map(charge => charge.clinic_id))];

    // Query the Clinic table to fetch clinic information based on clinic IDs
    const clinicQuery = 'SELECT clinic_id, clinic_name, address, phone_number FROM Clinic WHERE clinic_id IN (?)';
    const [clinics] = await db.promise().query(clinicQuery, [clinicIds]);

    // Create a map to quickly lookup clinic information by clinic ID
    const clinicMap = {};
    clinics.forEach(clinic => {
      clinicMap[clinic.clinic_id] = {
        clinicName: clinic.clinic_name,
        address: clinic.address,
        phoneNumber: clinic.phone_number
      };
    });

    // Combine charges data with patient names, doctor names, and clinic information
    const formattedRows = rows.map(charge => ({
      ...charge,
      patientFirstName: patientMap[charge.patient_id]?.firstName || '',
      patientLastName: patientMap[charge.patient_id]?.lastName || '',
      doctorFirstName: doctorMap[patientMap[charge.patient_id]?.primaryDoctorId]?.firstName || '',
      doctorLastName: doctorMap[patientMap[charge.patient_id]?.primaryDoctorId]?.lastName || '',
      clinicName: clinicMap[charge.clinic_id]?.clinicName || '',
      clinicAddress: clinicMap[charge.clinic_id]?.address || '',
      clinicPhoneNumber: clinicMap[charge.clinic_id]?.phoneNumber || ''
    }));

    // Send the combined data to the client
    res.writeHead(200, headers);
    res.end(JSON.stringify(formattedRows));

    console.log('Charges data:', formattedRows); // Log the charges data with patient names, doctor names, and clinic information
  } catch (error) {
    console.error('Error fetching charges:', error);
    res.writeHead(500, headers);
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
};

const StoreBillPayment = async (req, res, db) => {
  try {
    let body = '';

    // Read request body
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // Parse request body
    req.on('end', async () => {
      try {
        const { invoiceNumber, paidAmount } = JSON.parse(body);

        // Construct the SQL query to update the paid amount in the Charges table
        const query = 'UPDATE Charges SET paid = ? WHERE invoice_num = ?';

        // Execute the query with the provided parameters
        await db.promise().query(query, [paidAmount, invoiceNumber]);

        // Send a success response
        res.writeHead(200, headers);
        res.end(JSON.stringify({ message: 'Payment successfully processed' }));
      } catch (error) {
        console.error('Error parsing request body:', error);
        res.writeHead(400, headers); // Bad Request
        res.end(JSON.stringify({ message: 'Invalid request body' }));
      }
    });
  } catch (error) {
    console.error('Error storing bill payment:', error);
    res.writeHead(500, headers);
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
};


module.exports = {
  patientCharges, StoreBillPayment
};

