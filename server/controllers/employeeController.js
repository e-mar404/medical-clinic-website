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
      employee_id, email_address, employee_role 
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

function getEmployeesByClinic(res, db, clinic_id) {
  console.log(`getting employees from clinic ${clinic_id}`)

  db.query('SELECT employee_id, first_name, last_name FROM Employee WHERE primary_clinic=?', [clinic_id], (err, db_res) => {
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

module.exports = { getEmployeesByType, getEmployeesByClinic, loginEmployee };
