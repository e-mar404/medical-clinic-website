const { PostData } = require('../utils')
const { getPatientId } = require('./patientController');

async function createAppointment(req, res, db) {
  try {
    console.log('creating appointment');
    const body = await PostData(req);
    
    const { clinicId, doctorId, date, time, patientEmail } = JSON.parse(body);

    const patientId = await getPatientId(db, patientEmail);

    const msg = await scheduleAppoinment(db, clinicId, doctorId, patientId, date, time);

    console.log('success creating appointment');

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: msg })); 

  } catch (err) {
    console.log(err); 

    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err }));
  }
}
 
async function scheduleAppoinment(db, clinicId, doctorId, patientId, date, time){
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO Appointment (clinic_id, doctor_id, patient_id, appointment_date, appointment_time, appointment_status) VALUES (?, ?, ?, ?, ?, ?)',
      [clinicId, doctorId, patientId, date, time, 'scheduled'], (err, db_res) => {
        if (err) {
          reject(err.sqlMessage);
        }

        resolve('Successfully created appointment');
      });
  });
}

module.exports = { createAppointment };  
