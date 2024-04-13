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

          const doctorQuery = 'SELECT employee_id, first_name, last_name FROM Employee WHERE employee_id = ?';
          const [doctorResult] = await db.promise().query(doctorQuery, [doctor_id]);

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

async function availableAppointments(req, res, db) {
  try {
    const body = await PostData(req);
    const { clinic_id, doctor_id, date } = JSON.parse(body);
    
    console.log(`getting available appointments for clinic ${clinic_id} on date ${date}`);

    const timesToRemove = await scheduledAppointments(clinic_id, doctor_id, date, db);

    const availableTimes = [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "01:00 PM",
      "02:00 PM",
      "03:00 PM",
      "04:00 PM",
      "05:00 PM"];

    timesToRemove.forEach(time => {
      const index = availableTimes.indexOf(time.time_taken);

      if (index !== -1) {
        availableTimes.splice(index, 1);
      }
    });

    console.log(`available times for doctor ${doctor_id} at clinic ${clinic_id}: ${availableTimes}`);

    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: availableTimes }));

  } catch(err) {
    console.error(err);
    res.writeHead(500, headers);
    res.end(JSON.stringify({ error: err }));
  }
}

async function scheduledAppointments(clinic_id, doctor_id, date, db) {
  return await new Promise((resolve, reject) => {
    const query = `SELECT TIME_FORMAT(appointment_time, '%h:%i %p') AS time_taken FROM Appointment WHERE appointment_status='scheduled' AND appointment_time>=CURTIME() AND appointment_date=? AND clinic_id=? AND doctor_id=?`

    db.query(query, [date, clinic_id, doctor_id], (err, db_res) => {
      if (err) { 
        reject('something went wrong when getting available appointments');
      }

      resolve(db_res);
    });
  });
}

module.exports = { createAppointment, getClinicAppointments, availableAppointments };

