const { headers, PostData } = require('../utils');

async function createPatientAccount(req, res, db) {
  try {

    const body = await PostData(req);
    const { email, phone_number, address, password, first_name, last_name, date_of_birth } = JSON.parse(body); 

    console.log(`creating patient account with email: ${email}`);

    const email_address = await createPatientContact(email, phone_number, address, res, db);

    const patient_id = await createPatient(email_address, first_name, last_name, date_of_birth, db);

    const msg = await createPatientLogin(email_address, password, patient_id, db);

    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: msg }));


  } catch (err) {
    console.log(err);

    res.writeHead(400, headers);
    res.end(JSON.stringify({ error: err }));
  } 
}

async function createPatientContact(email, phone_number, address, res, db){
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO ContactInformation(email_address, phone_number, address) VALUES (?, ?, ?)',
      [email, phone_number, address], (err, db_res) => {
        if (err) {
          reject(`createPatientContact: ${err.sqlMessage}`);
        }

        resolve(email);
      });
  });
}

async function createPatient(email, first_name, last_name, date_of_birth, db){
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO Patient(email_address, first_name, last_name, date_of_birth) VALUES (?, ?, ?, DATE ?)', 
      [email, first_name, last_name, date_of_birth], async (err, db_res) => {
        if (err) {
          reject(`createPatient: ${err.sqlMessage}`);
        }

        resolve(db_res.insertId);
      });
  });
}

async function createPatientLogin(email, password, patient_id, db) {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO Patient_Login(email_address, password, patient_id) VALUES(?, ?, ?)', 
      [email, password, patient_id], (err, db_res) => {
        if (err) {
          reject(`createPatientLogin: ${err}`);
        }

        resolve({
          email: email,
          id: patient_id
        });
      });
  });
}

async function loginPatient(req, res, db) {
  try {
    const body = await PostData(req);

    const { email, password } = JSON.parse(body);

    console.log(`logging in patient with email: ${email}`);

    db.query(`SELECT L.patient_id, P.first_name, P.last_name FROM Patient_Login L JOIN Patient P on L.email_address = P.email_address WHERE L.email_address='${email}' AND L.password='${password}';`, 
      [email, password], 
      (err, db_res) => {
        if (err) {
          res.writeHead(400, headers);
          res.end(JSON.stringify({ message: err }));
        } else {
          if (db_res.length === 0) {
            res.writeHead(401, headers);
            res.end(JSON.stringify({ message: "No user found with provided credentials" }));
          } else {
            res.writeHead(200, headers);
            res.end(JSON.stringify({ message: db_res}));
            console.log("success");
          }
        }
      });
  } catch (error) {
    console.log(`patientController.js: ${error}`);
    res.writeHead(400, headers);
    res.end(JSON.stringify({ 'message': error }));
  } 
}

function getPatientProfile(res, db, patient_id) {
  db.query(
    `
    SELECT
      P.patient_id, P.email_address, P.first_name, P.last_name, P.date_of_birth, P.gender, P.primary_doctor_id,
      CI.phone_number, CI.address,
      FI.name_on_card, FI.card_number, FI.cvv, FI.expiration_date,
      EC.contact_name, EC.contact_number, EC.contact_relationship,
      II.policy_number, II.group_number
    FROM Patient P
    LEFT JOIN ContactInformation CI ON P.email_address = CI.email_address
    LEFT JOIN Patient_FinancialInformation FI ON P.patient_id = FI.patient_id
    LEFT JOIN Patient_EmergencyContacts EC ON P.patient_id = EC.patient_id
    LEFT JOIN Patient_InsuranceInformation II ON P.patient_id = II.patient_id
    WHERE P.patient_id = ${patient_id};    
  `, (err, db_res) => {
    if (err) {
      res.writeHead(400, headers);
      res.end(JSON.stringify({ error: err }));
      return;
    }
    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: db_res }));
  });
}

async function getPatientId(db, email){
  return new Promise((resolve, reject) => {
    db.query('SELECT patient_id FROM Patient WHERE email_address=?', [email], (err, db_res) => {
      if (err) {
        reject(err);
        return
      }

      if (db_res.length === 0){
        reject('Patient with that email was not found');
        return;
      }

      resolve(db_res[0].patient_id);
    });
  });
}

