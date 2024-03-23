const http = require('http');
const mysql = require('mysql2');

const { 
  createPatientAccount,
  loginPatient
} = require('./controllers/patientController');

const {
  getEmployeesByType,
  getEmployeesByClinic,
  loginEmployee,
  createEmployeeAccount
} = require('./controllers/employeeController');

const {
  generateReportFor
} = require('./controllers/reportController');

const {
  createAppointment
} = require('./controllers/appointmentController');

const {
  getClinics
} = require('./controllers/clinicController');

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
  
  res.setHeader('Access-Control-Allow-Origin', '*'); /* security concerns, but okay for now */
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Max-Age', 2592000); 
  res.setHeader('Access-Control-Allow-Headers', 'content-type');

  switch (req.method) {
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
          
        default:
          res.writeHead(404, { 'Content-Type': 'application/json' });
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

        case /\/employee\/byclinic/.test(req.url):
          const clinic_id = req.url.split('/')[3];

          getEmployeesByClinic(res, db, clinic_id);
          break;

        case /get_clinics/.test(req.url):
          getClinics(res, db);
          break;

        default:
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Route not found' }));
          break;
      }
      
      break;

    default:
      break;
  }
});

const PORT = process.env.SERVER_PORT || 5001; 

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
