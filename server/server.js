const http = require('http');
const mysql = require('mysql');
const { 
  createPatientAccount,
  loginPatient
} = require('./controllers/patientControllers');
require('dotenv').config({ path: '../.env' })

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const database = process.env.DATABASE;

const db = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: database
});             

db.connect(function (err) {
  const msg = (err) ? `Server.js: Error connecting to db: ${err}` : `Server.js: Database '${database}' connected`;  

  console.log(msg);
});

const server = http.createServer((req, res) => {
  if (req.url === '/patient/register' && req.method === 'POST'){
    createPatientAccount(req, res, db);

  } else if (req.url === '/patient/login' && req.method === 'POST') {
    loginPatient(req, res, db);

  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

const PORT = process.env.SERVER_PORT || 5001; 

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
