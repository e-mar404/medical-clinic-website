const { headers, PostData } = require('../utils');

async function getEmployeesByType(res, db, type) {
  let condition;

  try {

    switch (type) {
      case 'all':
        condition='true';
        break;

      case 'medical':
        condition=`employee_type='Medical'`;
        break;

      case 'staff':
        condition=`employee_type='Staff'`;
        break;

      default:
        throw new TypeError('invalid role');
    }


    db.query(`SELECT 
      employee_id, email_address, employee_role, first_name, last_name
      FROM Employee WHERE ${condition}`, (err, db_res) => {
        if (err) {
          throw (err);
        }

        res.writeHead(200, headers);
        res.end(JSON.stringify({ message: db_res}));
      }); 


  } catch(err) {
    res.writeHead(400, headers);
    res.end(JSON.stringify({ error: `${err.name}: ${err.message}`  }));
  }
}


function getEmployeesByClinic(res, db, clinic_id, role) {
  console.log(`getting employees with role ${role} from clinic ${clinic_id}`)

  let employeeRoleCondition= '';

  if (role.length > 0 && ['doctor', 'nurse', 'administrator', 'receptionist'].includes(role)) {
    employeeRoleCondition = ` AND employee_role='${role}'`;
  }

  db.query(`SELECT employee_id, first_name, last_name FROM Employee WHERE primary_clinic=? ${employeeRoleCondition}`, [clinic_id], (err, db_res) => {
    if (err) {
      res.writeHead(400, headers);
      res.end(JSON.stringify({ error: err }));
      return;
    }

    console.log("success");

    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: db_res }));
  });
}

async function createEmployeeAccount(req, res, db){
  try { 
    const body = await PostData(req);
    const { email, phone_number, address, password, first_name, middle_name, last_name, employee_role, employee_type } = JSON.parse(body); 

    console.log(`creating employee account with email:  ${email} ${phone_number} ${address} ${password} ${first_name} ${middle_name} ${last_name} ${employee_role} ${employee_type}`);

    const email_address = await createEmployeeContact(email, phone_number, address, res, db);

    const employee_id = await createEmployee(email_address, first_name, middle_name, last_name, employee_role, employee_type, db);

    const msg = await createEmployeeLogin(email_address, password, employee_id, db);

    console.log(msg);

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify( {message: msg}));

  } catch(err){
    console.log(err);
    res.writeHead(400, {'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err }));

    console.log('patientController.js: error creating employee account');
  }
}

async function createEmployeeContact(email, phone_number, address, res, db){
  return new Promise((resolve, reject) => {

    db.query('INSERT INTO ContactInformation(email_address, phone_number, address) VALUES (?, ?, ?)',
      [email, phone_number, address], (err, db_res) => {
        if(err) {
          reject(`createEmployeeContact: ${err.sqlMessage}`);
        }
        resolve(email);
      });
  });

}

async function createEmployee(email, first_name, middle_name, last_name, employee_role, employee_type, db){
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO Employee(email_address, first_name, middle_name, last_name, employee_role, employee_type) VALUES (?, ?, ?, ?, ?, ?)',
      [email, first_name, middle_name, last_name, employee_role, employee_type], async (err, db_res) => {
        if(err) {
          reject (`createEmployeeContact: ${err.sqlMessage}`);
        }
        resolve(db_res.insertId);
      });
  });
}

async function createEmployeeLogin(email, password, employee_id, db){
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO Employee_Login(email_address, password, employee_id) VALUES(?, ?, ?)',
      [email, password, employee_id], (err, db_res) => {
        if(err){
          reject(`createEmployeeLogin ${err}`);
        }
        resolve(`created employee login with log in: ${employee_id} and email: ${email}`);
      });
  });
}


async function loginEmployee(req, res, db) {
  try {
    const body = await PostData(req);

    const { email, password } = JSON.parse(body);

    console.log(`logging in patient with email: ${email}`);

    db.query(`SELECT L.employee_id, E.first_name, E.last_name, E.employee_type, E.employee_role FROM Employee_Login L JOIN Employee E on L.email_address = E.email_address WHERE L.email_address='${email}' AND L.password='${password}';`, 
      [email, password], 
      (err, db_res) => {
        if (err) {
          res.writeHead(400, headers);
          res.end(JSON.stringify({ message: err }));
        } else {
          if (db_res.length === 0) {
            res.writeHead(401, headers);
            res.end(JSON.stringify({ message: "No user found with provided credentials" }));
          } else {
            res.writeHead(200, headers);
            res.end(JSON.stringify({ message: db_res}));
            console.log("success");
          }
        }
      });


  } catch (error) {
    console.log(`employeeController.js: ${error}`);
    res.writeHead(400, headers);
    res.end(JSON.stringify({ 'message': error }));
  } 
}

async function employeeTransfer(req, res, db){
  try {
    const body = await PostData(req);
    body = { email, clinic }.JSON.parse(body);
    
    console.log(`Transfer Employee with email ${email} to clinic id: ${clinic}`);
    db.query(`UPDATE Employee SET clinic_id = clinic WHERE email_address = '${email}';`, 
    [email, clinic], (err, db_res) => {
      if(err){
        throw (err);
      }
      res.writeHead(200, headers);
      res.end(JSON.stringify ({ message: db_res}));
    }); 
    
  }
  catch (err) {
    res.writeHead(400, headers);
    res.end(JSON.stringify ({ error: `${err.name}: ${err.message}` }));
  }
}



module.exports = { getEmployeesByType, getEmployeesByClinic, loginEmployee, createEmployeeAccount, employeeTransfer };