async function postPatientProfile(req, res, db) {
  try {
    const body = await PostData(req);

    const { 
      patient_id, email_address, phone_number, address,
      name_on_card, card_number, cvv, expiration_date,
      contact_name, contact_relationship, contact_number,
      policy_number, group_number
    } = JSON.parse(body);
    
    console.log (patient_id, email_address, phone_number, address,
      name_on_card, card_number, cvv, expiration_date,
      contact_name, contact_relationship, contact_number,
      policy_number, group_number);
      db.query(`
      UPDATE ContactInformation SET phone_number = '${phone_number}', address = '${address}' WHERE email_address = '${email_address}';
  `, (err, result1) => {
      if (err) {
          // Handle error for the first query
          res.writeHead(400, headers);
          res.end(JSON.stringify({ message: err }));
      } else {
          // Execute the second query
          db.query(`
              INSERT INTO Patient_FinancialInformation (patient_id, name_on_card, card_number, cvv, expiration_date)
              VALUES (${patient_id}, '${name_on_card}', '${card_number}', '${cvv}', '${expiration_date}')
              ON DUPLICATE KEY UPDATE
                  name_on_card = VALUES(name_on_card),
                  card_number = VALUES(card_number),
                  cvv = VALUES(cvv),
                  expiration_date = VALUES(expiration_date);
          `, (err, result2) => {
              if (err) {
                  // Handle error for the second query
                  res.writeHead(400, headers);
                  res.end(JSON.stringify({ message: err }));
              } else {
                  // Execute the third query
                  db.query(`
                      INSERT INTO Patient_EmergencyContacts (patient_id, contact_name, contact_relationship, contact_number)
                      VALUES (${patient_id}, '${contact_name}', '${contact_relationship}', '${contact_number}')
                      ON DUPLICATE KEY UPDATE
                          contact_name = VALUES(contact_name),
                          contact_relationship = VALUES(contact_relationship),
                          contact_number = VALUES(contact_number);
                  `, (err, result3) => {
                      if (err) {
                          // Handle error for the third query
                          res.writeHead(400, headers);
                          res.end(JSON.stringify({ message: err }));
                      } else {
                          // Execute the fourth query
                          db.query(`
                              INSERT INTO Patient_InsuranceInformation (patient_id, policy_number, group_number)
                              VALUES (${patient_id}, '${policy_number}', '${group_number}')
                              ON DUPLICATE KEY UPDATE
                                  policy_number = VALUES(policy_number),
                                  group_number = VALUES(group_number);
                          `, (err, result4) => {
                              if (err) {
                                  // Handle error for the fourth query
                                  res.writeHead(400, headers);
                                  res.end(JSON.stringify({ message: err }));
                              } else {
                                  // All queries executed successfully
                                  res.writeHead(200, headers);
                                  res.end(JSON.stringify({ message: "All queries executed successfully" }));
                              }
                          });
                      }
                  });
              }
          });
      }
  });
  
  } catch (error) {
    console.log(`patientController.js: ${error}`);
    res.writeHead(400, headers);
    res.end(JSON.stringify({ 'message': error }));
  } 
}

function getPatientMedicalHistory(res, db, patient_id) {
  console.log(`getting medical history for patient: ${patient_id}`);

  db.query(`SELECT conditions, allergies, family_history FROM Patient_MedicalHistory WHERE patient_id=?`, [patient_id], (err, db_res) => {
    if (err) {
      res.writeHead(400, headers);
      res.end(JSON.stringify({ error: err }));
      return;
    }

    console.log('success getting medical history');
    
    const msg = (db_res.length > 0) ? db_res : "No history for patient";

    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: msg }));
  });
}

async function updatePatientMedicalHistory(req, res, db) {
  try {

    const body = await PostData(req);
    const { patient_id, conditions, allergies, family_history } = JSON.parse(body);

    if (!patientHasHistory(patient_id, db)) {
      console.log('patient doesnt have history creating new entry');

      await createPatientMedicalHistory(patient_id, conditions, allergies, family_history, res, db);
      return;
    }

    console.log('updating medical history for patient');
    
    const msg = await new Promise((resolve, reject) => {
      db.query('UPDATE Patient_MedicalHistory SET conditions=?, allergies=?, family_history=? WHERE patient_id=?', [conditions, allergies, family_history, patient_id], (err, db_res) => {
        if (err) {
          reject(err);
        }

        resolve('Medical History updated successfully');
      });
    });

    console.log(msg);
     
    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: msg }));
  } catch(err) {

    res.writeHead(400, headers);
    res.end(JSON.stringify({ error: err }));
  }
}

function patientHasHistory(patient_id, db) {
  return db.query('SELECT patient_id FROM Patient_MedicalHistory WHERE patient_id=?', [patient_id], (err, db_res) => {
    if (err) {
      return false;
    }

    return db_res.length > 0;
  });
}

async function createPatientMedicalHistory(patient_id, conditions, allergies, family_history, res, db) {
  try {
    const msg = await new Promise((resolve, reject) => {
      db.query('INSERT Patient_MedicalHistory(patient_id, conditions, allergies, family_history) VALUES(?, ?, ?, ?)', [patient_id, conditions, allergies, family_history], (err, db_res) => {
        if (err) {
          reject(err);
          return;
        }

        resolve('Successfully created patient medical history record');
      });
    });

    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: msg }));
  } catch(err) {

    res.writeHead(400, headers);
    res.end(JSON.stringify({ error: err }));
  }
}

module.exports = { createPatientAccount, loginPatient, getPatientId, getPatientProfile, postPatientProfile, getPatientMedicalHistory, updatePatientMedicalHistory };
