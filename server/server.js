const http = require('http');
const mysql = require('mysql2');
const { generateReportFor } = require('./controllers/reportController');
const { createAppointment } = require('./controllers/appointmentController');
const { getClinics } = require('./controllers/clinicController');
const { headers } = require('./utils');
const { createPatientAccount, loginPatient } = require('./controllers/patientController');
const {
  getEmployeesByType,
  getEmployeesByClinic,
  loginEmployee,
  createEmployeeAccount,
  employeeTransfer,
  getSpecialists
} = require('./controllers/employeeController');


require('dotenv').config();
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const database = process.env.DATABASE;

const db = mysql.createConnection({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPassword,
  database: database
});

db.connect(function (err) {
  const msg = (err) ? `Server.js: Error connecting to db: ${err}` : `Server.js: Database '${database}' connected`;  

  console.log(msg);
});

const server = http.createServer((req, res) => {
    
  console.log(`Server.js: METHOD: ${req.method}; URL: ${req.url}`);

  switch (req.method) {
    case 'OPTIONS':
      res.writeHead(200, headers); 
      res.end();
      break;

    case 'POST':
      switch (req.url) {
        case '/patient/register':
          createPatientAccount(req, res, db);
          break;

        case '/patient/login':
          loginPatient(req, res, db);
          break;

        case '/employee/login':
          loginEmployee(req, res, db);
          break;

        case '/make_appointment': 
          createAppointment(req, res, db);
          break;

        case '/admin/newemployee':
          createEmployeeAccount(req, res, db);
          break; 
          
        case '/admin/transfer':
          employeeTransfer(req, res, db);
          break;

        default:
          res.writeHead(404, headers);
          res.end(JSON.stringify({ message: 'Route not found' }));
          break;
      }

      break;

    case 'GET': 
      switch (true){
        case /reports/.test(req.url): 
          const reportType = req.url.split('/')[2];

          generateReportFor(res, db, reportType);
          break;

        case /\/employee\/bytype/.test(req.url): 
          const type = req.url.split('/')[3];

          getEmployeesByType(res, db, type);
          break;
        
        case /\/employee\/specialists/.test(req.url):
          
          getSpecialists(res, db);
          break;

        case /\/employee\/byclinic\//.test(req.url):
          const args = req.url.split('/');

          const clinic_id = args[3];
          const role = (args.length > 3) ? args[4] : '';
          console.log(`Calling get employees with role: ${role}`);
            
          getEmployeesByClinic(res, db, clinic_id, role);
          break;

        case /get_clinics/.test(req.url):
          getClinics(res, db);
          break; 

        case /\/admin\/employeelist/.test(req.url): //might not be needed
          getEmployeesByType(res, req, type);
          break;

        default:
          res.writeHead(404, headers);
          res.end(JSON.stringify({ message: 'Route not found' }));
          break;
      }

      break;

    default:
      res.writeHead(500, headers);
      res.end(JSON.stringify({ message: 'Invalid request type' }));
      break;
  }
});

const PORT = process.env.PORT || 5001; 

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
