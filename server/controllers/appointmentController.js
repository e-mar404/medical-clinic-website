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
    
    // Fetch clinic details from Clinic table
    const clinicQuery = 'SELECT clinic_name FROM Clinic WHERE clinic_id = ?';
    const [clinicResult] = await db.promise().query(clinicQuery, [clinicId]);
    const clinicName = clinicResult[0].clinic_name;

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
            clinic_name: clinicName,
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

const getClinicOfReceptionist = (res, db, userId) => {
  const query = `SELECT primary_clinic FROM Employee WHERE employee_id = '${userId}'`;
  console.log('Hello There User Id:', userId);
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching clinic ID:", err);
      res.writeHead(500, headers);
      res.end(JSON.stringify({ message: 'Internal server error' }));
    } else {
      if (result.length > 0) {
        const clinicId = result[0].primary_clinic;
        res.writeHead(200, headers);
        res.end(JSON.stringify({ clinicId }));
      } else {
        res.writeHead(404, headers);
        res.end(JSON.stringify({ message: 'Receptionist not found' }));
      }
    }
  });
};

function availableAppointments(req, res, db) {
  res.writeHead(200, headers);
  res.end(JSON.stringify({ message: 'sends available appointments' })); 
}
module.exports = { createAppointment, availableAppointments, getClinicAppointments, getClinicOfReceptionist };  

