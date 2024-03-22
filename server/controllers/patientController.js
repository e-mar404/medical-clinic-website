const { PostData } = require('../utils');

async function createPatientAccount(req, res, db) {
    try {

      const body = await PostData(req);
      const { email, phone_number, address, password, first_name, last_name, date_of_birth } = JSON.parse(body); 

      console.log(`creating patient account with email: ${email}`);
      
      const email_address = await createPatientContact(email, phone_number, address, res, db);
      
      const patient_id = await createPatient(email_address, first_name, last_name, date_of_birth, db);
        
      const msg = await createPatientLogin(email_address, password, patient_id, db);
      
      res.writeHead(200, {'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: msg }));


    } catch (err) {
      console.log(err);
      
      res.writeHead(400, {'Content-Type': 'application/json' });
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
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: err }));
      } else {
        if (db_res.length === 0) {
          // If no rows found, respond with 401
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: "No user found with provided credentials" }));
        } else {
          // If rows found, respond with 200
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: db_res}));
          console.log("success");
        }
      }
    });
  

  } catch (error) {
    console.log(`patientController.js: ${error}`);
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 'message': error }));
  } 
}

module.exports = { createPatientAccount, loginPatient };
