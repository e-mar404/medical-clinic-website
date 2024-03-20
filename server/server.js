const http = require('http');
const mysql = require('mysql2');
const { createPatientAccount, loginPatient } = require('./controllers/patientControllers');
const { getEmployeesByType } = require('./controllers/employeeController');
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

// Log any database errors
db.on('error', function(err) {
  console.log('Database error:', err);
});

const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'POST':
      switch (req.url) {
        case '/patient/register':
          createPatientAccount(req, res, db);
          break;
        
        case '/patient/login':
          loginPatient(req, res, db);
          break;

        default:
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Route not found' }));
          break;
      }
      break;
      
    case 'GET': 
      switch (req.url){
        case req.url.match(/\/employee\/bytype/).input: 
          const type = req.url.split('/')[3];
          getEmployeesByType(res, db, type);
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
