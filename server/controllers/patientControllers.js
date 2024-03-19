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

<<<<<<< HEAD
    } catch (err) {
      console.log(err);
      
      res.writeHead(400, {'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err }));
=======
      console.log(`patientController.js: creating patient with email: ${email}`);

      db.query('INSERT INTO Patient_Login(email_address, password) VALUES (?, ?)', [email, password], (err, db_res) => {
        if (err) {
          console.log(err);
          res.writeHead(400, { 'Content-Type': 'application/json'});
          res.end(JSON.stringify({ error: err }));
        } 

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `created patient with email: ${email}` }));
      });

    } catch (error) {
      console.log(`patientControllers.js: ${error} IT DID NOT`);
>>>>>>> bc8e748 (Patient appointment)
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

        resolve(`created patient log in for patient: ${patient_id} with email: ${email}`);
      });
  });
}

async function loginPatient(req, res, db) {
  try {
    const body = await PostData(req);
    
    const { email, password } = JSON.parse(body);

    console.log(`logging in patient with email: ${email}`);

    db.query('SELECT * FROM Patient_Login WHERE email_address=? AND password=?', 
      [email, password], 
      (err, db_res) => {
        if (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: err }));

        } 
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: db_res}));

      });

  } catch (error) {
    console.log(`patientConstrollers.js: ${error}`);
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 'message': error }));
  } 
}

module.exports = { createPatientAccount, createPatientContact, loginPatient };
