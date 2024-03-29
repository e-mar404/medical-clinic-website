const { headers, PostData } = require('../utils')
const { getPatientId } = require('./patientController');

async function createAppointment(req, res, db) {
  try {
    console.log('creating appointment');
    const body = await PostData(req);

    const { clinicId, doctorId, date, time, patientEmail } = JSON.parse(body);

    const patientId = await getPatientId(db, patientEmail);

    const msg = await scheduleAppoinment(db, clinicId, doctorId, patientId, date, time);

    console.log('success creating appointment');

    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: msg })); 

  } catch (err) {
    console.log(err); 

    res.writeHead(401, headers);
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

async function getClinicAppointments(req, res, db) {
  try {
    const clinicId = req.headers['clinic-id'];

    console.log('Clinic ID:', clinicId); // Log clinic ID
    
    db.query('SELECT doctor_id, patient_id, appointment_date, appointment_time FROM Appointment WHERE clinic_id = ?', [clinicId], async (err, results) => {
      if (err) {
        console.error(err);
        res.writeHead(500, headers);
        res.end(JSON.stringify({ error: 'Error fetching clinic appointments' }));
      } else {
        console.log('Fetched appointments:', results); // Log fetched appointments
        
        const appointmentsWithDetails = await Promise.all(results.map(async appointment => {
          const { doctor_id, patient_id, appointment_date, appointment_time } = appointment;
          
          // Fetch doctor details from MEmployee table
          const doctorQuery = 'SELECT memployee_id, first_name, last_name FROM MEmployee WHERE memployee_id = ?';
          const [doctorResult] = await db.promise().query(doctorQuery, [doctor_id]);
  
          // Fetch patient details from Patient table
          const patientQuery = 'SELECT first_name, last_name FROM Patient WHERE patient_id = ?';
          const [patientResult] = await db.promise().query(patientQuery, [patient_id]);
  
          return {
            doctor: {
              first_name: doctorResult[0].first_name,
              last_name: doctorResult[0].last_name
            },
            patient: {
              first_name: patientResult[0].first_name,
              last_name: patientResult[0].last_name
            },
            appointment_date,
            appointment_time
          };
        }));
  
        console.log('Appointments with details:', appointmentsWithDetails); // Log appointments with details
        
        res.writeHead(200, headers);
        res.end(JSON.stringify(appointmentsWithDetails));
      }
    });
  } catch (error) {
    console.error(error);
    res.writeHead(500, headers);
    res.end(JSON.stringify({ error: 'Error fetching clinic appointments' }));
  }
}


module.exports = { createAppointment, getClinicAppointments };

