const http = require('http');
const mysql = require('mysql');
  const { createPatient } = require('./controllers/patientControllers');
require('dotenv').config({ path: '../.env' })

const dbHost = "localhost";
const dbUser = "root";
const dbPassword = "password";
const database = "mdb";

const db = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: database
});             

db.connect(function (err) {
  if (err) {
    console.log(`Server.js: Error connecting to db: ${err}`);
  } else {
    console.log('Server.js: Database connected');
  }
});

const server = http.createServer((req, res) => {
  if (req.url === '/patient/register' && req.method === 'POST'){
      createPatient(req, res, db);

  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

const PORT = process.env.SERVER_PORT || 8080

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
