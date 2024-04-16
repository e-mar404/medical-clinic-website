const { PostData, headers } = require('../utils');

async function prescribeMedicationToPatient(req, res, db) {
  try {
    const body = await PostData(req);
    const { patient_id, doctor_id, medication_name, num_refills } = JSON.parse(body);

    console.log(`prescribing ${medication_name}`);

    const msg = await new Promise((resolve, reject) => {
      const query = 'INSERT INTO Medication(patient_id, doctor_id, medication_name, date_prescribed, num_refills) Values(?, ?, ?, CURDATE(), ?)';

      db.query(query, [patient_id, doctor_id, medication_name, num_refills], (err, db_res) => {
        if (err) {
          console.log(err);

          reject(err.sqlMessage.includes('prescribed') ? err.sqlMessage : 'Could not prescribe medication to patient');
        }
        
        resolve('Successfully prescribed medication');
      });
    });
    
    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: msg })); 

  } catch (err) {
    console.log(err); 

    res.writeHead(401, headers);
    res.end(JSON.stringify({ error: err }));
  }
}

<<<<<<< HEAD
module.exports = { prescribeMedicationToPatient };
=======
function getMedicationsForPatient(res, db, patient_id) {
  const query = 'SELECT FLOOR(RAND()*(20-1+1)+1) AS id, medication_name FROM Medication WHERE patient_id=? AND active=true';
  
  db.query(query, [patient_id], (err, db_res) => {
    if (err) {
      console.log(err); 

      res.writeHead(401, headers);
      res.end(JSON.stringify({ error: 'Error getting medications for patien '}));
    }

    const msg = (db_res.length > 0) ? db_res : 'Patient has no medications prescribed';

    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: msg })); 
  });
}

async function removeMedicationForPatient(req, res, db) {
  try {
    const body = await PostData(req);

    const { patient_id, doctor_id, medication_name } = JSON.parse(body);
  
    const msg = await new Promise((resolve, reject) => {
      const query = 'UPDATE Medication SET active=false WHERE patient_id=? AND doctor_id=? AND medication_name=?';

      db.query(query, [patient_id, doctor_id, medication_name], (err, db_res) => {
        if (err) {
          console.log(err);

          reject('Error removing prescribed medication');
        }

        resolve('Successfully removed prescribed medication');
      });
    });

    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: msg })); 

  } catch (err) {
    console.log(err); 

    res.writeHead(401, headers);
    res.end(JSON.stringify({ error: err }));
  }
  
}

module.exports = { prescribeMedicationToPatient, getMedicationsForPatient, removeMedicationForPatient };
>>>>>>> 17a7d0deb42d02923f62764929a60344d2cddfd7
