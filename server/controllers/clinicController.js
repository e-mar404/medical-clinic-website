const { headers } = require('../utils');

async function getClinics(res, db) {
  db.query('SELECT clinic_id, clinic_name FROM Clinic', (err, db_res) => {
    if (err) {
      res.writeHead(401, headers);
      res.end(JSON.stringify({ error: err }));
      return;
    }

    const msg = (db_res.length > 0) ? db_res : 'No clinics found';


    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: msg }));
  });
}

async function getClinicName(res, db, adminClinicID) {
  db.query(`SELECT DISTINCT C.clinic_name FROM Clinic AS C, EMPLOYEE AS A WHERE C.clinic_id = ${adminClinicID};`, (err, db_res) => {
    if (err) {
      res.writeHead(401, headers);
      res.end(JSON.stringify({ error: err }));
      return;
    }
    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: db_res }));
  });
}

module.exports = { getClinics, getClinicName };
