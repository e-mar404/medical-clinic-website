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

async function getClinicAppointments(res, db, clinicId) {
  try {
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

          const doctorQuery = 'SELECT employee_id, first_name, last_name FROM Employee WHERE employee_id = ?';
          const [doctorResult] = await db.promise().query(doctorQuery, [doctor_id]);

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

async function availableAppointments(req, res, db) {
  try {
    const body = await PostData(req);
    const { clinic_id, doctor_id, date } = JSON.parse(body);
    
    console.log(`getting available appointments for doctor ${doctor_id} at clinic ${clinic_id} on date ${date}`);

    const timesToRemove = await scheduledAppointments(clinic_id, doctor_id, date, db);
  
    const baseTimes = [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00"];
    
    let availableTimes = baseTimes;

    console.log('future times taken');

    timesToRemove.forEach(time => {
      console.log(time.time_taken);

      const index = baseTimes.indexOf(time.time_taken);

      if (index !== -1) {
        baseTimes.splice(index, 1);
      }
    });

    const curDate = new Date();
    const appointmentDate = new Date(date.replace('-', '/'));
    const timeOptions = { timeZone: 'America/Chicago', hour12: false };

    console.log(curDate, appointmentDate);
    console.log(`appoitmentDate: ${appointmentDate.toLocaleDateString()}, curDate: ${curDate.toLocaleDateString()}`);

    const sameDateAppointment = (appointmentDate.toLocaleDateString('en-US', timeOptions) === curDate.toLocaleDateString('en-US', timeOptions));

    if (sameDateAppointment) {
      console.log('this is a same day appointment, making sure to return only future times');

      availableTimes = baseTimes.reduce((acc, time, _index)  => {
        const curTime = curDate.toLocaleTimeString('en-US', timeOptions).slice(0,5);
        
        console.log(`comparing curTime:${curTime} < time: ${time} = ${curTime < time}`);

        if (curTime < time) {
          acc.push(time);
        }

        return acc;
      }, []);
    } 
    
    const msg = (availableTimes.length > 0) ? availableTimes : ['No appointments available for this day'];
    
    console.log('getting available appointments successful');

    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: msg }));

  } catch(err) {
    console.error(err);
    res.writeHead(500, headers);
    res.end(JSON.stringify({ error: err }));
  }
}

async function scheduledAppointments(clinic_id, doctor_id, date, db) {
  return await new Promise((resolve, reject) => {
    const query = `SELECT TIME_FORMAT(appointment_time, '%H:%i') AS time_taken FROM Appointment WHERE appointment_status='scheduled' AND appointment_time>=CURTIME() AND appointment_date=? AND clinic_id=? AND doctor_id=?`

    db.query(query, [date, clinic_id, doctor_id], (err, db_res) => {
      if (err) { 
        reject('something went wrong when getting available appointments');
      }
  
      console.log(db_res);

      resolve(db_res);
    });
  });
}


const updateAppointmentStatus = (req, res, db) => {
  let body = '';

  // Read request body
  req.on('data', chunk => {
    body += chunk.toString();
  });

  // Parse request body
  req.on('end', () => {
    try {
      const { appointment_id, status } = JSON.parse(body);

      // Call function in appointmentController to update status
      updateAppointmentStatusInDB(res, db, appointment_id, status);
    } catch (error) {
      console.error('Error parsing request body:', error);
      res.writeHead(400, headers);
      res.end(JSON.stringify({ message: 'Invalid request body' }));
    }
  });
};

// Function to update appointment status in the database
const updateAppointmentStatusInDB = (res, db, appointment_id, status) => {
  // Perform SQL update operation to update appointment status
  const sql = `UPDATE Appointment SET appointment_status = ? WHERE appointment_id = ?`;
  const values = [status, appointment_id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating appointment status:', err);
      res.writeHead(500, headers);
      res.end(JSON.stringify({ message: 'Internal server error' }));
    } else {
      console.log('Appointment status updated successfully');
      res.writeHead(200, headers);
      res.end(JSON.stringify({ message: 'Appointment status updated successfully' }));
    }
  });
};

module.exports = { createAppointment, availableAppointments, getClinicAppointments, getClinicOfReceptionist, updateAppointmentStatus };  
