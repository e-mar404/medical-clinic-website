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

module.exports = { getClinics };
