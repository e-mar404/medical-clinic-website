const mysql = require('mysql');
require('dotenv').config()

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const database = process.env.DATABASE;

console.log(dbHost, dbUser);

const db = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: database
});             

db.connect(function (err) {
  if (err) {
    console.log(`Error connecting to db: ${err}`);
  } else {
    console.log('Database connected');
    db.query('SHOW TABLES',
            function (err, result) {
                if (err)
                    console.log(`Error executing the query: ${err}`)
                else
                    console.log("Result: ", result)
            })
  }
});
