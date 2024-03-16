const { PostData } = require('../utils');

async function createPatient(req, res, db) {
  
    const { email, password } = JSON.parse(await PostData(req)); 
    
    console.log(`patientController.js: creating patient with email: ${email}`);

    await db.query('INSERT INTO Patient_Login(email_address, password) VALUES (?, ?)', [email, password], (err, db_res) => {
      if (err) {
        console.log(err);
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: db_res }));
      }
    });
}

module.exports = { createPatient };
