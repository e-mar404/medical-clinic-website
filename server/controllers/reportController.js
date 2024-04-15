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

<<<<<<< HEAD
function getNewUsersReport(res, db, start_date, end_date) {
=======
function getNewUsersReport(res, db, start_date, end_date, clinic_id) {
>>>>>>> 17a7d0deb42d02923f62764929a60344d2cddfd7
  const start = start_date;
  const end = end_date; 
  db.query(`SELECT P.first_name, P.last_name, P.email_address, P.created
  FROM Patient AS P
<<<<<<< HEAD
=======
  JOIN Employee AS E ON E.employee_id = P.primary_doctor_id AND E.primary_clinic = '${clinic_id}'
>>>>>>> 17a7d0deb42d02923f62764929a60344d2cddfd7
  WHERE P.created BETWEEN '${start}' AND '${end}'`, (err, db_res) => {
    if (err) {
      res.writeHead(400, headers);
      res.end(JSON.stringify({ message: err }));
      return;    
    }

    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: db_res}));
  });
  }

  function generateDoctorTotal(res, db, startDate, endDate, clinic_id) {
    const start = startDate;
    const end = endDate; 
    db.query(`SELECT E.employee_id, E.first_name, E.last_name, COUNT(*) AS total_appointment
      FROM Employee AS E
        JOIN Appointment AS A ON  E.employee_id = A.doctor_id
      WHERE (A.appointment_date BETWEEN '${start}' AND '${end}') AND A.clinic_id = ${clinic_id}   
      GROUP BY E.employee_id, A.doctor_id;
    `, (err, db_res) => {
      if (err) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ message: err }));
        return;    
      }
  
      res.writeHead(200, headers);
      res.end(JSON.stringify({ message: db_res}));
    });
    }



module.exports = { generateReportFor, getNewUsersReport, generateDoctorTotal };
