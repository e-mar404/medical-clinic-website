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

module.exports = { getEmployeesByType };
