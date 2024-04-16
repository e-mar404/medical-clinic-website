const { headers, PostData } = require('../utils')

const patientCharges = async (req, res, db) => {
  try {
   
    console.log('hi from billingController');
    const query = 'SELECT patient_id, amount, date_charged, paid, invoice_num FROM Charges';
    const [rows] = await db.promise().query(query);

    if (rows.length === 0) {
      res.writeHead(404, headers);
      res.end(JSON.stringify({ message: 'No charges found' }));
    } else {
      res.writeHead(200, headers);
      res.end(JSON.stringify(rows));
      console.log('Charges data:', rows); // Log the charges data here
    }
  } catch (error) { 
    console.error('Error fetching charges:', error);
    res.writeHead(500, headers);
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
};

module.exports = {
  patientCharges
};
