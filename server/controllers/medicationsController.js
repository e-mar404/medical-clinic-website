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

          reject('Could not prescribe medication to patient');
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

module.exports = { prescribeMedicationToPatient };
