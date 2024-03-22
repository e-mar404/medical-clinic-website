// Function to create an appointment
const {PostData} = require('../utils')

async function createAppointment(req, res, db) {
    try {

        const body = await PostData(req)
      // Extract appointment data from the request body
      const { clinic, doctor, date, time, firstName, lastName, email } = JSON.parse(body);
        console.log(`clinic:${clinic} doctor:${doctor} date:${date} time:${time} firstName:${firstName} lastName$:${lastName} email$:${email}`);
      // Query to retrieve doctor_id from MEmployee table based on first_name
      const [doctorRows, _] = await db.promise().query('SELECT memployee_id FROM MEmployee WHERE first_name = ?', [doctor]);
      const doctorId = doctorRows.length > 0 ? doctorRows[0].memployee_id : null;
  
      // Query to retrieve patient_id from Patient table based on first_name
      const [patientRows, __] = await db.promise().query('SELECT patient_id FROM Patient WHERE first_name = ?', [firstName]);
      const patientId = patientRows.length > 0 ? patientRows[0].patient_id : null;
  
      // Query to retrieve clinic_id from Clinic table based on clinic_name
      const [clinicRows, ___] = await db.promise().query('SELECT clinic_id FROM Clinic WHERE clinic_name = ?', [clinic]);
      const clinicId = clinicRows.length > 0 ? clinicRows[0].clinic_id : null;
  
      // Check if the appointment slot is already booked for the given doctor at the specified date and time
      const [existingAppointments, ____] = await db.promise().query(
        'SELECT * FROM Appointment WHERE doctor_id = ? AND appointment_date = ? AND time = ?',
        [doctorId, date, time]
      );
  
      if (existingAppointments.length > 0) {
        // An appointment already exists for the given doctor at the specified date and time
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Appointment slot is already booked' }));
        return;
      }
  
      // Perform additional checks or validations if needed
  
      // Insert appointment data into the database
      await db.promise().query(
        'INSERT INTO Appointment (clinic_id, doctor_id, patient_id, appointment_date, time) VALUES (?, ?, ?, ?, ?)',
        [clinicId, doctorId, patientId, date, time, firstName, lastName, email]
      );
  
      // Send a success response to the client
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Appointment booked successfully' }));
    } catch (error) {
      console.error('Error creating appointment:', error);
      // Send an error response to the client
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Failed to book appointment' }));
    }
  }
  
  module.exports = {
    createAppointment,
    // Other appointment controller functions...
  };
  