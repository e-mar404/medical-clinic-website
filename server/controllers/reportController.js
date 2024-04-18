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

function getNewUsersReport(res, db, start_date, end_date, clinic_id) {
  const start = start_date;
  const end = end_date; 
  
  db.query(`SELECT P.first_name, P.last_name, P.email_address, P.created
  FROM Patient AS P
  JOIN Employee AS E ON E.employee_id = P.primary_doctor_id AND E.primary_clinic = '${clinic_id}'
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
    GROUP BY E.employee_id, A.doctor_id`, (err, db_res) => {
      if (err) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ message: err }));
        return;    
      }
  
    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: db_res}));
  });
}

function generateClinicRevenue(res, db, startDate, endDate, clinic_id){
  const start = startDate;
  const end = endDate;

  db.query(`SELECT coalesce(sum(amount), 0) AS total_amount
      From Charges as C
      WHERE (date_charged BETWEEN '${start}' AND '${end}') AND C.clinic_id = ${clinic_id}
      UNION ALL
      (
      SELECT coalesce(sum(amount), 0) AS amount
      From Charges as C
      WHERE (date_charged BETWEEN '${start}' AND '${end}') AND C.charge_type = 'no show' AND C.clinic_id = ${clinic_id}
      UNION ALL
      
      SELECT coalesce(sum(amount), 0) AS amount
      From Charges as C
      WHERE (date_charged BETWEEN '${start}' AND '${end}') AND C.charge_type = 'complete' AND C.clinic_id = ${clinic_id});`, (err, db_res) => {
    if (err) {
      res.writeHead(400, headers);
      res.end(JSON.stringify({ message: err }));
      return;
    }
    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: db_res}));
  });
}

function getClinicInvoices(res, db, startDate, endDate, clinic_id){
  db.query(`SELECT C.invoice_num, C.patient_id, C.amount, C.charge_type, C.date_charged
    FROM Charges AS C
    WHERE (C.date_charged BETWEEN '${startDate}' AND '${endDate}') AND C.clinic_id = ${clinic_id};`, (err, db_res) => {
      if (err) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ message: err }));
        return;
      }
      res.writeHead(200, headers);
      res.end(JSON.stringify({ message: db_res}));
    });
}

function getNewUsersTotal(res, db, start_date, end_date, clinic_id) {
  const start = start_date;
  const end = end_date; 
  
  db.query(`SELECT COALESCE (COUNT(*), 0) AS total_accounts
      FROM Patient AS P, Employee AS E
    WHERE (P.created BETWEEN '${start}' AND '${end}') AND (P.primary_doctor_id = E.employee_id) AND E.primary_clinic = ${clinic_id} ;`, (err, db_res) => {
    if (err) {
      res.writeHead(400, headers);
      res.end(JSON.stringify({ message: err }));
      return;    
    }

    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: db_res}));
  });
  }

  function getTotalAppointments(res, db, start_date, end_date, clinic_id) {
    const start = start_date;
    const end = end_date; 
    
    db.query(`SELECT  COALESCE(COUNT(*), 0 ) AS total_appointments
        FROM Appointment AS A
        WHERE A.clinic_id = ${clinic_id} AND (A.appointment_date BETWEEN '${start}' AND '${end}') ;`, (err, db_res) => {
      if (err) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ message: err }));
        return;    
      }
  
      res.writeHead(200, headers);
      res.end(JSON.stringify({ message: db_res}));
    });
    }

module.exports = { generateReportFor, getNewUsersReport, generateDoctorTotal, generateClinicRevenue, getClinicInvoices, getNewUsersTotal, getTotalAppointments };
