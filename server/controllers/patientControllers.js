const { PostData } = require('../utils');

async function createPatient(req, res, db) {
  
    try {
      const body = await PostData(req);

      const { email, password } = JSON.parse(body); 

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
      console.log(`patientControllers.js: ${error}`);
    }
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
        
        const msg = (db_res === '') ? 'Patient not found. Please check email and password' : db_res;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: msg }));

      });

  } catch (error) {
    console.log(`patientConstrollers.js: ${error}`);
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 'message': error }));
  } 
}

module.exports = { createPatient, loginPatient };
