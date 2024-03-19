const http = require('http');
<<<<<<< HEAD
const mysql = require('mysql2');

const { 
  createPatientAccount,
  loginPatient
} = require('./controllers/patientControllers');

const {
  getEmployeesByType
} = require('./controllers/employeeController');

require('dotenv').config({ path: '../.env' })
=======
const mysql = require('mysql2'); // Import mysql2
const { createPatient, loginPatient } = require('./controllers/patientControllers');
require('dotenv').config();
>>>>>>> bc8e748 (Patient appointment)

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

<<<<<<< HEAD
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
=======
// Log any database errors
db.on('error', function(err) {
  console.log('Database error:', err);
});

const server = http.createServer((req, res) => {
  if (req.url === '/test' && req.method === 'GET') {
    // Perform a simple database query to test the connection
    db.query('SELECT 1', (err, result) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Database connection failed' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Database connected successfully' }));
      }
    });
  } else if (req.url === '/appointments' && req.method === 'GET') {
    // Select data from the Appointment table
    db.query('SELECT * FROM Appointment', (err, result) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Failed to retrieve appointments' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      }
    });
  } else if (req.url === '/patient/register' && req.method === 'POST') {
    createPatient(req, res, db);
  } else if (req.url === '/patient/login' && req.method === 'POST') {
    loginPatient(req, res, db);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
>>>>>>> bc8e748 (Patient appointment)
  }
});

const PORT = process.env.SERVER_PORT || 5001; 

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
