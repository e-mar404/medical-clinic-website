const { headers, PostData } = require('../utils');

async function createReferral(req, res, db) {
  try {
    const body = await PostData(req);
    const { doctor_id, patient_id, expiration_date } = JSON.parse(body);

    db.query('INSERT INTO Referral(patient_id, doctor_id, expiration_date) VALUES(?, ?, DATE ?)', [doctor_id, patient_id, expiration_date], (err, _db_res) => {
      if (err) {
        throw err;
      }
      
      const msg = 'Referral created successfully';
      console.log(msg);
      
      res.writeHead(200, headers);
      res.end(JSON.stringify ({ message: msg }));
    });

  }
  catch (err) {
    res.writeHead(400, headers);
    res.end(JSON.stringify ({ error: err }));
  }
}

module.exports = { createReferral };
