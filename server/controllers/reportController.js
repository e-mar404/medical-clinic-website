function generateReportFor(res, db, reportType) {
  db.query(`SELECT * FROM ${reportType}`, (err, db_res) => {
    if (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: err }));
      return;    
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: db_res}));
  });
}

module.exports = { generateReportFor };
