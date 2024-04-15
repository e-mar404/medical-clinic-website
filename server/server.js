const http = require('http');
const mysql = require('mysql2');
const { generateReportFor, getNewUsersReport, generateDoctorTotal } = require('./controllers/reportController');
const { createAppointment, getClinicAppointments, availableAppointments } = require('./controllers/appointmentController');
const { getClinics } = require('./controllers/clinicController');
const { headers } = require('./utils');
const { createPatientAccount, loginPatient, getPatientProfile, postPatientProfile, getPatientMedicalHistory, updatePatientMedicalHistory } = require('./controllers/patientController');
const { createReferral } = require('./controllers/referralController');
const {
  getEmployeesByType,
  getEmployeesByClinic,
  loginEmployee,
  createEmployeeAccount,
  employeeTransfer,
  getSpecialists,
  getPatientsOf,
  getAppointments,
  getDoctorInformation,
  getAdminClinic,
  getClinicEmployees
} = require('./controllers/employeeController');

require('dotenv').config();

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const database = process.env.DATABASE;


const pool = mysql.createPool({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'Saul2014!',
  database: 'mdb',
  enableKeepAlive: true
});


const server = http.createServer((req, res) => {
  pool.getConnection(function (err, db) {
    const msg = (err) ? `Server.js: Error connecting to db: ${err}` : `Server.js: Database '${database}' connected`;  

    console.log(msg);

    let patient_id;
    let clinic_id;

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

          case '/patient/profile':
            postPatientProfile(req, res, db);
            break;

          case '/employee/login':
            loginEmployee(req, res, db);
            break;

          case '/update_patient_medical_history':
            updatePatientMedicalHistory(req, res, db);
            break;

          case '/create_referral':
            createReferral(req, res, db);
            break;

          case '/make_appointment': 
            createAppointment(req, res, db);
            break;

          case '/available_appointments':
            availableAppointments(req, res, db);
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

          case /\/patient\/profile/.test(req.url):
            patient_id = req.url.split('/')[3];
            getPatientProfile(res, db, patient_id);
            break;

          case /\/history_for_patient/.test(req.url):
            patient_id = req.url.split('/')[2];

            getPatientMedicalHistory(res, db, patient_id);
            break;

          case /\/employee\/bytype/.test(req.url): 
            const type = req.url.split('/')[3];

            getEmployeesByType(res, db, type);
            break;

          case /\/employee\/specialists/.test(req.url):
            getSpecialists(res, db);
            break;

          case /\/employee\/patients_of/.test(req.url):
            const doctor_id = req.url.split('/')[3];

            getPatientsOf(res, db, doctor_id);
            break;

          case /\/employee\/byclinic\//.test(req.url):
            const args = req.url.split('/');

            clinic_id = args[3];
            const role = (args.length > 3) ? args[4] : '';
            console.log(`Calling get employees with role: ${role}`);

            getEmployeesByClinic(res, db, clinic_id, role);
            break;

          case /clinicAppointments/.test(req.url):
            clinic_id = req.url.split('/')[2];

            getClinicAppointments(res, db, clinic_id);
            break;

          case /get_clinics/.test(req.url):
            getClinics(res, db);
            break; 


          case /\/admin\/employeelist/.test(req.url): //might not be needed
            getEmployeesByType(res, req, type);
            break;

          case /viewappointment/.test(req.url): // should get employee id and then call function that returns all appointments
            const empId = req.url.split('/')[2];
            getAppointments(res, db, empId);
            //res.writeHead(404, headers);
            //res.end(JSON.stringify({ message: 'Route for appointment' }));
            break;

          case /get_doctor/.test(req.url):
            const doctorID = req.url.split('/')[2];
            getDoctorInformation(res, db, doctorID);
            //res.writeHead(404, headers);
            //res.end(JSON.stringify({ message: 'Route for doctor info' }));
            break;

         case /accounts_created/.test(req.url):
            const start_date = req.url.split('/')[2];
            const end_date =  req.url.split('/')[3];
            const clinic_id = req.url.split('/')[4];

            getNewUsersReport(res, db, start_date, end_date, clinic_id);
            break;

        case /doctor_total/.test(req.url):
            const startDate = req.url.split('/')[2];
            const endDate =  req.url.split('/')[3];
            const clinicId = req.url.split('/')[4];
            generateDoctorTotal(res, db, startDate, endDate, clinicId);
            break;

        case /get_report/.test(req.url):
          res.writeHead(404, headers);
          res.end(JSON.stringify({ message: 'Route for reports' }));
          break;
        
        case /getAdminClinic/.test(req.url):
          const adminEmail = req.url.split('/')[2];
          getAdminClinic(res, db, adminEmail);
          break;
        
        case /getClinicEmployees/.test(req.url):
          const adminClinic = req.url.split('/')[2];
          getClinicEmployees(res, db, adminClinic);
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
    pool.releaseConnection(db);
  });
});

const PORT = process.env.PORT || 5001; 

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
