const { headers } = require('../utils');

function generateReportFor(res, db, reportType) {
    db.query(`SELECT * FROM ${reportType}`, (err, db_res) => {
          if (err) {
                  res.writeHead(400, headers);
                  res.end(JSON.stringify({ message: err }));
                  return;    
                }

          res.writeHead(200, headers);
          res.end(JSON.stringify({ message: db_res}));
        });
}

module.exports = { generateReportFor };
