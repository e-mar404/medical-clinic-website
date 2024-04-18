const { headers, PostData } = require('../utils')

const patientCharges = async (req, res, db) => {
  try {
    console.log('hi from billingController');

    // Query the Charges table to get charges data
    const query = 'SELECT patient_id, amount, date_charged, paid, invoice_num FROM Charges';
    const [rows] = await db.promise().query(query);

    if (rows.length === 0) {
      res.writeHead(404, headers);
      res.end(JSON.stringify({ message: 'No charges found' }));
      return; // Exit the function early if no charges are found
    }

    // Extract unique patient IDs from the charges data
    const patientIds = [...new Set(rows.map(charge => charge.patient_id))];

    // Query the Patient table to fetch patient names based on patient IDs
    const patientQuery = 'SELECT patient_id, first_name, last_name FROM Patient WHERE patient_id IN (?)';
    const [patients] = await db.promise().query(patientQuery, [patientIds]);

    // Create a map to quickly lookup patient names by patient ID
    const patientMap = {};
    patients.forEach(patient => {
      patientMap[patient.patient_id] = {
        firstName: patient.first_name,
        lastName: patient.last_name
      };
    });

    // Combine charges data with patient names
    const formattedRows = rows.map(charge => ({
      ...charge,
      patientFirstName: patientMap[charge.patient_id]?.firstName || '',
      patientLastName: patientMap[charge.patient_id]?.lastName || ''
    }));

    // Send the combined data to the client
    res.writeHead(200, headers);
    res.end(JSON.stringify(formattedRows));

    console.log('Charges data:', formattedRows); // Log the charges data with patient names
  } catch (error) {
    console.error('Error fetching charges:', error);
    res.writeHead(500, headers);
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
};


const StoreBillPayment = async (req, res, db) => {
  try {
    let body = '';

    // Read request body
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // Parse request body
    req.on('end', async () => {
      try {
        const { invoiceNumber, paidAmount } = JSON.parse(body);

        // Construct the SQL query to update the paid amount in the Charges table
        const query = 'UPDATE Charges SET paid = ? WHERE invoice_num = ?';

        // Execute the query with the provided parameters
        await db.promise().query(query, [paidAmount, invoiceNumber]);

        // Send a success response
        res.writeHead(200, headers);
        res.end(JSON.stringify({ message: 'Payment successfully processed' }));
      } catch (error) {
        console.error('Error parsing request body:', error);
        res.writeHead(400, headers); // Bad Request
        res.end(JSON.stringify({ message: 'Invalid request body' }));
      }
    });
  } catch (error) {
    console.error('Error storing bill payment:', error);
    res.writeHead(500, headers);
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
};


module.exports = {
  patientCharges, StoreBillPayment
};

