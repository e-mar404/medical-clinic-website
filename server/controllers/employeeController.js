async function getEmployeesByType(res, db, type) {
  let query_res;

  try {
    
    switch (type) {
      case 'all':
        query_res = await getAllEmployees(db);
        break;
    
      case 'medical':
        query_res = await getMedicalEmployees(db);
        break;
        
      case 'staff':
        query_res = await getStaffEmployees(db);
        break;

      default:
        throw new TypeError('invalid role');
    }

    res.writeHead(200, { 'Content-Type':'application/json' });
    res.end(JSON.stringify({ message: query_res }));

  } catch(err) {
    res.writeHead(400, { 'Content-Type':'application/json' });
    res.end(JSON.stringify({ error: `${err.name}: ${err.message}`  }));
  }
}

async function getAllEmployees(db) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT 
      employee_id, email_address, employee_role 
      FROM Employee`, (err, db_res) => {
        if (err) {
          reject(err);
        }

        resolve(db_res);
      }); 
  });
}

async function getMedicalEmployees(db) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT 
      employee_id, email_address, employee_role 
      FROM Employee
      WHERE employee_type='Medical'`, (err, db_res) => {
        if (err) {
          reject(err);
        }

        resolve(db_res);
      }); 
  });
}

async function getStaffEmployees(db) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT 
      employee_id, email_address, employee_role 
      FROM Employee
      WHERE employee_type='Staff'`, (err, db_res) => {
        if (err) {
          reject(err);
        }

        resolve(db_res);
      }); 
  });
}

module.exports = { getEmployeesByType};
