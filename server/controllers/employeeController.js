const { PostData } = require("../utils");

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
      employee_id, email_address, employee_role 
      FROM Employee WHERE ${condition}`, (err, db_res) => {
        if (err) {
          throw (err);
        }

        res.writeHead(200, { 'Content-Type':'application/json' });
        res.end(JSON.stringify({ message: db_res}));
      }); 


  } catch(err) {
    res.writeHead(400, { 'Content-Type':'application/json' });
    res.end(JSON.stringify({ error: `${err.name}: ${err.message}`  }));
  }
}

async function createEmployeeAccount(req, res, db){
  try { 
    const body = await PostData(req);
    const { email, phone_number, address, password, first_name, middle_name, last_name, employee_role, employee_type } = JSON.parse(body); 
    
    console.log(`creating employee account with email:  ${email} ${phone_number} ${address} ${password} ${first_name} ${middle_name} ${last_name} ${employee_role} ${employee_type}`);

    const email_address = await createEmployeeContact(email, phone_number, address, res, db);// Employee contact needed 
    // need the employee id 
    const employee_id = await createEmployee(email_address, first_name, middle_name, last_name, employee_role, employee_type, db); // needs type, clinic, and role
    // need the clinic id
    const msg = await createEmployeeLogin(email_address, password, employee_id, db);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify( {message: msg}));

  } catch(err){
    console.log(err);
    res.writeHead(400, {'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err }));

    console.log(`patientController.js: creating employee with email: ${email}`);

    db.query('INSERT INTO Employee_Login(email_address, password) VALUES (?, ?)' [email, password], (err, db_res) =>{
      if (err) {
        console.log(err);
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ error: err}));
      }
    });

    res.writeHead(400, {'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err }));
    //res.writeHead(400, {'Content-Type': 'application/json'});
    
  }
}

// insert into contact table

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

module.exports = { createEmployeeAccount, getEmployeesByType };
