const { PostData } = require('../utils');

async function createPatientAccount(req, res, db) {
  
    try {

      const body = await PostData(req);

      const { email, phone_number, address, password, first_name, last_name, date_of_birth } = JSON.parse(body); 

      console.log(`creating patient account with email: ${email}`);
      
      createPatientContact(email, phone_number, address, db);
      createPatient(email, first_name, last_name, date_of_birth, db);
        
      const patient_id = await Patient_id(email, db);
        
      createPatientLogin(email, password, patient_id, db);
      
      res.writeHead(200, {'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'created patient account' }));

    } catch (err) {
      console.log(err);
      
      res.writeHead(400, {'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err }));
    }
}

function createPatientContact(email, phone_number, address, db){
  db.query('INSERT INTO ContactInformation(email_address, phone_number, address) VALUES (?, ?, ?)',
    [email, phone_number, address], async (err, db_res) => {
      if (err) {
        console.log(err);
        throw new Error(`createPatientContact: ${err}`);
      }

      console.log(`created contact with email: ${email}`);
    });
}

async function createPatient(email, first_name, last_name, date_of_birth, db){
  await db.query('INSERT INTO Patient(email_address, first_name, last_name, date_of_birth) VALUES (?, ?, ?, DATE ?)', 
    [email, first_name, last_name, date_of_birth], async (err, db_res) => {
      if (err) {
        console.log(`createPatient: ${err}`);
        throw new Error(`createPatient: ${err}`);
      }
      
      const patient_id = await Patient_id(email, db);

      console.log(`created patient with id: ${patient_id}`);
    });
}

async function Patient_id(email, db) {
  return new Promise((resolve, _reject) => {
    db.query('SELECT patient_id FROM Patient WHERE email_address=?', [email], (err, db_res) => {
      if (err) {
        console.log(`patientId: ${err}`);
        return -1;
      }

      resolve(db_res[0].patient_id);
    });
  });
}

async function createPatientLogin(email, password, patient_id, db) {
  db.query('INSERT INTO Patient_Login(email_address, password, patient_id) VALUES(?, ?, ?)', [email, password, patient_id], (err, db_res) => {
    if (err) {
      console.log(err);
      throw new Error(`createPatientLogin: ${err}`);
    }

    console.log(`created patient log in for patient: ${patient_id} with email: ${email}`);
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

module.exports = { createPatientAccount, loginPatient };
