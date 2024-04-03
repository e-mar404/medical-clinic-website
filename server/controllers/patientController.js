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

function getPatientProfile(res, db, patient_id) {
  console.log(`${patient_id}`);

  db.query(`SELECT * FROM Patient WHERE patient_id=?`, [patient_id], (err, db_res) => {
    if (err) {
      res.writeHead(400, headers);
      res.end(JSON.stringify({ error: err }));
      return;
    }

    console.log(db_res);

    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: db_res }));
  });
}

function getPatientMedicalHistory(res, db, patient_id) {
  console.log(`getting medical history for patient: ${patient_id}`);

  db.query(`SELECT * FROM Patient_MedicalHistory WHERE patient_id=?`, [patient_id], (err, db_res) => {
    if (err) {
      res.writeHead(400, headers);
      res.end(JSON.stringify({ error: err }));
      return;
    }

    console.log(`success getting medical history: ${db_res}`);
    
    const msg = (db_res.length > 0) ? db_res : "No history for patient";

    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: msg }));
  });
}

module.exports = { createPatientAccount, loginPatient, getPatientId, getPatientProfile, getPatientMedicalHistory };
